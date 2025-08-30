import { isNullish, isNullOrUndefined } from "../common/checks";

declare global {
    interface String {
        /**
         * Formate string by replacing anchors {0} with function arguments
         * @example `"{0} world!".format("Hello")` // => "Hello world!"
         * @returns {string} Formatted string
         */
        format(...args: Array<unknown>): string;

        /**
         * Convert first letter to uppercase
         * @example `"hello world!".capitalize()` // => "Hello world!"
         * @returns {string} String
         */
        capitalize(): string;

        /**
         * Check is string is empty
         * @returns The flag specifies that the string is empty
         */
        isEmpty(): boolean;

        /**
         * Check is string is nullish or empty
         * @returns The flag specifies that the string is empty, null or undefined
         */
        isNullOrEmpty(): boolean;

        /**
         * Check is string is nullish or empty or white space only
         * @returns The flag specifies that the string is empty, null, undefined, or consists only of spaces.
         */
        isNullOrWhiteSpace(): boolean;
    }
}

if (isNullOrUndefined(String.prototype.format)) {
    String.prototype.format = function (...args: Array<unknown>) {
        let result = this as string;

        for (let i = 0; i < args.length; i++) {
            result = result.replaceAll(`{${i}}`, String(args[i]));
        }

        result = result.replaceAll(/\{\d+\}/g, "");

        return result;
    };
}

if (isNullOrUndefined(String.prototype.capitalize)) {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}

if (isNullOrUndefined(String.prototype.isEmpty)) {
    String.prototype.isEmpty = function () {
        return this?.length === 0;
    };
}

if (isNullOrUndefined(String.prototype.isNullOrEmpty)) {
    String.prototype.isNullOrEmpty = function () {
        return isNullish(this) || this.isEmpty();
    };
}

if (isNullOrUndefined(String.prototype.isNullOrWhiteSpace)) {
    String.prototype.isNullOrWhiteSpace = function () {
        if (isNullish(this)) {
            return true;
        }
        return this.isEmpty() || this.trim().length === 0;
    };
}
