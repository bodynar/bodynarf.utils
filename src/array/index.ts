import { isNullOrUndefined } from "../common";

/**
 * Filter array by key values
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
    }
}

if (isNullOrUndefined(Array.prototype.remove)) {
    Array.prototype.remove = function <TItem>(item: TItem) {
        const index = this.indexOf(item);

        if (index >= 0) {
            this.splice(index, 1);
        }
    };
}

if (isNullOrUndefined(Array.prototype.removeByFn)) {
    Array.prototype.removeByFn = function <TItem>(predicate: (item: TItem) => boolean) {
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