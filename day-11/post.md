---
page_id: 30-days-of-react/day-11
series: 30-days-of-react
permalink: day-11
day: 11
title: Pure Components
description: >-
  React offers several different methods for creating components. Today we'll
  talk about the final method of creating components, the function stateless
  pure component.
dayDir: '11'
hero_image: /assets/images/series/30-days-of-react/headings/11.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/11.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/11_wide.jpg
date: 'Wed Oct 14 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-11
includeFile: ./../_params.yaml
---

We've looked at a few different ways to build react components. One method we left out up through this point is the stateless component/functional method of building React components.

As we've seen up through this point, we've only worked through building components using the `React.Component` and `React.createClass()` methods. For more performance and simplicity, React _also_ allows us to create pure, stateless components using a normal JavaScript function.

A _Pure_ component can replace a component that only has a `render` function. Instead of making a full-blown component just to render some content to the screen, we can create a _pure_ one instead.

_Pure_ components are the simplest, fastest components we can write. They are easy to write, simple to reason about, and the quickest component we can write. Before we dive into _why_ these are better, let's write one, or heck a couple!

```javascript
// The simplest one
const HelloWorld = () => (<div>Hello world</div>);

// A Notification component
const Notification = (props) => {
  const {level, message} = props;
  const classNames = ['alert', 'alert-' + level]
  return (
    <div className={classNames}>
      {message}
    </div>
  )
};

// In ES5
var ListItem = function(props) {
  var handleClick = function(event) {
    props.onClick(event);
  };

  return (
    <div className="list">
      <a
        href="#"
        onClick={handleClick}>
          {props.children}
      </a>
    </div>
  )
}
```

So they are just functions, right? Yep! Since they are just functions, it's really easy to test using pure JavaScript. The idea is that if React knows the `props` that are sent into a component, it can be deterministic in knowing if it has to rerender or not. The same props in equal the same output virtual DOM.

In React, functional components are called with an argument of `props` (similar to the `React.Component` constructor class), which are the `props` it's called with as well as with the current `context` of the component tree.

For instance, let's say we want to rewrite our original `Timer` component using functional components as we want to give our users a dynamic way to set their own clock styles (24 hour clock vs. 12, different separators, maybe they don't want to display the seconds, etc).

We can break up our clock into multiple components where we can use each block of time as an individual component. We might break them up like so:

```javascript
const Hour    = (props) => {
  let {hours} = props;
  if (hours === 0) { hours = 12; }
  if (props.twelveHours) { hours -= 12; }
  return (<span>{hours}</span>)
}
```
```javascript
const Minute  = ({minutes}) => (<span>{minutes<10 && '0'}{minutes}</span>)
```
```javascript
const Second  = ({seconds}) => (<span>{seconds<10 && '0'}{seconds}</span>)
```
```javascript
const Separator = ({separator}) => (<span>{separator || ':'}</span>)
```
```javascript
const Ampm = ({hours}) => (<span>{hours >= 12 ? 'pm' : 'am'}</span>)
```

With these, we can place individual components as through they are full-blown React components (they are):

```javascript
<div>Minute: <Minute minutes={12} /></div>
<div>Second: <Second seconds={51} /></div>
```

<div class="demo" id="demo1"></div>

We can refactor our clock component to accept a `format` string and break up this string selecting only the components our user is interested in showing. There are multiple ways we can handle this, like forcing the logic into the `Clock` component _or_ we can create another stateless component that accepts a format string. Let's do that (easier to test):

```javascript
const Formatter = (props) => {
  let children = props.format.split('').map((e, idx) => {
    if (e === 'h') {
      return <Hour key={idx} {...props} />
    } else if (e === 'm') {
      return <Minute key={idx} {...props} />
    } else if (e === 's') {
      return <Second key={idx} {...props} />
    } else if (e === 'p') {
      return <Ampm key={idx} {...props} />
    } else if (e === ' ') {
      return <span key={idx}> </span>;
    } else {
      return <Separator key={idx} {...props} />
    }
  });

  return <span>{children}</span>;
}
```

This is a little ugly with the `key` and `{...props}` thingie in there. React gives us some helpers for mapping over children and taking care of handling the unique `key` for each child through the `React.Children` object.

The `render()` function of our `Clock` component can be greatly simplified thanks to the `Formatter` component into this:

```javascript
class Clock extends React.Component {
  state = { currentTime: new Date() }
  componentDidMount() {
    this.setState({
      currentTime: new Date()
    }, this.updateTime);
  }
  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  }

  updateTime = e => {
    this.timerId = setTimeout(() => {
      this.setState({
        currentTime: new Date()
      }, this.updateTime);
    })
  }

  render() {
    const { currentTime } = this.state
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    return (
      <div className='clock'>
        <Formatter
          {...this.props}
          state={this.state}
          hours={hour}
          minutes={minute}
          seconds={second}
        />
      </div>
    )
  }
}
```

Not only is our `Clock` component _much_ simpler, but it's _so_ much easier to test. It _also_ will help us transition to using a data state tree, like Flux/Redux frameworks, but more on those later.

<div class="demo" id="demo2"></div>

## Uhh... so why care?

Advantages to using functional components in React are:

* We can do away with the heavy lifting of components, no constructor, state, life-cycle madness, etc.
* There is no `this` keyword (i.e. no need to bind)
* Presentational components (also called dumb components) emphasize UI over business logic (i.e. no state manipulation in the component)
* Encourages building smaller, self-contained components
* Highlights badly written code (for better refactoring)
* FAST FAST FAST FAST FAST
* They are _easy_ to reuse

You might say why not use a functional component? Well, some of the disadvantage of using a functional component are some of the advantages:

* No life-cycle callback hooks
* Limited functionality
* There is no `this` keyword

Overall, it's a really good idea to try to prefer using functional components over their heavier `React.Component` cousins. When we get to talking about data management in React, we'll see how we can use these presentational components with data as pure `props`.

Nice work today. We've successfully achieved React rank after today. We now know the _three_ ways to make a React Component.

Tomorrow, we'll get set up using/building React apps with the package management tool shipped by the React team: `create-react-app`.

