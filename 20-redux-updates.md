---
page_id: 30-days-of-react/day-20
series: 30-days-of-react
permalink: day-20
title: Live-updating Our Redux Stores
description: With Redux in place, let's talk about how we actually modify the Redux state from within our applications.
articleEntry: '30-days/20'
hero_image: /assets/images/series/30-days-of-react/headings/20.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/20.jpg
codeRoot: '__FILE_PATH__/code/20'
imagesDir: '../../../assets/images/series/30-days-of-react/20'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/20_wide.jpg'
date: Wed Oct 23 2016 21:29:42 GMT-0700 (PDT)
---

Yesterday we went through the difficult part of integrating our React app with Redux. From here on out, we'll be defining functionality with our Redux setup.

As it stands now, we have our demo application showing the current time. But there currently isn't any way to update to the new time. Let's modify this now.

## Triggering updates

Recall that the only way we can change data in Redux is through an action creator. We created a single action creator yesterday in the `actions` object that is being passed to the `Home` component.

<img class="wide" src="{{ imagesDir }}/home-time.png" />

<div id="demo1"></div>

What we _want_ is the ability for our users to update the time by clicking on a button. In order to add this functionality, we'll have to take two steps:

1. Call the action creator / dispatch the action
2. Handle the action in the reducer

The first step is pretty straightforward as we already have the action being sent through the `Home` components props. We can add a `<button />` element with an `onClick` prop that calls out to the bound action `actions.currentTime.updateTime()`.

In the `Home` component, let's update the source to include this `<button />`:

```javascript
const Home = ({actions, currentTime}) => {
  return (
    <div>
      <p>Current time: {currentTime.toString()}</p>
      <button onClick={actions.currentTime.updateTime}>
        Update
      </button>
    </div>
  )
}
```

The second step is equally easy. The `reducer` function gets called every time there is an action that's _dispatched_ via the store.

When the user clicks on the button, we're calling the bound action in the `onClick` handler which triggers a dispatch on the store. The `reducer` function will get called with two arguments:

1. The _current_ state of the tree.
2. The action that was fired.

Inside the reducer function, we can _listen_ for the particular action we're interested in and return a _new_ state back to update the global state tree.

Let's listen for the `FETCH_NEW_TIME` action in our reducer and update the `currentTime` value of the state when the button is clicked. Inside the reducer function of `src/redux/modules/currentTime.js`, let's grow it by adding a switch statement:

```javascript
export const types = {
  'FETCH_NEW_TIME': 'FETCH_NEW_TIME'
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_NEW_TIME:
      return {...state, currentTime: new Date()};
    default:
      return state;
  }
}
```

Now when our user clicks on the button, the action is fired and the reducer picks it up. Since the `action.type` is equal to the value of the `types.FETCH_NEW_TIME`, it will return a **completely new** state with a new `currentTime` value:

<div id="demo2"></div>

## Multi-reducers

As it stands now, we have a single reducer for our application. This works for now as we only have a small amount of simple data and (presumably) only one person working on this app. Just imagine the headache it would be to develop with one gigantic switch statement for _every single piece of data_ in our apps...

Ahhhhhhhhhhhhhh...

Redux to the rescue! Redux has a way for us to split up our redux reducers into multiple reducers, each responsible for only a leaf of the state tree.

We can use the `combineReducers()` export from `redux` to compose an object of reducer functions. For every action that gets triggered, each of these functions will be called with the corresponding action. Let's see this in action.

Let's say that we (perhaps more realistically) want to keep track of the current user. Let's create a `currentUser` redux module in... you guessed it: `src/redux/modules/currentUser.js`:

```bash
touch src/redux/modules/currentUser.js
```

We'll export the same four values we exported from the `currentTime` module... of course, this time it is specific to the currentUser. We've added a basic structure here for handling a current user:

