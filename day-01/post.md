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

At the heart of all React applications are **components**. These are self-contained pieces of UI that when put together, make up the web application. A component can be as small as a button or an input field, or a Form component that contains smaller Button and Input components.

Process of building React apps is writing and organizing small components into larger structures, making sure that individual components are flexible and reusable, but also consistent.

React provides guardrails to guide us through this difficult process, so we, developers, can focus on building user interfaces.

## Okay, so how do we use it?

There are several ways to approach building web applications in React.

For now, let's work with cloud-based IDEs to instantly set up a React project, write React components and see changes in real time. 

Let's look at a simple React app that says 'Hello World'.

[![Edit hello world!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hello-world-p4wj53?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)

In this code example, we have a function `App` that returns what looks like an HTML code - a header with the text 'Hello World'.

`App` is a React component. React components can be written as a function (like `App` is) or using ES6 class syntax. Because functions are more familiar and easier to write, let's stick with function components for now. 

All React components return HTML-like (**not HTML**) code to describe what UI should look like.

Tomorrow, you will learn about JSX, the syntax that helps us define components' layout and build dynamic web apps with React.

