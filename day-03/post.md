---
page_id: 30-days-of-react/day-3
series: 30-days-of-react
permalink: day-3
title: Building Your First React Components
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

Let's revisit the "Hello world" app we introduced on day one.

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
```
It's time to look at our CodeSandbox project and understand how the JSX code returned by our function component ends up on the screen. 

## How does it work?

In `index.html` file, there is an empty `<div>` container with the id of 'root'. Obviously an innocent HTML element doesn't have capabilities to render React components. 

[![Edit hello world!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hello-world-p4wj53?fontsize=14&hidenavigation=1&module=%2Fpublic%2Findex.html&theme=dark)

That is why, in `index.js` file, we use `document.getElementById()` method to get the empty container and store it the variable named `rootElement`.

[![Edit hello world!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hello-world-p4wj53?fontsize=14&hidenavigation=1&theme=dark)

> `document.getElementById()` method is frequently used in JavaScript DOM manipulation. It accepts one argument - `id` of the DOM element you want to select.

Calling `createRoot()` on a plain `<div>` gives it necessary properties and methods to be a home for our React app.

One of them is `render()`, a very important method that dictates what the component should look like. In this case, it renders one component - `App` inside the container. 

If you inspect the header, you will see that the `<h1>` element is indeed nested in the `<div>` with the `id` of 'root'.

Don't worry - you won't need to go through this process to add every component. Once you add one, you can use JSX to render other components inside that added component, and all of its child elements and components will show up on the page. 

### The React app

So far, our `App` component is the entire app. It's time we added more components and learned to use various features to build interactive apps with React. 

Real web applications can accept and respond to user inputs, receive and send HTTP requests and much more. In time, we will learn all these features. 

To start, let's build our first component other than `App`. 

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

