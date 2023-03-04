# 2. Use TypeScript

Date: 2023-03-04

## Status

Accepted

## Context

This task requires a program to be written which is able to communicate with several Api endpoints and parse their results. A decision needs to be made as to which language to code this out in.

## Decision

We have selected TypeScript for the following reasons:

### Community support 👥

StackOverflow's [2022 Developer Survey](https://survey.stackoverflow.co/2022/#technology) included TypeScript as one of the most popular languages, with 34.83% of respondants marking it as their favourite language. This is a good marker for language and ecosystem longevity.

### Agility 💃

TypeScript has supported frameworks which allow it to be easily deployed into a front-end or back-end applications. This allows developers to move between contexts easily without having to learn multiple languages.

### Compile-time safety 👷‍♀️

TypeScript is engineered to make the identification of compile-time errors easier than when using Javascript. This additional layer of type safety will help us to run faster, and write more meaningful tests which assert on application correctness rather than (for example) null safety and interface compatibility.

## Consequences 🚀

Engineers wanting to use this repository will need the `Node` runtime installed on their workstations. A guide to installing and setting up this repository will be provided.
