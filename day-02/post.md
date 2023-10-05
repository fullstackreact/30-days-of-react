---
page_id: 30-days-of-react/day-2
permalink: day-2
day: 2
title: What is JavaScript XML (JSX) and How is it Used?
description: >-
  Now that we know what React is, let's take a look at a few terms and concepts
  that will come up throughout the rest of the series.
hero_image: /assets/images/series/30-days-of-react/headings/2.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/2.jpg
dayDir: '02'
introBannerUrl: /assets/images/series/30-days-of-react/headings/2_wide.jpg
date: 'Wed Oct 05 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-2
includeFile: ./../_params.yaml
---

In our previous article, we looked at what [React](https://facebook.github.io/react/) is and how it works.

Today, you will learn about JSX and ES6, two essential tools for developing apps with React.

## What is JSX? 

**JSX**, short for JavaScript XML, is HTML-like syntax that helps us define component layouts in React.

Let's go back to our example from day 1.

We have a React component that returns an `<h1>` element with the text 'Hello World'.

The HTML-like code inside the return statement is JSX. 

```javascript
function App() {
  return (
      <h1>Hello World</h1>
  );
}
```

Remember that JSX is an extension of JavaScript. Once application runs, JSX is _translated_ into calls to `React.createElement()` and other JavaScript methods on Top-Level API of React.

You don't have to use JSX. You can make calls to `React.createElement()` method to get the same result, but the JavaScript code gets complicated very fast. 

```javascript
function App() {
  return React.createElement("h1", null, "Hello World");
}
```

JSX is obviously more readable than calling the `React.createElement()` method. Difference is even more evident when you have nested elements and components.

Let's try and add a `<p>` paragraph under the `<h1>` header. 

JSX code is still fairly simple:

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>Lorem ipsum dolor sit amet</p>
    </div>
  );
}
```

Using the `React.createElement()` method to recreate the same component would look like this:

```javascript
export default function App() {
  return React.createElement("div", { className: "App" }, [
    React.createElement("h1", null, "Hello World"),
    React.createElement("p", null, "Lorem ipsum dolor sit amet")
  ]);
}
```

Every additional element makes JavaScript code exponentially more difficult to follow. Especially when elements are nested, have conditional classes, and more dynamic features. That's why even experienced React developers use JSX.

### Why `className` attribute instead of `class`? 

In JSX, certain attribute names are different from HTML. For example, we use `className` instead of `class`. This is necessary because in JavaScript, 'class' and 'for' are reserved words, and JSX is a syntax extension of JS. The `for` HTML attribute becomes `htmlFor` in React. 

## What is ES6? 

ES6 is the newest version of JavaScript that comes with many useful methods and easier syntax for writing modern web applications. At the time of writing this, most browsers support ES6. According to [caniuse.com](https://caniuse.com/?search=es6), 97% of internet surfers use browsers that support ES6.

ES6 code can be transpiled into ES5, older version of JavaScript, to make sure the rest of users are not left out. 

## Final thoughts

Now that we understand JSX, it's time write a real web application in React. 

