---
page_id: 30-days-of-react/day-22
series: 30-days-of-react
permalink: day-22
day: 22
title: Introduction to Testing
description: >-
  Test suites are an upfront investment that pay dividends over the lifetime of
  a system. Today we'll introduce the topic of testing and discuss the different
  types of tests we can write.
dayDir: '22'
hero_image: /assets/images/series/30-days-of-react/headings/22.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/22.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/22_wide.jpg
date: 'Wed Oct 25 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-22
includeFile: ./../_params.yaml
---

Okay, close your eyes for a second... wait, don't... it's hard to read with your eyes closed, but imagine for a moment your application is getting close to your first deployment.

It's getting close and it gets tiring to constantly run through the features in your browser... and so inefficient.

There must be a better way...

## Testing

When we talk about testing, we're talking about the process of automating the process of setting up and measuring our assumptions against assertions of functionality about our application.

When we talk about front-end testing in React, we're referring to the process of making assertions about what our React app renders and how it responds to user interaction.

We'll discuss three different software testing paradigms: unit testing, functional testing, and integration testing.

#### Unit tests

Unit testing refers to testing individual pieces (or units, hence the name) of our our code so we can be confident these specific pieces of code work as we expect.

For example, we have a few reducers already in our application. These reducers comprise a single function that we can make assertions on under different scenarios.

In React, Unit tests typically do not require a browser, can run incredibly quickly (no writing to the DOM required), and the assertions themselves are usually simple and terse.

We'll mostly concentrate on answering the question: with a given set of inputs (state and props), does the output match our expectations of what _should_ be in the virtual dom. In this case, we're testing the rendering output.

#### Functional testing

With functional testing, we're focused on testing the behavior of our component. For instance, if we have a navigation bar with a user login/logout button, we can test our expectations that:

* Given a logged in user, the navbar renders a button with the text _Logout_
* Given no logged in user, the navbar renders a button with the text _Login_

Functional tests usually run in isolation (i.e. testing the component functionality without the rest of the application).

#### Integration testing

Finally, the last type of testing we'll look at is integration testing. This type of testing tests the entire service of our application and attempts to replicate the experience an end-user would experience when using our application.

On the order of speed and efficiency, integration testing is incredibly slow as it needs to run expectations against a live, running browser, where as unit and functional tests can run quite a bit faster (especially in React where the functional test is testing against the in-memory virtual dom rather than an actual browser render).

When testing React components, we will test both our expectations of what is contained in the virtual dom as well as what is reflected in the actual dom.

## The tools

We're going to use a testing library called called [jasmine](http://jasmine.github.io) to provide a readable testing language and assertions.

As far as test running, there is a general debate around which test runner is the easiest/most efficient to work with, largely between [mocha](https://mochajs.org) and [jest](https://facebook.github.io/jest).

We're going to use Jest in our adventure in testing with React as it's the _official_ (take this with a grain of salt) test runner. Most of the code we'll be writing will be in Jasmine, so feel free to use mocha, if it's your test library of choice.

Finally, we'll use a library we cannot live without called [Enzyme](https://github.com/airbnb/enzyme) which puts the fun back in FUNctional testing. Enzyme provides some pretty nice React testing utility functions that make writing our assertions a cinch.

Tomorrow, we'll get our application set up with the testing tooling in place so that we can start testing our application and be confident it works as we expect. See you tomorrow!
