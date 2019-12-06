---
page_id: 30-days-of-react/day-10
series: 30-days-of-react
permalink: day-10
title: Interactivity
description: >-
  Today we'll walk through how to add interactivity to our applications to make
  them engaging and dynamic.
dayDir: '10'
day: 10
hero_image: /assets/images/series/30-days-of-react/headings/10.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/10.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/10_wide.jpg
date: 'Wed Oct 13 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-10
includeFile: ./../_params.yaml
---

Through this point, we've built our few handful of components without adding much user interaction. Today, we're going to change that.

## User interaction

The browser is an event-driven application. Everything that a user does in the browser fires an event, from clicking buttons to even just moving the mouse. In plain JavaScript, we can listen for these events and attach a JavaScript function to interact with them.

For instance, we can attach a function to the `mousemove` browser event with the JS:

```javascript
const ele = document.getElementById('mousemove');
ele.innerHTML = 'Move your mouse over this text';
ele.addEventListener('mousemove', function(evt) {
  const { screenX, screenY } = evt;
  ele.innerHTML = '<div>Mouse is at: X: ' +
        screenX + ', Y: ' + screenY +
                  '</div>';
})
```

This results in the following functionality:

<div class="demo" id="mousemove">
  Move your mouse over this text
</div>

In React, however we don't have to interact with the browser's event loop in raw JavaScript as React provides a way for us to handle events using `props`.

For instance, to listen for the `mousemove` event from the (rather unimpressive) demo above in React, we'll set the prop `onMouseMove` (notice the camelcasing of the event name).

```javascript
class MouseMover extends React.Component {
  state = {
    x: 0,
    y: 0
  };

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.state.x || this.state.y
          ? "The mouse is at x: " + this.state.x + ", y: " + this.state.y
          : "Move the mouse over this box"}
      </div>
    );
  }
}
```

