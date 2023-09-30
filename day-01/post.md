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

At the heart of all React applications are **components**. As their name suggests, React components are self-contained pieces of web application. Components can be as small as a button or an input field.

Components are often building blocks for other, larger components. For example - button or input components can be a part of larger form component.

Building React apps is writing small individual components and composing them into larger components that make up the React application. React provides guardrails so developers can easily organize many small components to build complex user interfaces. 

## Okay, so how do we use it?

There are several ways to approach building web applications in React.

For now, let's work with cloud-based IDEs with ready templates for React projects ready to go.

Let's look at CodeSandbox example of a React app that says 'Hello World'.

[![Edit hello world!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hello-world-p4wj53?fontsize=14&hidenavigation=1&theme=dark)


<div id="demo1"></div>

Although it might look a little scary, the JavaScript code is a single line that dynamically adds _Hello world_ to the page. Note that we only needed to include a handful of JavaScript files to get everything working.

## How does it work?

Unlike many of its predecessors, React operates not directly on the browser's Document Object Model (DOM) immediately, but on a **virtual DOM**. That is, rather than manipulating the `document` in a browser after changes to our data (which can be quite slow) it resolves changes on a DOM built and run entirely in memory. After the virtual DOM has been updated, React intelligently determines what changes to make to the actual browser's DOM.

The [React Virtual DOM](https://facebook.github.io/react/docs/dom-differences.html) exists entirely in-memory and is a representation of the web browser's DOM. Because of this, when we write a React component, we're not writing directly to the DOM, but we're writing a virtual component that React will turn into the DOM.

In the next article, we'll look at what this means for us as we build our React components and jump into JSX and writing our first real components.

