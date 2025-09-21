import { Optional, isNullish, isStringEmpty } from "..";

/** shortcut to local storage */
const storage: Storage = window.localStorage;

/**
 * Get flag of existence record in storage
 * @param key Unique record key
 * @returns Flag representing existence of record
 * @example
 * ```typescript
 * // Save a record first
 * saveRecord("user", { name: "Alice", age: 30 });
 *
 * // Check if record exists
 * hasRecord("user"); // true
 * hasRecord("nonexistent"); // false
 * ```
 */
const hasRecord = (key: string): boolean => {
    if (isStringEmpty(key)) {
        return false;
    }

    const record = storage.getItem(key);

    return !isNullish(record);
};

/**
 * Get stored data
 * @param key Unique record key
 * @returns Undefined if record does not exist in storage; otherwise saved value
 * @example
 * ```typescript
 * // Save a record first
 * saveRecord("user", { name: "Alice", age: 30 });
 *
 * // Retrieve the record
 * const user = getRecord<{ name: string; age: number }>("user");
 * console.log(user); // { name: "Alice", age: 30 }
 *
 * // Try to retrieve a non-existent record
 * const nonexistent = getRecord("nonexistent");
 * console.log(nonexistent); // undefined
 * ```
 */
const getRecord = <TValue>(key: string): Optional<TValue> => {
    if (isStringEmpty(key)) {
        return undefined;
    }

    const record = storage.getItem(key);

    if (isNullish(record)) {
        return undefined;
    }

    return JSON.parse(record as string) as TValue;
};

/**
 * Store data in local storage
 * @param key Unique record key
 * @param value Some data to store
 * @example
 * ```typescript
 * // Save a simple value
 * saveRecord("username", "Alice");
 *
 * // Save an object
 * saveRecord("user", { name: "Alice", age: 30 });
 *
 * // Retrieve the saved data
 * const username = getRecord<string>("username");
 * const user = getRecord<{ name: string; age: number }>("user");
 * ```
 */
const saveRecord = <TValue>(key: string, value: TValue): void => {
    if (isStringEmpty(key)) {
        return;
    }

    const record = JSON.stringify(value);

    storage.setItem(key, record);
};

/**
 * Clear storage, remove all existing values
 * @example
 * ```typescript
 * // Save some records
 * saveRecord("key1", "value1");
 * saveRecord("key2", "value2");
 *
 * // Clear all records
 * clear();
 *
 * // Check that records are gone
 * hasRecord("key1"); // false
 * hasRecord("key2"); // false
 * ```
 */
const clear = (): void => {
    storage.clear();
}

/** API to access local storage data */
export const localStorage = {
    hasRecord,
    getRecord,
    saveRecord,
    clear,
};