```javascript
export const types = {
  'LOGIN': 'LOGIN',
  'LOGOUT': 'LOGOUT'
};

const initialState = {
  user: {},
  loggedIn: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state, user: action.payload, loggedIn: true};
    case types.LOGOUT:
      return {
        ...state, user: {}, loggedIn: false};
    default:
      return state;
  }
}

export const actions = {
  login: (user) => ({type: types.LOGIN, payload: user}),
  logout: () => ({type: types.LOGOUT})
}
```

In order to combine these reducers in our state, we'll use the `combineReducers` function. We'll also bind the `currentUser.actions` object to the `store.dispatch` function (just like we did with the `currentTime.actions`). In the `src/redux/configureStore.js` file:

```javascript
// ...
// Modules
import * as currentTime from './modules/currentTime';
import * as currentUser from './modules/currentUser';

export const configureStore = () => {
  const reducer = combineReducers({
    currentTime: currentTime.reducer,
    currentUser: currentUser.reducer
  })
  const store = createStore(reducer);

  const actions = {
    currentTime:
      bindActionCreators(currentTime.actions, store.dispatch),
    currentUser:
      bindActionCreators(currentUser.actions, store.dispatch)
  };

  return {store, actions};
}
```

That's it. Now we have access to our `currentUser.actions` and we can interact with the user state as well as the currentTime and not worry about overwriting or conflicting with the `currentTime` state as redux will only pass along the piece of state the reducer is interested in (defined by the `key`).

For instance, if we call the `actions.currentTime.updateTime()` function, the `currentUser.reducer` function will get run with _only the currentUser_ part of the state tree. Redux won't allow us to overwrite another reducer's state.

> Note that all reducer functions get triggered on an action call regardless of the action called.

## Authentication (with dummy data)

With our `currentUser` established, we have both the state for whether or not a user is logged in as well as actions for logging in and out.

As our app develops, there are a variety of components that might want to access this data. Let's start with the `Navbar` component. The `Navbar` component might want to show a "Login" link if the user is not logged in. Otherwise it would want to show a "Logout" link if the user is.

We can use `connect` (from the `react-redux` package) to accomplish this.

We might be tempted to connect Redux directly to the `Navbar` component. Although this will work, it's better to try to connect as few components as possible as they are more difficult to test. Instead, let's connect to the `Index` container and use normal React prop passing to pass the `Navbar` component the `currentUser` object.

Let's update the `src/containers/Index.js` container with the `connect()` call, connecting it to the `currentUser` state:

```javascript
import React from 'react';
import Navbar from '../components/Nav/Navbar';
import { connect } from 'react-redux';

export class Index extends React.Component {
  render() {
    const {currentUser} = this.props;
    return (
      <div className="app">
        <Navbar currentUser={currentUser} />
        <div className="page">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  currentUser: state.currentUser
}))(Index);
```

Now, back in the `Navbar`, we can use the `currentUser` prop to show the appropriate link:

```javascript
import React from 'react';
import { Link } from 'react-router';

export const Navbar = ({currentUser}) => {
  return (
    <div className="navbar">
      <Link
        className="link"
        to="/home"
        activeClassName="active">
          Home
      </Link>
      <Link
        className="link"
        to="/about"
        activeClassName="active">
          About
      </Link>
      {/* If we have a logged in user, show the login */}
      {currentUser.loggedIn ?
        <Link
          to="/logout"
          className="link"
          activeClassName="active">Logout</Link> :
        <Link
          to="/login"
          className="link"
          activeClassName="active">Login</Link>}
    </div>
  );
}

export default Navbar;
```

<img class="wide" src="{{ imagesDir }}/login-logout.gif" />

Phew! This was another hefty day of Redux code. Today, we completed the circle between data updating and storing data in the global Redux state. In addition, we learned how to extend Redux to use multiple reducers and actions as well as multiple connected components.

However, we have yet to make an asynchronous call for off-site data. Tomorrow we'll get into how to use middleware with Redux, which will give us the ability to handle fetching remote data from within our app and still use the power of Redux to keep our data.

Good job today and see you tomorrow!
