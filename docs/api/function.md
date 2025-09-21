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
