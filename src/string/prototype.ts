import { isNullish } from "../common/checks";

import { toCamelCase, toKebabCase } from "../string";

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
		 * @example
		 * ```typescript
		 * "".isEmpty(); // true
		 * "hello".isEmpty(); // false
		 * ```
		 */
		isEmpty(): boolean;

		/**
		 * Check is string is nullish or empty
		 * @returns The flag specifies that the string is empty, null or undefined
		 * @example
		 * ```typescript
		 * "".isNullOrEmpty(); // true
		 * null.isNullOrEmpty(); // true
		 * undefined.isNullOrEmpty(); // true
		 * "hello".isNullOrEmpty(); // false
		 * ```
		 */
		isNullOrEmpty(): boolean;

		/**
		 * Check if a string is not empty (reverse of isEmpty)
		 * @returns The flag specifies that the string is not empty
		 * @example
		 * ```typescript
		 * "hello".isNotEmpty(); // true
		 * "".isNotEmpty(); // false
		 * ```
		 */
		isNotEmpty(): boolean;

		/**
		 * Check if a string is not nullish or empty (reverse of isNullOrEmpty)
		 * @returns The flag specifies that the string is not empty, null or undefined
		 * @example
		 * ```typescript
		 * "hello".isNotNullOrEmpty(); // true
		 * "".isNotNullOrEmpty(); // false
		 * null.isNotNullOrEmpty(); // false
		 * undefined.isNotNullOrEmpty(); // false
		 * ```
		 */
		isNotNullOrEmpty(): boolean;

		/**
		 * Check is string is nullish or empty or white space only
		 * @returns The flag specifies that the string is empty, null, undefined, or consists only of spaces.
		 * @example
		 * ```typescript
		 * "".isNullOrWhiteSpace(); // true
		 * "   ".isNullOrWhiteSpace(); // true
		 * null.isNullOrWhiteSpace(); // true
		 * undefined.isNullOrWhiteSpace(); // true
		 * "hello".isNullOrWhiteSpace(); // false
		 * ```
		 */
		isNullOrWhiteSpace(): boolean;

		/**
		 * Convert string to kebab-case
		 * @returns String in kebab-case format
		 * @example
		 * ```typescript
		 * "hello world".toKebabCase(); // "hello-world"
		 * "helloWorld".toKebabCase(); // "hello-world"
		 * ```
		 */
		toKebabCase(): string;

		/**
		 * Convert string to camelCase
		 * @returns String in camelCase format
		 * @example
		 * ```typescript
		 * "hello world".toCamelCase(); // "helloWorld"
		 * "hello_world".toCamelCase(); // "helloWorld"
		 * ```
		 */
		toCamelCase(): string;
	}
}

if (isNullish(String.prototype.format)) {
	String.prototype.format = function (...args: Array<unknown>) {
		let result = this as string;

		for (let i = 0; i < args.length; i++) {
			result = result.replaceAll(`{${i}}`, String(args[i]));
		}

		result = result.replaceAll(/\{\d+\}/g, "");

		return result;
	};
}

if (isNullish(String.prototype.capitalize)) {
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

if (isNullish(String.prototype.isEmpty)) {
	String.prototype.isEmpty = function () {
		return this?.length === 0;
	};
}

if (isNullish(String.prototype.toCamelCase)) {
	String.prototype.toCamelCase = function () {
		return toCamelCase(this as string);
	};
}

if (isNullish(String.prototype.isNullOrEmpty)) {
	String.prototype.isNullOrEmpty = function () {
		return isNullish(this) || this.isEmpty();
	};
}

if (isNullish(String.prototype.isNotEmpty)) {
	String.prototype.isNotEmpty = function () {
		return !this.isEmpty();
	};
}

if (isNullish(String.prototype.isNotNullOrEmpty)) {
	String.prototype.isNotNullOrEmpty = function () {
		return !this.isNullOrEmpty();
	};
}

if (isNullish(String.prototype.toKebabCase)) {
	String.prototype.toKebabCase = function () {
		return toKebabCase(this as string);
	};
}

if (isNullish(String.prototype.isNullOrWhiteSpace)) {
	String.prototype.isNullOrWhiteSpace = function () {
		if (isNullish(this)) {
			return true;
		}

		return this.isEmpty() || this.trim().length === 0;
	};
}
