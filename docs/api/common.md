# Common Utilities

General utilities for checking values for null, undefined, and other validations.

## Checks

Functions for checking values against `null`, `undefined`, and other nullish states. Each check has a corresponding reverse function prefixed with `isNot`.

#### isNullOrUndefined

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
```

## Functions

General-purpose utility functions.

### sleep

Pauses execution for a specified number of milliseconds. Returns a `Promise` that resolves after the delay.

```typescript
import { sleep } from "@bodynarf/utils";

await sleep(1000); // wait 1 second
console.log("done");
```

## Color Utilities

Functions for working with colors. Supports RGB and hex color formats.

### Types

#### Color

RGB color model.

```typescript
interface Color {
    red: number;
    green: number;
    blue: number;
}
```

### Constants

#### blackHex

Hex string for black: `"#000000"`.

#### whiteHex

Hex string for white: `"#ffffff"`.

### Functions

#### isRgbColor

Checks if a string value is a valid RGB color.

```typescript
import { isRgbColor } from "@bodynarf/utils";

isRgbColor("rgb(255, 0, 0)"); // true
isRgbColor("rgba(255, 0, 0, 0.5)"); // true
isRgbColor("#ff0000"); // false
isRgbColor("red"); // false
```

#### isHexColor

Checks if a string value is a valid hex color (3 or 6 digits, with or without `#` prefix).

```typescript
import { isHexColor } from "@bodynarf/utils";

isHexColor("#ff0000"); // true
isHexColor("#f00"); // true
isHexColor("ff0000"); // true
isHexColor("rgb(255, 0, 0)"); // false
```

#### getRgbColor

Parses a RGB color string into a `Color` model.

```typescript
import { getRgbColor } from "@bodynarf/utils";

getRgbColor("rgb(255, 0, 0)"); // { red: 255, green: 0, blue: 0 }
getRgbColor("invalid"); // undefined
```

#### hexToRgb

Parses a hex color string into a `Color` model. Supports 3-digit and 6-digit hex colors.

```typescript
import { hexToRgb } from "@bodynarf/utils";

hexToRgb("#ff0000"); // { red: 255, green: 0, blue: 0 }
hexToRgb("#f00");    // { red: 15, green: 0, blue: 0 }
hexToRgb("invalid"); // undefined
```

#### rgbToHex

Converts a `Color` model to a hex string.

```typescript
import { rgbToHex } from "@bodynarf/utils";

rgbToHex({ red: 255, green: 0, blue: 0 }); // "#ff0000"
```

#### getFontColorFromString

Calculates an appropriate font color (black or white) based on a background color string (RGB or hex format).

```typescript
import { getFontColorFromString } from "@bodynarf/utils";

getFontColorFromString("#ffffff"); // "#000000" (black on white)
getFontColorFromString("#000000"); // "#ffffff" (white on black)
getFontColorFromString("invalid"); // ""
```

#### getFontColor

Calculates an appropriate font color (black or white) based on a background `Color` model.

```typescript
import { getFontColor } from "@bodynarf/utils";

getFontColor({ red: 255, green: 255, blue: 255 }); // "#000000" (black on white)
getFontColor({ red: 0, green: 0, blue: 0 });       // "#ffffff" (white on black)
```
