# 🐙 💪 - Outage Reporter

## Test results

[![Unit tests 🧪](https://github.com/thesheps/kf-outage-reporter/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/thesheps/kf-outage-reporter/actions/workflows/unit-tests.yaml)

[![Mutation tests 🧪](https://github.com/thesheps/kf-outage-reporter/actions/workflows/mutation-tests.yaml/badge.svg)](https://kf-outage-reporter.thesheps.dev/)

This repository contains a `TypeScript CLI` which is able to report outages to a `site-outages` API endpoint. It is written in such a way that the library can be extracted and used from a different execution context, EG a `crontab` task, `AWS Lambda` etc.

## Dependencies

- Node.js v19.7.0

## Quickstart

The approved developer environment for this application is `macOS`, but you may have some success across `Windows` and `Linux` workstations also. It is _highly_ recommended that [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) is used to install and maintain the correct version of `Node.js`:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ nvm install 19.7
```

## Tests

Once you have installed the above dependencies, execute the following to install and run all accompanying unit tests:

```bash
$ npm ci
$ npm run test:unit
```

The repository is configured to use the [stryker-mutator](https://stryker-mutator.io/) framework to analyse the code for any gaps via mutation testing. This is currently configured to run in parallel to the main unit test run, and may take longer to execute:

```bash
$ npm ci
$ npm run test:mutation
```

## Running

To run the app:

1. Take a local copy of the `.env` file:

```
$ cp .env.default .env
```

2. Install the `npm` dependencies:

```
$ npm ci
```

3. Execute the CLI for the chosen site:

```
$ npm run report 'norwich-pear-tree'
```
