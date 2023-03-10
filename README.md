# ๐ ๐ช - Outage Reporter

## Test results

[![Unit tests ๐งช](https://github.com/thesheps/kf-outage-reporter/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/thesheps/kf-outage-reporter/actions/workflows/unit-tests.yaml)

[![Mutation tests ๐งช](https://github.com/thesheps/kf-outage-reporter/actions/workflows/mutation-tests.yaml/badge.svg)](https://kf-outage-reporter.thesheps.dev/)

[![Integration tests ๐งช](https://github.com/thesheps/kf-outage-reporter/actions/workflows/integration-tests.yaml/badge.svg)](https://github.com/thesheps/kf-outage-reporter/actions/workflows/integration-tests.yaml)

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

Once you have installed the above dependencies, execute the following to run all accompanying unit tests:

```bash
$ npm ci
$ npm run test:unit
```

The repository is configured to use the [stryker-mutator](https://stryker-mutator.io/) framework to analyse the code for any gaps via mutation testing. This is currently configured to run in parallel to the main unit test run, and may take longer to execute:

```bash
$ npm ci
$ npm run test:mutation
```

Integration tests are written using `Jest` also, and are executed using a different group:

```bash
$ npm ci
$ npm run test:integration
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
$ npm start -- -s norwich-pear-tree
```

For a list of related help options, run

```
$ npm start help

Usage: outageReporter.ts [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -h, --help     Output usage information
    -s, --siteId   The id of the site to report outages for
    -v, --version  Output the version number
```

## Architecture

A list of Architectural decision records can be found below:

[0001 - Record Architectural Decisions](./doc/adr/0001-record-architecture-decisions.md)

[0002 - Use TypeScript](./doc/adr/0002-use-typescript.md)

[0003 - Use Github Actions](./doc/adr/0003-use-github-actions.md)

[0004 - Use Stryker Mutator](./doc/adr/0004-use-stryker-mutator.md)

[0005 - Use Jest When](./doc/adr/0005-use-jest-when.md)

[0006 - Use Either Pattern](./doc/adr/0006-use-either-pattern.md)

## Known issues

- At present the logic around the filtering of outages is unoptimised. Every check that is made for a safe-listed device ID results in a linear search with an `O(n)` time complexity. This can be trivially solved by the use of a dictionary, but ain't nobody got time for that! โ Fixed!

- There is a trivial `circuitBreaker` WIP in the src folder. This is the next piece of obvious development work in this application to make to more resilient to transient HTTP errors.

- At the time of writing the `API_KEY` and `BASE_PATH` are both committed to source control in the `.env.dev` file. This was considered not to be a security vulnerability given this information is considered "test" data only. The CI integration run has these marked as `Github secrets`, and any _real_ production implementation would have these secrets rotated regularly so as to minimise any potential attack vector.
