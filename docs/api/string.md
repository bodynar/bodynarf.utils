# String Utilities

Utilities for working with strings, including checks, transformation, and formatting.

The module is split into focused files:

| File | Purpose |
|------|---------|
| `checks.ts` | Null / empty predicates |
| `transform.ts` | Case and slug conversions |
| `format.ts` | Output formatting and escaping |
| `getInitials.ts` | Initials extraction |
| `prototype.ts` | `String.prototype` extensions |

All exports are re-exported from the top-level `@bodynarf/utils` package.

## Checks

### isStringEmpty

Checks if a string is empty.

```typescript
import { isStringEmpty } from "@bodynarf/utils";

isStringEmpty(""); // true
isStringEmpty("hello"); // false
```

### isNullOrEmpty

Checks if a value is null, undefined, or an empty string.

```typescript
import { isNullOrEmpty } from "@bodynarf/utils";

isNullOrEmpty(null); // true
isNullOrEmpty(undefined); // true
isNullOrEmpty(""); // true
isNullOrEmpty("hello"); // false
```

### isStringNotEmpty

Checks if a string is not empty (reverse of isStringEmpty).

```typescript
import { isStringNotEmpty } from "@bodynarf/utils";

isStringNotEmpty(""); // false
isStringNotEmpty("hello"); // true
```

### isNotNullOrEmpty

Checks if a value is not null, undefined, or an empty string (reverse of isNullOrEmpty).

```typescript
import { isNotNullOrEmpty } from "@bodynarf/utils";

isNotNullOrEmpty(null); // false
isNotNullOrEmpty(undefined); // false
isNotNullOrEmpty(""); // false
isNotNullOrEmpty("hello"); // true
```

## Transformation

### slugify

Converts a string to a URL-friendly format (slug). Supports Unicode letters and numbers via `\p{L}` and `\p{N}`.

```typescript
import { slugify } from "@bodynarf/utils";

slugify("Hello World!"); // "hello-world"
slugify("café ñoño");    // "café-ñoño"
```

### toCamelCase

Converts a string to `camelCase`.

```typescript
import { toCamelCase } from "@bodynarf/utils";

toCamelCase("hello world"); // "helloWorld"
toCamelCase("hello_world"); // "helloWorld"
toCamelCase("hello-world"); // "helloWorld"
```

### toSnakeCase

Converts a string to `snake_case`.

```typescript
import { toSnakeCase } from "@bodynarf/utils";

toSnakeCase("hello world"); // "hello_world"
toSnakeCase("helloWorld");  // "hello_world"
```

### toKebabCase

Converts a string to `kebab-case`.

```typescript
import { toKebabCase } from "@bodynarf/utils";

toKebabCase("hello world"); // "hello-world"
toKebabCase("helloWorld");  // "hello-world"
```

## Formatting

### truncate

Truncates a string to `maxLength` characters, appending an ellipsis. The total length of the result (including the ellipsis) does not exceed `maxLength`.

```typescript
import { truncate } from "@bodynarf/utils";

truncate("Hello World", 8);        // "Hello..."
truncate("Hello World", 8, "---"); // "Hello---"
truncate("Hi", 10);                // "Hi"
```

### escapeHtml

Escapes `&`, `<`, `>`, `"`, and `'` to their HTML entity equivalents.

```typescript
import { escapeHtml } from "@bodynarf/utils";

escapeHtml("<div>Hello & World</div>");
// → "&lt;div&gt;Hello &amp; World&lt;/div&gt;"

escapeHtml("it's \"fine\"");
// → "it&#039;s &quot;fine&quot;"
```

### unescapeHtml

Unescapes HTML entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#039;`) back to their original characters. Inverse of `escapeHtml`.

```typescript
import { unescapeHtml } from "@bodynarf/utils";

unescapeHtml("&lt;div&gt;Hello &amp; World&lt;/div&gt;");
// → "<div>Hello & World</div>"

unescapeHtml("&#039;Hello&#039; &quot;World&quot;");
// → "'Hello' \"World\""
```

### wordCount

Counts the number of words in a string. Words are separated by whitespace.

```typescript
import { wordCount } from "@bodynarf/utils";

wordCount("Hello World");           // 2
wordCount("  multiple   spaces  "); // 2
wordCount("");                       // 0
wordCount(null);                     // 0
```

### mask

Masks a string, showing only the last N characters. Useful for hiding sensitive data like card numbers or emails.

```typescript
import { mask } from "@bodynarf/utils";

mask("1234567890");         // "******7890"
mask("1234567890", 2);      // "********90"
mask("1234567890", 4, "#"); // "######7890"
mask("abc", 4);              // "abc" (shorter than visibleChars)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `str` | `string` | — | String to mask |
| `visibleChars` | `number` | `4` | Number of visible characters at the end |
| `maskChar` | `string` | `"*"` | Character used for masking |

### getInitials

Extracts two-character uppercase initials from a full display name.
All non-letter characters are ignored via Unicode `\p{L}`, so the function works with Latin, Cyrillic, and any other script.

Resolution rules:
- **Two or more word-tokens** → first letter of the first two tokens.
- **One token** → first two characters of that token.
- **No letter content** → `"??"`.

```typescript
import { getInitials } from "@bodynarf/utils";

getInitials("John Doe")     // "JD"
getInitials("John")         // "JO"
getInitials('"Demo" agent') // "DA"
getInitials("Иван Петров")  // "ИП"
getInitials("42 !!!")       // "??"
```

## String Prototype Methods

### format

Formats a string by replacing anchors `{0}`, `{1}`, … with the supplied arguments.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"{0} world!".format("Hello") // => "Hello world!"
```

### capitalize

Converts the first letter to uppercase.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"hello world!".capitalize() // => "Hello world!"
```

### isEmpty

Checks if a string is empty.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"".isEmpty(); // true
"hello".isEmpty(); // false
```

### isNullOrEmpty

Checks if a string is nullish or empty.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"".isNullOrEmpty(); // true
null.isNullOrEmpty(); // true
undefined.isNullOrEmpty(); // true
"hello".isNullOrEmpty(); // false
```

### isNullOrWhiteSpace

Checks if a string is empty or consists only of whitespaces.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"".isNullOrWhiteSpace(); // true
"   ".isNullOrWhiteSpace(); // true
"hello".isNullOrWhiteSpace(); // false
```

### isNotEmpty

Checks if a string is not empty (reverse of isEmpty).

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"hello".isNotEmpty(); // true
"".isNotEmpty(); // false
```

### isNotNullOrEmpty

Checks if a string is not nullish or empty (reverse of isNullOrEmpty).

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"hello".isNotNullOrEmpty(); // true
"".isNotNullOrEmpty(); // false
null.isNotNullOrEmpty(); // false
undefined.isNotNullOrEmpty(); // false
```

### toKebabCase

Converts a string to kebab-case format.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"hello world".toKebabCase(); // "hello-world"
"helloWorld".toKebabCase(); // "hello-world"
```

### toCamelCase

Converts a string to camelCase format.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"hello world".toCamelCase(); // "helloWorld"
"hello_world".toCamelCase(); // "helloWorld"
