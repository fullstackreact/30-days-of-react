---
page_id: 30-days-of-react/day-19
series: 30-days-of-react
permalink: day-19
title: Data Management with Redux
description: With the knowledge of flux and Redux, let's integrate Redux in our application and walk through connected applications.
dayDir: '19'
hero_image: /assets/images/series/30-days-of-react/headings/19.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/19.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/19_wide.jpg'
date: Wed Oct 22 2016 21:29:42 GMT-0700 (PDT)
---

Yesterday, we discussed (in light detail) the reason for the Flux pattern, what is is, the different options we have available to us, as well as introduced [Redux](http://redux.js.org/).

Today, we are going to get back to code and on to adding Redux in our app. The app we're building with it right now is bare-bones simple, which will just show us the last time the page fetched the current time. For simplicity for now, we won't call out to a remote server, just using the JavaScript `Date` object.

The first thing we'll have to do to use Redux is install the library. We can use the `npm` package manager to install `redux`. In the root directory of our app we previously built, let's run the `npm install` command to install redux:

```bash
npm install --save redux
```

We'll also need to install another package that we'll use with redux, the `react-redux` that will help us tie together `react` and `redux`:

```bash
npm install --save react-redux
```

<img class="wide" src="{{ imagesDir }}/install-redux.png" />

## Configuration and setup

The next bit of work we need to do is to set up Redux inside of our app. We'll need to do the following to get it set up:

1. Define reducers
2. Create a store
3. Create action creators
4. Tie the store to our React views
5. Profit

> No promises on step 5, but it would be nice, eh?

## Precursor

We'll talk terminology as we go, so take this setup discussion lightly (implementing is more important to get our fingers moving). We'll restructure our app just slightly (annoying, I know... but this is the last time) so we can create a wrapper component to provide data down through our app.

Our app will look like:

```
[Root] -> [App] -> [Router/Routes] -> [Component]
```

Without delaying any longer, let's move our `src/App.js` into the `src/containers` directory and we'll need to update some of the paths from our imports at the same time. The new file will need to look like:

```javascript
import React from 'react';

import { 
  Router, Route, hashHistory, IndexRoute
} from 'react-router';

// We'll import the Index component from this
// src/containers directory directly
import { Index } from './Index';

// We'll load our views from the `src/views`
// directory
import Home from '../views/Home/Home';
import About from '../views/About/About';

export class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
          <Route path="/" component={Index}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
          </Route>
      </Router>
    )
  }
}

export default App;
```

In addition, we'll need to create a new container we'll call `Root` which will wrap our entire `<App />` component and make the store available to the rest of the app. Let's create the `src/containers/Root.js` file:

```bash
touch src/containers/Root.js
```

For the time being, we'll use a placeholder component here, but we'll replace this content as we talk about the store. For now, let's export _something_:

```javascript
import React from 'react';
import App from './App';

export const Root = (props) => {
  return (
    <App />
  );
}

export default Root;
```

Finally, let's update the route that we render our app in the `src/index.js` file to use our new `Root` container instead of the `App` it previously used. 

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import './index.css';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
```

Next, we'll create a redux module (just made this term up -- kind of, not really... I wrote about it [here](https://www.fullstackreact.com/articles/better-redux-module-management/)) with some action creators, a reducer function, and some types. Finally, we'll wrap this all together by creating a store and passing it down to the new `Root` component. 

I'm purposely keeping this high-level introduction short, so hang tight if that's a mouthful, it will all make more sense shortly.

Let's setup the structure to allow us to add redux. We'll do almost all of our work in a `src/redux` directory. Let's create that directory and a `src/redux/modules/` directory to create our redux modules.

```bash
mkdir -p src/redux/modules
touch src/redux/configureStore.js
touch src/redux/modules/currentTime.js
```

<img class="wide" src="{{ imagesDir }}/structure.png" />

In order to create a store, we'll use the new `src/redux/configureStore.js` to export a function which will be responsible for creating the store. 

The `src/redux/configureStore.js` file will need to export a function that will return a redux store. The `redux` package exports a function called `createStore` which will create the actual store for us, so let's open up the `src/redux/configureStore.js` file and export a function (we'll define shortly) called `configureStore()` and import the `createStore` helper:

```javascript
import {createStore} from 'redux';

export const configureStore = () => {
  // Return the store
}

export default configureStore;
```

We don't actually return anything in our store quite yet, so let's actually create the `redux` store using the `createStore` function we imported from redux:

```javascript
import {createStore} from 'redux';

export const configureStore = () => {
  const store = createStore();

  return store;
}

export default configureStore;
```

If we load our page in the browser, we'll see we have one giant error and no page gets rendered.

<img class="wide" src="{{ imagesDir }}/no-reducer.png" />

The error redux is giving us is telling us that we don't have a reducer inside our store. Without a reducer, it won't know what to do with actions or how to create the state, etc. In order to move beyond this error, we'll need to define some reducers:

## Reducers

The term `reducer` is just a fancy way of saying functions that return state. When we talk about a reducer, we are talking about this single function that gets executed when an action is fired. It can either handle the action (i.e. create a new state for it's piece of the state tree) or not handle it and return the original state.

The reducer function receives two arguments when it's called:

1. The `state` tree
2. The `action` which triggered a change

For now, let's create an empty reducer function that _always_ returns the current state. Let's open up our `src/redux/modules/currentTime.js` file. We'll use this file to manage the data we'll keep as the `time` data as well as any actions we have that relate to time.

Inside the file, let's export a `reducer` function that (for now) returns the initial state. 

Let's define this function. Using ES6, we can also set the initial state for the first time the reducer is called (which redux expects us to return an initial state):

```javascript
const initialState = {
  currentTime: new Date()
}

export const reducer = (state = initialState, action) => {
  return state;
}
```

> This simple reducer function simply returns the `initialState` object everytime it is called as the ES6 syntax for a default argument is set to `initialState`. The first time the reducer function is called, it will set the `state` value to the `initialState` value. The next time it's run, the `state` variable will be set to `initialState`.

With the reducer in-hand, we can update the `src/redux/configureStore.js` file to use the reducer we just created.

```javascript
import {createStore} from 'redux';
// import all the exports in `currentTime`
// to an object called `currentTime`
import * as currentTime from './modules/currentTime';

export const configureStore = () => {
  const store = createStore(currentTime.reducer);

  return store;
}

export default configureStore;
```

## Action creators

With one-half of the equation started (the `reducers`), we'll need a way to trigger updates to the state tree. In Redux, we'll do this with an action.

Actions are POJOs (**P**lain **O**le **J**avaScript **O**bjects) that must have a `type` property to set the type of action that is being performed. The `type` property should be a string.

An _action creator_ is a function that is expected to return an action (which is easy to test).

For our app, we're adding a time listing to our home page. We'll need a way to tell our application we want to update the current time. Let's create an action creator to update the time. 

Back in the `src/redux/modules/currentTime.js` file, let's export another two objects: 

* the `type` object which exposes type constants
* an _actions_ object that contains the action creators.

We'll define a single action (for the time being) we'll use to trigger a fetch for the current time. We'll create the action creator as well that will return a simple action object with a single type of `FETCH_NEW_TIME`:

```javascript
export const types = {
  'FETCH_NEW_TIME': 'FETCH_NEW_TIME'
};
const initialState = {
  currentTime: new Date()
}
// ...
export const actions = {
  updateTime: () => ({type: types.FETCH_NEW_TIME})
}
```

Now, we can call these `actions` anytime we want, but nothing will happen without us _binding_ the action creators to the `store.dispatch` function of our app. 

The simplest way we can export these actions while binding them to the `store` is to modify our `src/redux/configureStore.js` function to return an object with a bound-actions object. This is pretty easy to accomplish using the `bindActionCreators` method exported by `redux` and by virtue of the way we set up our app structure.

In the `configureStore` function, let's import the `bindActionCreators`. We'll call this function against the `actions` we exported from `./src/redux/modules/currentTime.js` and the `store.dispatch` function, like so:

```javascript
import {createStore, bindActionCreators} from 'redux';
import * as currentTime from './modules/currentTime';

export const configureStore = () => {
  const store = createStore(currentTime.reducer);

  const actions = {
    currentTime: bindActionCreators(
                  currentTime.actions, 
                  store.dispatch)
  }

  // Export an object with `store` and `actions`
  return {store, actions};
}

export default configureStore;
```

## Hooking up the store to the view

Let's complete updating the `Root` wrapper component we previously created by using the `Provider` component exported by `react-redux`. 

The `Provider` component makes the store available to all of our container components in our application without needing for us to need to pass it in manually every time. 

The `Provider` component expects a `store` prop that it expects to be a valid redux store. We'll _also_ want to send down our bound actions to our child components, so they can call these actions at any point in the component tree.

Let's pass the `actions` to our `App` component, while sending the `store` to the `Provider` component. In the `src/containers/Root.js` file, let's update it to accept the `actions` and `store` we'll pass in when we bootstrap our app:

```javascript
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

// Using ES6 destructuring of the `props`
// variable so we just get the values of `store`
// and `actions`:
export const Root = ({store, actions}) => {
  return (
    <Provider store={store}>
      <App actions={actions} />
    </Provider>
  );
}

export default Root;
```

Finally, let's update the `src/index.js` where we bootstrap our app to call the `configureStore` function to create the store and fetch the actions. In the `src/index.js` file, let's update:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import './index.css';

// Create redux store
import configureStore from './redux/configureStore';
const {store, actions} = configureStore();

ReactDOM.render(
  <Root store={store} actions={actions} />,
  document.getElementById('root')
);
```

Phew! That's a lot! We don't quite have it to the point where we can share these `actions` object to our views yet. In order to send them down the child component chain, we'll need to update the way that our `<Router />` element creates components so that we can add the `actions` to it's child element's `props`.

In order to do this universally for all our routed components, we can provide a function to the `<Router />` which it will use to create the component elements. The `createElement` prop is expected to return a React node as it's passed in as the first argument (the second being the `props` it is called with).

Let's update our `src/containers/App.js` file to include this `createElement()` function:

```javascript
// ...
export class App extends React.Component {
  render() {
    const createElement = (Component, props) => {
      return <Component 
              actions={this.props.actions}
              {...props} />
    }
    return (
      <Router
        history={hashHistory}
        {/* Create element function */}
        createElement={createElement}>
          <Route path="/" component={Index}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
          </Route>
      </Router>
    )
  }
}

export default App;
```

Now each child `Route` in the view will get access to the `actions` object we created. 

## Connecting the view

Everything in our app is set-up to use Redux without _too_ much overhead. One more convenience that `redux` (through `react-redux`) offers is a way to _bind_ pieces of the state tree to different components using the `connect()` export.

The `connect()` function returns a function that expects the 1st argument to be that of a component. In code, it's not as confusing as it sounds. Let's update the `export default Home` line in the `src/views/Home` (where we'll want to show the currentTime value) to connect the `currentTime` branch of our single-state tree to the `<Home />` view (which is passed through as `props` to the component):

```javascript
import React from 'react';
import {connect} from 'react-redux';

export const Home = (props) => {
  return (
    <div className="content">
      <h1>Welcome home!</h1>
      <p>This is the home page</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime
  }
}
export default connect(
  mapStateToProps
)(Home);
```

This `connect()` function will then _automatically_ pass any of the keys in the function's first argument as `props` to the `Home` component. 

In our demo's case, the `currentTime` prop in the `Home` component will be mapped to the state tree key at `currentTime`. Let's update the `Home` component to show the value in the `currentTime`:

```javascript
import React from 'react';
import {connect} from 'react-redux';

export const Home = (props) => {
  return (
    <div className="content">
      <h1>Welcome home!</h1>
      <p>The time is {currentTime.toString()}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime
  }
}
export default connect(
  mapStateToProps
)(Home);
```

<img class="wide" src="{{ imagesDir }}/home-time.png" />

<div id="demo1"></div>

Although this demo isn't very interesting, it shows we have our `Redux` app set up with our `data` committed to the global state and our view components mapping the data.

Tomorrow we're going to start triggering updates into our global state as well as work through combining multiple redux modules together. 
