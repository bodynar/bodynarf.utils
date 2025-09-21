# String Utilities

Utilities for working with strings, including formatting, conversion, and validation.

## Functions

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

### slugify

Converts a string to a URL-friendly format (slug).

```typescript
import { slugify } from "@bodynarf/utils";

slugify("Hello World!"); // "hello-world"
slugify("café ñoño"); // "café-ñoño"
```

### truncate

Truncates a string with ellipsis.

```typescript
import { truncate } from "@bodynarf/utils";

truncate("Hello World", 8); // "Hello..."
truncate("Hello World", 8, "---"); // "Hello---"
```

### toCamelCase

Converts a string to camelCase format.

```typescript
import { toCamelCase } from "@bodynarf/utils";

toCamelCase("hello world"); // "helloWorld"
toCamelCase("hello_world"); // "helloWorld"
```

### toSnakeCase

Converts a string to snake_case format.

```typescript
import { toSnakeCase } from "@bodynarf/utils";

toSnakeCase("hello world"); // "hello_world"
toSnakeCase("helloWorld"); // "hello_world"
```

### toKebabCase

Converts a string to kebab-case format.

```typescript
import { toKebabCase } from "@bodynarf/utils";

toKebabCase("hello world"); // "hello-world"
toKebabCase("helloWorld"); // "hello-world"
```

### escapeHtml

Escapes special HTML characters.

```typescript
import { escapeHtml } from "@bodynarf/utils";

escapeHtml("<div>Hello & World</div>"); // "<div>Hello & World</div>"
escapeHtml("'Hello' " + '"World"'); // "&#039;Hello&#039; "World""
```

## String Prototype Methods

### format

Formats a string by replacing anchors {0} with function arguments.

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

Checks if a string is nullish, empty, or consists only of whitespaces.

```typescript
import "@bodynarf/utils/string"; // Must be imported to extend the prototype

"".isNullOrWhiteSpace(); // true
"   ".isNullOrWhiteSpace(); // true
null.isNullOrWhiteSpace(); // true
undefined.isNullOrWhiteSpace(); // true
"hello".isNullOrWhiteSpace(); // false
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
