import { isNullOrEmpty } from "../string";
import { isNullish, isNullOrUndefined } from "../common/checks";

/**
 * Grouped items by specified key
 */
export interface Group<TModel> {
    /** Key value */
    key: TModel[keyof TModel];

    /** Group items */
    items: Array<TModel>;
}

declare global {
    interface Array<T> {
        /**
         * Group items by specified key
         * @param items Array of items
         * @param key Model key value that should divide items array into groups by this value
         * @returns Array of groups, see `Group`
         * @example
         * ```typescript
         * const users = [
         *   { name: "Alice", department: "Engineering" },
         *   { name: "Bob", department: "Engineering" },
         *   { name: "Charlie", department: "Marketing" }
         * ];
         *
         * const grouped = users.groupBy("department");
         * // Result:
         * // [
         * //   { key: "Engineering", items: [
         * //     { name: "Alice", department: "Engineering" },
         * //     { name: "Bob", department: "Engineering" }
         * //   ]},
         * //   { key: "Marketing", items: [
         * //     { name: "Charlie", department: "Marketing" }
         * //   ]}
         * // ]
         * ```
         */
        groupBy<T>(key: keyof T): Array<Group<T>>;

        /**
         * Remove border items that contains `null` or `undefined` values in specified key
         * @param keySelector Key value selector
         * @returns New array without border items containing null or undefined values
         * @example
         * ```typescript
         * const arr = [
         *   { id: null, name: "first" },
         *   { id: undefined, name: "second" },
         *   { id: 1, name: "third" },
         *   { id: 2, name: "fourth" },
         *   { id: null, name: "fifth" }
         * ];
         *
         * const result = arr.trimNotDefinedValuesBy(item => item.id);
         * // Result: [{ id: 1, name: "third" }, { id: 2, name: "fourth" }, { id: null, name: "fifth" }]
         * ```
         */
        trimNotDefinedValuesBy<TKey>(keySelector: (item: T) => TKey): Array<T>;

        /**
         * Split array to chunks
         * @param chunkSize Size of single chunk
         * @returns Array of chunks
         * @example
         * ```typescript
         * const arr = [1, 2, 3, 4, 5, 6, 7];
         * const chunks = arr.chunk(3);
         * // Result: [[1, 2, 3], [4, 5, 6], [7]]
         * ```
         */
        chunk<TItem>(chunkSize: number): Array<Array<TItem>>;

        // #region remove (with mutation)

        /**
         * Remove specified item from array
         * @description Mutates the array
         * @param item Item in array
         * @example
         * ```typescript
         * const arr = [1, 2, 3, 2, 4];
         * arr.remove(2);
         * // arr is now [1, 3, 2, 4] (only first occurrence removed)
         * ```
         */
        remove<T>(item: T): void;

        /**
         * Remove items from array by specified predicate function.
         * @description Mutates the array
         * @param predicate Function to select items
         * @example
         * ```typescript
         * const arr = [1, 2, 3, 4, 5];
         * arr.removeByFn(item => item % 2 === 0);
         * // arr is now [1, 3, 5]
         * ```
         */
        removeByFn<T>(predicate: (item: T) => boolean): void;

        /**
         * Remove items which keys not presented in allowed keys array
         * @description Mutates the array
         * @param keys Allowed keys array
         * @param key Name of object `T` property
         * @example
         * ```typescript
         * const arr = [
         *   { id: 1, name: "Alice" },
         *   { id: 2, name: "Bob" },
         *   { id: 3, name: "Charlie" },
         *   { id: 4, name: "David" }
         * ];
         *
         * arr.removeByKey([1, 3], "id");
         * // arr is now [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
         * ```
         */
        removeByKey<T>(keys: Array<T[keyof T]>, key: keyof T): void;

        /**
         * Remove duplicates from current array
         * @description Mutates the array
         * @example
         * ```typescript
         * const arr = [1, 2, 2, 3, 3, 4];
         * arr.removeDuplicate();
         * // arr is now [1, 2, 3, 4]
         * ```
         */
        removeDuplicate(): void;

        /**
         * Remove duplicates from current array by specific key selector
         * @description Mutates the array
         * @param keySelector Key value selector
         * @example
         * ```typescript
         * const arr = [
         *   { id: 1, name: "Alice" },
         *   { id: 2, name: "Bob" },
         *   { id: 1, name: "Alice Copy" },
         *   { id: 3, name: "Charlie" }
         * ];
         *
         * arr.removeDuplicateBy(item => item.id);
         * // arr is now [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
         * ```
         */
        removeDuplicateBy<TKey>(keySelector: (item: T) => TKey): void;

        // #endregion

        // #region without (no mutation)

        /**
         * Remove empty values (`[null, undefined]` & `[""]` depending on `removeEmptyString` flag)
         * @example [1, undefined, 2, 3, "some", "", null, "undefined", "text"].removeEmpty(true); // => [1, 2, 3, "some", "undefined", "text"]
         * @param removeEmptyString Remove empty strings (default is `false`)
         * @param valueSelector Selector for value for complex objects
         * @returns New array without empty values
         * @example
         * ```typescript
         * const arr1 = [1, undefined, 2, 3, "some", "", null, "undefined", "text"];
         * const result1 = arr1.withoutEmpty();
         * // result1 is [1, 2, 3, "some", "", "undefined", "text"]
         *
         * const result2 = arr1.withoutEmpty(true);
         * // result2 is [1, 2, 3, "some", "undefined", "text"]
         *
         * const arr2 = [{ id: 1, name: "Alice" }, { id: null, name: "" }, { id: 3, name: "Charlie" }];
         * const result3 = arr2.withoutEmpty(false, item => item.id);
         * // result3 is [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
         * ```
         */
        withoutEmpty<TKey>(
            removeEmptyString?: boolean,
            valueSelector?: (item: T) => TKey | T,
        ): Array<T>;

        /**
         * Produce new array from current without duplicate values
         * @returns Current array without duplicate values
         * @example
         * ```typescript
         * const arr = [1, 2, 2, 3, 3, 4];
         * const result = arr.withoutDuplicate();
         * // result is [1, 2, 3, 4]
         * // arr is still [1, 2, 2, 3, 3, 4]
         * ```
         */
        withoutDuplicate(): Array<T>;

        /**
         * Produce new array from current without duplicate values by specific key selector
         * @param keySelector Key value selector
         * @param ignoreEmptyValues Ignore values null & undefined values
         * @returns Current array without duplicate values
         * @example
         * ```typescript
         * const arr = [
         *   { id: 1, name: "Alice" },
         *   { id: 2, name: "Bob" },
         *   { id: 1, name: "Alice Copy" },
         *   { id: 3, name: "Charlie" }
         * ];
         *
         * const result = arr.withoutDuplicateBy(item => item.id);
         * // result is [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
         * // arr is still the original array
         * ```
         */
        withoutDuplicateBy<TKey>(keySelector: (item: T) => TKey, ignoreEmptyValues?: boolean): Array<T>;

        // #endregion
    }
}

