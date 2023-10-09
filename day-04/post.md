---
page_id: 30-days-of-react/day-4
series: 30-days-of-react
permalink: day-4
title: Creating Child/Parent Components With React
description: >-
  Awesome, we've built our first component. Now let's get a bit fancier and
  start building a more complex interface.
hero_image: /assets/images/series/30-days-of-react/headings/4.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/4.jpg
dayDir: "04"
day: 4
introBannerUrl: /assets/images/series/30-days-of-react/headings/4_wide.jpg
date: "Fri Oct 07 2016 21:29:42 GMT-0700 (PDT)"
imagesDir: /assets/images/series/30-days-of-react/day-4
includeFile: ./../_params.yaml
---

On day 3 of _30 Days of React_, we built our first reusable React component. Let's continue working with our `Journal` component and implementing dynamic features with React.

One of the most common features is to have a timeline, or some type of user activity feed.

In our case, that might be a feed of user-submitted entries in the journal. 

> ## Styles
>
> This course is focused on React, but our web application still needs some CSS styles. We won't walk you through CSS styles, but check out `styles.css` file if you want to learn more about specific styles applied to our React app. 
>
> Also make sure to set appropriate `className` values to make sure elements look as they should.
>
> We might also use additional libraries that provide pre-defined classes and fonts like font-awesome.
>
> The list of installed packages will be listed on bottom-left corner in CodeSandbox.

Hopefully by now you see the value of reusable components - that they save time on web development, and make debugging much easier. 
Let's revisit latest example from our app:

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

function Entry(props) {
  return (
    <div className="entry">
      <p>{props.text}</p>
    </div>
  );
}
```

Let's try to improve the header, make it look better as well as add few basic features. 

To do this, we will have to create a separate `<Header>` component.

Let's also create a `<Body>` component to store entries of the journal.

So our parent `Journal` will render two components, `<Header>` and `<Body>`. 

<img class="wide" src="/assets/series/30-days-of-react/images/04/breakdown.png" />

We can chop up the content part of the component into individual places of concern. There are 3 different _item_ components inside the content part.

<img class="wide" src="/assets/series/30-days-of-react/images/04/breakdown-2.png" />

> If we wanted to go one step further, we could even break down the title bar into 3 component parts, the _menu_ button, the _title_, and the _search_ icon. We could dive even further into each one of those if we needed to.
>
> Deciding how deep to split your components is more of an art than a science and is a skill you'll develop with experience.

In any case, it's usually a good idea to start looking at applications using the idea of _components_. By breaking our app down into components it becomes easier to test and easier to keep track of what functionality goes where.

## The container component

To build our notifications app, let's start by building the container to hold the entire app. Our container is simply going to be a wrapper for the other two components.

None of these components will require special functionality (yet), so they will look similar to our `HelloWorld` component in that it's just a component with a single render function.

Let's build a wrapper component we'll call `App` that might look similar to this:

```javascript
class App extends React.Component {
  render() {
    return (
      <div className="notificationsFrame">
        <div className="panel">{/* content goes here */}</div>
      </div>
    );
  }
}
```

> Notice that we use the attribute called `className` in React instead of the HTML version of `class`. Remember that we're not writing to the DOM directly and thus not writing HTML, but JSX (which is just JavaScript).
>
> The reason we use `className` is because `class` is a reserved word in JavaScript. If we use `class`, we'll get an error in our console.

## Child components

When a component is nested inside another component, it's called a _child_ component. A component can have multiple children components. The component that uses a child component is then called it's _parent_ component.

With the wrapper component defined, we can build our `title` and `content` components by, essentially, grabbing the source from our original design and putting the source file into each component.

For instance, the header component looks like this, with a container element `<div className="header">`, the menu icon, a title, and the search bar:

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
        <span className="title">Timeline</span>

        <input type="text" className="searchInput" placeholder="Search ..." />

        <div className="fa fa-search searchIcon"></div>
      </div>
    );
  }
}
```

<div class="demo" id="headerDemo"></div>

And finally, we can write the `Content` component with timeline items. Each timeline item is wrapped in a single component, has an avatar associated with it, a timestamp, and some text.

```javascript
class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="line"></div>

        {/* Timeline item */}
        <div className="item">
          <div className="avatar">
            <img
              alt="Doug"
              src="http://www.croop.cl/UI/twitter/images/doug.jpg"
            />
            Doug
          </div>

          <span className="time">An hour ago</span>
          <p>Ate lunch</p>
          <div className="commentCount">2</div>
        </div>

        {/* ... */}
      </div>
    );
  }
}
```

> In order to write a comment in a React component, we have to place it in the brackets as a multi-line comment in JavaScript.
>
> Unlike the HTML comment that looks like this:
>
> ```html
> <!-- this is a comment in HTML -->
> ```
>
> the React version of the comment must be in brackets:
>
> ```html
> {/* This is a comment in React */}
> ```

## Putting it all together

Now that we have our two _children_ components, we can set the `Header` and the `Content` components to be _children_ of the `App` component. Our `App` component can then use these components _as if they are HTML elements built-in to the browser_. Our new `App` component, with a header and content now looks like:

```javascript
class App extends React.Component {
  render() {
    return (
      <div className="notificationsFrame">
        <div className="panel">
          <Header />
          <Content />
        </div>
      </div>
    );
  }
}
```

<div class="demo" id="demo2"></div>

> Note!
>
> Don't forget to call `ReactDOM.render` to place your app on the page
>
> ```javascript
> var mountComponent = document.querySelector("#app");
> ReactDOM.render(<App />, mountComponent);
> ```

With this knowledge, we now have the ability to write multiple components and we can start to build more complex applications.

However, you may notice that this app does not have any user interaction nor custom data. In fact, as it stands right now our React application isn't that much easier to build than straight, no-frills HTML.

In the next section, we'll look how to make our component more dynamic and become _data-driven_ with React.
