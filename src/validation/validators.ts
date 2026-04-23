import { isNullish } from "../common/checks";

import { Validator, validResult, invalidResult } from "./types";

// ─── String validators ────────────────────────────────────────────────────────

/**
 * Validates that a string value is not empty.
 *
 * @param message - Custom error message. Defaults to `"Value is required."`.
 *
 * @example
 * ```typescript
 * const v = required();
 * v("");        // { valid: false, message: "Value is required." }
 * v("  ");      // { valid: false, message: "Value is required." }
 * v("hello");   // { valid: true,  message: undefined }
 * ```
 */
export const required = (message = "Value is required."): Validator<string> =>
    (value) => value.trim().length > 0 ? validResult : invalidResult(message);

/**
 * Validates that a string has at least `min` characters (after trimming).
 *
 * @param min - Minimum character count (inclusive).
 * @param message - Custom error message. Defaults to `"Value must be at least {min} characters long."`.
 *
 * @example
 * ```typescript
 * const v = minLength(3);
 * v("ab");      // { valid: false, message: "Value must be at least 3 characters long." }
 * v("abc");     // { valid: true,  message: undefined }
 * ```
 */
export const minLength = (min: number, message?: string): Validator<string> =>
    (value) => value.trim().length >= min
        ? validResult
        : invalidResult(message ?? `Value must be at least ${min} characters long.`);

/**
 * Validates that a string does not exceed `max` characters (after trimming).
 *
 * @param max - Maximum character count (inclusive).
 * @param message - Custom error message. Defaults to `"Value must be at most {max} characters long."`.
 *
 * @example
 * ```typescript
 * const v = maxLength(5);
 * v("toolong");  // { valid: false, message: "Value must be at most 5 characters long." }
 * v("hi");       // { valid: true,  message: undefined }
 * ```
 */
export const maxLength = (max: number, message?: string): Validator<string> =>
    (value) => value.trim().length <= max
        ? validResult
        : invalidResult(message ?? `Value must be at most ${max} characters long.`);

/**
 * Validates that a string length falls within `[min, max]` (after trimming).
 *
 * @param min - Minimum character count (inclusive).
 * @param max - Maximum character count (inclusive).
 * @param message - Custom error message.
 *
 * @example
 * ```typescript
 * const v = lengthBetween(2, 5);
 * v("a");        // { valid: false, message: "Value must be between 2 and 5 characters long." }
 * v("abc");      // { valid: true,  message: undefined }
 * v("toolong");  // { valid: false, ... }
 * ```
 */
export const lengthBetween = (min: number, max: number, message?: string): Validator<string> =>
    (value) => {
        const len = value.trim().length;
        return len >= min && len <= max
            ? validResult
            : invalidResult(message ?? `Value must be between ${min} and ${max} characters long.`);
    };

/**
 * Validates that a string matches the given regular expression.
 *
 * @param pattern - Regular expression to test against.
 * @param message - Custom error message. Defaults to `"Value has an invalid format."`.
 *
 * @example
 * ```typescript
 * const v = pattern(/^\d{4}$/);
 * v("12ab");  // { valid: false, message: "Value has an invalid format." }
 * v("1234");  // { valid: true,  message: undefined }
 * ```
 */
export const pattern = (regex: RegExp, message = "Value has an invalid format."): Validator<string> =>
    (value) => regex.test(value) ? validResult : invalidResult(message);

/**
 * Validates that a string is a well-formed email address.
 *
 * @param message - Custom error message. Defaults to `"Value must be a valid email address."`.
 *
 * @example
 * ```typescript
 * const v = email();
 * v("bad");              // { valid: false, message: "Value must be a valid email address." }
 * v("user@example.com"); // { valid: true,  message: undefined }
 * ```
 */
export const email = (message = "Value must be a valid email address."): Validator<string> =>
    pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message);

// ─── Number validators ────────────────────────────────────────────────────────

/**
 * Validates that a number is greater than or equal to `min`.
 *
 * @param min - Lower bound (inclusive).
 * @param message - Custom error message.
 *
 * @example
 * ```typescript
 * const v = min(0);
 * v(-1);  // { valid: false, message: "Value must be at least 0." }
 * v(0);   // { valid: true,  message: undefined }
 * ```
 */
export const min = (minValue: number, message?: string): Validator<number> =>
    (value) => value >= minValue
        ? validResult
        : invalidResult(message ?? `Value must be at least ${minValue}.`);

/**
 * Validates that a number is less than or equal to `max`.
 *
 * @param max - Upper bound (inclusive).
 * @param message - Custom error message.
 *
 * @example
 * ```typescript
 * const v = max(100);
 * v(101);  // { valid: false, message: "Value must be at most 100." }
 * v(100);  // { valid: true,  message: undefined }
 * ```
 */
export const max = (maxValue: number, message?: string): Validator<number> =>
    (value) => value <= maxValue
        ? validResult
        : invalidResult(message ?? `Value must be at most ${maxValue}.`);

/**
 * Validates that a number falls within `[min, max]`.
 *
 * @param minValue - Lower bound (inclusive).
 * @param maxValue - Upper bound (inclusive).
 * @param message - Custom error message.
 *
 * @example
 * ```typescript
 * const v = range(1, 10);
 * v(0);   // { valid: false, message: "Value must be between 1 and 10." }
 * v(5);   // { valid: true,  message: undefined }
 * v(11);  // { valid: false, ... }
 * ```
 */
export const range = (minValue: number, maxValue: number, message?: string): Validator<number> =>
    (value) => value >= minValue && value <= maxValue
        ? validResult
        : invalidResult(message ?? `Value must be between ${minValue} and ${maxValue}.`);

// ─── Generic validators ───────────────────────────────────────────────────────

/**
 * Validates that a value is not `null` or `undefined`.
 *
 * @param message - Custom error message. Defaults to `"Value is required."`.
 *
 * @example
 * ```typescript
 * const v = notNull<string>();
 * v(null);      // { valid: false, message: "Value is required." }
 * v(undefined); // { valid: false, message: "Value is required." }
 * v("hello");   // { valid: true,  message: undefined }
 * ```
 */
export const notNull = <T>(message = "Value is required."): Validator<T | null | undefined> =>
    (value) => !isNullish(value) ? validResult : invalidResult(message);

/**
 * Combines multiple validators for the same value type.
 * Runs them in order and returns the first failure, or a passing result if all pass.
 *
 * @param validators - One or more validators to compose.
 *
 * @example
 * ```typescript
 * const v = compose(required(), minLength(3), maxLength(20));
 * v("");        // { valid: false, message: "Value is required." }
 * v("ab");      // { valid: false, message: "Value must be at least 3 characters long." }
 * v("hello");   // { valid: true,  message: undefined }
 * ```
 */
export const compose = <T>(...validators: Validator<T>[]): Validator<T> =>
    (value) => {
        for (const validate of validators) {
            const result = validate(value);
            if (!result.valid) {
                return result;
            }
        }
        return validResult;
    };
