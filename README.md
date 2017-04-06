## 30 days of react

This repo contains the entire source and content for the article series of [30 days of React](https://www.fullstackreact.com/30-days-of-react) hosted by the Fullstack.io team. 

## How to use this repository

The repository contains all the sources for the article series where each day is separated out by branch. For instance, the day-1 branch is contained in the `day-1` branch. 

To list all the available branches, you can run the `git branch` command in this directory after cloning it locally. It's also available in the github interface.

To only fetch a particular day, you can clone the branch directly using the `git` tool. For instance, to get day 8 from the repo, use the following:

```bash
git clone https://github.com/fullstackreact/30-days-of-react --branch day-8
```

Alternatively, clone the entire repository and check out the `day-8` branch as a tracking branch. 

```bash
git clone https://github.com/fullstackreact/30-days-of-react
cd 30-days-of-react
git checkout --tracking -b origin/day-8 day-8
```

## What's in it?

Every day contains a full react application, following the same procedure used to create the article series. Every day can be run using the same basic steps. For the days that require a bit more work, check out the tutorial series on the blog. 

The steps to use a day from the 30 days of React project are:

1. Install the dependenciees
2. Run the project

We can run these steps using the following commands:

```bash
yarn install
yarn start
```

Since all of the days are built using the fantastic [create-react-app](https://github.com/facebookincubator/create-react-app) tool, all of the commands are available from that project in every day.

