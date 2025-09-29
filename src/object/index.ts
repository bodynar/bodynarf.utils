import { Optional, isStringEmpty, isNullOrUndefined, isNullish, isNull, isUndefined } from "..";

/**
 * Check is key declared in object. Throws errors if not
 * @param object Object to check for property existence
 * @param propertyName Name of property
 * @throws Parameter object is not defined
 * @throws Parameter propertyName is not defined or empty string
 * @throws Specified key is not declared in object
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30 };
 * ensurePropertyDefined(obj, "name"); // No error thrown
 *
 * try {
 *   ensurePropertyDefined(obj, "address"); // Throws error
 * } catch (error) {
 *   console.log(error.message); // "Key "address" is not defined in object"
 * }
 * ```
 */
export const ensurePropertyDefined = <T extends object>(object: T, propertyName: string): void => {
    if (isNullOrUndefined(object)) {
        throw new Error("Parameter \"object\" is not defined.");
    }
    if (isNullOrUndefined(propertyName) || isStringEmpty(propertyName)) {
        throw new Error("Parameter \"propertyName\" is not defined");
    }

    if (!(propertyName in object)) {
        throw new Error(`Key "${propertyName}" is not defined in object`);
    }
};

/**
 * Get object property value with undefined fallback
 * @param object Object-container with data values
 * @param propertyName Name of property
 * @returns Value stored by specified property in object if it is defined, otherwise - `undefined`
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30 };
 * const name = getPropertyValue(obj, "name"); // "Alice"
 * const address = getPropertyValue(obj, "address"); // undefined
 * ```
 */
export const getPropertyValue = <TResult>(object: Record<string, any>, propertyName: string): Optional<TResult> => {
    if (isNullOrUndefined(object)) {
        throw new Error("Parameter \"object\" is not defined.");
    }
    if (isNullOrUndefined(propertyName) || isStringEmpty(propertyName)) {
        throw new Error("Parameter \"propertyName\" is not defined");
    }

    return propertyName in object
        ? object[propertyName] as TResult
        : undefined;
};

/**
 * Get property value from object with defined check
 * @param object Object to check for property existence
 * @param propertyName Name of property
 * @param throwOnUndefined Flag determines that function should throw error when value is not defined
 * @returns Value stored by specified property in object
 * @throws Parameter object is not defined
 * @throws Parameter propertyName is not defined or empty string
 * @throws Specified key is not declared in object
 * @throws Property is undefined or cannot be used as requested type if flag throwOnUndefined is set to true
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30 };
 * const name = getPropertyValueWithCheck(obj, "name"); // "Alice"
 *
 * try {
 *   const address = getPropertyValueWithCheck(obj, "address"); // Throws error
 * } catch (error) {
 *   console.log(error.message); // "Key "address" is not defined in object"
 * }
 *
 * const address = getPropertyValueWithCheck(obj, "address", false); // undefined (no error thrown)
 * ```
 */
export const getPropertyValueWithCheck = <TResult>(object: Record<string, unknown>, propertyName: string, throwOnUndefined = true): TResult => {
    ensurePropertyDefined(object, propertyName);

    const value: TResult = object[propertyName] as TResult;

    if (throwOnUndefined && isNullOrUndefined(value)) {
        throw new Error(`Property "${propertyName}" is not defined as requested type in object.`);
    }

    return value;
};

/**
 * Picks specific properties from an object
 * @param obj - Source object
 * @param keys - Array of keys to pick
 * @returns New object with picked properties
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30, city: "New York" };
 * const picked = pick(obj, ["name", "city"]);
 * // picked is { name: "Alice", city: "New York" }
 * ```
 */
export function pick(obj: object, keys: Array<string>): object {
    if (isNullish(obj)) {
        return {};
    }

    const result: any = {};

    for (const key of keys) {
        if (key in obj) {
            result[key] = (obj as any)[key];
        }
    }

    return result;
}

/**
 * Omits specific properties from an object
 * @param obj - Source object
 * @param keys - Array of keys to omit
 * @returns New object without omitted properties
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30, city: "New York" };
 * const omitted = omit(obj, ["age"]);
 * // omitted is { name: "Alice", city: "New York" }
 * ```
 */
export function omit(obj: object, keys: Array<string>): object {
    if (isNullish(obj)) {
        return {};
    }

    const result: any = { ...obj };

    for (const key of keys) {
        delete result[key];
    }

    return result;
}

/**
 * Checks if the value is an object
 * @param value - Value to check
 * @returns true if the value is an object, false otherwise
 * @example
 * ```typescript
 * isObject({}); // true
 * isObject([]); // false
 * isObject(null); // false
 * isObject("hello"); // false
 * ```
 */
export function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if the object is empty
 * @param obj - Object to check
 * @returns true if the object is empty, false otherwise
 * @example
 * ```typescript
 * isObjectEmpty({}); // true
 * isObjectEmpty({ name: "Alice" }); // false
 * ```
 */
export function isObjectEmpty(obj: object): boolean {
    if (isNullish(obj)) {
        return true;
    }

    return Object.keys(obj).length === 0;
}

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @param visited - Map to track circular references
 * @returns Deep cloned object
 * @example
 * ```typescript
 * const obj = { name: "Alice", age: 30, address: { city: "New York" } };
 * const cloned = deepClone(obj);
 *
 * // cloned is a deep copy of obj
 * cloned.address.city = "Boston";
 * console.log(obj.address.city); // "New York" (original unchanged)
 * console.log(cloned.address.city); // "Boston" (clone changed)
 * ```
 */
