---
page_id: 30-days-of-react/day-29
series: 30-days-of-react
permalink: day-29
day: 29
title: Continuous Integration
description: >-
  Today we'll look through some continuous integration solutions available for
  us to run tests against as well as implement one to test our application in
  the cloud.
hero_image: /assets/images/series/30-days-of-react/headings/29.jpg
imageUrl: /assets/images/series/30-days-of-react/headings/29.jpg
dayDir: "29"
introBannerUrl: /assets/images/series/30-days-of-react/headings/29_wide.jpg
protectedPreview: true
protectedPreviewLength: 800
protectedPreviewCta: partials/series/30-days-of-react/30-days-protected-preview.html
date: "Tue Nov 01 2016 21:33:02 GMT-0700 (PDT)"
imagesDir: /assets/images/series/30-days-of-react/day-29
includeFile: ./../_params.yaml
---

We've deployed our application to the "cloud", now we want to make sure everything runs as we expect it. We've started a test suite, but now we want to make sure it passes completely before we deploy.

We _could_ set a step-by-step procedure for a developer to follow to make sure we run our tests before we deploy manually, but sometimes this can get in the way of deployment, especially under high-pressure deadlines in the middle of the night. There are better methods.

## Testing then deployment

The core idea is that we want to deploy our application only _after_ all of our tests have run and passed (sometimes known as "going green"). There are many ways we can do this. Mentioned above, we can handle it through humans, but that can become tedious and we're pretty good at forgetting things... what was I saying again?

Let's look at some better ways. One of the ways we can handle it is through a deployment script that only succeeds if all of our tests pass. This is the easiest, but needs to be replicated across a team of developers.

Another method is to push our code to a continuous integration server whose only responsibility is to run our tests and deploy our application if and only if the tests pass.

Just like hosting services, we have many options for running continuous integration servers. The following is a short list of some of the popular CI servers available:

