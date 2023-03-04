# 3. Use GitHub Actions

Date: 2023-03-04

## Status

Accepted

## Context

We need to to choose somewhere to run our tests and publish any compiled artifacts.

## Decision

Hey let's use [Github Actions](https://github.com/features/actions)! It's a low-barrier-to-entry workflow which will allow anyone with a Github account to check things like build status etc.

## Consequences

I predict lots of `yaml` in our future. At the time of writing the majority of runnable CI scripts are simple `npm` scripts though, so this isn't the worst thing in the world.
