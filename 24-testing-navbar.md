---
page_id: 30-days-of-react/day-24
series: 30-days-of-react
permalink: day-24
title: Testing the App
description: Let's start by looking at one feature of our application and thinking about where the edge cases are and what we assume will happen with the component.
dayDir: '24'
hero_image: /assets/images/series/30-days-of-react/headings/24.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/24.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/24_wide.jpg'
date: Wed Oct 27 2016 21:29:42 GMT-0700 (PDT)
---

Let's start with the `Navbar` component as it's the most complex in our current app.

The `Navbar` component is displayed at the top of our app with a small amount of logic around showing a button to login or logout, depending on the state of the current user (are they logged in or not):

<img class="wide" src="{{ imagesDir }}/navbar.jpg" />

We like to start out testing by listing our assumptions about a component and under what circumstances these assumptions are true. For instance, a list of assumptions we can make about our Navbar component might include the following:

* Under all circumstances, the navbar will be contained within a `<div />` with the class of `.navbar`
* Under all circumstances, we can assume there will be a link linking back to the homepage
* Under all circumstances, we assume the second link will be one that links to the about page
* When a current user is _not_ logged in, we can assume that the navbar will show a link to the login page with the text of login
* When we have a current user that is logged in, we assume the navbar will show a link to the logout page with the text of logout

These _assumptions_ will translate into our tests.

## Testing

Let's open the file `src/components/Nav/Navbar-test.js`. We left off with some dummy tests in this file, so let's clear those off and start with a fresh describe block:

```javascript
describe('Navbar', () => {
  // Tests go here
})
```

For every test that we write against React, we'll want to import react into our test file. We'll also want to bring in the react test utilities:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('Navbar', () => {
  // Tests go here
})
```

Since we're testing the `Navbar` component here, we'll also want to bring that into our workspace:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Navbar from '../Navbar';

describe('Navbar', () => {
  // Tests go here
})
```

Let's write our first test. Our first assumption is pretty simple to test. We're testing to make sure the element is wrapped in a `.navbar` class. With every test we'll write, we'll need to render our application into the working test document. The `react-addons-test-utils` library provides a function to do just this called `renderIntoDocument()`:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Navbar from '../Navbar';

describe('Navbar', () => {

  it('wraps content in a div with .navbar class', () => {
    const wrapper = TestUtils.renderIntoDocument(<Navbar />);
  });

})
```

If we run this test (even though we're not setting any expectations yet), we'll see that we have a problem with the testing code. React thinks we're trying to render an undefined component:

<img class="wide" src="{{ imagesDir }}/failing-test-1.jpg" />

As we mentioned yesterday, this is because jest provides a feature which creates mocks for every object in its workspace.

Since we haven't told jest we want it to _not_ create a mock for the `Navbar` component, it returns an undefined component. We can fix this by telling jest to `unmock` the component (by path) using the `jest.unmock()` function:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

describe('Navbar', () => {

  it('wraps content in a div with .navbar class', () => {
    const wrapper = TestUtils.renderIntoDocument(<Navbar />);
  });

})
```

The second issue we'll encounter when we write our first test: We're wanting to test to make sure we have the `<div></div>` element with a class of `navbar`. Let's find the element we expect to be in the DOM using another `TestUtils` function called `findRenderedDOMComponentWithClass()`.

The `findRenderedDOMComponentWithClass()` function accepts _two_ arguments. The first is the render tree (our `wrapper` object) and the second is the CSS class name we want it to look for:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

describe('Navbar', () => {

  it('wraps content in a div with .navbar class', () => {
    const wrapper = TestUtils.renderIntoDocument(<Navbar />);
    const node =
      TestUtils
        .findRenderedDOMComponentWithClass(wrapper, 'navbar');
  });

})
```

With that, we'll have our second error here if we run the tests:

<img class="wide" src="{{ imagesDir }}/failing-test-2.jpg" />

This test fails for a somewhat more obscure reason. Instead of using a React component class for `Navbar`, we're using a stateless function. React doesn't know how to access this element. To fix it, we can either rewrite the element to be a component class _or_ we can wrap it in a wrapper component class.

Since this is for tests, we prefer to use the latter option for testing. We generally have a class component available to our tests. For now, let's write this tiny class wrapper in the same test:

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

// Test wrapper
class TestWrapper extends React.Component {
  render() {
    return (<div>{this.props.children}</div>)
  }
}

describe('Navbar', () => {

  it('wraps content in a div with .navbar class', () => {
    // updating our rendering with our helper class
    const wrapper = TestUtils.renderIntoDocument(
      <TestWrapper><Navbar /></TestWrapper>
    );
    const node =
      TestUtils
        .findRenderedDOMComponentWithClass(wrapper, 'navbar');
  });

})
```

For now, this is enough to get into our document. We haven't actually made an expectation quite yet, so let's set one of those up right now. We expect that at least one element with the `.navbar` class will be found. We can set our expectation on the element to make sure it's defined:

```javascript
describe('Navbar', () => {

  it('wraps content in a div with .navbar class', () => {
    // updating our rendering with our helper class
    const wrapper = TestUtils.renderIntoDocument(
      <TestWrapper><Navbar /></TestWrapper>
    );
    const node =
      TestUtils
        .findRenderedDOMComponentWithClass(wrapper, 'navbar');
    expect(node).toBeDefined();
  });

})
```

As a reminder, we can run our tests using either the `npm test` command or the `jest` command. We'll use the `jest` command for now since we're testing one component:

```bash
jest src/components/Nav
```

<img class="wide" src="{{ imagesDir }}/passing-test-1.jpg" />

With our one passing test, we've confirmed our test setup is working.

Unfortunately, the interface for `TestUtils` is a little complex and low-level. The `enzyme` library wraps `TestUtils`, providing an easier and higher-level interface for asserting against a React component under test. We'll discuss enzyme in detail tomorrow.

Great job today and see you tomorrow!
