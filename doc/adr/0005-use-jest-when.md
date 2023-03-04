# 5. Use jest-when

Date: 2023-03-04

## Status

Accepted

## Context

Jest is a bit rubbish when setting up explicit testing scenarios. We need to think of a way that we can make our testing more _useful_ and _gorgeous_.

## Decision

Jest-when gets around this by introducing a "whenny-when" type syntax:

```node
when(fn).calledWith(1).mockReturnValue('yay!');
```

It's got great support and is a mature library.

## Consequences

Expect to see many, more beautiful tests coming your way!
