# Promise Utilities

Utilities for working with promises, including retry, timeout, parallel and sequential execution.

## Functions

### retry

Retries execution of a promise-returning function with a specified number of attempts.

```typescript
import { retry } from "@bodynarf/utils";

const fetchData = () => fetch("/api/data").then(res => res.json());

// Retry up to 3 times with 1 second delay
retry(fetchData, 3, 1000)
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Failed after 3 attempts:", error));
```

### withTimeout

Adds a timeout to a promise.

```typescript
import { withTimeout } from "@bodynarf/utils";

const slowFetch = fetch("/api/data");

// Reject if slowFetch takes more than 5 seconds
withTimeout(slowFetch, 5000)
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Timed out or failed:", error));
```

### parallel

Executes promises in parallel.

```typescript
import { parallel } from "@bodynarf/utils";

const promises = [
    fetch("/api/users").then(res => res.json()),
    fetch("/api/posts").then(res => res.json()),
    fetch("/api/comments").then(res => res.json())
];

// Execute all fetch requests in parallel
parallel(promises)
    .then(([users, posts, comments]) => {
        console.log("All data loaded:", users, posts, comments);
    })
    .catch(error => console.error("One or more requests failed:", error));
```

### sequential

Executes promises sequentially.

```typescript
import { sequential } from "@bodynarf/utils";

const promiseFns = [
    () => fetch("/api/setup").then(res => res.json()),
    () => fetch("/api/users").then(res => res.json()),
    () => fetch("/api/posts").then(res => res.json())
];

// Execute fetch requests one after another
sequential(promiseFns)
    .then(([setup, users, posts]) => {
        console.log("All data loaded in order:", setup, users, posts);
    })
    .catch(error => console.error("One or more requests failed:", error));
```

### concurrent

Executes promises with a concurrency limit.

```typescript
import { concurrent } from "@bodynarf/utils";

const urls = ["/api/data1", "/api/data2", "/api/data3", "/api/data4", "/api/data5"];
const promiseFns = urls.map(url => () => fetch(url).then(res => res.json()));

// Execute up to 3 fetch requests concurrently
concurrent(promiseFns, 3)
    .then(results => {
        console.log("All data loaded:", results);
    })
    .catch(error => console.error("One or more requests failed:", error));
```

### delayResolve

Delays promise resolution by a specified number of milliseconds.

```typescript
import { delayResolve } from "@bodynarf/utils";

// Resolve with "Hello" after 1 second
delayResolve(1000, "Hello")
    .then(result => console.log(result)); // Logs: "Hello" after 1 second
```

### delayReject

Delays promise rejection by a specified number of milliseconds.

```typescript
import { delayReject } from "@bodynarf/utils";

// Reject with "Timeout" error after 1 second
delayReject(1000, "Timeout")
    .catch(error => console.error(error)); // Logs: "Timeout" after 1 second
