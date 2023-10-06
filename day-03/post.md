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

Components are the foundation for building user interfaces with React. It's time you learned how to create flexible and highly reusable React components.

Let's revisit the example from day one.

```javascript
function App() {
  return (
      <h1>Hello World</h1>
  );
}
```

It's time to look at our CodeSandbox project and understand how the JSX code returned by our function component ends up on the screen. 

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
