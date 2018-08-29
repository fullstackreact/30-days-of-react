---
page_id: 30-days-of-react/day-4
series: 30-days-of-react
permalink: day-4
title: Complex Components
description: Awesome, we've built our first component. Now let's get a bit fancier and start building a more complex interface. 
hero_image: /assets/images/series/30-days-of-react/headings/4.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/4.jpg
dayDir: '04'
day: 4
introBannerUrl: '/assets/images/series/30-days-of-react/headings/4_wide.jpg'
date: Fri Oct 07 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

In the previous section of _30 Days of React_, we started building our first React component. In this section, we'll continue our work with our `App` component and start building a more complex UI.

A common web element we might see is a user timeline. For instance, we might have an application that shows a history of events happening such as applications like Facebook and Twitter. 

We _could_ build this entire UI in a single component. However, building an entire application in a single component is not a great idea as it can grow huge, complex, and difficult to test. 

{lang=html,crop-query=.Timeline}
<<[](components/Timeline/Timeline.js)

<div class="demo" id="demo1"></div>

## Breaking it down

Rather than build this in a single component, let's break it down into multiple components. 

Looking at this component, there are 2 separate parts to the larger component as a whole:

1. The title bar
2. The content

<img class="wide" src="{{ imagesDir }}/breakdown.png" />

We can chop up the content part of the component into individual places of concern. There are 3 different _item_ components inside the content part. 

<img class="wide" src="{{ imagesDir }}/breakdown-2.png" />

> If we wanted to go one step further, we could even break down the title bar into 3 component parts, the _menu_ button, the _title_, and the _search_ icon. We could dive even further into each one of those if we needed to. 
>
> Deciding how deep to split your components is more of an art than a science.

In any case, it's usually a good idea to start looking at applications using the idea of _components_. By breaking our app down into components it becomes easier to test and easier to keep track of what functionality goes where.

## The container component

To build our notifications app, let's start by building the container to hold the entire app. Our container is simply going to be a "wrapper" for the other two components. 

None of these components will require special functionality (yet), so they will look similar to our `HelloWorld` component in that it's just a component with a single render function.

Let's build a _wrapper_ component we'll call `App` that might look similar to this:

{lang=javascript,crop-query=.App}
<<[](Container.js)

> Notice that we use the attribute called `className` in React instead of the HTML version of `class`. Remember that we're not writing to the DOM directly and thus not writing HTML, but JSX (which is just JavaScript).
> 
> The reason we use `className` is because `class` is a reserved word in JavaScript.

## Child components

When a component is nested inside another component, it's called a _child_ component. A component can have multiple children components. The component that uses a child component is then called it's _parent_ component.

With the wrapper component defined, we can build our `title` and `content` components by, essentially, grabbing the source from our original design and putting the source file into each component. 

For instance, the header component looks like this, with a container element `<div className="header">`, the menu icon, a title, and the search bar:

{lang=javascript,crop-query=.Header}
<<[](Header.js)

<div class="demo" id="headerDemo"></div>

And finally, we can write the `Content` component with timeline items. Each timeline item is wrapped in a single component, has an avatar associated with it, a timestamp, and some text. 

{lang=javascript,crop-query=.Content}
<<[](Content.js)

> In order to write a comment in a React component, we have to place it in the brackets as a multi-line comment in JavaScript. 

## Putting it all together

Now that we have our two _children_ components, we can set the `Header` and the `Content` components to be _children_ of the `App` component. Our `App` component can then use these components _as if they are HTML elements built-in to the browser_. Our new `App` component, with a header and content now looks like:

{lang=javascript,crop-query=.App}
<<[](Container2.js)

<div class="demo" id="demo2"></div>

With this knowledge, we now have the ability to write multiple components and we can start to build more complex applications. 

However, you may notice that this app does not have any user interaction nor custom data. In fact, as it stands right now our React application isn't that much easier to build than straight, no-frills HTML. 

In the next section, we'll look how to make our component more dynamic and become _data-driven_ with React.
