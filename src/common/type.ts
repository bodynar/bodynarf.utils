import { isNullOrUndefined } from "./checks";

/**
 * Check is value has specified type
 * @deprecated Use manual check `value instanceof MyType`. Function not working with interfaces
 * @param value Up-casted value
 * @returns Value is specified Type
 */
export const isType = <T>(value: any): value is T => {
    const mapped = value as T;

    return !isNullOrUndefined(mapped);
};
