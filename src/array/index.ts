import { isNullOrUndefined } from "../common";

/**
 * Filter array by key values
 * @deprecated Use `Array.prototype.removeByKey`. Will be removed after `v1.2`
 * @param array Array
 * @param selector Key selector
 * @param keys Keys to remove
 * @returns Filtered array
 */
export function removeByKey<TItem, TValue>(
    array: Array<TItem>,
    selector: (item: TItem) => TValue,
    keys: Array<TValue>
): Array<TItem> {
    return array.filter(item => {
        const value = selector(item);

        return !keys.includes(value);
    });
}

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
         * Remove specified item from array.
         * With array mutation
         * @param item Item in array
         */
        remove<T>(item: T): void;

        /**
         * Remove items from array by specified predicate function.
         * With array mutation
         * @param predicate Function to select items
         */
        removeByFn<T>(predicate: (item: T) => boolean): void;

        /**
         * Remove items which keys not presented in allowed keys array
         * @param keys Allowed keys array
         * @param key Name of object `T` property
         */
        removeByKey<T>(keys: Array<T[keyof T]>, key: keyof T): void;

        /**
         * Group items by specified key
         * @param items Array of items
         * @param key Model key value that should divide items array into groups by this value
         * @returns Array of groups, see `Group`
         */
        groupBy<T>(key: keyof T): Array<Group<T>>;
    }
}

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

if (isNullOrUndefined(Array.prototype.groupBy)) {
    Array.prototype.groupBy = function <TItem>(key: keyof TItem): Array<Group<TItem>> {
        if (this.length === 0) {
            return [];
        }

        const reduced = this.reduce((result, item) => {
            const value: any = item[key];
            (result[value] = result[value] || []).push(value);

            return result;
        }, {} as Record<string, Array<TItem>>);

        return Object.entries(reduced).map(([key, value]) => ({
            key,
            items: value
        }) as Group<TItem>);
    };
}

if (isNullOrUndefined(Array.prototype.removeByKey)) {
    Array.prototype.removeByKey = function <TItem>(keys: Array<TItem[keyof TItem]>, key: keyof TItem): void {
        this.filter(item => !keys.includes(item[key]))
            .forEach(item => this.remove(item));
    };
}