if (isNullOrUndefined(Array.prototype.groupBy)) {
    Array.prototype.groupBy = function <TItem>(key: keyof TItem): Array<Group<TItem>> {
        if (this.length === 0) {
            return [];
        }

        const reduced = this.reduce((result, item) => {
            const value: any = item[key];
            (result[value] = result[value] ?? []).push(item);

            return result;
        }, {} as Record<string, Array<TItem>>);

        return Object.entries(reduced).map(([key, value]) => ({
            key,
            items: value
        }) as Group<TItem>);
    };
}

if (isNullOrUndefined(Array.prototype.trimNotDefinedValuesBy)) {
    Array.prototype.trimNotDefinedValuesBy = function <T, TKey>(keySelector: (item: T) => TKey) {
        const excludeIndexes: Array<number> = [];
        let index = 0;

        while (index < this.length) {
            const keyValue = keySelector(this[index]);

            if (isNullOrUndefined(keyValue)) {
                excludeIndexes.push(index++);
            } else {
                break;
            }
        }

        index = this.length - 1;

        while (index >= 0) {
            const keyValue = keySelector(this[index]);

            if (isNullOrUndefined(keyValue)) {
                excludeIndexes.push(index--);
            } else {
                break;
            }
        }

        return this.filter((_, i) => !excludeIndexes.includes(i));
    };
}

if (isNullOrUndefined(Array.prototype.chunk)) {
    Array.prototype.chunk = function <TItem>(chunkSize: number): Array<Array<TItem>> {
        return this.reduce((result, item, index) => {
            if (index % chunkSize === 0) {
                result.push([item]);
            } else {
                result[result.length - 1].push(item);
            }
            return result;
        }, []);
    };
}

