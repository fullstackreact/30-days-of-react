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

In our previous article, we looked at what [React](https://facebook.github.io/react/) is and how it works. In this article, we're going to look at JSX, the HTML-like syntax that helps us easily define component layout, and ES6, modern syntax for writing JavaScript code.

## What is JSX? 

In our previous example, we saw that all React components return HTML-like code.

That code is actually **JSX**, short for (JavaScript XML), and it saves a lot of time on writing React apps. 

If you're new to React, JSX probably feels familiar, since it looks so much like HTML. But don't get confused, all React apps are written entirely in JavaScript. At runtime, JSX code is translated into JavaScript. React sees our JSX code and helps out by writing a JavaScript code that corresponds with our JSX layout.

Let's go back to our previous example, this is the `App` component, a friendly function that returns an `<h1>` element. Easy to follow. 

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
```

You can write React components using high-level React API and use methods like `React.createElement()`. The code for our `App` component would look like this:

```javascript
function App() {
  return React.createElement("h1", { className: "App" }, "Hello World");
}
```
 
Our app is relatively simple and only renders one `<h1>` element. Even then, making calls to `React.createElement()` is not as readable and friendly as JSX. 

Web applications in the real world are not so simple, and working with high-level React API can get very confusing.

On the other hand, you are probably used to structuring layouts using HTML. That's why most React developers use JSX.

Because JSX is just a simpler syntax to write JavaScript, it allows us to easily integrate JavaScript logic right into the markup. 

> Although in previous paradigms it was viewed as a bad habit to include JavaScript and markup in the same place, it turns out that combining the view with the functionality makes reasoning about the view straight-forward.

## What is ES6? 

ES6 is modern syntax for JavaScript, as opposed to ES5. 

ES5 (the `ES` stands for ECMAScript) is basically "regular JavaScript." The 5th update to JavaScript, ES5 was finalized in 2009. It has been supported by all major browsers for several years. Therefore, if you've written or seen any JavaScript in the recent past, chances are it was ES5.

ES6 is a new version of JavaScript that adds some nice syntactical and functional additions. It was finalized in 2015. ES6 is [almost fully supported](http://kangax.github.io/compat-table/es6/) by all major browsers. But it will be some time until older versions of web browsers are phased out of use. For instance, Internet Explorer 11 does not support ES6, but has about 12% of the browser market share.

In order to reap the benefits of ES6 today, we have to do a few things to get it to work in as many browsers as we can:

1. We have to _transpile_ our code so that a wider range of browsers understand our JavaScript. This means converting ES6 JavaScript into ES5 JavaScript.
2. We have to include a _shim_ or _polyfill_ that provides additional functionality added in ES6 that a browser may or may not have.

We'll see how we do this a bit later in the series.

> Most of the code we'll write in this series will be easily translatable to ES5. In cases where we use ES6, we'll introduce the feature at first and then walk through it.



The `render()` function in the `HelloWorld` component looks like it's returning HTML, but this is actually JSX. The JSX is _translated_ to regular JavaScript at runtime. That component, after translation, looks like this:

```javascript
class HelloWorld extends React.Component {
  render() {
    return (
      React.createElement(
        'h1',
        {className: 'large'},
        'Hello World'
      )
    );
  }
}
```

While JSX looks like HTML, it is actually just a terser way to write a `React.createElement()` declaration. When a component renders, it outputs a tree of React elements or a **virtual representation** of the HTML elements this component outputs. React will then determine what changes to make to the actual DOM based on this React element representation. In the case of the `HelloWorld` component, the HTML that React writes to the DOM will look like this:

```html
<h1 class='large'>Hello World</h1>
```

> The `class extends` syntax we used in our first React component is ES6 syntax. It allows us to write objects using a familiar Object-Oriented style.
> In ES5, the `class` syntax might be translated as:
>
> ```javascript
> var HelloWorld = function() {}
> Object.extends(HelloWorld, React.Component)
> HelloWorld.prototype.render = function() {}
> ```

Because JSX is JavaScript, we can't use JavaScript reserved words. This includes words like `class` and `for`.

React gives us the attribute `className`. We use it in `HelloWorld` to set the `large` class on our `h1` tag. There are a few other attributes, such as the `for` attribute on a label that React translates into `htmlFor` as `for` is also a reserved word. We'll look at these when we start using them.

If we want to write pure JavaScript instead of rely on a JSX compiler, we can just write the `React.createElement()` function and not worry about the layer of abstraction. But we like JSX. It's especially more readable with complex components. Consider the following JSX:

```javascript
<div>
  <img src="profile.jpg" alt="Profile photo" />
  <h1>Welcome back Ari</h1>
</div>
```

The JavaScript delivered to the browser will look like this:

```javascript
React.createElement("div", null,
  React.createElement("img", {src: "profile.jpg", alt: "Profile photo"}),
  React.createElement("h1", null, "Welcome back Ari")
);
```

Again, while you can skip JSX and write the latter directly, the JSX syntax is well-suited for representing nested HTML elements.

Now that we understand JSX, we can start writing our first React components. Join us tomorrow when we jump into our first React app.

