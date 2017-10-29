---
page_id: 30-days-of-react/day-3
series: 30-days-of-react
permalink: day-3
title: Our First Components
description: >-
  The first two articles in this series were heavy on discussion. In today's
  session, let's dive into some code and write our first React app.
hero_image: /assets/images/series/30-days-of-react/headings/3.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/3.jpg
dayDir: '03'
introBannerUrl: /assets/images/series/30-days-of-react/headings/3_wide.jpg
date: 'Thu Oct 06 2016 21:29:42 GMT-0700 (PDT)'
day: 3
imagesDir: /assets/images/series/30-days-of-react/day-3
includeFile: ./../_params.yaml
---

Let's revisit the "Hello world" app we introduced on day one. Here it is again, written slightly differently:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello world</title>
  <!-- Script tags including React -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    var app = <h1>Hello world</h1>
    var mountComponent = document.querySelector('#app');
    ReactDOM.render(app, mountComponent);
  </script>
</body>
</html>
```

<div id="demo1"></div>

### Loading the React library

We've included the source of React as a `<script>` tag inside the `<head>` element of our page. It's important to place our `<script>` loading tags _before_ we start writing our React application otherwise the `React` and `ReactDOM` variables won't be defined in time for us to use them.

Also inside `head` is a `script` tag that includes a library, `babel-core`. But what is `babel-core`?

### Babel

Yesterday, we talked about ES5 and ES6. We mentioned that support for ES6 is still spotty. In order to use ES6, it's best if we transpile our ES6 JavaScript into ES5 JavaScript to support more browsers.

**Babel** is a library for transpiling ES6 to ES5.

Inside `body`, we have a `script` body. Inside of `script`, we define our first React application. Note that the `script` tag has a `type` of `text/babel`:

```html
<script type="text/babel">
```

This signals to Babel that we would like it to handle the execution of the JavaScript inside this `script` body, this way we can write our React app using ES6 JavaScript and be assured that Babel will live-transpile its execution in browsers that only support ES5.

> ## Warning in the console?
>
> When using the `babel-standalone` package, we'll get a warning in the console. This is fine and expected. We'll switch to a precompilation step in a few days.
>
> We've included the `<script />` tag here for ease of use.

### The React app

Inside the Babel `script` body, we've defined our first React application. Our application consists of a single element, the `<h1>Hello world</h1>`. The call to `ReactDOM.render()` actually places our tiny React application on the page. Without the call to `ReactDOM.render()`, nothing would render in the DOM. The first argument to `ReactDOM.render()` is _what_ to render and the second is _where_:

```
ReactDOM.render(<what>, <where>)
```

We've written a React application. Our "app" is a React element which represents an `h1` tag. But this isn't very interesting. Rich web applications accept user input, change their shape based on user interaction, and communicate with web servers. Let's begin touching on this power by building our first React component.

## Components and more

We mentioned at the beginning of this series that at the heart of all React applications are _components_. The best way to understand React components is to write them. We'll write our React components as ES6 classes.

Let's look at a component we'll call `App`. Like all other React components, this ES6 class will extend the `React.Component` class from the React package:

```javascript
class App extends React.Component {
  render() {
    return <h1>Hello from our app</h1>
  }
}
```

> All React components require at least a `render()` function. This `render()` function is expected to return a virtual DOM representation of the browser DOM element(s).

In our `index.html`, let's replace our JavaScript from before with our new `App` component.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello world</title>
  <!-- Script tags including React -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    class App extends React.Component {
      render() {
        return <h1>Hello from our app</h1>
      }
    }
  </script>
</body>
</html>
```

However, nothing is going to render on the screen. Do you remember why?

We haven't told React we want to render anything on the screen or _where_ to render it. We need to use the `ReactDOM.render()` function again to express to React what we want rendered and where.

Adding the `ReactDOM.render()` function will render our application on screen:

```javascript
var mount = document.querySelector('#app');
ReactDOM.render(<App />, mount);
```

<div id="demo2"></div>

Notice that we can render our React app using the `App` class as though it is a built-in DOM component type (like the `<h1 />` and `<div />` tags). Here we're using it as though it's an element with the angle brackets: `<App />`.

The idea that our React components act just like any other element on our page allows us to build a component tree **just as if we were creating a native browser tree**.

While we're rendering a React component now, our app still lacks richness or interactivity. Soon, we'll see how to make React components data-driven and dynamic.

But first, in the next installment of this series, we'll explore how we can layer components. Nested components are the foundation of a rich React web application.

