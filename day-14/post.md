---
page_id: 30-days-of-react/day-14
series: 30-days-of-react
permalink: day-14
day: 14
title: Fetching Remote Data
description: >-
  We're ready to make an external request to fetch data! Today we're looking at
  the first step of making a call to an external API.
dayDir: '14'
hero_image: /assets/images/series/30-days-of-react/headings/14.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/14.jpg
introBannerUrl: /assets/images/series/30-days-of-react/headings/14_wide.jpg
date: 'Wed Oct 17 2016 21:29:42 GMT-0700 (PDT)'
imagesDir: /assets/images/series/30-days-of-react/day-14
includeFile: ./../_params.yaml
---

Our apps, until this point have largely been static. Even the data we displayed from Github was static data included in our project. Our apps are really only as interesting as the data we use, so let's make our apps more interesting.

## Querying for remote data

The normal browser workflow is actually a synchronous one. When the browser receives html, it parses the string of html content and converts it into a tree object (this is what we often refer to as the DOM object/DOM tree). 

When the browser parses the DOM tree, as it encounters remote files (such as `<link />` and `<script />` tags), the browser will request these files (in parallel), but will execute them synchronously (so as to maintain their order they are listed in the source). 

What if we want to get some data from off-site? We'll make requests for data that's not available at launch time to populate data in our app. However, it's not necessarily _that_ easy to do because of the asynchronous nature of external API requests. 

Essentially, what this means is that we'll have to handle with JavaScript code after an unknown period of time as well actually make an HTTP request. Luckily for us, other people have dealt with this problem for a long time and we now have some pretty nice ways of handling it.

Starting with handling how we'll be making an HTTP request, we'll use a library (called `fetch`, which is also a [web standard](https://fetch.spec.whatwg.org/), hopefully) to make the http requesting easier to deal with. 

## Fetch

In order to use fetch, we'll need to install the library in our app we previously created. Let's open up a terminal window again and use `npm` to install the `whatwg-fetch` library (an implementation of `fetch`). In the same directory where we created our application, let's call:

```bash
npm install --save whatwg-fetch
```

<img class="wide" src="/assets/images/series/30-days-of-react/day-14/install-fetch.jpg" />

With the library installed, we can make a request to an off-site server. In order to get access to the `fetch` library, we'll need to `import` the package in our script. Let's update the top few lines of our `src/App.js` file adding the second line:

```javascript
import React, { Component } from 'react';
import 'whatwg-fetch';
// ...
```

> The `whatwg-fetch` object is unique in that it is one of the few libraries that we'll use which attaches it's export on the `global` object (in the case of the browser, this object is `window`). 
> Unlike the `react` library, we don't need to get a handle on it's export as the library makes it available on the global object.

With the `whatwg-fetch` library included in our project, we can make a request using the `fetch()` api. However, before we can actually start using the `fetch()` api, we'll need to understand what Promises are and how they work to deal with the asynchronous we discussed in the introduction. 

We'll pick up with `promises` tomorrow. Good job getting through week two and see you tomorrow!