export function deepClone<T>(obj: T, visited: WeakMap<object, any> = new WeakMap()): T {
    if (isNullish(obj)) {
        return obj;
    }

    if (typeof obj !== "object") {
        return obj;
    }

    if (visited.has(obj as object)) {
        return visited.get(obj as object);
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as unknown as T;
    }

    if (Array.isArray(obj)) {
        const clonedArr: any[] = [];
        visited.set(obj as object, clonedArr);
        for (const item of obj) {
            clonedArr.push(deepClone(item, visited));
        }
        return clonedArr as unknown as T;
    }

    const objAsObject = obj as object;
    if (typeof objAsObject === "object") {
        const clonedObj = {} as T;
        visited.set(objAsObject, clonedObj);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = deepClone((obj as any)[key], visited);
            }
        }
        return clonedObj;
    }

    return obj;
}

/**
 * Merges two objects
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns Merged object
 * @example
 * ```typescript
 * const obj1 = { name: "Alice", age: 30 };
 * const obj2 = { age: 31, city: "New York" };
 * const merged = mergeObjects(obj1, obj2);
 * // merged is { name: "Alice", age: 31, city: "New York" }
 * ```
 */
export function mergeObjects(obj1: object, obj2: object): object {
    if (isNullish(obj1)) {
        return obj2;
    }

    if (isNullish(obj2)) {
        return obj1;
    }

    const result: any = deepClone(obj1);

    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            if (isObject((obj2 as any)[key]) && isObject(result[key])) {
                result[key] = mergeObjects(result[key], (obj2 as any)[key]);
            } else {
                result[key] = (obj2 as any)[key];
            }
        }
    }

    return result;
}

/**
 * Gets value from object by path
 * @param obj - Source object
 * @param path - Path to property (e.g. "user.address.street" or "users[0].name")
 * @returns Value at path or undefined if path doesn't exist
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 3 } } };
 * get(obj, "a.b.c"); // 3
 *
 * const obj2 = { a: [{ b: 1 }, { b: 2 }] };
 * get(obj2, "a[0].b"); // 1
 *
 * const obj3 = { a: 1 };
 * get(obj3, "b"); // undefined
 * ```
 */
export function get(obj: object, path: string): any {
    if (isNullish(obj) || isNullish(path)) {
        return undefined;
    }

    // Split path into parts, considering dots and square brackets
    const parts = path.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split(".");
    let current: any = obj;

    for (const part of parts) {
        if (isNullish(current) || typeof current !== 'object' || !(part in current)) {
            return undefined;
        }
        current = current[part];
    }

    return current;
}

/**
 * Checks if object has property at path
 * @param obj - Source object
 * @param path - Path to property (e.g. "user.address.street" or "users[0].name")
 * @returns true if path exists, false otherwise
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 3 } } };
 * has(obj, "a.b.c"); // true
 *
 * const obj2 = { a: [{ b: 1 }, { b: 2 }] };
 * has(obj2, "a[0].b"); // true
 *
 * const obj3 = { a: 1 };
 * has(obj3, "b"); // false
 * ```
 */
export function has(obj: object, path: string): boolean {
    return get(obj, path) !== undefined;
}

/**
 * Compares two objects for deep equality without using JSON serialization
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @param visited - Set to track circular references
 * @returns true if objects are deeply equal, false otherwise
 * @example
 * ```typescript
 * const obj1 = { name: "Alice", age: 30, address: { city: "New York" } };
 * const obj2 = { name: "Alice", age: 30, address: { city: "New York" } };
 * const obj3 = { name: "Bob", age: 30, address: { city: "New York" } };
 *
 * isEqual(obj1, obj2); // true
 * isEqual(obj1, obj3); // false
 * ```
 */
export function isEqual(obj1: any, obj2: any, visited: WeakMap<object, WeakMap<object, boolean>> = new WeakMap()): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (isNull(obj1) || isNull(obj2)) {
        return isNull(obj1) && isNull(obj2);
    }

    if (isUndefined(obj1) || isUndefined(obj2)) {
        return isUndefined(obj1) && isUndefined(obj2);
    }

    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    if (visited.has(obj1) && visited.get(obj1)?.has(obj2)) {
        // If we've already compared these objects, return the cached result
        return visited.get(obj1)?.get(obj2) ?? true;
    }

    if (!visited.has(obj1)) {
        visited.set(obj1, new WeakMap());
    }

    // Mark that we're currently comparing these objects
    // We use a temporary value of true while comparing
    visited.get(obj1)?.set(obj2, true);

    try {
        if (obj1 instanceof Date && obj2 instanceof Date) {
            const result = obj1.getTime() === obj2.getTime();
            visited.get(obj1)?.set(obj2, result);
            return result;
        }

        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) {
                visited.get(obj1)?.set(obj2, false);
                return false;
            }

            for (let i = 0; i < obj1.length; i++) {
                if (!isEqual(obj1[i], obj2[i], visited)) {
                    visited.get(obj1)?.set(obj2, false);
                    return false;
                }
            }

            visited.get(obj1)?.set(obj2, true);
            return true;
        }

        if (Array.isArray(obj1) || Array.isArray(obj2)) {
            visited.get(obj1)?.set(obj2, false);
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            visited.get(obj1)?.set(obj2, false);
            return false;
        }

        for (const key of keys1) {
            if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
                visited.get(obj1)?.set(obj2, false);
                return false;
            }

            if (!isEqual(obj1[key], obj2[key], visited)) {
                visited.get(obj1)?.set(obj2, false);
                return false;
            }
        }

        visited.get(obj1)?.set(obj2, true);
        return true;
    } catch (error) {
        visited.get(obj1)?.set(obj2, false);
        return false;
    }
}

