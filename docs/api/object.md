# Object Utilities

Utilities for working with objects, including cloning, merging, validations, and other operations.

## Functions

### ensurePropertyDefined

Checks if a key is declared in an object. Throws errors if not.

```typescript
import { ensurePropertyDefined } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30 };
ensurePropertyDefined(obj, "name"); // No error thrown

try {
  ensurePropertyDefined(obj, "address"); // Throws error
} catch (error) {
  console.log(error.message); // "Key "address" is not defined in object"
}
```

### getPropertyValue

Gets the value of an object property, returning undefined if the value is not defined.

```typescript
import { getPropertyValue } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30 };
const name = getPropertyValue(obj, "name"); // "Alice"
const address = getPropertyValue(obj, "address"); // undefined
```

### getPropertyValueWithCheck

Gets the value of a property from an object with a definition check.

```typescript
import { getPropertyValueWithCheck } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30 };
const name = getPropertyValueWithCheck(obj, "name"); // "Alice"

try {
  const address = getPropertyValueWithCheck(obj, "address"); // Throws error
} catch (error) {
  console.log(error.message); // "Key "address" is not defined in object"
}

const address = getPropertyValueWithCheck(obj, "address", false); // undefined (no error thrown)
```

### pick

Selects specific properties from an object.

```typescript
import { pick } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30, city: "New York" };
const picked = pick(obj, ["name", "city"]);
// picked is { name: "Alice", city: "New York" }
```

### omit

Excludes specific properties from an object.

```typescript
import { omit } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30, city: "New York" };
const omitted = omit(obj, ["age"]);
// omitted is { name: "Alice", city: "New York" }
```

### isObject

Checks if a value is an object.

```typescript
import { isObject } from "@bodynarf/utils";

isObject({}); // true
isObject([]); // false
isObject(null); // false
isObject("hello"); // false
```

### isObjectEmpty

Checks if an object is empty.

```typescript
import { isObjectEmpty } from "@bodynarf/utils";

isObjectEmpty({}); // true
isObjectEmpty({ name: "Alice" }); // false
```

### deepClone

Deeply clones an object.

```typescript
import { deepClone } from "@bodynarf/utils";

const obj = { name: "Alice", age: 30, address: { city: "New York" } };
const cloned = deepClone(obj);

// cloned is a deep copy of obj
cloned.address.city = "Boston";
console.log(obj.address.city); // "New York" (original unchanged)
console.log(cloned.address.city); // "Boston" (clone changed)
```

### mergeObjects

Merges two objects.

```typescript
import { mergeObjects } from "@bodynarf/utils";

const obj1 = { name: "Alice", age: 30 };
const obj2 = { age: 31, city: "New York" };
const merged = mergeObjects(obj1, obj2);
// merged is { name: "Alice", age: 31, city: "New York" }
```

### get

Gets a value from an object by path.

```typescript
import { get } from "@bodynarf/utils";

const obj = { a: { b: { c: 3 } } };
get(obj, "a.b.c"); // 3

const obj2 = { a: [{ b: 1 }, { b: 2 }] };
get(obj2, "a[0].b"); // 1

const obj3 = { a: 1 };
get(obj3, "b"); // undefined
```

### has

Checks if a property exists in an object by path.

```typescript
import { has } from "@bodynarf/utils";

const obj = { a: { b: { c: 3 } } };
has(obj, "a.b.c"); // true

const obj2 = { a: [{ b: 1 }, { b: 2 }] };
has(obj2, "a[0].b"); // true

const obj3 = { a: 1 };
has(obj3, "b"); // false
```

### isEqual

Compares two objects for deep equality without using JSON serialization. This function compares the number of properties, property types, and values recursively.

```typescript
import { isEqual } from "@bodynarf/utils";

const obj1 = { name: "Alice", age: 30, address: { city: "New York" } };
const obj2 = { name: "Alice", age: 30, address: { city: "New York" } };
const obj3 = { name: "Bob", age: 30, address: { city: "New York" } };

isEqual(obj1, obj2); // true
isEqual(obj1, obj3); // false
```
