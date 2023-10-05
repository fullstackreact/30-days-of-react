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

## The React app

So far, our `App` component is the entire app. It's time we added more components and learned to use various features to build interactive apps with React. 

Real web applications can accept and respond to user inputs, receive and send HTTP requests and much more. In time, we will learn all these features. 

To start, let's build our first component other than `App`. 

## Reusable components

On day 1, we stated that at the heart of all React applications are _components_, self-contained pieces of UI (component definition). Let's try to expand on that and really understand the importance of components for building apps in React.

Web applications and even mobile and desktop apps often have repeated bits of UI. 

For example, comments on facebook are structurally the same, even if they say different things. Components give you the power to create your own structure, the skeleton for the UI, and reuse it throughout the app, or even in different projects. Concept of reusable components is very powerful and can save a lot of time. It's like if you could create your own custom element in HTML, and then reuse it instead of having to write it over and over again whenever you need it. 

When trying to implement a difficult feature in React, chances are someone has already created a custom component that perfectly implements that feature. You only have to import it and use it, you don't even have to understand how it works (although it's preferable if you did). 

Let's create our first reusable component and name it 'Entry', so we could reuse it to show different entries. 

```javascript
-
```

Reusing it is as simple as invoking a React component by its name - `<Entry>`, as if it was just another HTML element. This way, you can nest components and combine components to compose complex web applications, just as **if we were writing HTML layout with nested children elements** (Google to nail the phrasing). 

If we wanted to build a journal app that shows different entries from different times, we could simply invoke the `<Entry>` component in our JSX multiple times. And we would have different entries.

But reusable components are not really useful if we can not customize their contents. 

In HTML, we could use attributes to customize some aspects of elements, so even if it was the same element, it worked differently. For example, if we had two buttons, one might have `disabled` attribute and would be disabled.

React feature called **props** is somewhat similar, except it allows us to customize React components' contents, appearance, functionality, and much more. It is the absolute necessity for actually reusing the components

## Final words

Our React web application got a bit smarter, but we are not even close to utilizing true potential of React. Soon, we'll see how to make React components data-driven and dynamic.

In the next installment of this series, we'll explore how to actually compose and nest components, and build component trees that make up React web applications. 
