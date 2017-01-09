---
page_id: 30-days-of-react/day-23
series: 30-days-of-react
permalink: day-23
title: Implementing Tests
description: Yesterday we examined the different types of tests that we write in React. Today we'll see it in action. We'll install the dependencies required to set up tests as well as write our first assertions.
articleEntry: '30-days/23'
hero_image: /assets/images/series/30-days-of-react/headings/23.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/23.jpg
codeRoot: '__FILE_PATH__/code/23'
imagesDir: '../../../assets/images/series/30-days-of-react/23'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/23_wide.jpg'
date: Wed Oct 27 2016 21:29:42 GMT-0700 (PDT)
---

Let's get our application set up to be tested. Since we're going to be using a few different libraries, we'll need to install them before we can use them (obviously).

## Dependencies

We're going to use the following `npm` libraries:

### jest/jest-cli

[Jest](https://facebook.github.io/jest/) is the official testing framework released by Facebook and is a fantastic testing framework for testing React applications. It is incredibly fast, provides sandboxed testing environments, support for snapshot testing, and more.

### babel-jest/babel-preset-stage-0

We'll write our tests using the stage 0 (or ES6-edge functionality), so we'll want to make sure our test framework can read and process our ES6 in our tests and source files.

### sinon

Sinon is a test utility library which provides a way for us to write spies, stubs, and mocks. We'll discuss what these are when we need them, but we'll install the library for now.

### react-addons-test-utils/enzyme

The `react-addons-test-utils` package contains testing utilities provided by the React team.

[Enzyme](http://airbnb.io/enzyme/), a JavaScript testing library built/maintained by Airbnb is a bit easier to work with and provides really nice methods for traversing/manipulating React's virtual DOM output. While we'll start with `react-addons-test-utils`, we'll transition to using Enzyme as we prefer using it in our tests.

### react-test-renderer

The `react-test-renderer` library allows us to use the snapshot feature from the jest library. Snapshots are a way for Jest to serialize the rendered output from the virtual DOM into a file which we can automate comparisons from one test to the next.

### redux-mock-store

The [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) library allows us to easily make a redux store for testing. We'll use it to test our action creators, middleware, and our reducers.

To install all of these libraries, we'll use the following `npm` command in the terminal while in the root directory of our projects:

```bash
npm install --save-dev babel-jest babel-preset-stage-0 enzyme jest-cli react-addons-test-utils react-test-renderer redux-mock-store sinon
```

## Configuration

We'll also need to configure our setup. First, let's add an npm script that will allow us to run our tests using the `npm test` command. In our `package.json` file in the root of our project, let's add the `test` script. Find the scripts key in the `package.json` file and add the `test` command, like so:

```javascript
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "jest"
  },
}
```

Next, we'll need to configure `jest`. One of the nice (and often complained about) features of jest is its automocking feature. Personally, I prefer to use automocking as it forces us to focus on what we are testing, but feel free to skip this if you prefer not to use automocking.

Since automocking is disabled by default, we'll need to enable it (if we want to use it). Additionally, we'll need to set a few libraries to be skipped when mocking by default. Jest lets us do this by setting the `unmockedModulePathPatterns` setting.

Let's update our `package.json` with a Jest key:

```javascript
{
  "jest": {
    "automock": true,
    "unmockedModulePathPatterns": [
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-addons-test-utils",
      "<rootDir>/node_modules/fbjs",
      "<rootDir>/node_modules/enzyme",
      "<rootDir>/node_modules/sinon",
      "<rootDir>/node_modules/redux",
      "<rootDir>/node_modules/react-redux"
    ]
  },
}
```

> The `<rootDir>` string in there is automatically translated by Jest to be the root directory of our project.

## Writing tests

Let's confirm that our test setup is working properly. Jest will automatically look for test files in the entire tree in a directory called `__tests__` (yes, with the underscores). Let's create our first `__tests__` directory in our `src/components/Nav` directory and create our first test file:

```bash
mkdir src/components/Nav/__tests__
touch src/components/Nav/__tests__/Navbar-test.js
```

The `Navbar-test.js` file will include all the tests for our `Navbar` component (as indicated by the filename). Let's create our first test.

We'll write our tests using the [Jasmine](http://jasmine.github.io) framework. Jasmine provides a few methods we'll use quite a bit. Both of the following methods accept two arguments, the first being a description string and the second a function to execute:

* `describe()`
* `it()`

The `describe()` function provides a way for us to group our tests together in logical bundles. Since we're writing a bunch of tests for our `Navbar`, we'll use the `describe()` function in our test to indicate we're testing the Navbar.

In the `src/components/__tests__/Navbar-test.js` file, let's add the describe block:

```javascript
describe('Navbar', () => {

});
```

We can add our first test using the `it()` function. The `it()` function is where we will set our expectations. Let's set up our tests with our first expectations, one passing and one failing so we can see the difference in output.

In the same file, let's add two tests:

```javascript
describe('Navbar', () => {

  it('passing test', () => {
    expect(true).toBeTruthy();
  })

  it('failing test', () => {
    expect(false).toBeTruthy();
  })
})
```

We'll look at the possible expectations we can set in a moment. First, let's run our tests.

## Executing tests

The jest-cli package provides a command called `jest` which will automatically find our tests and run them.

> You can install the `jest-cli` package using the `--global` flag with npm to get jest in your PATH.
>
> Alternatively, you can call the `jest` command in the local directory using the direct path of: `./node_modules/.bin/jest`

In the terminal, at the root of our project, let's execute the navbar tests using the `jest` command (or, since we set up our `npm test` script, we can run this with `npm test`). We'll use the `jest` command with the `--verbose` flag so see extra description:

```bash
jest --verbose src/components/Nav
```

<img class="wide" src="{{ imagesDir }}/first-tests.jpg" />

From this output, we can see the two tests with one passing test (with a green checkmark) and one failing test (with the red x and a description of the failure).

Let's update the second test to make it pass by changing the expectation to `toBeFalsy()`:

```
describe('Navbar', () => {

  it('passing test', () => {
    expect(true).toBeTruthy();
  })

  it('failing test', () => {
    expect(false).toBeTruthy();
  })
})
```

Re-running the test, we can see we have two passing tests

```bash
jest --verbose src/components/Nav
```

<img class="wide" src="{{ imagesDir }}/second-tests.jpg" />

## Expectations

Jest provides a few global commands in our tests by default (i.e. things you don't need to require). One of those is the `expect()` command. The `expect()` command has a few expectations which we can call on it, including the two we've used already:

* `toBeTruthy()`
* `toBeFalsy()`
* `toBe()`
* `toEqual()`
* `toBeDefined()`
* `toBeCalled()`
* etc.

The entire suite of expectations is available on the jest documentation page at: [https://facebook.github.io/jest/docs/api.html#writing-assertions-with-expect](https://facebook.github.io/jest/docs/api.html#writing-assertions-with-expect).

The `expect()` function takes a single argument: the value or function that returns a value to be tested. For instance, our two tests we've already writen pass the boolean values of `true` and `false`.

Now that we've written our first tests and confirmed our setup, we'll actually get down to testing our Navbar component tomorrow. Great job today and see you tomorrow!
