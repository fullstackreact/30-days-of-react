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

Today we will discuss components, UI building blocks in React. You will also learn best practices for building reusable components. 

Let's revisit the example from day one.

```javascript
function App() {
  return (
      <h1>Hello World</h1>
  );
}
```

So far, our entire React app is just one `App` component.

It's time to learn how to create real web applications and make use of all interactive features React has to offer.

Let's start with reusable components. 

## Reusable components

On day 1, we stated that at the heart of all React applications are _components_, reusable fragments of UI.

Component reusability is like using JavaScript functions to avoid writing the same lines of code. It saves us time and makes the UI consistent throughout the web application.

Let's say you are developing a social media app and need to create a `<Post>` component.

![](https://github.com/irakli12345/30-days-of-react/blob/master/day-03/instagram%20clone.png)

Posts can have different content and authors, but their overall structure is always the same. Author's name goes in the top-left corner, picture(s) in the center, and number of likes at the bottom. With React, you can define the overall structure of the `<Post>` component and reuse it whenever user makes a new post.

## Write a reusable component

So far, our app has one `<h1>` element that says 'Hello World'.

Let's change header text to say 'Journal' and create new component to render journal entries. 

For now, let's keep `Entry` components simple. A simple `<p>` paragraph in a `<div>` container will suffice. 

```javascript
function Entry() {
  return (
    <div className="entry">
      <p>
        Lorem ipsum dolor sit amet...
      </p>
    </div>
  );
}
```

We added lorem ipsum text as an example. 

JSX allows you to invoke custom React components by their name, the same way you invoke elements in HTML. You can also compose elements and components the same way we build layouts in HTML.

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

So far, JSX code is pretty simple - we have one `<h1>` element and three custom `<Entry>` components inside a `<div>`. 

> Our `Journal` component wraps multiple components (and one element) with a `<div>` to satisfy one of the most important rules in React - all components must return one root element.

> To understand difference between elements and components: React **elements** are JavaScript copies of `<div>`, `<h1>`, `<p>`, and other HTML elements we know and love. Elements are readily available in JSX and don't need to be defined. On the other hand, components are manually created (or imported) pieces of UI.

Finally, let's see how to pass string values to `<Entry>`, so every instance displays different text instead of the static text they have now. 

## Customize components 

Props are key to component reusability in React. In a way, passing props to a component is like passing arguments to a function. You can pass any type or number of JavaScript values via props, and use those values to customize the content, appearance, functionality, and other aspects of the component. 

The syntax for setting props in React is similar to setting attributes in HTML. 

```javascript
function Journal() {
  return (
    <div>
      <h1>Journal</h1>
      <Entry text="Today was a stressful day, had a lot of meetings at work"></Entry>
      <Entry text="On monday I came home early, did laundry and washed dishes"></Entry>
      <Entry text="Weekend was a lot of fun"></Entry>
    </div>
  );
}
```

In this example, `<Entry>` components receive string values via `text` prop. You are free to name props anything you want, but it's a good practice to choose descriptive names.

Now, let's make changes to the JSX of `<Entry>` component, so entries display the string value passed to them via `text` prop.

```javascript
function Entry(props) {
  return (
    <div className="entry">
      <p>{props.text}</p>
    </div>
  );
}
```

The function component accepts argument `props`, which is a JavaScript object where property-value pairs represent individual props.

In this case, our `props` object will have one `text` property. Its value will be equal to the string passed to a specific component via props.

In our case, three instances of `<Entry>` components receive three different strings via `text` prop. 

Finally, it's time to change the contents of `<p>` paragraph, so individual components display the string passed to them via props.

> Curly braces allow you to embed JavaScript expressions in JSX.

In this case, we use curly braces to replace dynamic text with the string value of `text` property in `props` object.

## Final words

Today's lesson was a step in the right direction, but we have barely scratched the surface of understanding true potential of React. Let's continue learning about dynamic features of React.
