---
page_id: 30-days-of-react/day-5
series: 30-days-of-react
permalink: day-5
day: 5
title: Data-Driven
description: >-
  Hard-coding data in our applications isn't exactly ideal. Today, we'll set up
  our components to be driven by data to them access to external data.
dayDir: '05'
hero_image: /assets/images/series/30-days-of-react/headings/5.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/5.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/5_wide.jpg
date: 'Sat Oct 08 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-5
includeFile: ./../_params.yaml
---

Through this point, we've written our first components and set them up in a child/parent relationship. However, we haven't yet tied any data to our React components. Although it's a more pleasant experience (in our opinion) writing a website in React, we haven't taken advantage of the power of React to display any dynamic data.

Let's change that today.

## Going data-driven

Recall, yesterday we built the beginning of our timeline component that includes a header and an activity list:

<div class="demo" id="demo1"></div>

We broke down our demo into components and ended up building three separate components with static JSX templates. It's not very convenient to have to update our component's template everytime we have a change in our website's data.

Instead, let's give the components data to use to display. Let's start with the `<Header />` component. As it stands right now, the `<Header />` component only shows the title of the element as `Timeline`. It's a nice element and it would be nice to be able to reuse it in other parts of our page, but the title of `Timeline` doesn't make sense for every use.

Let's tell React that we want to be able to set the title to something else.

## Introducing props

React allows us to send data to a component in the same syntax as HTML, using attributes or _properties_ on a component. This is akin to passing the `src` attribute to an image tag. We can think about the property of the `<img />` tag as a `prop` we're setting on a component called `img`.

We can access these properties inside a component as `this.props`. Let's see `props` in action.

Recall, we defined the `<Header />` component as:

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

When we use the `<Header />` component, we placed it in our `<App />` component as like so:

```javascript
<Header />
```

<div class="demo" id="headerDemo1"></div>

We can pass in our `title` as a prop as an attribute on the `<Header />` by updating the usage of the component setting the attribute called `title` to some string, like so:

```javascript
<Header title="Timeline" />
```

<div class="demo" id="headerDemoWithProps"></div>

Inside of our component, we can access this `title` prop from the `this.props` property in the `Header` class. Instead of setting the title statically as `Timeline` in the template, we can replace it with the property passed in.

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

> We've also updated the code slightly to get closer to what our final `<Header />` code will look like, including adding a `searchIcon` and a few elements to style the `menuIcon`.

Now our `<Header />` component will display the string we pass in as the `title` when we call the component. For instance, calling our `<Header />` component four times like so:

```javascript
<Header title="Timeline" />
<Header title="Profile" />
<Header title="Settings" />
<Header title="Chat" />
```

Results in four `<Header />` components to mount like so:

<div class="demo" id="demo2"></div>

Pretty nifty, ey? Now we can reuse the `<Header />` component with a dynamic `title` property.

We can pass in more than just strings in a component. We can pass in numbers, strings, all sorts of objects, and even functions! We'll talk more about how to define these different properties so we can build a component api later.

Instead of statically setting the content and date let's take the `Content` component and set the timeline content by a data variable instead of by text. Just like we can do with HTML components, we can pass multiple `props` into a component.

Recall, yesterday we defined our `Content` container like this:

```javascript
class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="line"></div>

      {/* Timeline item */}
        <div className="item">
          <div className="avatar">
            <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
            Doug
          </div>

          <span className="time">
            An hour ago
          </span>
          <p>Ate lunch</p>
          <div className="commentCount">
            2
          </div>
        </div>

        {/* ... */}

      </div>
    )
  }
}
```

As we did with `title`, let's look at what `props` our `Content` component needs:

* A user's avatar image
* A timestamp of the activity
* Text of the activity item
* Number of comments

Let's say that we have a JavaScript object that represents an activity item. We will have a few fields, such as a string field (text) and a date object. We might have some nested objects, like a `user` and `comments`. For instance:

```javascript
{
  timestamp: new Date().getTime(),
  text: "Ate lunch",
  user: {
    id: 1,
    name: 'Nate',
    avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
  },
  comments: [
    { from: 'Ari', text: 'Me too!' }
  ]
}
```

Just like we passed in a string title to the `<Header />` component, we can take this activity object and pass it right into the `Content` component. Let's convert our component to display the details from this activity inside it's template.

In order to pass a dynamic variable's value into a template, we have to use the template syntax to render it in our template. For instance:

