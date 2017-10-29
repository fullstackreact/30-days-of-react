---
page_id: 30-days-of-react/day-17
series: 30-days-of-react
permalink: day-17
day: 17
title: Client-side Routing
description: Most, if not all of our applications will have multiple views in our single-page application. Let's dive right into creating multiple views for our applications using React Router.
dayDir: '17'
hero_image: /assets/images/series/30-days-of-react/headings/17.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/17.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/17_wide.jpg'
date: Wed Oct 20 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

We've made it through 16 days already! Pat yourself on the back... but not for too long... there is still a lot more. 

Right now, our app is limited to a single page. It's pretty rare to find any complex application that shows a single view. For instance, an application might have a login view where a user can log in or a search results page that shows a user a list of their search results. These are two different views with two different page structures. 

Let's see how we can change that with our app today.

We'll use the very popular [react-router](https://github.com/reactjs/react-router) library for handling different links. In order to use the `react-router` library, we'll need to install it using the `npm` package manager:

```bash
npm install --save react-router-dom
```
<img class="wide" src="{{ imagesDir }}/install-react-router.png" />

With `react-router` installed, we'll import a few packages from the library and update our app architecture. Before we make those updates, let's take a step back and from a high level look at _how_ and _why_ we architect our application this way.

Conceptually with React, we've seen how we can create tree structures using components and nested components. Using this perspective with a single page app with routes, we can think of the different parts of a page as children. Routing in a single page app from this perspective is the idea that we can take a part of a subtree and switch it out with another subtree. We can then _dynamically_ switch out the different trees in the browser.

In _other_ words, we'll define a React component that acts as a _root_ component of the routable elements. We can then tell React to change a view, which can just swap out an entire React component for another one as though it's a completely different page rendered by a server.

We'll take our `App` component and define all of the different routes we can make in our app in this `App` component. We'll need to pull some components from the `react-router` package. These components we'll use to set up this structure are as follows:

#### `<BrowserRouter />` / `<Router />`

This is the component we'll use to define the _root_ or the routing tree. The `<BrowserRouter />` component is the component where React will replace it's children on a per-route basis. 

#### `<Route />`

We'll use the `<Route />` component to create a route available at a specific location available at a url. The `<Route />` component is mounted at page URLs that match a particular route set up in the route's configuration `props`.

One older, compatible way of handling client-side navigation is to use the `#` (hash) mark denoting the application endpoint. We'll use this method. We'll need this object imported to tell the browser this is how we want to handle our navigation.

From the app we created a few days ago's root directory, let's update our `src/App.js` to import these modules. We'll import the `BrowserRouter` using a different name syntax via ES6:

{lang=javascript,crop-query=1-.App,firstLineOf(.App),lastLineOf(.App)}
<<[](App.js)

Now let's define the routing root in the DOM using the `<Router />` component we imported in the `render()` function. We'll define the type of routing we are using using the `history` prop. In this example, we'll use the universally-compatible hash history type: 

{lang=javascript,crop-query=(firstLineOf(.App),.App.render,lastLineOf(.App))}
<<[](App.js)

Now let's define our first route. To define a route, we'll use the `<Route />` component export from `react-router` and pass it a few props:

* `path` - The path for the route to be active
* `component` - The component that defines the view of the route

Let's define the a route at the root path `/` with a stateless component that just displays some static content:

{lang=javascript,crop-query=(.Home,firstLineOf(.App),.App.render,lastLineOf(.App))}
<<[](SimpleRouter.js)

<div class="demo" id="demo1"></div>

Loading this page in the browser, we can see we get our single route at the root url. Not very exciting. Let's add a second route that shows an about page at the `/about` URL.

{lang=javascript,crop-query=(.Home,firstLineOf(.App),.App.render,lastLineOf(.App))}
<<[](TwoRoutes.js)

<div class="demo" id="demo2"></div>

In our view we'll need to add a link (or an anchor tag -- `<a />`) to enable our users to travel freely between the two different routes. However, using the `<a />` tag will tell the browser to treat the route like it's a server-side route. Instead, we'll need to use a different component (surprise) called: `<Link />`.

The `<Link />` component requires a prop called `to` to point to the client-side route where we want to render. Let's update our `Home` and `About` components to use the `Link`:

{lang=javascript,crop-query=(.Home,.About)}
<<[](TwoLinkedRoutes.js)

<div class="demo" id="demo3"></div>

Wait a minute... we don't quite want _both_ routes to show up... This happens because the react router will render _all_ content that matches the path (unless otherwise specified). For this case, react router supplies us with the `Switch` component. 

The `<Switch />` component will _only render the first matching route_ it finds. Let's update our component to use the `Switch` component. As react router will try to render _both_ components, we'll need to specify that we only want an `exact` match on the root component. 

{lang=javascript,crop-query=(.Home,firstLineOf(.App),.App.render,lastLineOf(.App))}
<<[](TwoLinkedSingleRoutes.js)

<div class="demo" id="demo4"></div>

### Showing views

Althogh this is a limited introduction, we could not leave the discussion of dealing with react router without talking about the different ways we can get subcomponents to render.

We've already seen the simplest way possible, using the `component` prop, however there is a more powerful method using a prop called `render`. The `render` prop is expected to be a function that will be called with the `match` object along with the `location` and route configuration. 

The `render` prop allows us to render _whatever_ we want in a subroute, which includes rendering other routes. Nifty, ey? Let's see this in action:

{lang=javascript,crop-query=(.Home,.About,firstLineOf(.App),.App.render,lastLineOf(.App))}
<<[](TwoLinkedSingleRenderedRoutes.js)

<div class="demo" id="demo5"></div>

Now we have multiple pages in our application. We've looked at how we can render these routes through nested components with just a few of the exports from `react-router`. 

`react-router` provides so much more functionality that we don't have time to cover in our brisk intro to routing. More information is available at:

* [https://github.com/reactjs/react-router/tree/master/docs](https://github.com/reactjs/react-router/tree/master/docs)
* [fullstack react routing](https://fullstackreact.com)

Tomorrow, we're going to be starting integration with Redux. Here's where we start integrating more complex data handling.
