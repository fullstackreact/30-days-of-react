---
page_id: 30-days-of-react/day-26
series: 30-days-of-react
permalink: day-26
day: 26
title: Integration Testing
description: Today we'll write tests to simulate how users interact with our application and will test the entire flow of our app in a live browser.
dayDir: '26'
hero_image: /assets/images/series/30-days-of-react/headings/26.jpg
imageUrl:  /assets/images/series/30-days-of-react/headings/26.jpg
introBannerUrl: '/assets/images/series/30-days-of-react/headings/26_wide.jpg'
date: Wed Oct 29 2016 21:29:42 GMT-0700 (PDT)
includeFile: ./../_params.yaml
---

We've reached the final part of our introduction to testing. We're going to wrap up our testing section with integration testing. As a reminder of what Integration testing is, it's the process of automating the experience that our actual users experience as they use our application. 

<div class="demo" id="demo1"></div>

## Integration testing

As we're integration testing, we'll need to have our app actually running as we're going to have a browser launch and execute our application. We'll be using an automation server called [selenium](http://www.seleniumhq.org), so we'll need to download it as well as a really nifty node automated testing framework called [Nightwatch](http://nightwatchjs.org).

## Install

The easiest way to install [selenium](http://docs.seleniumhq.org/download/) is to download it through the the selenium website at: [http://docs.seleniumhq.org/download/](http://docs.seleniumhq.org/download/). 

> If you're on a mac, you can use [Homebrew](http://brew.sh) with the `brew` command:
>
> ```bash
> brew install selenium-server-standalone
> ```

We'll also need to install the `nightwatch` command, which we can do with the `npm` package manager. Let's install `nightwatch` globally using the `--global` flag:

```bash
npm install --global nightwatch
```

This command gives us the `nightwatch` command available anywhere in our terminal. We'll need to add a configuration file in the root directory called `nighwatch.json` (or `nighwatch.conf.js`). We'll use the default configuration file at `nighwatch.json`

Let's create the file in our root directory:

```bash
touch nightwatch.json
```

Now add the following content in the new `nightwatch.json`:

```javascript
{
  "src_folders" : ["tests"],
  "output_folder" : "reports",

  "selenium" : {
    "start_process" : false,
    "server_path" : "",
    "log_path" : "",
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "",
      "webdriver.ie.driver" : ""
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost:3000",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },

    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
```

Nightwatch gives us a lot of configuration options available, so we won't cover all the possible ways to configure it. For our purposes, we'll just use the base configuration above as it's more than enough for getting integration testing going.

## Writing tests

We'll write our nightwatch tests in a `tests/` directory. Let's start by writing a test for handling the auth workflow. Let's write our test in a `tests/` directory (which matches the `src_folders`) that we'll call `tests/auth-flow.js`.

```bash
mkdir tests
touch tests/auth-flow.js
```

The nightwatch tests can be set as an object of exports, where the key is the description of the test and the value is a function with a reference to the client browser. For instance, we'll set up four tests for our `tests/auth-flow.js` test. 

Updating our `tests/auth-flow.js` file with these four test functions look like the following:

```javascript
module.exports = {
  'get to login page': (browser) => {},
  'logging in': (browser) => {},
  'logging out': (browser) => {},
  'close': (browser) => {},
}
```

Each of the functions in our object exports will receive a `browser` instance which serves as the interface between our test and the selenium webdriver. We have all sorts of available options we can run on this `browser` variable. 

Let's write our first test to demonstrate this function. We're going to set up nightwatch so that it launches the page, and clicks on the Login link in the navbar. We'll take the following steps to do this:

1. We'll first call the `url()` function on browser to ask it to load a URL on the page.
2. We'll wait for the page to load for a certain amount of time.
3. We'll find the Login link and click on it.

And we'll set up assertions along the way. Let's get busy! We'll ask the `browser` to load the URL we set in our configuration file (for us, it's `http://localhost:3000`)

```javascript
module.exports = {
  'get to login page': (browser) => {
    browser
      // Load the page at the launch URL
      .url(browser.launchUrl)
      // wait for page to load
      .waitForElementVisible('.navbar', 1000)
      // click on the login link
      .click('a[href="#/login"]')

    browser.assert.urlContains('login');
  },
  'logging in': (browser) => {},
  'logging out': (browser) => {},
  'close': (browser) => {},
}
```

Thats it. Before we get too far ahead, let's run this test to make sure our test setup works. We'll need to open 3 terminal windows here.

In the first terminal window, let's launch selenium. If you downloaded the `.jar` file, you can start this with the command: 

```bash
java -jar selenium-server-standalone-{VERSION}.jar
```

If you downloaded it through homebrew, you can use the `selenium-server` command:

```bash
selenium-server
```

<img class="wide" src="{{ imagesDir }}/selenium-server.png" />

In the second window, we'll need to launch our app. Remember, the browser we're going to launch will _actually_ hit our site, so we need an instance of it running. We can start our app up with the `npm start` comamnd:

```bash
npm start
```

<img class="wide" src="{{ imagesDir }}/npm-start.jpg" />

Finally, in the third and final terminal window, we'll run our tests using the `nightwatch` command.

```bash
nightwatch
```

<img class="wide" src="{{ imagesDir }}/nightwatch-1.jpg" />

When we run the `nightwatch` command, we'll see a chrome window open up, visit the site, and click on the login link automatically... (pretty cool, right?).

All of our tests pass at this point. Let's actually tell the browser to log a user in. 

Since the first step will run, the browser will already be on the login page. In the second key of our tests, we'll want to take the following steps:

1. We'll want to `find the input for he user's email` and set a value to a valid email.
2. We'll want to `click` the submit/login button
3. We'll `wait` for the page to load (similar to how we did previously)
4. We'll want to `assert` that the text of the page is equal to what we expect it to be.
5. We'll set an assertion to make sure the URL is what we think it is.

Writing this up in code is straight-forward too. Just like we did previously, let's write the code with comments inline:

```javascript
module.exports = {
  'get to login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.navbar', 1000)
      .click('a[href="#/login"]')

    browser.assert.urlContains('login');
  },
  'logging in': (browser) => {
    browser
      // set the input email to a valid email
      .setValue('input[type=email]', 'ari@fullstack.io')
      // submit the form
      .click('input[type=submit]')
      // wait for the page to load
      .waitForElementVisible('.navbar', 1000)
      // Get the text of the h1 tag
      .getText('.content h1', function(comp) {
        this.assert.equal(comp.value, 'Welcome home!')
      })

    browser.assert.urlContains(browser.launchUrl)
  },
  'logging out': (browser) => {},
  'close': (browser) => {},
}
```

Running these tests again (in the third terminal window):

```bash
nightwatch
```

<img class="wide" src="{{ imagesDir }}/nightwatch-2.jpg" />

We can do a similar thing with the `logging out` step from our browser. To get a user to log out, we will:

1. `Find and click` on the logout link
2. `Wait` for the content to load for the next page (which contains an "are you sure?"-style button).
3. We'll `click` on the "I'm sure" button to log out
4. We'll want to `wait for the content to load again
5. We'll `assert` that t`he h1 tag contains the value we expect it to have
6. And we'll make sure the page shows the Login button

