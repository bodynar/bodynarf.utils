import { Nullish, Optional } from "..";

/**
 * Check is value defined
 * @param value Value to check
 * @returns Flag determines that value is not defined
 */
export const isNullOrUndefined = <T>(value: T): boolean => {
    return isNull(value) || isUndefined(value);
};

/**
 * Type guard against nullish values
 * @param value Value to check
 */
export const isNullish = (value: unknown): value is Nullish => {
    return value === null || value === undefined;
};

/**
 * Check is value is null
 * @param value Value to check
 * @returns Flag determines that value is null
 */
export const isNull = <T>(value: T): boolean => {
    return value === null;
};

/**
 * Check is value undefined
 * @param value Value to check
 * @returns Flat determines that value is undefined
 */
export const isUndefined = <T>(value: T): boolean => {
    return value === undefined;
};

/**
 * Get value if it defined, otherwise - get default value
 * @param value Probably not defined value
 * @param defaultValue Default value which should be returned in default case
 * @returns Definitely defined value
 */
export const getValueOrDefault = <TValue>(value: Optional<TValue>, defaultValue: TValue): TValue => {
    return isNullish(value) ? defaultValue : value;
};

/**
 * Check is object empty or consists of empty values
 * @param object Object to check
 * @returns `true` if object empty or contains null\undefined values
 */
export const isObjectEmpty = (object: any): boolean => {
    if (isNullOrUndefined(object)) {
        return true;
    }

    const result = Object.entries(object)
        .reduce(
            (result, [value]) => isNullOrUndefined(value[1]) && result
            , true
        );

    return result;
};
