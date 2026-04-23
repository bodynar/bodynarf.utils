# Validation Utilities

Composable, type-safe validators for runtime value checking.

Each validator is a plain function `(value: T) => ValidationResult` and can be used standalone or combined with `compose`.

## Types

### ValidationResult

The return type of every validator.

```typescript
type ValidationResult = {
    readonly valid: boolean;
    readonly message: string | undefined;
};
```

### Validator\<T\>

A function that accepts a value of type `T` and returns a `ValidationResult`.

```typescript
type Validator<T> = (value: T) => ValidationResult;
```

### validResult

A shared passing result. Reuse this constant instead of creating new objects.

```typescript
import { validResult } from "@bodynarf/utils";

validResult; // { valid: true, message: undefined }
```

### invalidResult

Creates a failing result with the provided error message.

```typescript
import { invalidResult } from "@bodynarf/utils";

invalidResult("Something went wrong.");
// → { valid: false, message: "Something went wrong." }
```

## String Validators

### required

Validates that a string is not empty (trims whitespace before checking).

```typescript
import { required } from "@bodynarf/utils";

const v = required();

v("");        // { valid: false, message: "Value is required." }
v("   ");     // { valid: false, message: "Value is required." }
v("hello");   // { valid: true,  message: undefined }

// Custom message
const v2 = required("This field is required.");
v2("");       // { valid: false, message: "This field is required." }
```

### minLength

Validates that a string has at least `n` characters (after trimming).

```typescript
import { minLength } from "@bodynarf/utils";

const v = minLength(3);

v("ab");     // { valid: false, message: "Value must be at least 3 characters long." }
v("abc");    // { valid: true }
v("abcde");  // { valid: true }
```

### maxLength

Validates that a string does not exceed `n` characters (after trimming).

```typescript
import { maxLength } from "@bodynarf/utils";

const v = maxLength(5);

v("toolong");  // { valid: false, message: "Value must be at most 5 characters long." }
v("hello");    // { valid: true }
v("hi");       // { valid: true }
```

### lengthBetween

Validates that a string length falls within `[min, max]` (after trimming).

```typescript
import { lengthBetween } from "@bodynarf/utils";

const v = lengthBetween(2, 5);

v("a");        // { valid: false, message: "Value must be between 2 and 5 characters long." }
v("abc");      // { valid: true }
v("toolong");  // { valid: false }
```

### pattern

Validates that a string matches a regular expression.

```typescript
import { pattern } from "@bodynarf/utils";

const v = pattern(/^\d{4}$/);

v("12ab");  // { valid: false, message: "Value has an invalid format." }
v("1234");  // { valid: true }

// Custom message
const v2 = pattern(/^\d+$/, "Digits only.");
v2("abc");  // { valid: false, message: "Digits only." }
```

### email

Validates that a string is a well-formed email address.

```typescript
import { email } from "@bodynarf/utils";

const v = email();

v("bad");               // { valid: false, message: "Value must be a valid email address." }
v("user@example.com");  // { valid: true }
```

## Number Validators

### min

Validates that a number is greater than or equal to `n`.

```typescript
import { min } from "@bodynarf/utils";

const v = min(0);

v(-1);  // { valid: false, message: "Value must be at least 0." }
v(0);   // { valid: true }
v(5);   // { valid: true }
```

### max

Validates that a number is less than or equal to `n`.

```typescript
import { max } from "@bodynarf/utils";

const v = max(100);

v(101);  // { valid: false, message: "Value must be at most 100." }
v(100);  // { valid: true }
v(50);   // { valid: true }
```

### range

Validates that a number falls within `[min, max]`.

```typescript
import { range } from "@bodynarf/utils";

const v = range(1, 10);

v(0);   // { valid: false, message: "Value must be between 1 and 10." }
v(5);   // { valid: true }
v(11);  // { valid: false }
```

## Generic Validators

### notNull

Validates that a value is not `null` or `undefined`. Works with any type `T`.

```typescript
import { notNull } from "@bodynarf/utils";

const v = notNull<string>();

v(null);       // { valid: false, message: "Value is required." }
v(undefined);  // { valid: false }
v("hello");    // { valid: true }
v(0);          // { valid: true }
v(false);      // { valid: true }
```

### compose

Combines multiple validators for the same type into one. Runs them in order and returns the **first failure**, or a passing result if all pass.

```typescript
import { compose, required, minLength, maxLength } from "@bodynarf/utils";

const v = compose(required(), minLength(3), maxLength(20));

v("");                     // { valid: false, message: "Value is required." }
v("ab");                   // { valid: false, message: "Value must be at least 3 characters long." }
v("this is way too long"); // { valid: false, message: "Value must be at most 20 characters long." }
v("hello");                // { valid: true,  message: undefined }
```

## Custom Validators

Any function matching `(value: T) => ValidationResult` is a valid `Validator<T>` and can be used with `compose`.

```typescript
import { Validator, validResult, invalidResult, compose, required } from "@bodynarf/utils";

const noSpaces: Validator<string> = (value) =>
    value.includes(" ")
        ? invalidResult("Value must not contain spaces.")
        : validResult;

const v = compose(required(), noSpaces);

v("hello world");  // { valid: false, message: "Value must not contain spaces." }
v("hello");        // { valid: true }
```
