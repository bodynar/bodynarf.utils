import { isNullOrUndefined } from "./";

/**
 * Check is string is empty
 * @param value String to check
 * @returns Flag determines that string is empty
 */
export const isStringEmpty = (value: string): boolean => {
    return value.length === 0;
};

/**
 * Check is value is null or undefined or empty string
 * @param value Value to check
 * @returns Flag is passed value null or undefined or empty string
 */
export const isNullOrEmpty = (value?: string | null): boolean => {
    return isNullOrUndefined(value) || isStringEmpty(value as string);
};

declare global {
    interface String {
        /**
         * @public
         * Formate string by replacing anchors {0} with function arguments
         * @example `"{0} world!".format("Hello")` // "Hello world!"
         * @returns {string} Formatted string
         */
        format(...args: Array<string>): string;
    }
}

if (isNullOrUndefined(String.prototype.format)) {
    String.prototype.format = function (...args: Array<string>) {
        let result = this as string;

        [...args].forEach((arg: any, i: number) => {
            result = result.replace(`{${i}}`, arg);
        });

        return result;
    };
}