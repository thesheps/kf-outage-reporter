# 6. Use 'Either' Pattern

Date: 2023-03-04

## Status

Accepted

## Context

In conventional, imperative programs control flow can often get confusing when Errors are encountered and "jumped" off the main branches. It can be computationally expensive to do this also. A decision needs to be made to figure out a design pattern that can help to alleviate this.

## Decision

The decision has been made to adopt an "Either" design pattern, whereby functions are able to return a Duple of values (Success or Error). Conditional logic can then be handed back to consumers as opposed to potentially resulting in Application exceptions causing faulty app state.

## Consequences

At the time of writing it appears some of the more popular languages for producing an Either/Result abstraction are incompatible with Node 19 and `TypeScript`. For the purposes of this exercise there is a trivial implementation described by the `ErrorResult` and `SuccessResult` classes.
