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

Today we will discuss components, UI building blocks in React. By the end, hopefully you will have learned how to build and design excellent React components and the benefits of doing so.

Let's revisit the example from day one.

```javascript
function App() {
  return (
      <h1>Hello World</h1>
  );
}
```

So far, our entire React app is just one `App` component.

It's time to learn how to create real web applications that make use of all interactive features React has to offer. 

For starters, let's learn how to create reusable components. 

## Reusable components

On day 1, we stated that at the heart of all React applications are _components_. Components are independent, encapsulated bits of UI. More importantly, reusable components can save you a lot of time. 

In JavaScript, we define functions to perform common tasks by reusing logic. Similarly, components enable us to reuse parts of UI.

Let's say you are developing a social media app.

![](https://github.com/irakli12345/30-days-of-react/blob/master/day-03/instagram%20clone.png)

Individual posts have different content and authors, but overall structure is the same. React allows you to define components' interface, so you can customize their content. 

React community created libraries of reusable React components you can borrow to implement advanced features without having to write any of the code. 

## Write a reusable component

So far, our app has one `<h1>` element that says 'Hello World'.

Let's change header text to say 'Journal' and create new components for entries in the journal. 

For now, let's keep `Entry` components simple. A simple `<p>` paragraph in a `<div>` container will be fine. 

```javascript
function Entry() {
  return (
    <div className="entry">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
    </div>
  );
}
```
We added lorem ipsum text as an example. 

You can invoke custom React components by their name. JSX is great because it allows us to compose React components and elements to build interfaces the same way we build layouts in HTML.

Let's say our journal has three entries:

```javascript
export default function Journal() {
  return (
    <div>
      <h1>Journal</h1>
      <Entry></Entry>
      <Entry></Entry>
      <Entry></Entry>
    </div>
  );
}
```

So far, JSX code is pretty simple. We one `<h1>` element and three custom `<Entry>` components inside a `<div>`. 

> React has one important rule - components are allowed to return only one element. In this case, our `Journal` component returns multiple `<Entry>` components, so we must wrap them in a `<div>`. So technically, component returns one `<div>` element.

But reusable components are not really useful if we can not customize their contents. 

## Customize components 

Props are somewhat similar to attributes in HTML. We will explore them in detail later. In HTML, we could set attributes to customize HTML elements to some degree. React feature called **props** is somewhat similar, except it allows us to customize React components' contents, appearance, functionality, and much more. It is the absolute necessity for actually reusing the components

The problem now, is that all entry components are the same. We need some way to pass them strings, so they display different texts. 



## Final words

Our React web application got a bit smarter, but we are not even close to utilizing true potential of React. Soon, we'll see how to make React components data-driven and dynamic.

In the next installment of this series, we'll explore how to actually compose and nest components, and build component trees that make up React web applications. 
