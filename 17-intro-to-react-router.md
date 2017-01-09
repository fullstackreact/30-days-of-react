---
page_id: 30-days-of-react/day-17
series: 30-days-of-react
permalink: day-17
title: Client-side Routing
description: Most, if not all of our applications will have multiple views in our single-page application. Let's dive right into creating multiple views for our applications using React Router.
articleEntry: '30-days/17'
hero_image: /assets/images/series/30-days-of-react/headings/17.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/17.jpg
imagesDir: '../../../assets/images/series/30-days-of-react/17'
codeRoot: '__FILE_PATH__/code/17'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/17_wide.jpg'
date: Wed Oct 20 2016 21:29:42 GMT-0700 (PDT)
---

We've made it through 16 days already! Pat yourself on the back... but not for too long... there is still a lot more. 

Right now, our app is limited to a single page. It's pretty rare to find any complex application that shows a single view. For instance, an application might have a login view where a user can log in or a search results page that shows a user a list of their search results. These are two different views with two different page structures. 

Let's see how we can change that with our app today.

We'll use the very popular [react-router](https://github.com/reactjs/react-router) library for handling different links. In order to use the `react-router` library, we'll need to install it using the `npm` package manager:

```bash
npm install --save react-router
```
<img class="wide" src="{{ imagesDir }}/install-react-router.png" />

With `react-router` installed, we'll import a few packages from the library and update our app architecture. Before we make those updates, let's take a step back and from a high level look at _how_ and _why_ we architect our application this way.

Conceptually with React, we've seen how we can create tree structures using components and nested components. Using this perspective with a single page app with routes, we can think of the different parts of a page as children. Routing in a single page app from this perspective is the idea that we can take a part of a subtree and switch it out with another subtree. We can then _dynamically_ switch out the different trees in the browser.

In _other_ words, we'll define a React component that acts as a _root_ component of the routable elements. We can then tell React to change a view, which can just swap out an entire React component for another one as though it's a completely different page rendered by a server.

We'll take our `App` component and define all of the different routes we can make in our app in this `App` component. We'll need to pull some components from the `react-router` package. These components we'll use to set up this structure are as follows:

#### `<Router />`

This is the component we'll use to define the _root_ or the routing tree. The `<Router />` component is the component where React will replace it's children on a per-route basis. 

#### `<Route />`

We'll use the `<Route />` component to create a route available at a specific location available at a url. The `<Route />` component is mounted at page URLs that match a particular route set up in the route's configuration `props`.

#### `hashHistory`

There are several methods for handling client-side routing. Newer browsers are built with a _browser history_, which handles client-side defined routing in JavaScript. 

One older, compatible way of handling client-side navigation is to use the `#` (hash) mark denoting the application endpoint. We'll use this method. We'll need this object imported to tell the browser this is how we want to handle our navigation.

From the app we created a few days ago's root directory, let's update our `src/App.js` to import these modules:

```javascript
import React from 'react';
import './App.css';

import { Router, Route, hashHistory } from 'react-router'

export class App extends React.Component {
  render() {
    // ...
  }
}

export default App;
```

Now let's define the routing root in the DOM using the `<Router />` component we imported in the `render()` function. We'll define the type of routing we are using using the `history` prop. In this example, we'll use the universally-compatible hash history type: 

```javascript
import { Router, Route, hashHistory } from 'react-router'

export class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        {/* routes will go here */}
      </Router>
    )
  }
}
```

Now let's define our first route. To define a route, we'll use the `<Route />` component export from `react-router` and pass it a few props:

* `path` - The path for the route to be active
* `component` - The component that defines the view of the route

Let's define the a route at the root path `/` with a stateless component that just displays some static content:

```javascript
const Home = () => (<div><h1>Welcome home</h1></div>)

export class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home} />
      </Router>
    )
  }
}
```

<div id="demo1"></div>

Loading this page in the browser, we can see we get our single route at the root url. Not very exciting. Let's add a second route that shows an about page at the `/about` URL.

```javascript
const Home = () => (<div><h1>Welcome home</h1></div>)
const About = () => (<div><h1>About</h1></div>)

export class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    )
  }
}
```

In our view we'll need to add a link (or an anchor tag -- `<a />`) to enable our users to travel freely between the two different routes. 

Wouldn't it be nice to have a common heading between the two? Another way of saying that is wouldn't it be nice to contain the two routes within another component that adds the links between the two?

### Nesting routes

One nice feature of the `react-router` is it's ability to build a heirarchy of routes so that one route can build upon another. 

