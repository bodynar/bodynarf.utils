# LocalStorage Utilities

Utilities for working with LocalStorage.

## Functions

### hasRecord

Gets a flag indicating the existence of a record in storage.

```typescript
import { localStorage } from "@bodynarf/utils";

// Save a record first
localStorage.saveRecord("user", { name: "Alice", age: 30 });

// Check if record exists
localStorage.hasRecord("user"); // true
localStorage.hasRecord("nonexistent"); // false
```

### getRecord

Retrieves saved data.

```typescript
import { localStorage } from "@bodynarf/utils";

// Save a record first
localStorage.saveRecord("user", { name: "Alice", age: 30 });

// Retrieve the record
const user = localStorage.getRecord<{ name: string; age: number }>("user");
console.log(user); // { name: "Alice", age: 30 }

// Try to retrieve a non-existent record
const nonexistent = localStorage.getRecord("nonexistent");
console.log(nonexistent); // undefined
```

### saveRecord

Saves data to local storage.

```typescript
import { localStorage } from "@bodynarf/utils";

// Save a simple value
localStorage.saveRecord("username", "Alice");

// Save an object
localStorage.saveRecord("user", { name: "Alice", age: 30 });

// Retrieve the saved data
const username = localStorage.getRecord<string>("username");
const user = localStorage.getRecord<{ name: string; age: number }>("user");
```

### clear

Clears the storage, removing all existing values.

```typescript
import { localStorage } from "@bodynarf/utils";

// Save some records
localStorage.saveRecord("key1", "value1");
localStorage.saveRecord("key2", "value2");

// Clear all records
localStorage.clear();

// Check that records are gone
localStorage.hasRecord("key1"); // false
localStorage.hasRecord("key2"); // false
