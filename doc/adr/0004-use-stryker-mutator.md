# 4. Use Stryker Mutator

Date: 2023-03-04

## Status

Accepted

## Context

Mutation testing is a [really great way](https://www.youtube.com/watch?v=h_DBFHWn3YE) to verify the overall correctness of software. By mutating code paths in realtime and re-running tests against the mutated code you can isolate subtle bugs that may have been introduced by "code slippage".

## Decision

Let's use the `stryker-mutator` framework to run our mutation tests! It's got a great community and fantastic support for TypeScript.

## Consequences

Mutation tests are computationally expensive. Whilst the solution is small these tests will continue to be quick to run, but as the solution expands over time it may be necessary to move these into an out-of-band process such as a nightly build. One to keep an 👀 on.
