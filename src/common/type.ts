import { isNullOrUndefined } from "./checks";

/**
 * Check is value has specified type
 * @param value Upcasted value
 * @returns Value is specified Type
 */
export const isType = <T>(value: any): value is T => {
    const mapped = value as T;

    return !isNullOrUndefined(mapped);
};