Let's say we have a common header that we want to render with both routes. We can place a `<Header />` component in the parent component and then render each of the routes inside this new component. 

Let's create a container component for the two routes. Personally, I like to create a new directory to handle these containers, so let's add one to our generated app. In a terminal window at the root of our generated app, let's run the following to create the directory and our `<Index />` container object:

```bash
mkdir src/containers
touch src/containers/Index.js
```

Let's create a container component inside our new `src/containers/Index.js` file. In order to show our routes, we'll need to show the children of the routes.

#### Children prop

As we've discussed, React supports a nested tree structure, which allows us to build these complex layouts with multiple children. Within a single element, we can get _access_ to the content underneath a component through the `this.props.children` prop.

Using this prop allows us to display the routes inside our new `Index` component using the `{this.props.children}` in the `render()` function. Inside the new `src/containers/Index.js` file, let's populate it with:

```javascript
import React from 'react';

export class Index extends React.Component {
  render() {
    return (
      <div className="app">
        <h2>Container goes here</h2>
        <div className="page">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Index;
```

Using `this.props.children`, the `Index` container component can now be used as a wrapper component for our routes. Let's update the `src/App.js` page to use our new `Index` component. We'll nest the `<Index />` container component using a `<Router />` component at a URL we want it to wrap. For the following example, any route that's under the root `/` route will be wrapped with the `<Index />` component:

```javascript
import { Index } from './containers/Index';

const Home = () => (<div><h1>Welcome home</h1></div>)
const About = () => (<div><h1>About</h1></div>)

export class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}>
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
        </Route>
      </Router>
    )
  }
}
```

And if we load this in our browser...

<div id="demo2"></div>

Uh oh... it doesn't show any route yet. We need to tell `react-router` what our default link is for the path at `/`. We can do this by adding a `IndexRoute` export from `react-router`. Let's update our `src/App.js` one more time by defining an `IndexRoute` inside our nested index component:

```javascript
import { 
  Router, Route, hashHistory, IndexRoute
} from 'react-router';
import { Index } from './containers/Index';

const Home = () => (<div><h1>Welcome home</h1></div>)
const About = () => (<div><h1>About</h1></div>)

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
```

Back in our browser, we have the `Home` component being rendered nicely as the initial route.

<div id="demo3"></div>

## Navigation

Let's actually implement a navigation bar to use in the `Index` component. 

In order to do that, we'll need to use one more export from the `react-router` package, the `Link` component. The `Link` component takes a `to` prop to define which route we want the link to route our user. 

Let's add a `Navbar` component to our app. Inside of the root directory where we created our react app, let's add the `components/Nav` directory and create a `Navbar.js` file inside of there to export our Navbar:

```bash
mkdir -p src/components/Nav
touch src/components/Nav/Navbar.js
```

Inside this new file, we'll use the `Link` export from `react-router` and make the two links of `home` and `about`:

```javascript
import React from 'react';
import { Link } from 'react-router';

export const Navbar = () => (
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
  </div>
);

export default Navbar;
```

We can add this `Navbar` component to our `Index` component from before to display a common navigation bar at the top underneath the root route.

Let's import this `Navbar` component inside our `Index` component and render it along with the rest of the content:

```javascript
import React from 'react';
import {Navbar} from '../components/Nav/Navbar';

export class Index extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="page">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Index;
```

In the browser, these links will now render with the links defined:

<div id="demo4"></div>

> ## A `views/` directory
>
> Even though our views are stateless component functions, we gain a lot of separation by breaking these views into their own files.
> 
> We'll refer to these other files in future iterations of our app, so if you'd like to keep them similar, we can break them out into their own files.
>
> ```bash
> mkdir -p src/views/{Home,About}
> touch src/views/Home/Home.js
> touch src/views/About/About.js
> ```
> 
> Update the content of these two files with the export of the function defining the component. I.e. the `src/views/Home/Home.js` file should include the route:
>
> ```javascript
> export const Home = () => (
>   <div><h1>Welcome home</h1></div>
> );
> export default Home;
> ```

Now we have multiple pages in our application. We've looked at how we can render these routes through nested components with just a few of the exports from `react-router`. 

`react-router` provides so much more functionality that we don't have time to cover in our brisk intro to routing. More information is available at:

* [https://github.com/reactjs/react-router/tree/master/docs](https://github.com/reactjs/react-router/tree/master/docs)
* [fullstack react routing](https://fullstackreact.com)

Tomorrow, we're going to be starting integration with Redux. Here's where we start integrating more complex data handling.
