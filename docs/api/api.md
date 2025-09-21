# API Utilities

Utilities for working with HTTP requests.

## Classes

### HttpError

An error that occurs during a fetch request.

```typescript
import { HttpError } from "@bodynarf/utils";

const response = new Response(null, { status: 404, statusText: "Not Found" });
const error = new HttpError(response);
console.log(error.status); // 404
console.log(error.statusText); // "Not Found"
```

#### Properties

##### status

Gets the HTTP status code.

```typescript
const response = new Response(null, { status: 404, statusText: "Not Found" });
const error = new HttpError(response);
console.log(error.status); // 404
```

##### statusText

Gets the HTTP status text.

```typescript
const response = new Response(null, { status: 404, statusText: "Not Found" });
const error = new HttpError(response);
console.log(error.statusText); // "Not Found"
```

##### url

Gets the response URL.

```typescript
const response = new Response(null, { status: 404, statusText: "Not Found", url: "https://api.example.com/data" });
const error = new HttpError(response);
console.log(error.url); // "https://api.example.com/data"
```

## Functions

### getAsync

Sends an HttpGet request to the specified endpoint.

```typescript
import { getAsync } from "@bodynarf/utils";

// Usage example
getAsync("/api/users")
    .then(users => console.log(users))
    .catch(error => console.error(error));
```

### postAsync

Sends an HttpPost request to the specified endpoint.

```typescript
import { postAsync } from "@bodynarf/utils";

// Usage example
postAsync("/api/users", { name: "Alice", email: "alice@example.com" })
    .then(user => console.log(user))
    .catch(error => console.error(error));
```

### fetchAsync

Sends an Http request to the specified endpoint to retrieve data in JSON format.

```typescript
import { fetchAsync } from "@bodynarf/utils";

// Usage example
fetchAsync("/api/data")
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### plainFetchAsync

Sends an Http request to the specified endpoint.

```typescript
import { plainFetchAsync } from "@bodynarf/utils";

// Usage example
plainFetchAsync("/api/data")
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### simpleFetchAsync

Sends an Http request to the specified endpoint to retrieve text data.

```typescript
import { simpleFetchAsync } from "@bodynarf/utils";

// Usage example
simpleFetchAsync("/api/text")
    .then(text => console.log(text))
    .catch(error => console.error(error));
