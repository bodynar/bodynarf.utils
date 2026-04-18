import { isNullish } from "..";

/**
 * Check is string is empty
 * @param value String to check
 * @returns Flag determines that string is empty
 * @example
 * ```typescript
 * isStringEmpty(""); // true
 * isStringEmpty("hello"); // false
 * ```
 */
export const isStringEmpty = (value: string): boolean => {
    return value.length === 0;
};

/**
 * Check is value is null or undefined or empty string
 * @param value Value to check
 * @returns Flag is passed value null or undefined or empty string
 * @example
 * ```typescript
 * isNullOrEmpty(null); // true
 * isNullOrEmpty(undefined); // true
 * isNullOrEmpty(""); // true
 * isNullOrEmpty("hello"); // false
 * ```
 */
export const isNullOrEmpty = (value?: string | null): boolean => {
    return isNullish(value) || isStringEmpty(value as string);
};

/**
 * Check if a string is not empty (reverse of isStringEmpty)
 * @param value String to check
 * @returns Flag determines that string is not empty
 * @example
 * ```typescript
 * isStringNotEmpty(""); // false
 * isStringNotEmpty("hello"); // true
 * ```
 */
export const isStringNotEmpty = (value: string): boolean => {
    return !isStringEmpty(value);
};

/**
 * Check if a value is not null, undefined, or empty string (reverse of isNullOrEmpty)
 * @param value Value to check
 * @returns Flag determines that value is not null, undefined, or empty string
 * @example
 * ```typescript
 * isNotNullOrEmpty(null); // false
 * isNotNullOrEmpty(undefined); // false
 * isNotNullOrEmpty(""); // false
 * isNotNullOrEmpty("hello"); // true
 * ```
 */
export const isNotNullOrEmpty = (value?: string | null): boolean => {
    return !isNullOrEmpty(value);
};