React provides a lot of `props` we can set to listen for different browser events, such as click, touch, drag, scroll, selection events, and many more (see the [events](https://facebook.github.io/react/docs/events.html) documentation for a list of all of them).

<div class="demo" id="demo1"></div>

To see some of these in action, the following is a small demo of some of the `props` we can pass on our elements. Each text element in the list set the prop it lists. Try playing around with the list and seeing how the events are called and handled within the element (all events are set on the text, not the list item):

<div class="demo" id="demo2"></div>

We'll be using the `onClick` prop quite a bit all throughout our apps quite a bit, so it's a good idea to be familiar with it. In our activity list header, we have a search icon that we haven't hooked up yet to show a search box.

The interaction we _want_ is to show a search `<input />` when our users click on the search icon. Recall that our `Header` component is implemented like this:

```javascript
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">
          {this.props.title}
        </span>

        <input
          type="text"
          className="searchInput"
          placeholder="Search ..." />

        <div className="fa fa-search searchIcon"></div>
      </div>
    )
  }
}
```

Let's update it a bit so that we can pass dynamic `className` prop to the `<input />` element
```javascript
class Header extends React.Component {
  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = ["searchInput"];
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">
          {this.props.title}
        </span>

        <input
          type="text"
          className={searchInputClasses.join(' ')}
          placeholder="Search ..." />

        <div className="fa fa-search searchIcon"></div>
      </div>
    )
  }
}
```

When the user clicks on the `<div className="fa fa-search searchIcon"></div>` element, we'll want to run a function to update the state of the component so the `searchInputClasses` object gets updated. Using the `onClick` handler, this is pretty simple.

Let's make this component stateful (it needs to track if the search field should be showing or not). We can convert our component to be stateful using the `constructor()` function:

```javascript
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    }
  }
  // ...
}
```

> ### What is a `constructor` function?
>
> In JavaScript, the `constructor` function is a function that runs when an object is created. It returns a reference to the Object function that created the instance's `prototype`.
>
> In plain English, a constructor function is the function that runs when the JavaScript runtime creates a new object. We'll use the constructor method to set up instance variables on the object as it runs right when the object is created.
>
> When using the `ES6` class syntax to create an object, we have to call the `super()` method before any other method. Calling the `super()` function calls the parent class's `constructor()` function. We'll call it with the _same arguments_ as the `constructor()` function of our class is called with.

When the user clicks on the button, we'll want to update the state to say that the `searchVisible` flag gets updated. Since we'll want the user to be able to close/hide the `<input />` field after clicking on the search icon for a second time, we'll _toggle_ the state rather than just set it to true.

Let's create this method to bind our click event:

```javascript
class Header extends React.Component {
  // ...
  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }
  // ...
}
```

Let's add an if statement to update `searchInputClasses` if `this.state.searchVisible` is `true`

```javascript
class Header extends React.Component {
  // ...
  render() {
    
    // ...
    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }
    // ...
  }
}
```

Finally, we can attach a click handler (using the `onClick` prop) on the icon element to call our new `showSearch()` method. The entire updated source for our `Header` component looks like this:

```javascript
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    }
  }

  // toggle visibility when run on the state
  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }

  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = ["searchInput"];

    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }

    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">
          {this.props.title}
        </span>

        <input
          type="text"
          className={searchInputClasses.join(' ')}
          placeholder="Search ..." />

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"></div>
      </div>
    )
  }
}
```

Try clicking on the search icon and watch the input field appear and disappear (the animation effect is handled by CSS animations).

<div class="demo" id="demo3"></div>

## Input events

Whenever we build a form in React, we'll use the input events offered by React. Most notably, we'll use the `onSubmit()` and `onChange()` props most often.

Let's update our search box demo to capture the text inside the search field when it updates. Whenever an `<input />` field has the `onChange()` prop set, it will call the function _every time the field changes_. When we click on it and start typing, the function will be called.

Using this prop, we can capture the value of the field in our state.

Rather than updating our `<Header />` component, let's create a new child component to contain a `<form />` element. By moving the form-handling responsibilities to it's own form, we can simplify the `<Header />` code and we can call up to the parent of the header when our user submits the form (this is a usual React pattern).

Let's create a new component we'll call `SearchForm`. This new component is a stateful component as we'll need to hold on to the value of the search input (track it as it changes):

```javascript
class SearchForm extends React.Component {
  // ...
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }
  // ...
}
```

Now, we already have the HTML for the form written in the `<Header />` component, so let's grab that from our `Header` component and return it from our `SearchForm.render()` function:

```javascript
class SearchForm extends React.Component {
  // ...
  render() {
    const { searchVisible } = this.props;
    let searchClasses = ["searchInput"];
    if (searchVisible) {
      searchClasses.push("active");
    }

    return (
      <form>
        <input
          type="search"
          className={searchClasses.join(" ")}
          placeholder="Search ..."
        />
      </form>
    );
  }
}
```

Now that we've moved some code from the `Header` component to the `SearchForm`, let's update its `render` method to incorporate the `SearchForm`

```javascript
class Header extends React.Component {
  // ...
  render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">{this.props.title}</span>

        <SearchForm />

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"
        ></div>
      </div>
    );
  }
}
```

Notice that we lost the styles on our `<input />` field. Since we no longer have the `searchVisible` state in our new component, we can't use it to style the `<input />` any longer. _However_, we can pass a prop from our `Header` component that tells the `SearchForm` to render the input as visible.

Let's define the `searchVisible` prop (using `PropTypes`, of course) and update the `render` function to use the new prop value to show (or hide) the search `<input />`. We'll also set a default value for the visibility of the field to be false (since our `Header` shows/hides it nicely):

```javascript
class SearchForm extends React.Component {
  // ...
}

SearchForm.propTypes = {
  searchVisible: PropTypes.bool
}
  
SearchForm.defaultProps = {
  searchVisible: false
};
```

> In case you forgot to include `PropTypes` package in your page just add the following `script` tag in your page
>```html
><script src="https://unpkg.com/prop-types@15.6/prop-types.min.js"></script>
>```

Finally, let's pass the `searchVisible` state value from `Header` as a prop to `SearchForm`

```javascript
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">{this.props.title}</span>

        <SearchForm searchVisible={this.state.searchVisible} />

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"
        ></div>
      </div>
    );
  }
}
```

<div class="demo" id="searchStylesDemo"></div>

Now we have our styles back on the `<input />` element, let's add the functionality for when the user types in the search box, we'll want to capture the value of the search field. We can achieve this workflow by attaching the `onChange` prop to the `<input />` element and passing it a function to call every time the `<input />` element is changed.

```javascript
class SearchForm extends React.Component {
  // ...
  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }
  // ...
  render() {
    const { searchVisible } = this.state;
    let searchClasses = ['searchInput']
    if (searchVisible) {
      searchClasses.push('active')
    }

    return (
      <form>
        <input
          type="search"
          className={searchClasses.join(" ")}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..."
        />
      </form>
    );
  }
}
```

When we type in the field, the `updateSearchInput()` function will be called. We'll keep track of the value of the form by updating the state. In the `updateSearchInput()` function, we can call directly to `this.setState()` to update the state of the component.

> The value is held on the `event` object's target as `event.target.value`.

```javascript
class SearchForm extends React.Component {
  // ...
  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }
  // ...
}
```

> #### Controlled vs. uncontrolled
>
> We're creating what's known as an **uncontrolled** component as we're not setting the value of the `<input />` element. We can't provide any validation or post-processing on the input text value as it stands right now.
>
> If we want to validate the field or manipulate the value of the `<input />` component, we'll have to create what is called a **controlled** component, which really just means that we pass it a value using the `value` prop. A controlled component version's `render()` function would look like:
>
> ```javascript
> class SearchForm extends React.Component {
>   render() {
>     return (
>       <input
>         type="search"
>         value={this.state.searchText}
>         className={searchInputClasses}
>         onChange={this.updateSearchInput.bind(this)}
>         placeholder="Search ..." />
>     );
>   }
> }
> ```

As of now, we have no way to actually submit the form, so our user's can't really search. Let's change this. We can capture the form submission by using the `onSubmit` prop on the `<form />` element.

Let's update the `render()` function to reflect this change.

```javascript
class SearchForm extends React.Component {
  // ...
  submitForm(event) {
    event.preventDefault();
  }
  // ...
  render() {
    const { searchVisible } = this.props;
    let searchClasses = ['searchInput']
    if (searchVisible) {
      searchClasses.push('active')
    }

    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input
          type="search"
          className={searchClasses.join(' ')}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..." />
      </form>
    );
  }
}
```

> We immediately call `event.preventDefault()` on the `submitForm()` function. This stops the browser from bubbling the event up which would causes the default behavior of the entire page to reload (the default function when a browser submits a form).

Now when we type into the `<input />` field and press enter, the `submitForm()` function gets called with the event object.

So... great, we can submit the form and stuff, but when do we actually do the searching? For demonstration purposes right now, we'll pass the search text up the parent-child component chain so the `Header` can decide _what_ to search.

> The `SearchForm` component certainly doesn't know what it's searching, so we'll have to pass the responsibility up the chain. We'll use this callback strategy quite a bit.

In order to pass the search functionality up the chain, our `SearchForm` will need to accept a prop function to call when the form is submitted. Let's define a prop we'll call `onSubmit` that we can pass to our `SearchForm` component. Being good developers, we'll also add a default `prop` value and a `propType` for this `onSubmit` function. Since we'll want to make sure the `onSubmit()` is defined, we'll set the `onSubmit` prop to be a required prop:

```javascript
class SearchForm extends React.Component {
  // ...
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool
}

SearchForm.defaultProps = {
  onSubmit: () => {},
  searchVisible: false
}
```

When the form is submitted, we can call this function directly from the `props`. Since we're keeping track of the search text in our state, we can call the function with the `searchText` value in the state so the `onSubmit()` function only gets the value and doesn't need to deal with an event.

```javascript
class SearchForm extends React.Component {
  // ...
  submitForm(event) {
    // prevent the form from reloading the entire page
    event.preventDefault();
    // call the callback with the search value
    this.props.onSubmit(this.state.searchText);
  }
}
```

Now, when the user presses enter we can call this `onSubmit()` function passed in the `props` by our `Header` component.

Let's add the `onSubmit` prop to the `SearchForm` in the `Header` component:

```javascript
class Header extends React.Component {
  // ...
  render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">{this.props.title}</span>

        <SearchForm searchVisible={this.state.searchVisible} onSubmit={this.props.onSearch}/>

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"
        ></div>
      </div>
    );
  }
}
```

Now we have a search form component we can use and reuse across our app. Of course, we're not actually searching anything yet. Let's fix that and implement search.

## Implementing search

To implement search in our component, we'll want to pass up the search responsibility one more level from our `Header` component to a container component we'll call `Panel`.

First things first, let's implement the same pattern of passing a callback to a parent component from within a child component from the `Panel` to the `Header` component.

On the `Header` component, let's update the `propTypes` for a prop we'll define as a prop called `onSearch`:

```javascript
class Header extends React.Component {
  // ...
}
Header.propTypes = {
  onSearch: PropTypes.func
}
```

Here's our `Panel` component:

```javascript
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: data,
    };
  }

  render() {
    const { activities } = this.state; // ES6 destructuring

    return (
      <div>
        <Header
          title="Github activity" />
        <div className="content">
          <div className="line" />
          {/* Timeline item */}
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    );
  }
}
```

> In any case, our `Panel` component is essentially a copy of our `Content` component we previously built on day 7.
> Make sure to include the `ActivityItem` component in your page.
> Also don't forget to include `Moment.js` in your file as it's used by `ActivityItem` to format dates. Add the following `script` tag in your page
> ```html
> <script src="https://unpkg.com/moment@2.24.0/min/moment.min.js"></script>
>```

> Notice that our virtual tree looks like this:
>
> ```javascript
> <Panel>
>   <Header>
>     <SearchForm></SearchForm>
>   </Header>
> </Panel>
> ```
>
> When the `<SearchForm />` is updated, it will pass along it's awareness of the search input's change to it's parent, the `<Header />`, when it will pass along upwards to the `<Panel />` component. This method is _very common_ in React apps and provides a good set of functional isolation for our components.

Back in our `Panel` component, we'll pass a function to the `Header` as the `onSearch()` prop on the `Header`. What we're saying here is that when the search form has been submitted, we want the search form to call back to the header component which will then call to the `Panel` component to handle the search.

Since the `Header` component doesn't control the content listing, the `Panel` component does, we _have_ to pass the responsibility one more level up, as we're defining here.

In order to actually handle the searching, we'll need to pass an `onSearch()` function to our `Header` component. Let's define an `onSearch()` function in our `Panel` component and pass it off to the `Header` props in the `render()` function:

```javascript
class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: data,
    };
  }

  handleSearch(val) {
    // handle search here
  }

  render() {
    const { activities } = this.state; // ES6 destructuring
    return (
      <div>
        <Header
          title="Github activity"
          onSearch={this.handleSearch.bind(this)}
        />
        <div className="content">
          <div className="line" />
          {/* Timeline item */}
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    );
  }
}
```

All we did here was add a `handleSearch()` function and pass it to the header. Now when the user types in the search box, the `handleSearch()` function on our `Panel` component will be called.

Let's update our `handleSearch` method to actually do the searching:

```javascript
class Panel extends React.Component {
  // ...
  handleSearch(val) {
    // resets the data if the search value is empty
    if (val === "") {
      this.setState({
        activities: data
      });
    } else {
      const { activities } = this.state;
      const filtered = activities.filter(
        a => a.actor && a.actor.login.match(val)
      );
      this.setState({
        activities: filtered
      });
    }
  }
  // ...
}
```

All the `activities.filter()` function does is run the function passed in for every element and it filters _out_ the values that return falsy values, keeping the ones that return truthy ones. Our search function simply looks for a match on the Github activity's `actor.login` (the Github user) to see if it regexp-matches the `val` value.

With the `handleSearch()` function updated, our search is complete.

Try searching for `auser`.

Now we have a 3-layer app component that handles search from a nested child component. We jumped from beginner to intermediate with this post. Pat yourself on the back. This was some hefty material. Make sure you understand this because we'll use these concepts we covered today quite often.

In the next section, we'll jump out and look at building _pure_ components.

<div class="demo" id="searchDemo"></div>


