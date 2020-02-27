---
page_id: 30-days-of-react/day-24
series: 30-days-of-react
permalink: day-24
day: 24
title: Testing the App
description: >-
  Let's start by looking at one feature of our application and thinking about
  where the edge cases are and what we assume will happen with the component.
dayDir: "24"
hero_image: /assets/images/series/30-days-of-react/headings/24.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/24.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/24_wide.jpg
date: "Wed Oct 27 2016 21:29:42 GMT-0700 (PDT)"
imagesDir: /assets/images/series/30-days-of-react/day-24
includeFile: ./../_params.yaml
---

Let's start with the `Timeline` component as it's the most complex in our current app.

The `Timeline` component dispays a list of statuses with a header with a dynamic title. We'll want to test any dynamic logic we have in our components. The simplest bit of logic we have to start out with our tests are around the dynamic title presented on the timeline.

<div class="demo" id="demo1"></div>

We like to start out testing by listing our assumptions about a component and under what circumstances these assumptions are true. For instance, a list of assumptions we can make about our Timeline component might include the following:

- Under all circumstances, the Timeline will be contained within a `<div />` with the class of `.notificationsFrame`
- Under all circumstances, we can assume there will be a title
- Under all circumstances, we assume the search button will start out as hidden
- There is a list of at least four status updates

These _assumptions_ will translate into our tests.

## Testing

Let's open the file `src/components/Timeline/__tests__/Timeline-test.js`. We left off with some dummy tests in this file, so let's clear those off and start with a fresh describe block:

```javascript
describe("Timeline", () => {
  // Tests go here
});
```

For every test that we write against React, we'll want to import react into our test file. We'll also want to bring in the react test utilities:

```javascript
import React from "react";
import TestUtils from "react-dom/test-utils";

describe("Timeline", () => {
  // Tests go here
});
```

Since we're testing the `Timeline` component here, we'll also want to bring that into our workspace:

```javascript
import React from "react";
import TestUtils from "react-dom/test-utils";

import Timeline from "../Timeline";

describe("Timeline", () => {
  // Tests go here
});
```

Let's write our first test. Our first assumption is pretty simple to test. We're testing to make sure the element is wrapped in a `.notificationsFrame` class. With every test we'll write, we'll need to render our application into the working test document. The `react-dom/test-utils` library provides a function to do just this called `renderIntoDocument()`:

```javascript
import React from "react";
import TestUtils from "react-dom/test-utils";

import Timeline from "../Timeline";

describe("Timeline", () => {
  it("wraps content in a div with .notificationsFrame class", () => {
    const wrapper = TestUtils.renderIntoDocument(<Timeline />);
  });
});
```

If we run this test (even though we're not setting any expectations yet), we'll see that we have a problem with the testing code. React thinks we're trying to render an undefined component:

Let's find the element we expect to be in the DOM using another `TestUtils` function called `findRenderedDOMComponentWithClass()`.

The `findRenderedDOMComponentWithClass()` function accepts _two_ arguments. The first is the render tree (our `wrapper` object) and the second is the CSS class name we want it to look for:

```javascript
import React from "react";
import TestUtils from "react-dom/test-utils";

import Timeline from "../Timeline";

describe("Timeline", () => {
  it("wraps content in a div with .notificationsFrame class", () => {
    const wrapper = TestUtils.renderIntoDocument(<Timeline />);
    const node = TestUtils.findRenderedDOMComponentWithClass(
      wrapper,
      "notificationsFrame"
    );
  });
});
```

With that, our tests will pass (believe it or not). The TestUtils sets up an expectation that it can find the component with the `.notificationsFrame` class. If it doesn't find one, it will throw an error and our tests will fail.

As a reminder, we can run our tests using either the `npm test` command or the `yarn test` command. We'll use the `yarn test` command for now since we're testing one component:

```bash
yarn test
```

<img class="wide" src="/assets/series/30-days-of-react/images/24/passing-test.png" />

With our one passing test, we've confirmed our test setup is working.

Unfortunately, the interface for `TestUtils` is a little complex and low-level. The `enzyme` library wraps `TestUtils`, providing an easier and higher-level interface for asserting against a React component under test. We'll discuss enzyme in detail tomorrow.

Great job today and see you tomorrow!
