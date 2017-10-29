---
page_id: 30-days-of-react/day-1
permalink: day-1
day: 1
series: 30-days-of-react
title: What is React?
description: >-
  Today, we're starting out at the beginning. Let's look at what React is and
  what makes it tick. We'll discuss why we want to use it.
hero_image: /assets/images/series/30-days-of-react/headings/1.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/1.jpg
dayDir: '01'
introBannerUrl: /assets/images/series/30-days-of-react/headings/1_wide.jpg
date: 'Tue Oct 04 2016 21:29:25 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-1
includeFile: ./../_params.yaml
articleEntry: '__SITE_PATH__/build/static/js/main'
---


Over the next 30 days, you'll get a good feel for the various parts of the [React](https://facebook.github.io/react/) web framework and its ecosystem.

Each day in our 30 day adventure will build upon the previous day's materials, so by the end of the series, you'll not only know the terms, concepts, and underpinnings of how the framework works, but be able to use React in your next web application.

Let's get started. We'll start [at the very beginning](https://www.youtube.com/watch?v=1RW3nDRmu6k) as it's a very good place to start.

## What is React?

[React](https://facebook.github.io/react/) is a JavaScript library for building user interfaces. It is the view layer for web applications.

At the heart of all React applications are **components**. A component is a self-contained module that renders some output. We can write interface elements like a button or an input field as a React component. Components are _composable_. A component might include one or more other components in its output.

Broadly speaking, to write React apps we write React components that correspond to various interface elements. We then organize these components inside higher-level components which define the structure of our application.

For example, take a form. A form might consist of many interface elements, like input fields, labels, or buttons. Each element inside the form can be written as a React component. We'd then write a higher-level component, the form component itself. The form component would specify the structure of the form and include each of these interface elements inside of it.

Importantly, each component in a React app abides by strict data management principles. Complex, interactive user interfaces often involve complex data and application state. The surface area of React is limited and aimed at giving us the tools to be able to anticipate how our application will look with a given set of circumstances. We dig into these principles later in the course.

## Okay, so how do we use it?

React is a JavaScript framework. Using the framework is as simple as including a JavaScript file in our HTML and using the `React` exports in our application's JavaScript.

For instance, the _Hello world_ example of a React website can be as simple as:

```html
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
    ReactDOM.render(
      <h1>Hello world</h1>,
      document.querySelector('#app')
    );
  </script>
</body>
</html>
```

<div id="demo1"></div>

Although it might look a little scary, the JavaScript code is a single line that dynamically adds _Hello world_ to the page. Note that we only needed to include a handful of JavaScript files to get everything working.

## How does it work?

Unlike many of its predecessors, React operates not directly on the browser's Document Object Model (DOM) immediately, but on a **virtual DOM**. That is, rather than manipulating the `document` in a browser after changes to our data (which can be quite slow) it resolves changes on a DOM built and run entirely in memory. After the virtual DOM has been updated, React intelligently determines what changes to make to the actual browser's DOM.

The [React Virtual DOM](https://facebook.github.io/react/docs/dom-differences.html) exists entirely in-memory and is a representation of the web browser's DOM. Because of this, when we write a React component, we're not writing directly to the DOM, but we're writing a virtual component that React will turn into the DOM.

In the next article, we'll look at what this means for us as we build our React components and jump into JSX and writing our first real components.

