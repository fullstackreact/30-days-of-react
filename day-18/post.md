---
page_id: 30-days-of-react/day-18
series: 30-days-of-react
permalink: day-18
day: 18
title: Introduction to Flux
description: >-
  Handling data inside a client-side application is a complex task. Today we're
  looking at a one method of handling complex data proposed by Facebook called
  the Flux Architecture.
dayDir: '18'
hero_image: /assets/images/series/30-days-of-react/headings/18.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/18.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/18_wide.jpg
date: 'Wed Oct 21 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-18
includeFile: ./../_params.yaml
---

As our applications get bigger and more complex, we'll need a better data handling approach. With more data, we'll have more to keep track of. 

Our code is required to handle more data and application state with new features. From asynchronous server responses to locally-generated, unsynchronized data, we have to not only keep track of this data, but also tie it to the view in a sane way.

Recognizing this need for data management, the Facebook team released a pattern for dealing with data called [Flux](https://facebook.github.io/flux/docs/overview.html). 

Today, we're going to take a look at the Flux architecture, what it is and why it exists. 

## What is flux

Flux is a pattern for managing how data flows through a React application. As we've seen, the preferred method of working with React components is through passing data from one parent component to it's children components. The Flux pattern makes this model the default method for handling data.

There are three distinct roles for dealing with data in the flux methodology: 

* Dispatcher
* Stores
* Views (our components)

The major idea behind Flux is that there is a single-source of truth (the stores) and they can only be updated by triggering _actions_. The actions are responsible for calling the dispatcher, which the stores can _subscribe_ for changes and update their own data accordingly.

When a dispatch has been triggered, and the store updates, it will emit a change event which the views can rerender accordingly. 

<img style="width: 100%" src="https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-1300w.png" alt="flux diagram" />

This may seem unnecessarily complex, but the structure makes it incredibly easy to reason about where our data is coming from, what causes it's changes, how it changes, and lets us track specific user flows, etc. 

The key idea behind _Flux_ is:

Data flows in one direction and kept entirely in the stores.

## Implementations

Although we can create our own flux implementation, many have already created some fantastic libraries we can pick from.

* [Facebook's flux](https://github.com/facebook/flux)
* [alt](http://alt.js.org/)
* [nuclear-js](https://optimizely.github.io/nuclear-js/)
* [Fluxible](http://fluxible.io/)
* [reflux](https://github.com/reflux/refluxjs)
* [Fluxxor](http://fluxxor.com/)
* [flux-react](https://github.com/christianalfoni/flux-react)
* And more... many many more

> ## Plug for fullstackreact
>
> We discuss this material in-depth about Flux, using libraries, and even implementing our own version of flux that suits us best.
> Check it out at [fullstackreact.com](https://fullstackreact.com)

It can be pretty intense trying to pick the _right_ choice for our applications. Each has their own features and are great for different reasons. However, to a large extent, the React community has focused in on using another flux tool called [Redux](http://redux.js.org/).

## [Redux](http://redux.js.org/)

Redux is a small-ish library that takes it's design inspiration from the Flux pattern, but is not itself a pure flux implementation. It provides the same general principles around how to update the data in our application, but in slightly different way.

Unlike Flux, Redux does not use a dispatcher, but instead it uses pure functions to define data mutating functions. It still uses stores and actions, which can be tied directly to React components.

The [3 major principles](http://redux.js.org/docs/introduction/ThreePrinciples.html) of Redux we'll keep in mind as we implement Redux in our app are:

* Updates are made with pure functions (in reducers)
* `state` is a read-only property
* `state` is the single source of truth (there is only one `store` in a Redux app)

One big difference with Redux and Flux is the concept of middleware. Redux added the idea of middleware that we can use to manipulate actions as we receive them, both coming in and heading out of our application. We'll discuss them in further detail in a few days.

In any case, this is a lot of introduction to the flux pattern. Tomorrow we'll actually start moving our data to use Redux. 

