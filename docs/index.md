# bodynarf/utils

Welcome to the documentation for the bodynarf/utils library - a collection of useful utilities for JavaScript/TypeScript application development.

## About the Library

bodynarf/utils is a collection of functions and utilities that help simplify everyday development tasks such as working with arrays, objects, strings, dates, promises, and other data types.

## Installation

```bash
npm install @bodynarf/utils
```

## Usage

```javascript
import { isNullOrUndefined, slugify } from "@bodynarf/utils";

// Check for null or undefined
console.log(isNullOrUndefined(null)); // true
console.log(isNullOrUndefined(undefined)); // true
console.log(isNullOrUndefined(0)); // false

// Convert string to URL-friendly format
console.log(slugify("Hello World!")); // "hello-world"
```

## Documentation Sections

Explore the different sections of the documentation to learn more about the available functions:

- [Common](/api/common) - Common utilities
- [Array](/api/array) - Working with arrays
- [Function](/api/function) - Function utilities
- [String](/api/string) - Working with strings
- [Object](/api/object) - Working with objects
- [Date](/api/date) - Working with dates
- [Event](/api/event) - Event management
- [GUID](/api/guid) - GUID generation
- [LocalStorage](/api/localstorage) - Working with LocalStorage
- [Promise](/api/promise) - Promise utilities
- [API](/api/api) - HTTP request utilities

## Documentation Generation

This documentation was automatically generated with [Kilo Code](https://github.com/Kilo-Org/kilocode) assistant using [Qwen3-Coder-480B](https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct) model.