// #region remove (with mutation)

if (isNullOrUndefined(Array.prototype.remove)) {
    Array.prototype.remove = function <TItem>(item: TItem): void {
        const index = this.indexOf(item);

        if (index >= 0) {
            this.splice(index, 1);
        }
    };
}

if (isNullOrUndefined(Array.prototype.removeByFn)) {
    Array.prototype.removeByFn = function <TItem>(predicate: (item: TItem) => boolean): void {
        let index;
        while ((index = this.findIndex(predicate)) >= 0) {
            this.splice(index, 1);
        }
    };
}

if (isNullOrUndefined(Array.prototype.removeByKey)) {
    Array.prototype.removeByKey = function <TItem>(keys: Array<TItem[keyof TItem]>, key: keyof TItem): void {
        const keysSet = new Set(keys);

        for (let i = this.length - 1; i >= 0; i--) {
            if (keysSet.has(this[i][key])) {
                this.splice(i, 1);
            }
        }
    };
}

if (isNullOrUndefined(Array.prototype.removeDuplicate)) {
    Array.prototype.removeDuplicate = function (): void {
        removeDuplicateByFn(this);
    };
}

if (isNullOrUndefined(Array.prototype.removeDuplicateBy)) {
    Array.prototype.removeDuplicateBy = function <TItem, TKey>(keySelector: (item: TItem) => TKey): void {
        removeDuplicateByFn(this, keySelector);
    };
}

// #endregion

// #region without (no mutation)

if (isNullOrUndefined(Array.prototype.withoutDuplicate)) {
    Array.prototype.withoutDuplicate = function <TItem>(): Array<TItem> {
        if (this.length === 0) {
            return [];
        }

        const seen = new Set<TItem>();

        for (const item of this) {
            seen.add(item);
        }

        return [...seen];
    };
}

if (isNullOrUndefined(Array.prototype.withoutDuplicateBy)) {
    Array.prototype.withoutDuplicateBy = function <TItem, TKey>(
        keySelector: (item: TItem) => TKey,
        ignoreEmptyValues = false
    ): Array<TItem> {
        if (this.length === 0) {
            return [];
        }

        const result: Array<TItem> = [];
        const seenKeys = new Set<TKey>();

        for (let index = 0; index < this.length; index++) {
            const element = this[index];
            const key = keySelector(element);

            const isEmptyValue = isNullOrUndefined(key);

            if (ignoreEmptyValues && isEmptyValue) {
                result.push(element);
                continue;
            }

            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                result.push(element);
            }
        }

        return result;
    };
}

if (isNullOrUndefined(Array.prototype.withoutEmpty)) {
    Array.prototype.withoutEmpty = function <TItem, TKey = object | TItem>(
        removeEmptyString = false,
        valueSelector: (item: TItem) => TKey | TItem = (x) => x,
    ): Array<TItem> {
        return this.filter(item => {
            const value = valueSelector(item);

            const isEmptyValue = removeEmptyString
                ? isNullOrEmpty(value as string)
                : isNullOrUndefined(value)
                ;

            return !isEmptyValue;
        });
    };
}

// #endregion

// #region Not public fns

/**
 * Remove duplicate values from array. Modifies the array
 * @param array Array with possible duplicates
 * @param keySelector Selector of key values
 * @example
 * ```typescript
 * const arr = [1, 2, 2, 3, 3, 4];
 * removeDuplicateByFn(arr);
 * // arr is now [1, 2, 3, 4]
 *
 * const objArr = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alice Copy" },
 *   { id: 3, name: "Charlie" }
 * ];
 * removeDuplicateByFn(objArr, item => item.id);
 * // objArr is now [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
 * ```
 */
const removeDuplicateByFn = function <TItem extends any, TKey>(array: Array<TItem>, keySelector?: (item: TItem) => TKey): void {
    if (array.length === 0) {
        return;
    }

    const seenKeys = new Set<any>();

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const key = isNullish(keySelector) ? element : keySelector(element);

        if (!seenKeys.has(key)) {
            seenKeys.add(key);
        } else {
            array.splice(index, 1);
            index--;
        }
    }
};

// #endregion
