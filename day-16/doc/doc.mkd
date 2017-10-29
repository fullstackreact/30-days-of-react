---
page_id: 30-days-of-react/day-16
series: 30-days-of-react
permalink: day-16
day: 16
title: Displaying Remote Data
description: Our front-end applications are only as interesting as the data we display in them. Today, let's actually start making a request for data and get it integrated into our app.
dayDir: '16'
hero_image: /assets/images/series/30-days-of-react/headings/16.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/16.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/16_wide.jpg'
date: Wed Oct 19 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

As of today, we've worked through promises, built our app using the `npm` packager, installed our remote object fetching library (`whatwg-fetch`) and we're finally ready to integrate remote data into our application.

## Fetching data

Let's get into using the `fetch` library we installed on [day 14](/articles/30-days-of-react/14-ajax). 

For simplicity purposes, let's break out our demo from yesterday where we fetched the current time from an API server:

<div class="demo" id="demo1"></div>

This demo react component makes a request to the API server and reports back the current time from it's clock. Before we add the call to fetch, let's create a few stateful components we'll use to display the time and update the time request.

> #### Walls of code warning
>
> We realize the next few lines are _walls of code_, which we generally try to avoid, especially without discussing how they work. However, since we're not talking about how to create a component in detail here, yet we still want to fill out a complete component, we've made an exception.
>
> Please leave us feedback (links at the bottom) if you prefer us to change this approach for today.

First, the basis of the wrapper component which will show and fetch the current time looks like the following. Let's copy and paste this code into our app at `src/App.js`:

{lang=javascript,crop-query=1-EOF}
<<[](BlankApp.js)

The previous component is a basic stateful React component as we've created. Since we'll want to show a form, we've included the intended usage of the `TimeForm` let's create next. 

Let's create this component in our react app using `create-react-app`. Add the file `src/TimeForm.js` into our project:

```bash
touch src/TimeForm.js
```

Now let's add content. We'll want our `TimeForm` to take the role of allowing the user to switch between timezones in their browser. We can handle this by creating a _stateful_ component we'll call the `TimeForm`. Our `TimeForm` component might look like the following:

{lang=javascript,crop-query=1-EOF}
<<[](TimeForm.js)

With these Components created, let's load up our app in the browser after running it with `npm start` and we'll see our form (albeit not incredibly beautiful yet). Of course, at this point, we won't have a running component as we haven't implemented our data fetching. Let's get to that now.

<div class="demo" id="demo2"></div>

### Fetching data

As we said yesterday, we'll use the `fetch()` API with promise support. When we call the `fetch()` method, it will return us a promise, where we can handle the request however we want. We're going to make a request to our now-based API server (so start-up might be slow if it hasn't been run in a while).

We're going to be building up the URL we'll request as it represents the time query we'll request on the server. 

I've already defined the method `getApiUrl()` in the `App` component, so let's fill that function in.

The chronic api server accepts a few variables that we'll customize in the form. It will take the timezone to along with a chronic message. We'll start simply and ask the chronic library for the `pst` timezone and the current time (`now`):

{lang=javascript,crop-query=(firstLineOf(.App),.App.constructor,choose(.App.getApiUrl, 1),lastLineOf(.App))}
<<[](App.js)

Now, when we call `getApiUrl()`, the URL of the next request will be returned for us. Now, finally, let's implement our `fetch()` function. The `fetch()` function accepts a few arguments that can help us customize our requests. The most basic `GET` request can just take a single URL endpoint. The return value on `fetch()` is a promise object, that we explored in-depth yesterday. 

Let's update our `fetchCurrentTime()` method to fetch the current time from the remote server. We'll use the `.json()` method on the response object to turn the body of the response from a JSON object into JavaScript object and then update our component by setting the response value of the `dateString` as the `currentTime` in the component state:

{lang=javascript,crop-query=(firstLineOf(.App),.App.fetchCurrentTime,lastLineOf(.App))}
<<[](App.js)

The final piece of our project today is getting the data back from the form to update the parent component. That is, when the user updates the values from the `TimeForm` component, we'll want to be able to access the data in the `App` component. The `TimeForm` component already handles this process for us, so we just need to implement our form functions.

When a piece of state changes on the form component, it will call a prop called `onFormChange`. By defining this method in our `App` component, we can get access to the latest version of the form.

In fact, we'll just call `setState()` to keep track of the options the form allows the user to manipulate:

{lang=javascript,crop-query=(firstLineOf(.App),choose(.App.handleChange, 0),lastLineOf(.App)),gapFiller="\n\n// ...\n"}
<<[](App.js)

Finally, when the user submits the form (clicks on the button _or_ presses enter in the input field), we'll want to make another request for the time. This means we can define our `handleFormSubmit` prop to just call the `fetchCurrentTime()` method:

{lang=javascript,crop-query=(firstLineOf(.App),choose(.App.handleFormSubmit, 0),lastLineOf(.App)),gapFiller="\n\n// ...\n"}
<<[](App.js)

<div id="demo3"></div>

Try playing around with the demo and passing in different chronic options. It's actually quite fun.

In any case, today we worked on quite a bit to get remote data into our app. However, at this point, we only have a single page in our single page app. What if we want to show a different page in our app? Tomorrow, we're going to start adding multiple pages in our app so we can feature different views.