```javascript
class Content extends React.Component {
  render() {
    const {activity} = this.props; // ES6 destructuring

    return (
      <div className="content">
        <div className="line"></div>

        {/* Timeline item */}
        <div className="item">
          <div className="avatar">
            <img
              alt={activity.text}
              src={activity.user.avatar} />
            {activity.user.name}
          </div>

          <span className="time">
            {activity.timestamp}
          </span>
          <p>{activity.text}</p>
          <div className="commentCount">
            {activity.comments.length}
          </div>
        </div>
      </div>
    )
  }
}
```

> We've use a little bit of ES6 in our class definition on the first line of the `render()` function called _destructuring_. The two following lines are functionally equivalent:
>
> ```javascript
> // these lines do the same thing
> const activity = this.props.activity;
> const {activity} = this.props;
> ```
> Destructuring allows us to save on typing and define variables in a shorter, more compact way.

We can then _use_ this new content by passing in an object as a prop instead of a hard-coded string. For instance:

```javascript
<Content activity={moment1} />
```

<div class="demo" id="demo3"></div>

Fantastic, now we have our activity item driven by an object. However, you might have noticed that we would have to implement this multiple times with different comments. Instead, we could pass an array of objects into a component.

Let's say we have an object that contains multiple activity items:

```javascript
const activities = [
  {
    timestamp: new Date().getTime(),
    text: "Ate lunch",
    user: {
      id: 1, name: 'Nate',
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: 'Ari', text: 'Me too!' }]
  },
  {
    timestamp: new Date().getTime(),
    text: "Woke up early for a beautiful run",
    user: {
      id: 2, name: 'Ari',
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: 'Nate', text: 'I am so jealous' }]
  },
]
```

We can rearticulate our usage of `<Content />` by passing in multiple activities instead of just one:

```javascript
<Content activities={activities} />
```

However, if we refresh the view nothing will show up! We need to first update our `Content` component to accept multiple activities. As we learned about previously, JSX is really _just_ JavaScript executed by the browser. We can execute JavaScript functions inside the JSX content as it will just get run by the browser like the rest of our JavaScript.

Let's move our activity item JSX inside of the function of the `map` function that we'll run over for every item.

```javascript
class Content extends React.Component {
  render() {
    const {activities} = this.props; // ES6 destructuring

    return (
      <div className="content">
        <div className="line"></div>

        {/* Timeline item */}
        {activities.map((activity) => {
          return (
            <div className="item">
              <div className="avatar">
                <img
                  alt={activity.text}
                  src={activity.user.avatar} />
                {activity.user.name}
              </div>

              <span className="time">
                {activity.timestamp}
              </span>
              <p>{activity.text}</p>
              <div className="commentCount">
                {activity.comments.length}
              </div>
            </div>
          );
        })}

      </div>
    )
  }
}
```

<div class="demo" id="demo4"></div>

Now we can pass any number of activities to our array and the `Content` component will handle it, however if we leave the component right now, then we'll have a relatively complex component handling both containing and displaying a list of activities. Leaving it like this really isn't the React way.

## ActivityItem

Here is where it makes sense to write one more component to contain displaying a single activity item and then rather than building a complex `Content` component, we can move the responsibility. This will also make it easier to test, add functionality, etc.

Let's update our `Content` component to display a list of `ActivityItem` components (we'll create this next).

```javascript
class Content extends React.Component {
  render() {
    const {activities} = this.props; // ES6 destructuring

    return (
      <div className="content">
        <div className="line"></div>

        {/* Timeline item */}
        {activities.map((activity) => (
          <ActivityItem
            activity={activity} />
        ))}

      </div>
    )
  }
}
```

Not only is this much simpler and easier to understand, but it makes testing both components easier.

With our freshly-minted `Content` component, let's create the `ActivityItem` component. Since we already have the view created for the `ActivityItem`, all we need to do is copy it from what was our `Content` component's template as it's own module.

```javascript
class ActivityItem extends React.Component {
  render() {
    const {activity} = this.props; // ES6 destructuring

    return (
      <div className="item">
        <div className="avatar">
          <img
            alt={activity.text}
            src={activity.user.avatar} />
          {activity.user.name}
        </div>

        <span className="time">
          {activity.timestamp}
        </span>
        <p>{activity.text}</p>
        <div className="commentCount">
          {activity.comments.length}
        </div>
      </div>
    )
  }
}
```

<div class="demo" id="demo5"></div>

This week we updated our components to be driven by data by using the React `props` concept. In the next section, we'll dive into stateful components.

