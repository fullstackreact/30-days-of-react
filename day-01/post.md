---
page_id: 30-days-of-react/day-1
permalink: day-1
day: 1
series: 30-days-of-react
title: What is React and What is it Used for?
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

At the heart of all React applications are **components**. These are self-contained pieces of UI that when put together, make up the web application. A component can be as small as a button or an input field, or as large as a Form component that contains smaller Button and Input components. The entire React app is often a parent component that contains all other components. 

Process of building React apps is writing and organizing small components into larger structures, making sure that individual components are flexible and reusable, but also consistent.

React provides guardrails to guide us through this difficult process, so we, developers, can focus on building user interfaces.

## Okay, so how do we use it?

There are several ways to approach building web applications in React.

For now, let's work with cloud-based IDEs with ready templates for React projects ready to go.

Let's look at a simple React app that says 'Hello World'.

[![Edit hello world!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hello-world-p4wj53?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)

So far, we have a function 'App' that returns what looks like an HTML code - a header with the text 'Hello World'.

'App' is a React component. React components can be written either as a function (like 'App' is) or using ES6 class syntax. Because functions are more familiar and easier to write, our examples will stick with function components.

All React components, like 'App' in the example, return HTML-like (**not HTML**) code to describe what UI should look like. 

## How does it work?

The body of `index.html` file has an empty `<div>` container with the id of 'root'. Obviously an innocent HTML element doesn't have capabilities to render React components. 

That is why, in `index.js` file, we use `document.getElementById()` method to get the empty container and store it the variable named `rootElement`.

If you aren't familiar, `document.getElementById()` is a common method for working with individual DOM elements. You pass it the element's ID as a string and the method returns that element's DOM node. 

In this case, we access empty `<div>` container from `index.html`.

Once we have access to the empty `<div>`, will use the 'createRoot' method to transform empty HTML container into a place for our component to live.

For now, you don't need to concern yourself with `createRoot`, just know that it gives plain HTML container properties and methods so it can become home for our React app. 

One of those methods is 'render'. Without going into details, this method renders our one component 'App' inside the container.

This is the link between component 'App' that displays 'Hello World' and HTML contents of our app. 
