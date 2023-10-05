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

**JSX**, short for JavaScript XML, is HTML-like syntax that helps us define component layout in React.

Its familiar syntax helps us easily build and maintain complex web applications in React.

On day 1, we saw a React component return a header element with the text 'Hello World'.

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
```

HTML-like code in the `return` statement is JSX.

Remember that JSX is simply a familiar syntax for writing JavaScript code. Once application runs, JSX is _translated_ into calls to `React.createElement()` and other JavaScript methods on Top-Level API of React.

You can make calls to `React.createElement()` method to get the same result, but looking at the code should tell you why many React developers use JSX. 

```javascript
function App() {
  return React.createElement("h1", { className: "App" }, "Hello World");
}
```

Compared to `React.createElement()` calls, JSX is more readable and familiar. Its HTML-like syntax makes it very easy to define component layouts, especially when it comes to building complex components. 

### why `className` attribute instead of `class`? 

You may have noticed that in JSX we use `className`, not `class`. This is necessary because in JavaScript, 'class' and 'for' are reserved words, and JSX is a syntax extension of JS. So the `for` HTML attribute becomes `htmlFor` in React. 

## What is ES6? 

ES6 is the newest version of JavaScript that comes with many useful methods and easier syntax for building apps in React. It has wide browser support, and most web applications are written in ES6. 

Sometimes ES6 is transpiled into older version of JavaScript ES5, to make sure all browsers understand ES6. 

Now that we understand JSX, we can start writing our first React components. Join us tomorrow when we jump into our first React app.

