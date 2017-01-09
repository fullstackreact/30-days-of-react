---
page_id: 30-days-of-react/day-25
series: 30-days-of-react
permalink: day-25
title: Better Testing with Enzyme
description: Today, we'll look at an open-source library maintained by Airbnb called Enzyme that makes testing fun and easy.
articleEntry: '30-days/25'
hero_image: /assets/images/series/30-days-of-react/headings/25.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/25.jpg
codeRoot: '__FILE_PATH__/code/25'
imagesDir: '../../../assets/images/series/30-days-of-react/25'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/25_wide.jpg'
date: Wed Oct 28 2016 21:29:42 GMT-0700 (PDT)
---

Yesterday we used the `react-addons-test-utils` library to write our first test against the `Navbar` component. However, this library is fairly low-level and can be a bit cumbersome to use. [Enzyme](http://airbnb.io/enzyme/) is a testing utility library released and maintained by the [AirBnb](http://airbnb.io) team and it offers a nicer, higher-level API for dealing with React components under test.

## Using Enzyme

We'll use Enzyme to make these tests easier to write and more readable.

Yesterday, we wrote our first test as the following:

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

Although this works, it's not quite the easiest test in the world to read. Let's see what this test looks like when we rewrite it with Enzyme.

Rather than testing the complete component tree with Enzyme, we can test just the output of the component. Any of the component's children will not be rendered. This is called _shallow_ rendering.

Enzyme makes shallow rendering super easy. We'll use the `shallow` function exported by Enzyme to mount our component.

Let's update the `src/components/Nav/__tests__/Navbar-test.js` file to include the `shallow` function from `enzyme`:

```javascript
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('wraps content in a div with .navbar class', () => {
    // our tests
  });
})
```

> Shallow rendering is supported by `react-addons-test-utils` as well. In fact, Enzyme just wraps this functionality. While we didn't use shallow rendering yesterday, if we were to use it would look like this:
>
> ```javascript
> const renderer = ReactTestUtils.createRenderer();
> renderer.render(<Navbar />)
> const result = renderer.getRenderOutput();
> ```

Now to render our component, we can use the `shallow` method and store the result in a variable. Then, we'll _query_ the rendered component for different React elements (HTML or child components) that are rendered inside its virtual dom.

The entire assertion comprises two lines:

```javascript
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

describe('Navbar', () => {
  let wrapper;

  it('wraps content in a div with .navbar class', () => {
    wrapper = shallow(<Navbar />);
    expect(wrapper.find('.navbars').length).toEqual(1);
  });
})
```

We can run our tests in the same manner as we did before using the `jest` command (or the `npm test` command):

```bash
jest src/components/Nav
```

<img class="wide" src="{{ imagesDir }}/enzyme-test-1.jpg" />

Our test passes and is more readable and maintainable.

Let's continue writing assertions, pulling from the list of assumptions that we made at the beginning of yesterday. We'll structure the rest of our test suite first by writing out our `describe` and `it` blocks. We'll fill out the specs with assertions after:

```javascript
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../Navbar');
import Navbar from '../Navbar';

describe('Navbar', () => {
  let wrapper;

  it('wraps content in a div with .navbar class', () => {
    wrapper = shallow(<Navbar />);
    expect(wrapper.find('.navbars').length).toEqual(1);
  });

  describe('links', () => {

    it('renders a link to home', () => {

    });
    it('renders an about link', () => {

    });

  });

  describe('with a currentUser', () => {

    describe('that is not logged in', () => {
      it('shows a link for login', () => {

      })
    });

    describe('that is logged in', () => {
      it('shows a link to logout', () => {

      })
    });
  })
})
```

> If we were following Test Driven Development (or TDD for short), we would write these assumptions first and then build the component to pass these tests.

Let's fill in these tests so that they pass against our existing `Navbar` component. Our link tests will be relatively simple. We're going to grab a list of the links in our component. We can do this using the tag that we're looking for or even the type of component (class/component name/function).

Since we'll need the links in all of the specs, let's grab them in a `beforeEach()` block:

```javascript
describe('Navbar', () => {
  let wrapper;
  // ...
  describe('links', () => {
    let Links;

    beforeEach(() => {
      wrapper = shallow(<Navbar />)
      Links = wrapper.find('Link');
    });

    it('renders a link to home', () => {
    });

    it('renders an about link', () => {
    });
  });
})
```

With the `Links` variable, we can grab the different links and test against them.

We expect the first link to be the "Home" link. So, to use the "Home" link in a spec, we can just grab the first component in our `Links` variable.

For any other link, we can use the `findWhere` function exposed by Enzyme.

> We'll look at more Enzyme functions at the end of this article.

Let's fill out the specs now:

```javascript
describe('Navbar', () => {
  let wrapper;
  // ...
  describe('links', () => {
    let Links;

    beforeEach(() => {
      wrapper = shallow(<Navbar />)
      Links = wrapper.find('Link');
    });

    it('renders a link to home', () =>
      const link = Links.first();
      expect(link).toBeDefined();
      expect(link.childAt(0).text()).toBe('Home');
      expect(link.props().to).toBe('/home'); {
    });

    it('renders an about link', () => {
      const link = wrapper
        .findWhere(n => n.props().to === '/about')
      expect(link).toBeDefined();
      expect(link.childAt(0).text()).toBe('About')
    });
  });
})
```

Running our tests, we'll see these two expectations pass:

<img class="wide" src="{{ imagesDir }}/enzyme-test-2.jpg" />

Finally, let's write our tests against the `currentUser` conditions. Since the `<Navbar />` accepts a `currentUser` prop, we'll pass it a `currentUser` prop in the next round of tests.

A `currentUser` variable is considered to be logged in if they have a key of `loggedIn` as a boolean (true or false). For each block of the user tests, we can set up this variable in the `beforeEach()` block of our tests and render the resulting component:

```javascript
describe('Navbar', () => {
  let wrapper;

  describe('with a currentUser', () => {
    let currentUser;

    describe('that is not logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: false };
        wrapper = shallow(
          <Navbar currentUser={currentUser} />
        )
      });

      it('shows a link for login', () => {
      })
    });

    describe('that is logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: true };
        wrapper = shallow(
          <Navbar currentUser={currentUser} />
        )
      });

      it('shows a link to logout', () => {
      })
    });
  })
})
```

With our `wrapper` set up properly, we can test against the links similar to how we did with our first ones. We'll traverse the component looking for the `to` prop to match the link we're looking for and ensure the component contains the elements we expect it to contain:

```javascript
describe('Navbar', () => {
  let wrapper;

  describe('with a currentUser', () => {
    let currentUser;

    describe('that is not logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: false };
        wrapper = shallow(
          <Navbar currentUser={currentUser} />
        )
      });

      it('shows a link for login', () => {
        const link = wrapper.find({to: '/login'});
        expect(link.length).toEqual(1);
        expect(link.childAt(0).text()).toBe('Login')
      })
    });

    describe('that is logged in', () => {
      beforeEach(() => {
        currentUser = { loggedIn: true };
        wrapper = shallow(
          <Navbar currentUser={currentUser} />
        )
      });

      it('shows a link to logout', () => {
        const link = wrapper
          .findWhere(n => n.props().to === '/logout');
        expect(link.length).toEqual(1);
        expect(link.childAt(0).text()).toBe('Logout');
      })
    });
  })
})
```

Running our tests one more time, we can see they all pass as expected:

<img class="wide" src="{{ imagesDir }}/enzyme-test-3.jpg" />

## What's the deal with `find()`?

Before we close out for today, we should look at the interface of an Enzyme shallow-rendered component (in our tests, the `wrapper` object). The [Enzyme documentation](http://airbnb.io/enzyme/docs/api/shallow.html) is fantastic, so we'll keep this short.

Basically, when we use the `find()` function, we'll pass it a selector and it will return a `ShallowWrapper` instance that wraps the found nodes. The `find()` function can take a string, function, or an object.

When we pass strings into the `find()` function, we can pass CSS selectors or the _displayName_ of a component. For instance:

```javascript
wrapper.find('div.link');
wrapper.find('Link')
```

We can also pass it the component constructor, for instance:

```javascript
import { Link } from 'react-router';
// ...
wrapper.find(Link)
```

Finally, we can also pass it an object property selector object, which selects elements by their key and values. For instance:

```javascript
wrapper.find({to: '/login'});
```

The return value is a `ShallowWrapper`, which is a type of `Wrapper` (we can have rendered wrappers and shallow wrappers). These `Wrapper` instances have a bunch of functions we can use to target different child components, ways to look into the `props` and the `state`, as well as other attributes of a rendered component, such as `html()` and `text()`. What's more, we can chain these calls together.

Take the case of the `<Link />` component. If we wanted to find the HTML of the link class based on all the links available, we can write a test like this:

```javascript
// ...
it('displays a link tag with the Login text', () => {
  link = wrapper
        .find('Link')
        .find({to: '/login'})

  expect(link.html())
    .toBe('<a class="link">Login</a>')
});
```

Phew! That's a lot of new information today, but look how quickly we wrote our follow-up tests with Enzyme. It's much quicker to read and makes it easier to discern what's actually happening.

Tomorrow we'll continue with our testing journey and walk through integration testing our application.