- [travis ci](https://travis-ci.org/)
- [circle ci](https://circleci.com)
- [codeship](https://codeship.io)
- [jenkins](https://jenkins.io)
- [AWS EC2](https://aws.amazon.com/ec2/)

Let's look at a few ways of handling this process.

## Custom build script

Without involving any extra servers, we can write a script to execute our tests before we deploy.

Let's create a script that actually does do the deployment process first. In our case, let's take the `surge.sh` example from yesterday. Let's add one more script we'll call `deploy.sh` in our `scripts/` directory:

```bash
touch scripts/deploy.sh
chmod u+x scripts/deploy.sh
```

In here, let's add the surge deploy script (changing the names to your domain name, of course):

```bash
#!/usr/bin/env bash
surge -p build --domain hateful-impulse.surge.sh
```

Let's write the release script next. To execute it, let's add the script to the `package.json` `scripts` object:

```javascript
{
  // ...
  "scripts": {
    "start": "node ./scripts/start.js",
    "build": "node ./scripts/build.js",
    "release": "node ./scripts/release.js",
    "test": "node ./scripts/test.js"
  },
}
```

Now let's create the `scripts/release.js` file. From the root directory in our terminal, let's execute the following command:

```bash
touch scripts/release.js
```

Inside this file, we'll want to run a few command-line scripts, first our `build` step, then we'll want to run our tests, and finally we'll run the deploy script, if everything else succeeds first.

In a node file, we'll first set the `NODE_ENV` to be `test` for our build tooling. We'll also include a script to run a command from the command-line from within the node script and store _all_ the output to an array.

```javascript
process.env.NODE_ENV = "test";
process.env.CI = true;

var chalk = require("chalk");
const exec = require("child_process").exec;

var output = [];
function runCmd(cmd) {
  return new Promise((resolve, reject) => {
    const testProcess = exec(cmd, { stdio: [0, 1, 2] });

    testProcess.stdout.on("data", msg => output.push(msg));
    testProcess.stderr.on("data", msg => output.push(msg));
    testProcess.on("close", code => (code === 0 ? resolve() : reject()));
  });
}
```

When called, the `runCmd()` function will return a promise that is resolved when the command exits successfully and will reject if there is an error.

Our release script will need to be able to do the following tasks:

1. build
2. test
3. deploy
4. report any errors

Mentally, we can think of this pipeline as:

```javascript
build()
  .then(runTests)
  .then(deploy)
  .catch(error);
```

Let's build these functions which will use our `runCmd` function we wrote earlier:

```javascript
function build() {
  console.log(chalk.cyan("Building app"));
  return runCmd("npm run build");
}

function runTests() {
  console.log(chalk.cyan("Running tests..."));
  return runCmd("npm test");
}

function deploy() {
  console.log(chalk.green("Deploying..."));
  return runCmd(`sh -c "${__dirname}/deploy.sh"`);
}

function error() {
  console.log(chalk.red("There was an error"));
  output.forEach(msg => process.stdout.write(msg));
}

build()
  .then(runTests)
  .then(deploy)
  .catch(error);
```

With our `scripts/release.js` file complete, let's execute our `npm run release` command to make sure it deploys:

```bash
npm run release
```

With all our tests passing, our updated application will be deployed successfully!

<img class="wide" src="/assets/series/30-days-of-react/images/29/deploy-script.jpg" />

If any of our tests fail, we'll get all the output of our command, including the failure errors. Let's update one of our tests to make them fail purposefully to test the script.

I'll update the `src/components/Nav/__tests__/Navbar-test.js` file to change the first test to <b>fail</b>:

```javascript
// ...
it("wraps content in a div with .navbar class", () => {
  wrapper = shallow(<Navbar />);
  expect(wrapper.find(".navbars").length).toEqual(1);
});
```

Let's rerun the `release` script and watch it fail and _not_ run the deploy script:

```bash
npm run release
```

<img class="wide" src="/assets/series/30-days-of-react/images/29/deploy-fail.jpg" />

As we see, we'll get the output of the failing test in our logs, so we can fix the bug and then rerelease our application again by running the `npm run release` script again.

## Travis CI

[Travis ci](https://travis-ci.org/) is a hosted continuous integration environment and is pretty easy to set up. Since we've pushed our container to github, let's continue down this track and set up travis with our github account.

Head to [travis-ci.org](https://travis-ci.org/) and sign up there.

<img class="wide" src="/assets/series/30-days-of-react/images/29/travis-setup.jpg" />

Once you're signed up, click on the `+` button and find your repository:

<img class="wide" src="/assets/series/30-days-of-react/images/29/travis-select-repo.jpg" />

From the project screen, click on the big 'activate repo' button.

<img class="wide" src="/assets/series/30-days-of-react/images/29/travis-activate-repo.jpg" />

To allow Travis CI to automatically log in for us during deployment, we need to add `SURGE_LOGIN` and `SURGE_TOKEN` environment variables. Open the _More Options_ menu and click settings.

Under environment variables, create a variable called `SURGE_LOGIN` and set it to the email address you use with Surge. Next, add another variable called `SURGE_TOKEN` and set it to your Surge token.

> You can view your surge token by typing `surge token` in your terminal.
> Since we're using `surge` for depolyment, we should alsoadd it to our `devDependencies` in `package.json`.
> Run `npm install surge --save-dev` to add it

Now we need to configure travis to do what we want, which is run our test scripts and then deploy our app. To configure travis, we'll need to create a `.travis.yml` file in the root of our app.

```bash
touch .travis.yml
```

Let's add the following content to set the language to node with the node version of 10.15.0:

```yaml
language: node_js
node_js:
  - "10.15.0"
```

Now all we need to do is add this file `.travis.yml` to git and push the repo changes to github.

```bash
git add .travis.yml
git commit -am "Added travis-ci configuration file"
git push github master
```

That's it. Now travis will execute our tests based on the default script of `npm test`.

<img class="wide" src="/assets/series/30-days-of-react/images/29/travis-output.jpg" />

Now, we'll want travis to actually deploy our app for us. Since we already have a `scripts/deploy.sh` script that will deploy our app, we can use this to deploy from travis.

To tell travis to run our `deploy.sh` script after we deploy, we will need to add the `deploy` key to our `.travis.yml` file. We also need to build our app before deploy, hence the `before_deploy`. Let's update the yml config to tell it to run our deploy script:

```yaml
language: node_js
node_js:
  - "10.15.0"
before_deploy:
  - npm run build
deploy:
  provider: script
  skip_cleanup: true
  script: sh scripts/deploy.sh
  on:
    branch: master
```

The next time we push, travis will take over and push up to surge (or wherever the `scripts/deploy.sh` scripts will tell it to deploy).

Particulars for authentication. To deploy to github pages, we'll need to add a token to the script. The gist at [https://gist.github.com/domenic/ec8b0fc8ab45f39403dd](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd) is a great resource to follow for deploying to github pages.

## Other methods

There are a lot of other options we have to run our tests before we deploy. This is just a getting started guide to get our application up.

> The Travis CI service is fantastic for open-source projects, however to use it in a private project, we'll need to create a billable account.
>
> An open-source CI service called [Jenkins](https://jenkins.io) which can take a bit of work to setup (although it's getting a lot [easier](https://jenkins.io/projects/blueocean/)).

Congrats! We have our application up and running, complete with testing and all.

See you tomorrow for our last day!
