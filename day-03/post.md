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

Today we will discuss components, the foundation for building user interfaces with React. By the end, hopefully you will see the value of creating and using components. 

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

Let's start with components, basic building blocks for complex user interfaces. 

## Reusable components

On day 1, we stated that at the heart of all React applications are _components_. Components are independent, encapsulated bits of UI. They are also reusable and save React developers a lot of time. 

Let's say you are developing a social media app.

![](https://cdn3.vectorstock.com/i/1000x1000/15/02/bullet-journal-hand-drawn-note-element-vector-39081502.jpg)

Published posts can have content and authors, but the overall structure of the post is the same. With React components, you can define overall UI structure and reuse it, passing it data to customize the content, author, or any other aspect of the post.

We create and reuse components to render a certain UI the same way we write and call functions to avoid writing the same logic over and over again.

You can also borrow other React developers' components to implement advanced features without having to do any of the work. You don't even need to know how that borrowed component works. 

## Write a reusable component

So far, our app has one `<h1>` element that says hello world.

Let's change it to say 'Journal', and create a new component to render journal entries. 

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
