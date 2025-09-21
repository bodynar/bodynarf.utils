import { Optional, isStringEmpty, isNullOrUndefined, isNullish } from "..";

/**
 * Check is key declared in object. Throws errors if not
 * @param object Object to check for property existence
 * @param propertyName Name of property
 * @throws Parameter object is not defined
 * @throws Parameter propertyName is not defined or empty string
 * @throws Specified key is not declared in object
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
 */
export function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if the object is empty
 * @param obj - Object to check
 * @returns true if the object is empty, false otherwise
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
 */
export function get(obj: object, path: string): any {
    if (isNullish(obj) || isNullish(path)) {
        return undefined;
    }

    // Разбиваем путь на части, учитывая точки и квадратные скобки
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
 */
export function has(obj: object, path: string): boolean {
    return get(obj, path) !== undefined;
}

