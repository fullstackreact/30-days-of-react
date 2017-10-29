---
page_id: 30-days-of-react/day-20
series: 30-days-of-react
permalink: day-20
day: 20
title: Redux actions
description: With Redux in place, let's talk about how we actually modify the Redux state from within our applications.
dayDir: '20'
hero_image: /assets/images/series/30-days-of-react/headings/20.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/20.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/20_wide.jpg'
date: Wed Oct 23 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

Yesterday we went through the difficult part of integrating our React app with Redux. From here on out, we'll be defining functionality with our Redux setup.

As it stands now, we have our demo application showing the current time. But there currently isn't any way to update to the new time. Let's modify this now.

## Triggering updates

Recall that the only way we can change data in Redux is through an action creator. We created a redux store yesterday, but we haven't created a way for us to update the store.

<div id="demo1"></div>

What we _want_ is the ability for our users to update the time by clicking on a button. In order to add this functionality, we'll have to take a few steps:

1. Create an actionCreator to _dispatch_ the action on our store
2. Call the actionCreator `onClick` of an element
3. Handle the action in the reducer

We already implemented the third step, so we only have two things to do to get this functionality working as we expect.

Yesterday, we discussed what actions are, but not really why we are using this thing called actionCreators or what they are. 

As a refresher, an action is a simple object that _must_ include a `type` value. We created a `types.js` file that holds on to action type constants, so we can use these values as the `type` property.

{lang=javascript,crop-query=.FETCH_NEW_TIME}
<<[](./redux/types.js)

As a quick review, our actions can be any object value that has the `type` key. We can send data along with our action (conventionally, we'll pass extra data along as the `payload` of an action). 

```javascript
{
  type: types.FETCH_NEW_TIME,
  payload: new Date().toString()
}
```

Now we need to _dispatch_ this along our `store`. One way we could do that is by calling the `store.dispatch()` function. 

```javascript
store.dispatch({
  type: types.FETCH_NEW_TIME,
  payload: new Date().toString()
})
```

However, this is pretty poor practice. Rather than dispatch the action directly, we'll use a function to return an action... the function will _create_ the action (hence the name: actionCreator). This provides us with a better testing story (easy to test), reusability, documentation, and encapsulation of logic. 

Let's create our first `actionCreator` in a file called `redux/actionCreators.js`. We'll export a function who's entire responsibility is to return an appropriate action to dispatch on our store.

{lang=javascript,crop-query=1-EOF}
<<[](redux/actionCreators.js)

Now if we call this function, _nothing_ will happen except an action object is returned. How do we get this action to dispatch on the store?

Recall we used the `connect()` function export from `react-redux` yesterday? The first argument is called `mapStateToProps`, which maps the state to a prop object. The `connect()` function accepts a second argument which allows us to map functions to props as well. It gets called with the `dispatch` function, so here we can _bind_ the function to call `dispatch()` on the store.

Let's see this in action. In our `src/views/Home/Home.js` file, let's update our call to connect by providing a second function to use the actionCreator we just created. We'll call this function `mapDispatchToProps`.

{lang=javascript,crop-query=(choose(.fetchNewTime,0),.mapDispatchToProps,choose(.connect,2))}
<<[](views/Home/Home.js)

Now the `updateTime()` function will be passed in as a prop and will call `dispatch()` when we fire the action. Let's update our `<Home />` component so the user can press a button to update the time.

{lang=javascript,crop-query=(.Home)}
<<[](views/Home/Home.js)

<div id="demo2" class="demo"></div>

Although this example isn't that exciting, it does showcase the features of redux pretty well. Imagine if the button makes a fetch to get new tweets or we have a socket driving the update to our redux store. This basic example demonstrates the full functionality of redux.

<div id="demo2"></div>

## Multi-reducers

As it stands now, we have a single reducer for our application. This works for now as we only have a small amount of simple data and (presumably) only one person working on this app. Just imagine the headache it would be to develop with one gigantic switch statement for _every single piece of data_ in our apps...

Ahhhhhhhhhhhhhh...

Redux to the rescue! Redux has a way for us to split up our redux reducers into multiple reducers, each responsible for only a leaf of the state tree.

We can use the `combineReducers()` export from `redux` to compose an object of reducer functions. For every action that gets triggered, each of these functions will be called with the corresponding action. Let's see this in action.

Let's say that we (perhaps more realistically) want to keep track of the current user. Let's create a `currentUser` redux module in... you guessed it: `src/redux/currentUser.js`:

```bash
touch src/redux/currentUser.js
```

We'll export the same four values we exported from the `currentTime` module... of course, this time it is specific to the currentUser. We've added a basic structure here for handling a current user:

{lang=javascript,crop-query=1-EOF}
<<[](redux/currentUser.js)

Let's update our `configureStore()` function to take these branches into account, using the `combineReducers` to separate out the two branches

{lang=javascript,crop-query=1-EOF}
<<[](redux/configureStore.js)

Now we can create the `login()` and `logout()` action creators to send along the action on our store.

{lang=javascript,crop-query=(.login,.logout)}
<<[](redux/actionCreators.js)

Now we can use the actionCreators to call `login` and `logout` just like the `updateTime()` action creator. 

Phew! This was another hefty day of Redux code. Today, we completed the circle between data updating and storing data in the global Redux state. In addition, we learned how to extend Redux to use multiple reducers and actions as well as multiple connected components.

However, we have yet to make an asynchronous call for off-site data. Tomorrow we'll get into how to use middleware with Redux, which will give us the ability to handle fetching remote data from within our app and still use the power of Redux to keep our data.

Good job today and see you tomorrow!
