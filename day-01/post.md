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

Let's look at a simple React app that says 'Hello World'.

<iframe src="https://codesandbox.io/embed/hello-world-p4wj53?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hello world!"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

We have our main component 'App' that returns what looks like an HTML code - a header with the text 'Hello World'.

But why does a function return HTML, and how does the value returned by the function end up on the page?

A lot of this seems like magic, but it's a simple setup, which we'll explain to show you the essence of how JavaScript code translates into real HTML elements on the page.

## How does it work?

If you look at the body of `index.html` file in our project, it has an empty `<div>` container with the id of 'root'. However, an innocent HTML element doesn't yet explain the React 'magic'. 

Next, let's move on to `index.js` file, where `document.getElementById()` method gets the empty container and stores it in the variable named `rootElement`.

If you aren't familiar, `document.getElementById()` is a common method for working with individual DOM elements. You pass it the element's ID as a string and the method returns that element's DOM node. 

In this case, we access empty `<div>` container from `index.html`.

Once we have access to the empty `<div>`, will use the 'createRoot' method to transform empty HTML container into a place for our component to live.

`createRoot` rarely comes up outside of when you need to create a container for React app, so it's enough to know that 'createRoot' gives the container many properties and useful methods it needs to 'host' our React app. 

We call one of those methods `render`, which renders our component `App`. 
