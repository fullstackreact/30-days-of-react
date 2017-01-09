---
page_id: 30-days-of-react/day-21
series: 30-days-of-react
permalink: day-21
title: Redux Middleware
description: Today, we're looking at the Redux method of managing complex state changes in our code using Redux middleware.
articleEntry: '30-days/21'
hero_image: /assets/images/series/30-days-of-react/headings/21.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/21.jpg
codeRoot: '__FILE_PATH__/code/21'
imagesDir: '../../../assets/images/series/30-days-of-react/21'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/21_wide.jpg'
date: Wed Oct 24 2016 21:29:42 GMT-0700 (PDT)
---

Yesterday we connected the dots with Redux, from working through reducers, updating action creators, and connecting Redux to React components. **Redux middleware** unlocks even more power which we'll touch on today.

## Redux middleware

Middleware generally refers to software services that "glue together" separate features in existing software. For Redux, middleware provides a third-party extension point between dispatching an action and handing the action off to the reducer:

[ Action ] <-> [ Middleware ] <-> [ Dispatcher ]

Examples of middleware include logging, crash reporting, routing, handling asynchronous requests, etc.

Let's take the case of handling asynchronous requests, like an HTTP call to a server. Middleware is a great spot to do this.

## Our API middleware

We'll implement some middleware that will handle making asynchronous requests on our behalf.

