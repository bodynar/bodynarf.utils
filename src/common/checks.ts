import { Nullish, Optional } from "..";

/**
 * Check is value defined
 * @param value Value to check
 * @returns Flag determines that value is not defined
 * @example
 * ```typescript
 * isNullOrUndefined(null); // true
 * isNullOrUndefined(undefined); // true
 * isNullOrUndefined(0); // false
 * isNullOrUndefined(""); // false
 * isNullOrUndefined(false); // false
 * ```
 */
export const isNullOrUndefined = <T>(value: T): boolean => {
    return isNull(value) || isUndefined(value);
};

/**
 * Type guard against nullish values
 * @param value Value to check
 * @returns True if value is null or undefined, false otherwise
 * @example
 * ```typescript
 * isNullish(null); // true
 * isNullish(undefined); // true
 * isNullish(0); // false
 * isNullish(""); // false
 * isNullish(false); // false
 * ```
 */
export const isNullish = (value: unknown): value is Nullish => {
    return value === null || value === undefined;
};

/**
 * Check is value is null
 * @param value Value to check
 * @returns Flag determines that value is null
 * @example
 * ```typescript
 * isNull(null); // true
 * isNull(undefined); // false
 * isNull(0); // false
 * isNull(""); // false
 * ```
 */
export const isNull = <T>(value: T): boolean => {
    return value === null;
};

/**
 * Check is value undefined
 * @param value Value to check
 * @returns Flat determines that value is undefined
 * @example
 * ```typescript
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * isUndefined(0); // false
 * isUndefined(""); // false
 * ```
 */
export const isUndefined = <T>(value: T): boolean => {
    return value === undefined;
};

/**
 * Get value if it defined, otherwise - get default value
 * @param value Probably not defined value
 * @param defaultValue Default value which should be returned in default case
 * @returns Definitely defined value
 * @example
 * ```typescript
 * getValueOrDefault(null, "default"); // "default"
 * getValueOrDefault(undefined, "default"); // "default"
 * getValueOrDefault("value", "default"); // "value"
 * getValueOrDefault(0, 42); // 0
 * getValueOrDefault("", "default"); // ""
 * ```
 */
export const getValueOrDefault = <TValue>(value: Optional<TValue>, defaultValue: TValue): TValue => {
    return isNullish(value) ? defaultValue : value;
};
