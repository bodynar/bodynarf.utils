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

### isNull

Checks if a value is null.

```typescript
import { isNull } from "@bodynarf/utils";

isNull(null); // true
isNull(undefined); // false
isNull(0); // false
isNull(""); // false
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

### getValueOrDefault

Returns the value if it is defined, otherwise returns the default value.

```typescript
import { getValueOrDefault } from "@bodynarf/utils";

getValueOrDefault(null, "default"); // "default"
getValueOrDefault(undefined, "default"); // "default"
getValueOrDefault("value", "default"); // "value"
getValueOrDefault(0, 42); // 0
getValueOrDefault("", "default"); // ""