> **[redux-modules](https://github.com/fullstackreact/redux-modules)**
>
> While we go through the exercise of building our own middleware in this article, the library [redux-modules](https://github.com/fullstackreact/redux-modules) provides this middleware out of the box.

Middleware sits between the action and the reducer. It can listen for all dispatches and execute code with the details of the action.

Continuing with our `currentTime` redux module, let's build our middleware to fetch the current time from the server we used a few days ago to actually GET the time from the API service.

Middleware is basically a function that accepts the `store`, which is expected to return a function that accepts the `next` function, which is expected to return a function which accepts an action. Confusing? Let's look at what this means.

## The simplest middleware possible

Let's build the smallest middleware we possibly can to understand exactly what's happening and how to add it to our stack. Let's open up `src/redux/configureStore.js` and import the `applyMiddleware` function from `redux`:

```javascript
import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware
} from 'redux';

// Modules
import * as currentTime from './modules/currentTime';
import * as currentUser from './modules/currentUser';
// ...
```

Now the signature of middleware looks like this:

```javascript
const loggingMiddleware = (store) => (next) => (action) => {
  // Our middleware
}
```

Befuddled about this middleware thing? Don't worry, we all are the first time we see it. Let's peel it back a little bit and destructure what's going on. That `loggingMiddleware` description above could be rewritten like the following:

```javascript
const loggingMiddleware = function(store) {
  // Called when calling applyMiddleware so
  // our middleware can have access to the store

  return function(next) {
    // next is the following action to be run
    // after this middleware

    return function(action) {
      // finally, this is where our logic lives for
      // our middleware.
    }
  }
}
```

We don't need to worry about _how_ this gets called, just that it does get called in that order. Let's enhance our `loggingMiddleware` so that we do actually log out the action that gets called:

```javascript
const loggingMiddleware = (store) => (next) => (action) => {
  // Our middleware
  console.log(`Redux Log:`, action)
  // call the next function
  next(action);
}
```

Now every time an action is called, we'll get a `console.log` with the details of the action.

To _apply_ middleware, we can call this `applyMiddleware()` function in the `createStore()` method. In our `src/redux/configureStore.js` file, let's update the store creation by adding a call to `applyMiddleware()`:

```javascript
const store = createStore(
  reducer,
  applyMiddleware(loggingMiddleware)
);
```

Now our middleware is in place. Open up the console in your browser to see all the actions that are being called for this demo. Try clicking on the `Update` button with the console open...

<div id="demo1"></div>

As we've seen, middleware gives us the ability to insert a function in our Redux action call chain. Inside that function, we have access to the action, state, and we can dispatch other actions.

We want to write a middleware function that can handle API requests. We can write a middleware function that listens only to actions corresponding to API requests. Our middleware can "watch" for actions that have a special marker. For instance, we can have a `meta` object on the action with a `type` of `'api'`. We can use this to ensure our middleware does not handle any actions that are not related to API requests:

```javascript
const apiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }

  // This is an api request
}
```

If an action does have a meta object with a type of `'api'`, we'll pick up the request in the `apiMiddleware`.

Let's convert our `actions.currentTime.updateTime()` method into an API request. Let's open up the `currentTime` redux module we've been working with (in `src/redux/modules/currentTime.js`) and find the `actions.updateTime()` function definition.

Let's pass in the URL to our `meta` object for this request. We can even accept parameters from inside the call to the action creator:

```javascript
// ...
const host = 'https://fullstacktime.herokuapp.com'
export const actions = {
  updateTime: ({timezone = 'pst', str='now'}) => ({
    type: types.FETCH_NEW_TIME,
    meta: {
      type: 'api',
      url: `${host}/${timezone}/${str}.json`,
      method: 'GET'
    }
  })
}
```

When we press the button to update the time, our `apiMiddleware` will catch this before it ends up in the reducer. For any calls that we catch in the middleware, we can pick apart the meta object and make requests using these options. Alternatively, we can just pass the entire sanitized `meta` object through the `fetch()` API as-is.

The steps our API middleware will have to take:

1. Find the request URL and compose request options from meta
2. Make the request
3. Convert the request to a JavaScript object
4. Respond back to Redux/user

Let's take this step-by-step. First, to pull off the `URL` and create the `fetchOptions` to pass to `fetch()`. We'll put these steps in the comments in the code below:

```javascript
const apiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }
  // This is an api request

  // Find the request URL and compose request options from meta
  const {url} = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  // Make the request
  fetch(url, fetchOptions)
    // convert the response to json
    .then(resp => resp.json())
    .then(json => {
      // respond back to the user
    })
}
```

We have several options for how we respond back to the user in the Redux chain. Personally, we prefer to respond with the same type the request was fired off without the `meta` tag and placing the response body as the `payload` of the new action. For example:

```javascript
const apiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }
  // This is an api request

  // Find the request URL and compose request options from meta
  const {url} = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  // Make the request
  fetch(url, fetchOptions)
    // convert the response to json
    .then(resp => resp.json())
    .then(json => {
      // respond back to the user
      // by dispatching the original action without
      // the meta object
      let newAction = Object.assign({}, action, {payload: json});
      delete newAction.meta;
      store.dispatch(newAction);
    })
}
```

In this way, we don't have to change our redux reducer to manage the response any differently than if we weren't making a request.

We're also not limited to a single response either. Let's say that our user passed in an `onSuccess` callback to be called when the request was complete. We could call that `onSuccess` callback and then dispatch back up the chain:

```javascript
const apiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }
  // This is an api request

  // Find the request URL and compose request options from meta
  const {url} = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  // Make the request
  fetch(url, fetchOptions)
    // convert the response to json
    .then(resp => resp.json())
    .then(json => {
      if (typeof action.meta.onSuccess === 'function') {
        action.meta.onSuccess(json);
      }
      return json; // For the next promise in the chain
    })
    .then(json => {
      // respond back to the user
      // by dispatching the original action without
      // the meta object
      let newAction = Object.assign({}, action, {payload: json});
      delete newAction.meta;
      store.dispatch(newAction);
    })
}
```

The possibilities here are virtually endless. In any case, after our middleware dispatches the original action, we need to update the reducer to accept the original action, but this time with a payload. In the `src/redux/modules/currentTime.js` file, let's update the reducer to store the payload response:

```javascript
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEW_TIME:
      return {
        ...state,
        currentTime: action.payload.dateString
      };
    default:
      return state;
  }
}
```

<div id="demo2"></div>

Notice that we didn't have to change _any_ of our view code to update how the data was populated in the state tree. Pretty nifty, eh?

This middleware is pretty simplistic, but it's a good solid basis for building it out. Can you think of how you might implement a caching service, so that we don't need to make a request for data we already have? How about one to keep track of pending requests, so we can show a spinner for requests that are outstanding?

Awesome! Now we really are Redux ninjas. We've conquered the Redux mountain and are ready to move on to the next step. Before we head there, however... pat yourself on the back. We've made it through week 3!
