import { isNullOrEmpty, isNullOrUndefined } from "../common";
import { generateGuid } from "../guid";

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
         */
        groupBy<T>(key: keyof T): Array<Group<T>>;

        /**
         * Remove border items that contains `null` or `undefined` values in specified key
         * @param keySelector Key value selector
         */
        trimNotDefinedValuesBy<TKey>(keySelector: (item: T) => TKey): Array<T>;

        /**
         * Split array to chunks
         * @param chunkSize Size of single chunk
         */
        chunk<TItem>(chunkSize: number): Array<Array<TItem>>;

        // #region remove (with mutation)

        /**
         * Remove specified item from array
         * @description Mutates the array
         * @param item Item in array
         */
        remove<T>(item: T): void;

        /**
         * Remove items from array by specified predicate function.
         * @description Mutates the array
         * @param predicate Function to select items
         */
        removeByFn<T>(predicate: (item: T) => boolean): void;

        /**
         * Remove items which keys not presented in allowed keys array
         * @description Mutates the array
         * @param keys Allowed keys array
         * @param key Name of object `T` property
         */
        removeByKey<T>(keys: Array<T[keyof T]>, key: keyof T): void;

        /**
         * Remove duplicates from current array
         * @description Mutates the array
         */
        removeDuplicate(): void;

        /**
         * Remove duplicates from current array by specific key selector
         * @description Mutates the array
         * @param keySelector Key value selector
         */
        removeDuplicateBy<TKey>(keySelector: (item: T) => TKey): void;

        // #endregion

        // #region without (no mutation)

        /**
         * Remove empty values (`[null, undefined]` & `[""]` depending on `removeEmptyString` flag)
         * @example [1, undefined, 2, 3, "some", "", null, "undefined", "text"].removeEmpty(true); // => [1, 2, 3, "some", "undefined", "text"]
         * @param removeEmptyString Remove empty strings (default is `false`)
         * @param valueSelector Selector for value for complex objects
         */
        withoutEmpty<TKey>(
            removeEmptyString?: boolean,
            valueSelector?: (item: T) => TKey | T,
        ): Array<T>;

        /**
         * Produce new array from current without duplicate values
         * @returns Current array without duplicate values
         */
        withoutDuplicate(): Array<T>;

        /**
         * Produce new array from current without duplicate values by specific key selector
         * @param keySelector Key value selector
         * @param ignoreEmptyValues Ignore values null & undefined values
         * @returns Current array without duplicate values
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

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const keyValue = keySelector(this[index]);

            if (isNullOrUndefined(keyValue)) {
                excludeIndexes.push(index++);
            } else {
                break;
            }
        }

        index = this.length - 1;

        // eslint-disable-next-line no-constant-condition
        while (true) {
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
        while (true) {
            const index = this.findIndex(predicate);

            if (index >= 0) {
                this.splice(index, 1);
                continue;
            }

            break;
        }
    };
}

if (isNullOrUndefined(Array.prototype.removeByKey)) {
    Array.prototype.removeByKey = function <TItem>(keys: Array<TItem[keyof TItem]>, key: keyof TItem): void {
        this.filter(item => !keys.includes(item[key]))
            .forEach(item => this.remove(item));
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

        return this.filter((x, i, a) => a.indexOf(x) === i);
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
        const seenKeys: Array<TKey> = [];

        for (let index = 0; index < this.length; index++) {
            const element = this[index];
            const key = keySelector(element);

            const isEmptyValue = isNullOrUndefined(key);

            if (ignoreEmptyValues && isEmptyValue) {
                result.push(element);
                continue;
            }

            if (!seenKeys.includes(key)) {
                seenKeys.push(key);
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
 * @returns 
 */
const removeDuplicateByFn = function <TItem extends any, TKey>(array: Array<TItem>, keySelector?: (item: TItem) => TKey): void {
    if (array.length === 0) {
        return;
    }

    const seenKeys: Array<any> = [];
    const removeMarker: string = generateGuid();

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const key = isNullOrUndefined(keySelector) ? element : keySelector!(element);

        if (!seenKeys.includes(key)) {
            seenKeys.push(key);
        } else {
            array[index] = removeMarker as TItem;
        }
    }

    array.removeByFn(x => x === removeMarker);
};

// #endregion
