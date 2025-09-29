# Common Utilities

General utilities for checking values for null, undefined, and other validations.

## Functions

### isNullOrUndefined

Checks if a value is null or undefined.

```typescript
import { isNullOrUndefined } from "@bodynarf/utils";

isNullOrUndefined(null); // true
isNullOrUndefined(undefined); // true
isNullOrUndefined(0); // false
isNullOrUndefined(""); // false
isNullOrUndefined(false); // false
```

### isNotNullOrUndefined

Checks if a value is defined (not null and not undefined). This is the reverse of isNullOrUndefined.

```typescript
import { isNotNullOrUndefined } from "@bodynarf/utils";

isNotNullOrUndefined(null); // false
isNotNullOrUndefined(undefined); // false
isNotNullOrUndefined(0); // true
isNotNullOrUndefined(""); // true
isNotNullOrUndefined(false); // true
```

### isNullish

Type guard against nullish values.

```typescript
import { isNullish } from "@bodynarf/utils";

isNullish(null); // true
isNullish(undefined); // true
isNullish(0); // false
isNullish(""); // false
isNullish(false); // false
```

### isNotNullish

Type guard against non-nullish values. This is the reverse of isNullish. Provides improved type safety by narrowing nullable types to their non-nullable counterparts.

```typescript
import { isNotNullish } from "@bodynarf/utils";

isNotNullish(null); // false
isNotNullish(undefined); // false
isNotNullish(0); // true
isNotNullish(""); // true
isNotNullish(false); // true

// Type narrowing example:
const value: string | null = getStringOrNull();
if (isNotNullish(value)) {
  // Here, value is narrowed to string type
  console.log(value.toUpperCase()); // No TypeScript error
}
```

### isNull

Checks if a value is null.

```typescript
import { isNull } from "@bodynarf/utils";

isNull(null); // true
isNull(undefined); // false
isNull(0); // false
isNull(""); // false
```

### isNotNull

Checks if a value is not null. This is the reverse of isNull.

```typescript
import { isNotNull } from "@bodynarf/utils";

isNotNull(null); // false
isNotNull(undefined); // true
isNotNull(0); // true
isNotNull(""); // true
```

### isUndefined

Checks if a value is undefined.

```typescript
import { isUndefined } from "@bodynarf/utils";

isUndefined(undefined); // true
isUndefined(null); // false
isUndefined(0); // false
isUndefined(""); // false
```

### isNotUndefined

Checks if a value is not undefined. This is the reverse of isUndefined.

```typescript
import { isNotUndefined } from "@bodynarf/utils";

isNotUndefined(undefined); // false
isNotUndefined(null); // true
isNotUndefined(0); // true
isNotUndefined(""); // true
```

### getValueOrDefault

Returns the value if it is defined, otherwise returns the default value.

```typescript
import { getValueOrDefault } from "@bodynarf/utils";

getValueOrDefault(null, "default"); // "default"
getValueOrDefault(undefined, "default"); // "default"
getValueOrDefault("value", "default"); // "value"
getValueOrDefault(0, 42); // 0
getValueOrDefault("", "default"); // ""
