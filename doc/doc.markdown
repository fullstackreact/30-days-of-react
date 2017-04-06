---
page_id: 30-days-of-react/day-15
series: 30-days-of-react
permalink: day-15
day: 15
title: Introduction to Promises
description: Today, we're going to look at what we need to know to understand Promises from a high-level, so we can build our our applications using this incredibly useful concept.
dayDir: '15'
hero_image: /assets/images/series/30-days-of-react/headings/15.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/15.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/15_wide.jpg'
date: Wed Oct 18 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

[Yesterday](/articles/30-days-of-react-day-14/) we installed the `fetch` library into our `create-react-app` project we started on [day 12](/articles/30-days-of-react-day-12/). Today we'll pick up from yesterday discussing the concept and the _art_ of [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## What is a promise

As defined by the Mozilla, a `Promise` object is used for handling asynchronous computations which has some important guarantees that are difficult to handle with the callback method (the more old-school method of handling asynchronous code). 

A `Promise` object is simply a wrapper around a value that may or may not be known when the object is instantiated and provides a method for handling the value _after_ it is known (also known as `resolved`) or is unavailable for a failure reason (we'll refer to this as `rejected`). 

Using a `Promise` object gives us the opportunity to associate functionality for an asynchronous operation's eventual success or failure (for whatever reason). It also allows us to treat these complex scenarios by using synchronous-like code.

For instance, consider the following synchronous code where we print out the current time in the JavaScript console:

```javascript
var currentTime = new Date();
console.log('The current time is: ' + currentTime);
```

This is pretty straight-forward and works as the `new Date()` object represents the time the browser knows about. Now consider that we're using a different clock on some other remote machine. For instance, if we're making a Happy New Years clock, it would be great to be able to synchronize the user's browser with everyone elses using a single time value for everyone so no-one misses the ball dropping ceremony.

Suppose we have a method that handles getting the current time for the clock called `getCurrentTime()` that fetches the current time from a remote server. We'll represent this now with a `setTimeout()` that returns the time (like it's making a request to a slow API):

```javascript
function getCurrentTime() {
  // Get the current 'global' time from an API
  return setTimeout(function() {
    return new Date();
  }, 2000);
}
var currentTime = getCurrentTime()
console.log('The current time is: ' + currentTime);
```

Our `console.log()` log value will return the timeout handler id, which is definitely _not_ the current time. Traditionally, we can update the code using a callback to get called when the time is available:

```javascript
function getCurrentTime(callback) {
  // Get the current 'global' time from an API
  return setTimeout(function() {
    var currentTime = new Date();
    callback(currentTime);
  }, 2000);
}
getCurrentTime(function(currentTime) {
  console.log('The current time is: ' + currentTime);
});
```

What if there is an error with the rest? How do we catch the error and define a retry or error state?

```javascript
function getCurrentTime(onSuccess, onFail) {
  // Get the current 'global' time from an API
  return setTimeout(function() {
    // randomly decide if the date is retrieved or not
    var didSucceed = Math.random() >= 0.5;
    if (didSucceed) {
      var currentTime = new Date();
      onSuccess(currentTime);
    } else {
      onFail('Unknown error');
    }
  }, 2000);
}
getCurrentTime(function(currentTime) {
  console.log('The current time is: ' + currentTime);
}, function(error) {
  console.log('There was an error fetching the time');
});
```

Now, what if we want to make a request based upon the first request's value? As a short example, let's reuse the `getCurrentTime()` function inside again (as though it were a second method, but allows us to avoid adding another complex-looking function):

```javascript
function getCurrentTime(onSuccess, onFail) {
  // Get the current 'global' time from an API
  return setTimeout(function() {
    // randomly decide if the date is retrieved or not
    var didSucceed = Math.random() >= 0.5;
    console.log(didSucceed);
    if (didSucceed) {
      var currentTime = new Date();
      onSuccess(currentTime);
    } else {
      onFail('Unknown error');
    }
  }, 2000);
}
getCurrentTime(function(currentTime) {
  getCurrentTime(function(newCurrentTime) {
    console.log('The real current time is: ' + currentTime);
  }, function(nestedError) {
    console.log('There was an error fetching the second time');
  })
}, function(error) {
  console.log('There was an error fetching the time');
});
```

Dealing with asynchronousity in this way can get complex quickly. In addition, we could be fetching values from a previous function call, what if we only want to get one... there are a lot of tricky cases to deal with when dealing with values that are not yet available when our app starts.

### Enter Promises

Using promises, on the other hand helps us avoid a lot of this complexity (although is not a silver bullet solution). The previous code, which could be called spaghetti code can be turned into a neater, more synchronous-looking version:

```javascript
function getCurrentTime(onSuccess, onFail) {
  // Get the current 'global' time from an API using Promise
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      var didSucceed = Math.random() >= 0.5;
      didSucceed ? resolve(new Date()) : reject('Error');
    }, 2000);
  })
}
getCurrentTime()
  .then(currentTime => getCurrentTime())
  .then(currentTime => {
    console.log('The current time is: ' + currentTime);
    return true;
  })
  .catch(err => console.log('There was an error:' + err))
```

<div class="demo" id="demo2"></div>

This previous source example is a bit cleaner and clear as to what's going on and avoids a lot of tricky error handling/catching.

To catch the value on success, we'll use the `then()` function available on the `Promise` instance object. The `then()` function is called with whatever the return value is of the promise itself. For instance, in the example above, the `getCurrentTime()` function resolves with the `currentTime()` value (on successful completion) and calls the `then()` function on the return value (which is another promise) and so on and so forth. 

To catch an error that occurs anywhere in the promise chain, we can use the `catch()` method.

> We're using a promise chain in the above example to create a _chain_ of actions to be called one after another. 
> A promise chain sounds complex, but it's fundamentally simple. Essentially, we can "synchronize" a call to multiple asynchronous operations in succession. Each call to `then()` is called with the previous `then()` function's return value. 
>
> For instance, if we wanted to manipulate the value of the `getCurrentTime()` call, we can add a link in the chain, like so:
>
> ```javascript
> getCurrentTime()
>   .then(currentTime => getCurrentTime())
>   .then(currentTime => {
>     return 'It is now: ' + currentTime;
>   })
>   // this logs: "It is now: [current time]"
>   .then(currentTimeMessage => console.log(currentTimeMessage))
>   .catch(err => console.log('There was an error:' + err))
> ```

## Single-use guarantee

A promise only ever has one of three states at any given time:

* pending
* fulfilled (resolved)
* rejected (error)

A _pending_ promise can only ever lead to either a fulfilled state or a rejected state _once and only once_, which can avoid some pretty complex error scenarios. This means that we can only ever return a promise once. If we want to rerun a function that uses promises, we need to create a _new_ one.

## Creating a promise

We can create new promises (as the example shows above) using the `Promise` constructor. It accepts a function that will get run with two parameters:

* The `onSuccess` (or `resolve`) function to be called on success resolution
* The `onFail` (or `reject`) function to be called on failure rejection

Recalling our function from above, we can see that we call the `resolve()` function if the request succeeded and call the `reject()` function if the method returns an error condition. 

```javascript
var promise = new Promise(function(resolve, reject) {
  // call resolve if the method succeeds
  resolve(true);
})
promise.then(bool => console.log('Bool is true'))
```

Now that we know what promises are, how to use, and how to create them, we can actually get down to using the `fetch()` library we installed yesterday.
dd