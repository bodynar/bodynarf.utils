/**
 * Check is value defined
 * @param value Value to check
 * @returns Flag determines that value is not defined
 */
export const isNullOrUndefined = <T>(value: T): boolean => {
    return isNull(value) || isUndefined(value);
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
 * @returns Definatly defined value
 */
export const getValueOrDefault = <TValue>(value: TValue | undefined, defaultValue: TValue): TValue => {
    return isNullOrUndefined(value) ? defaultValue : value!;
};
