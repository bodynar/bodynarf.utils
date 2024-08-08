import { isNullOrUndefined } from "./checks";

/**
 * Check is value has specified type
 * @deprecated 1.2.0 | Use manual check `value instanceof MyType`. Function not working with interfaces
 * @param value Up-casted value
 * @returns Value is specified Type
 */
export const isType = <T>(value: any): value is T => {
    console.error("[DEPRECATED] 1.2.0 | Use manual check `value instanceof MyType`. Function not working with interfaces");
    const mapped = value as T;

    return !isNullOrUndefined(mapped);
};
