---
page_id: 30-days-of-react/day-6
series: 30-days-of-react
permalink: day-6
title: State
description: Today we're getting started on how stateful components work in React and look at when and why we'll use state.
dayDir: '06'
day: 6
hero_image: /assets/images/series/30-days-of-react/headings/6.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/6.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/6_wide.jpg'
date: Sun Oct 09 2016 21:29:42 GMT-0700 (PDT)
---

We've almost made it through your first week of getting up and running on React. We have worked through JSX, building our first components, setting up parent-child relationships, and driving our component properties with React. We have one more major idea we have yet to discuss about React, the idea of _state_.

## The `state` of things

React does _not_ allow us to modify `this.props` on our components for good reason. Imagine if we passed in the `title` prop to the `Header` component and the `Header` component was able to modify it. How do we know what the `title` is of the `Header` component? We set ourselves up for race-conditions, confusing data state, and it would be an all-around bad idea to modify a variable passed to us by a parent component and modified in a child.

However, sometimes a component needs to be able to update it's own state. For example, setting an `active` flag or updating a timer on a stopwatch, for instance. 

While it's preferable to use `props` as much as we can, sometimes we need to hold on to the state of a component. To handle this, React gives us the ability to have _state_ in our components.

`state` in a component is intended to be completely internal to the Component and it's children (i.e. accessed by the component and any children it used). Similar to how we access `props` in a component, the state can be accessed via `this.state` in a component. Whenever the state changes (via the `this.setState()` function), the component will rerender. 

For instance, let's say we have a simple clock component that shows the current time:

<div id="demo1"></div>

Even though this is a simple clock component, it does retain state in that it needs to know what the current time is to display. Without using `state`, we could set a timer and rerender the entire React component, but other components on the page may not need rerendering... this would be a headache. 

Instead, we can set a timer to call rerender _inside_ the component and change the _internal_ state of this component.

Let's take a stab at building this component. First, we'll create the component we'll call `Clock`. Before we get into the state, let's build the component and create the `render()` function. We'll need to take into account the number and prepend a zero (`0`) to the number if the numbers are smaller than 10 and set the `am/pm` appropriately. The end result of the `render()` function might look something like this:

{lang=javascript,crop-query=(firstLineOf(choose(.Clock, 0)),.render,lastLineOf(choose(.Clock, 0)), choose(.Clock, 1)),gapFiller="\n// ...\n"}
<<[](FirstClock.js)

If we render our new `Clock` component, we will only get a time rendered everytime the component itself rerenders. It's not a very useful clock (yet). In order to convert our static time display `Clock` component into a clock that displays the time, we'll need to update the time every second.

In order to do that, we'll need to track the _current_ time in the state of the component. To do this, we'll need to set an initial state value. In the ES6 class style, we can set the initial state of the component in the `constructor()` by setting `this.state` to a value.

{lang=javascript,crop-query=(.Clock .constructor)}
<<[](components/Timer/Clock.js)

> The first line of the constructor should _always_ call `super(props)`. If you forget this, the component won't like you very much (i.e. there will be errors).

Now that we have a `this.state` defined in our `Clock` component, we can reference it in the `render()` function using the `this.state`. Let's update our `render()` function to grab the values from `this.state`:

{lang=javascript,crop-query=(firstLineOf(choose(.Clock, 0)),.Clock .render,lastLineOf(.Clock))}
<<[](components/Timer/Timer1.js)

Instead of working directly with data values, we can now update the `state` of the component. In order to update the state, we'll use the function `this.setState()`, which will trigger the component to rerender.

In our `Clock` component, let's use the native `setTimeout()` JavaScript function to create a timer to update the `this.state` object in 1000 milliseconds. We'll place this functionality in a function as we'll want to call this again.

{lang=javascript,crop-query=(firstLineOf(.Clock),.Clock .constructor,choose(.Clock.setTimer,1),.Clock .updateClock,lastLineOf(choose(.Clock, 0)))}
<<[](components/Timer/Clock.js)

> We will get into the lifecycle hooks in the next section, but for the time being we'll call this in the `constructor()` for simplicity.

In the `updateClock()` function we'll want to update the state with the new time. We can now update the state in the `updateClock()` function:

{lang=javascript,crop-query=(firstLineOf(.Clock),choose(.Clock.updateClock, 1),lastLineOf(choose(.Clock, 0)))}
<<[](components/Timer/Clock.js)

The component will be mounted on the page and in (approximately) one second (1000 milliseconds) it updates the current time. However, it won't be reset again. We can simply call the `setTimer()` function again at the end of the function:

```javascript
class Clock extends React.Component {
  // ...
  updateClock() {
    const currentTime = new Date();
    this.setState({
      currentTime: currentTime
    })
    this.setTimer();
  }
  // ...
}
```

Now the component itself might rerender slower than the timeout function gets called again, which would cause a rerendering bottleneck and needlessly using up precious battery on mobile devices. Instead of calling the `setTimer()` function after we call `this.setState()`, we can pass a second argument to the `this.setState()` function which will be guaranteed to be called _after_ the state has been updated.

```javascript
class Clock extends React.Component {
  // ...
  updateClock() {
    const currentTime = new Date();
    this.setState({
      currentTime: currentTime
    }, this.setTimer);
  }
  // ...
}
```

<div id="demo2"></div>

## Update our activity list

We can update our `Header` component in our activity list we've been working on through the last section. When the user clicks on the `search` icon (<i class="fa fa-search"></i>) in the corner, we'll want to show the `<input />` component.

Try it! Click on the search icon below:

<div id="demo3"></div>

Knowing what we know now with `this.state`, we can now update the view to add a conditional rendering of the `<input />`:

{lang=javascript,crop-query=(.Header)}
<<[](Header1.js)

#### Some things to keep in mind

* When we call `this.setState()` with an object argument, it will perform a _shallow merge_ of the data into the object available via `this.state` and then will rerender the component. 

* We generally only want to keep values in our state that we'll use in the `render()` function. From the example above with our clock, notice that we stored the `hours`, `minutes`, and `seconds` in our state. It's usually a bad idea to store objects or calculations in the state that we don't plan on using in the `render` function as it can cause unnecessary rendering and wasteful CPU cycles.

As we noted at the top of this section, it's preferred to use `props` when available not only for performance reasons, but because stateful components are more difficult to test. 

Today we've updated our components to be stateful and now have a handle on how to make a component stateful when necessary. Tomorrow we'll dive into the lifecycle of a component and when/how to interact with the page. 

> ## MenuButton
>
> The `<MenuButton />` component referenced above is in the code repository and just presents a nice display for the menu button.
>
{lang=javascript,crop-query=(.MenuButton)}
<<[](components/Timeline/MenuButton.js)
