# Function Utilities

Utilities for working with functions, including debounce, throttle, and other useful functions.

## Functions

### withDelay

Executes an action after a delay specified in milliseconds.

```typescript
import { withDelay } from "@bodynarf/utils";

const timeoutId = withDelay(1000, () => {
  console.log("This will be logged after 1 second");
});

// To cancel the delayed action:
// clearTimeout(timeoutId);
```

### emptyFn

An empty function.

```typescript
import { emptyFn } from "@bodynarf/utils";

// Useful as a default callback or placeholder
const callback = someCondition ? actualFunction : emptyFn;
callback(); // Does nothing
```

### debounce

Wraps function execution to prevent calls during a specified delay.

```typescript
import { debounce } from "@bodynarf/utils";

const fn = () => alert("text");
const handler = debounce(fn, 500);
handler(); // started a timer with 500ms
handler(); // restarted timer with 500ms, previous call will be not executed
handler(); // restarted timer with 500ms, previous call will be not executed & fn will be executed only here
```

### emptyFnAsync

An empty async function. Async counterpart of `emptyFn`.

```typescript
import { emptyFnAsync } from "@bodynarf/utils";

const asyncCallback = someCondition ? actualAsyncFunction : emptyFnAsync;
await asyncCallback(); // Does nothing, resolves immediately
```

### memoize

Creates a memoized version of a function that caches results based on arguments.

```typescript
import { memoize } from "@bodynarf/utils";

const expensive = (n: number) => { console.log("computing"); return n * 2; };
const memoized = memoize(expensive);

memoized(5); // logs "computing", returns 10
memoized(5); // returns 10 (cached, no log)
memoized(3); // logs "computing", returns 6
```

With a custom key resolver for multi-argument functions:

```typescript
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize(add, (a, b) => `${a}:${b}`);

memoizedAdd(1, 2); // 3 (computed)
memoizedAdd(1, 2); // 3 (cached)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `fn` | `(...args) => TResult` | Function to memoize |
| `keyResolver` | `(...args) => string` | Optional function to resolve cache key (default: `String(args[0])`) |
