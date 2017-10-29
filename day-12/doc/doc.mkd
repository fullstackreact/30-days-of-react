---
page_id: 30-days-of-react/day-12
series: 30-days-of-react
permalink: day-12
day: 12
title: create-react-app
description: Today, we're going to add a build process to store common build actions so we can easily develop and deploy our applications.
hero_image: /assets/images/series/30-days-of-react/headings/12.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/12.jpg
dayDir: '12'
introBannerUrl: '/assets/images/series/30-days-of-react/headings/12_wide.jpg'
date: Wed Oct 15 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

The React team noticed that there is a lot of configuration required (and the community helped bloat -- us included) to run a React app. Luckily, some smart folks in the React team/community got together and built/released an official generator app that makes it much easier to get up and running quickly.

## create-react-app

The [create-react-app](https://github.com/facebookincubator/create-react-app) project is released through Facebook helps us get up and running quickly with a React app on our system with no custom configuring required on our part.

The package is released as a [Node](https://nodejs.org/) [Package](https://www.npmjs.com/package/create-react-app) and can be installed using `npm`. 

> ### A plug for `nvm` and `n`
>
> The [Node](https://nodejs.org) homepage has simple documentation on how to install node, if you don't already have it installed on your system. 
>
> We recommend using the [nvm](https://github.com/creationix/nvm) or the [n](https://github.com/tj/n) version management tools. These tools make it incredibly easy to install/use multiple versions of node on your system at any point. 

With `node` installed on our system, we can install the `create-react-app` package:

```bash
npm install --global create-react-app
```

<img class="wide" src="{{ imagesDir }}/install-create-react-app.jpg" />

With `create-react-app` installed globally, we'll be able to use the `create-react-app` command anywhere in our terminal.

Let's create a new app we'll call 30days using the `create-react-app` command we just installed. Open a Terminal window in a directory where you want to create your app.

In terminal, we can create a new React application using the command and adding a name to the app we want to create.

```bash
create-react-app 30days && cd 30days
```

<img class="wide" src="{{ imagesDir }}/create-app.jpg" />

Let's start our app in the browser. The `create-react-app` package comes with a few built-in scripts it created for us (in the `package.json` file). We can _start_ editing our app using the built-in webserver using the `npm start` command:

```bash
npm start
```

<img class="wide" src="{{ imagesDir }}/npm-start.jpg" />

This command will open a window in Chrome to the default app it created for us running at the url: [http://localhost:3000/](http://localhost:3000/).

<img class="wide" src="{{ imagesDir }}/chrome-start.jpg" />

Let's edit the newly created app. Looking at the directory structure it created, we'll see we have a basic node app running with a `public/index.html` and a few files in the `src/` directory that comprise our running app.

<img class="wide" src="{{ imagesDir }}/tree.jpg" />

Let's open up the `src/App.js` file and we'll see we have a very basic component that should all look familiar. It has a simple render function which returns the result we see in the Chrome window.

<img class="wide" src="{{ imagesDir }}/app.jpg" />

The `index.html` file has a single `<div />` node with the id of `#root`, where the app itself will be mounted for us automatically (this is handled in the `src/index.js` file). Anytime we want to add webfonts, style tags, etc. we can load them in the `index.html` file.

<img class="wide" src="{{ imagesDir }}/index-html.jpg" />

## Shipping

We'll get to deployment in a few weeks, but for the time being know that the generator created a build command so we can create minified, optimize versions of our app that we can upload to a server. 

We can build our app using the `npm run build` command in the root of our project:

```bash
npm run build
```

<img class="wide" src="{{ imagesDir }}/build.jpg" />

With that, we now have a live-reloading single-page app (SPA) ready for development. Tomorrow, we'll use this new app we built diving into rendering multiple components at run-time.
