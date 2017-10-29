---
page_id: 30-days-of-react/day-8
series: 30-days-of-react
permalink: day-8
title: PropTypes
description: We're looking at how to make reusable React components today so that not only can we share our components across apps and teams.
dayDir: '08'
day: 8
hero_image: /assets/images/series/30-days-of-react/headings/8.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/8.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/8_wide.jpg'
date: Tue Oct 11 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

Phew! We made it to week two (relatively unscathed)! Through this point, we've talked through most of the basic features of React (`props`, `state`, life-cycle hooks, JSX, etc.). In this section, we're going to look a bit at annotating our components.

## PropTypes

You may have noticed we use `props` quite a bit in our components. For the most part, we'll expect these to be a particular type or set of types (aka an `object` or a `string`). React provides a method for defining and validating these types that allow us to easily expose a component API. 

Not only is this a good practice for documentation purposes, it's great for building [reusable react components](https://facebook.github.io/react/docs/reusable-components.html).

The `React.PropTypes` object exports a bunch of different types which we can use to define what type a component's prop should be. We can define these using the `propTypes` method in the ES6 class-style React prop:

{lang=javascript,crop-query=1-EOF}
<<[](Proptypes1.js)

> Using the `React.createClass()` form, we'll define a `key` called `propTypes`.
> For instance, we can rewrite the form of the `Clock` component as:
>
> ```javascript
> const Clock = React.createClass({
>   proptypes: {}
> });
> ```

From within this `prop`, we can define an object which has the key of a prop as the name of the prop we are defining and a value defines the type (or types) it should be defined as. 

For instance, the `Header` component we built a few days ago accepts a a prop called `title` and we expect it to be a string. We can define it's type to be a string as such:

```javascript
class Header extends React.Component {
  // ...
}

Header.propTypes = {
  title: React.PropTypes.string
}
```

React has a lot of types to choose from, exported on the `React.PropTypes` object and even allows for us to define a custom object type. Let's look at an overall list of available types:

### Basic types

React exposes a few basic types we can use out of the box.

| type | example | class
:-- | :--: | --:
| String | 'hello' | `React.PropTypes.string` |
| Number | 10, 0.1 | `React.PropTypes.number` |
| Boolean | true / false | `React.PropTypes.bool` |
| Function | `const say => (msg) => console.log("Hello world")` | `React.PropTypes.func` |
| Symbol | Symbol("msg") | `React.PropTypes.symbol` |
| Object | `{name: 'Ari'}` | `React.PropTypes.object` |
| Anything | 'whatever', 10, `{}` | 

It's possible to tell React we want it to pass through _anything_ that can be rendered by using `React.PropTypes.node`:

| type | example | class
:-- | :--: | --:
| A rendererable | 10, 'hello' | `React.PropTypes.node` |

{lang=javascript,crop-query=1-EOF}
<<[](BasicProptypes.js)

We've already looked at how to communicate from a parent component to a child component using `props`. We can communicate from a child component to a parent component using a function. We'll use this pattern quite often when we want to manipulate a parent component from a child.

### Collection types

We can pass through iterable collections in our `props`. We've already seen how we can do this when we passed through an array with our activities. To declare a component's proptype as an array, we can use the `React.PropTypes.array` annotation.

We can also require that an array holds only objects of a certain type using `React.PropTypes.arrayOf([])`. 

| type | example | class
:-- | :--: | --:
| Array | [] | `React.PropTypes.array` |
| Array of numbers | [1, 2, 3] | `React.PropTypes.arrayOf([type])`
| Enum | ['Red', 'Blue'] | `React.PropTypes.oneOf([arr])`

It's possible to describe an object that can be one of a few different types as well using `React.PropTypes.oneOfType([types])`.

{lang=javascript,crop-query=1-EOF}
<<[](CollectionProptypes.js)

### Object types

It's possible to define types that need to be of a certain shape or instance of a certain class. 

| type | example | class
:-- | :--: | --:
| Object | `{name: 'Ari'}` | `React.PropTypes.object` |
| Number object | `{count: 42}` | `React.PropTypes.objectOf()` |
| Instance | `new Message()` | `React.PropTypes.objectOf()` |
| Object shape | `{name: 'Ari'}` | `React.PropTypes.shape()` |

{lang=javascript,crop-query=1-EOF}
<<[](ObjectProptypes.js)

### React types

We can also pass through React elements from a parent to a child. This is incredibly useful for building templates and providing customization with the templates. 

| type | example | class |
|-- | -- | -- |
| Element | `<Title />` | `React.PropTypes.element` |

{lang=javascript,crop-query=1-EOF}
<<[](ElementProptypes.js)

When we use _element_, React expects that we'll be able to accept a single child component. That is, we won't be able to pass multiple elements. 

```javascript
// Invalid for elements
<Clock displayElement={
  <div>Name</div>
  <div>Age</div>
}></Clock>
// Valid
<Clock displayElement={
  <div>
    <div>Name</div>
    <div>Age</div>
  </div>
}></Clock>
```

### Requiring types

It's possible to require a prop to be passed to a component by appending _any_ of the proptype descriptions with `.isRequired`:

```javascript
Clock.propTypes = {
  title: React.PropTypes.name.isRequired,
}
```

Setting a `prop` as required is very useful for times when the component is dependent upon a `prop` to be passed in by it's parent component and won't work without it. 

### Custom types

Finally, it's also possible to pass a function to define custom types. We can do this for a single prop or to validate arrays. The one requirement for the custom function is that if the validation does _not_ pass, it expects we'll return an `Error` object:

| type | example | class
:-- | :--: | --:
| Custom | 'something_crazy' | `function(props, propName, componentName) {}` |
| CustomArray | ['something', 'crazy'] | `React.PropTypes.arrayOf(function(props, propName, componentName) {})` |

```javascript
UserLink.propTypes = {
  userWithName: (props, propName, componentName) => {
    if (!props[propName] || !props[propName].name) {
      return new Error(
        "Invalid " + propName + ": No name property defined for component " + componentName
      )
    }
  }
}
```

## Default props

Sometimes we want to be able to set a default value for a prop. For instance, our `<Header />` component, we built yesterday might not require a title to be passed. If it's not, we'll still want a title to be rendered, so we can define a common title instead by setting it's default prop value. 

To set a default prop value, we can use the `defaultProps` object key on the component.

```javascript
Header.defaultProps = {
  title: 'Github activity'
}
```

> When using the `React.createClass()` form, we can define an object key called `getDefaultProps()` which is expected to return an object with the default values of props.
>
> ```javascript
> React.createClass({
>   getDefaultProps: () => ({
>     name: 'Github activity'
>   })
> })
```

Phew, today we went through a lot of documentation. It's _always_ a good idea to build our resuable components using the `propTypes` and `defaultProps` attributes of components. Not only will it make it easier to communicate across developers, it'll be much easier when we return to our components after leaving them for a few days. Next, we'll get back to code and start integrating some style into our components.