Let's implement this with comments inline:


```javascript
module.exports = {
  'get to login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.navbar', 1000)
      .click('a[href="#/login"]')

    browser.assert.urlContains('login');
  },
  'logging in': (browser) => {
    browser
      .setValue('input[type=email]', 'ari@fullstack.io')
      .click('input[type=submit]')
      .waitForElementVisible('.navbar', 1000)
      .getText('.content h1', function(comp) {
        this.assert.equal(comp.value, 'Welcome home!')
      })

    browser.assert.urlContains(browser.launchUrl)
  },
  'logging out': (browser) => {
    browser
      // Find and click on the logout link
      .click('a[href="#/logout"]')
      // Wait for the content to load
      .waitForElementVisible('.content button', 1000)
      // Click on the button to logout
      .click('button')
      // We'll wait for the next content to load
      .waitForElementVisible('h1', 1000)
      // Get the text of the h1 tag
      .getText('h1', function(res) {
        this.assert.equal(res.value, 'Welcome home!')
      })
      // Make sure the Login button shows now
      .waitForElementVisible('a[href="#/login"]', 1000);
  },
  'close': (browser) => {},
}
```

As of now, you may have noticed that your chrome browsers haven't been closing when the tests have completed. This is because we haven't told selenium that we want the session to be complete. We can use the `end()` command on the `browser` object to close the connection. This is why we have the last and final step called `close`.

```javascript
{
  // ...
  'close': (browser) => browser.end()
}
```

Now let's run the entire suite and make sure it passes again using the `nightwatch` command:

```bash
nightwatch
```

<img class="wide" src="{{ imagesDir }}/nightwatch-3.jpg" />

That's it! We've made it and have covered 3 types of testing entirely, from low-level up through faking a real browser instance. Now we have the tools to ensure our applications are ready for full deployment.

But wait, we don't actually have deployment figured out yet, do we? Stay tuned for tomorrow when we start getting our application deployed into the cloud.
