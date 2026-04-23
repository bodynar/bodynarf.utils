# Array Utilities

Utilities for working with arrays, including grouping, filtering, removing duplicates, and other operations.

## Types

### Group

Represents a group of items with a common key.

```typescript
interface Group<TModel> {
    /** Key value */
    key: TModel[keyof TModel];

    /** Group items */
    items: Array<TModel>;
}
```

## Array Methods

### groupBy

Groups array elements by a specified key.

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const users = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Engineering" },
  { name: "Charlie", department: "Marketing" }
];

const grouped = users.groupBy("department");
// Result:
// [
//   { key: "Engineering", items: [
//     { name: "Alice", department: "Engineering" },
//     { name: "Bob", department: "Engineering" }
//   ]},
//   { key: "Marketing", items: [
//     { name: "Charlie", department: "Marketing" }
//   ]}
// ]
```

### trimNotDefinedValuesBy

Removes boundary elements containing `null` or `undefined` values in the specified key.

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [
  { id: null, name: "first" },
  { id: undefined, name: "second" },
  { id: 1, name: "third" },
  { id: 2, name: "fourth" },
  { id: null, name: "fifth" }
];

const result = arr.trimNotDefinedValuesBy(item => item.id);
// Result: [{ id: 1, name: "third" }, { id: 2, name: "fourth" }, { id: null, name: "fifth" }]
```

### chunk

Splits an array into chunks of a specified size.

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 3, 4, 5, 6, 7];
const chunks = arr.chunk(3);
// Result: [[1, 2, 3], [4, 5, 6], [7]]
```

### remove

Removes the specified element from the array (mutates the array).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 3, 2, 4];
arr.remove(2);
// arr is now [1, 3, 2, 4] (only first occurrence removed)
```

### removeByFn

Removes elements from the array by a specified predicate function (mutates the array).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 3, 4, 5];
arr.removeByFn(item => item % 2 === 0);
// arr is now [1, 3, 5]
```

### removeByKey

Removes elements from the array whose keys are present in the provided keys array (mutates the array).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" }
];

arr.removeByKey([1, 3], "id");
// arr is now [{ id: 2, name: "Bob" }, { id: 4, name: "David" }]
```

### removeDuplicate

Removes duplicates from the current array (mutates the array).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 2, 3, 3, 4];
arr.removeDuplicate();
// arr is now [1, 2, 3, 4]
```

### removeDuplicateBy

Removes duplicates from the current array by a specified key selector (mutates the array).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice Copy" },
  { id: 3, name: "Charlie" }
];

arr.removeDuplicateBy(item => item.id);
// arr is now [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
```

### withoutEmpty

Removes empty values (`[null, undefined]` & `[""]` depending on the `removeEmptyString` flag).

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr1 = [1, undefined, 2, 3, "some", "", null, "undefined", "text"];
const result1 = arr1.withoutEmpty();
// result1 is [1, 2, 3, "some", "", "undefined", "text"]

const result2 = arr1.withoutEmpty(true);
// result2 is [1, 2, 3, "some", "undefined", "text"]

const arr2 = [{ id: 1, name: "Alice" }, { id: null, name: "" }, { id: 3, name: "Charlie" }];
const result3 = arr2.withoutEmpty(false, item => item.id);
// result3 is [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
```

### withoutDuplicate

Creates a new array from the current one without duplicate values.

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 2, 3, 3, 4];
const result = arr.withoutDuplicate();
// result is [1, 2, 3, 4]
// arr is still [1, 2, 2, 3, 3, 4]
```

### withoutDuplicateBy

Creates a new array from the current one without duplicate values by a specified key selector.

| Parameter | Type | Description |
|-----------|------|-------------|
| `keySelector` | `(item: T) => TKey` | Function to select key for comparison |
| `ignoreEmptyValues` | `boolean` | When `true`, items with null/undefined keys are kept regardless of duplicates (default: `false`) |

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice Copy" },
  { id: 3, name: "Charlie" }
];

const result = arr.withoutDuplicateBy(item => item.id);
// result is [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
// arr is still the original array

// With ignoreEmptyValues: items with null/undefined keys are all preserved
const arr2 = [
  { id: 1, name: "Alice" },
  { id: null, name: "Unknown 1" },
  { id: 1, name: "Alice Copy" },
  { id: null, name: "Unknown 2" }
];

const result2 = arr2.withoutDuplicateBy(item => item.id, true);
// result2 is [{ id: 1, name: "Alice" }, { id: null, name: "Unknown 1" }, { id: null, name: "Unknown 2" }]
```

### shuffle

Returns a new array with items in random order using the Fisher-Yates algorithm. Does not mutate the original array.

```typescript
import "@bodynarf/utils/array"; // Must be imported to extend the prototype

const arr = [1, 2, 3, 4, 5];
const shuffled = arr.shuffle();
// shuffled is a new array with items in random order
// arr is still [1, 2, 3, 4, 5]
```
