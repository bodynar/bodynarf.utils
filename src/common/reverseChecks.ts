import { Nullish } from "..";
import { isNull, isUndefined, isNullish, isNullOrUndefined } from "./checks";

/**
 * Check if a value is defined (reverse of isNullOrUndefined)
 * This function returns true if the value is neither null nor undefined.
 *
 * @param value - The value to check for null or undefined
 * @returns Boolean flag indicating that the value is defined (not null and not undefined)
 * @example
 * ```typescript
 * isNotNullOrUndefined(null); // false
 * isNotNullOrUndefined(undefined); // false
 * isNotNullOrUndefined(0); // true
 * isNotNullOrUndefined(""); // true
 * isNotNullOrUndefined(false); // true
 * isNotNullOrUndefined({}); // true
 * isNotNullOrUndefined([]); // true
 * ```
 *
 * @remarks
 * This function is useful for checking if a value is defined before using it,
 * especially when dealing with optional parameters or properties that may be null or undefined.
 */
export const isNotNullOrUndefined = <T>(value: T): boolean => {
    return !isNullOrUndefined(value);
};

/**
 * Type guard against non-nullish values (reverse of isNullish)
 * This function returns true if the value is neither null nor undefined.
 * It serves as a type predicate, narrowing the type in TypeScript.
 *
 * @param value - The value to check for null or undefined
 * @returns Boolean flag indicating that the value is not nullish (neither null nor undefined)
 * @example
 * ```typescript
 * isNotNullish(null); // false
 * isNotNullish(undefined); // false
 * isNotNullish(0); // true
 * isNotNullish(""); // true
 * isNotNullish(false); // true
 * isNotNullish({}); // true
 * isNotNullish([]); // true
 * ```
 *
 * @remarks
 * This function works as a type predicate, helping TypeScript narrow types.
 * After calling this function, TypeScript will know that the value is not null or undefined.
 */
export const isNotNullish = (value: unknown): value is Exclude<unknown, Nullish> => {
    return !isNullish(value);
};

/**
 * Check if a value is not null (reverse of isNull)
 * This function returns true if the value is not strictly equal to null.
 * Note that undefined values will return true since they are not null.
 *
 * @param value - The value to check for null
 * @returns Boolean flag indicating that the value is not null
 * @example
 * ```typescript
 * isNotNull(null); // false
 * isNotNull(undefined); // true
 * isNotNull(0); // true
 * isNotNull(""); // true
 * isNotNull(false); // true
 * isNotNull({}); // true
 * isNotNull([]); // true
 * ```
 *
 * @remarks
 * This function only checks for null values, not undefined.
 * If you need to check for both null and undefined, use isNotNullOrUndefined instead.
 */
export const isNotNull = <T>(value: T): boolean => {
    return !isNull(value);
};

/**
 * Check if a value is not undefined (reverse of isUndefined)
 * This function returns true if the value is not strictly equal to undefined.
 * Note that null values will return true since they are not undefined.
 *
 * @param value - The value to check for undefined
 * @returns Boolean flag indicating that the value is not undefined
 * @example
 * ```typescript
 * isNotUndefined(undefined); // false
 * isNotUndefined(null); // true
 * isNotUndefined(0); // true
 * isNotUndefined(""); // true
 * isNotUndefined(false); // true
 * isNotUndefined({}); // true
 * isNotUndefined([]); // true
 * ```
 *
 * @remarks
 * This function only checks for undefined values, not null.
 * If you need to check for both null and undefined, use isNotNullOrUndefined instead.
 */
export const isNotUndefined = <T>(value: T): boolean => {
    return !isUndefined(value);
};

