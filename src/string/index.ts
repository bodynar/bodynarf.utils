import { isNullish } from "..";

/**
 * Check is string is empty
 * @param value String to check
 * @returns Flag determines that string is empty
 * @example
 * ```typescript
 * isStringEmpty(""); // true
 * isStringEmpty("hello"); // false
 * ```
 */
export const isStringEmpty = (value: string): boolean => {
    return value.length === 0;
};

/**
 * Check is value is null or undefined or empty string
 * @param value Value to check
 * @returns Flag is passed value null or undefined or empty string
 * @example
 * ```typescript
 * isNullOrEmpty(null); // true
 * isNullOrEmpty(undefined); // true
 * isNullOrEmpty(""); // true
 * isNullOrEmpty("hello"); // false
 * ```
 */
export const isNullOrEmpty = (value?: string | null): boolean => {
    return isNullish(value) || isStringEmpty(value as string);
};

/**
 * Check if a string is not empty (reverse of isStringEmpty)
 * @param value String to check
 * @returns Flag determines that string is not empty
 * @example
 * ```typescript
 * isStringNotEmpty(""); // false
 * isStringNotEmpty("hello"); // true
 * ```
 */
export const isStringNotEmpty = (value: string): boolean => {
    return !isStringEmpty(value);
};

/**
 * Check if a value is not null, undefined, or empty string (reverse of isNullOrEmpty)
 * @param value Value to check
 * @returns Flag determines that value is not null, undefined, or empty string
 * @example
 * ```typescript
 * isNotNullOrEmpty(null); // false
 * isNotNullOrEmpty(undefined); // false
 * isNotNullOrEmpty(""); // false
 * isNotNullOrEmpty("hello"); // true
 * ```
 */
export const isNotNullOrEmpty = (value?: string | null): boolean => {
    return !isNullOrEmpty(value);
};

/**
 * Convert string to URL-friendly format (slug)
 * @param str String to convert
 * @returns URL-friendly string
 * @example
 * ```typescript
 * slugify("Hello World!"); // "hello-world"
 * slugify("café ñoño"); // "café-ñoño"
 * ```
 */
export const slugify = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

/**
 * Truncate string with ellipsis
 * @param str String to truncate
 * @param maxLength Maximum length of result string (including ellipsis)
 * @param ellipsis Ellipsis string (default: "...")
 * @returns Truncated string
 * @example
 * ```typescript
 * truncate("Hello World", 8); // "Hello..."
 * truncate("Hello World", 8, "---"); // "Hello---"
 * ```
 */
export const truncate = (str: string, maxLength: number, ellipsis: string = "..."): string => {
    if (isNullish(str) || str.length <= maxLength) {
        return str;
    }

    if (maxLength <= ellipsis.length) {
        return ellipsis.substring(0, maxLength);
    }

    return str.substring(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Convert string to camelCase
 * @param str String to convert
 * @returns String in camelCase format
 * @example
 * ```typescript
 * toCamelCase("hello world"); // "helloWorld"
 * toCamelCase("hello_world"); // "helloWorld"
 * ```
 */
export const toCamelCase = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .split(/[-_\s]+/)
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join("");
};

/**
 * Convert string to snake_case
 * @param str String to convert
 * @returns String in snake_case format
 * @example
 * ```typescript
 * toSnakeCase("hello world"); // "hello_world"
 * toSnakeCase("helloWorld"); // "hello_world"
 * ```
 */
export const toSnakeCase = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\s+/g, "_")
        .replace(/-+/g, "_")
        .toLowerCase();
};

/**
 * Convert string to kebab-case
 * @param str String to convert
 * @returns String in kebab-case format
 * @example
 * ```typescript
 * toKebabCase("hello world"); // "hello-world"
 * toKebabCase("helloWorld"); // "hello-world"
 * ```
 */
export const toKebabCase = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .replace(/_+/g, "-")
        .toLowerCase();
};
/**
 * Escape HTML special characters
 * @param str String to escape
 * @returns Escaped string
 * @example
 * ```typescript
 * escapeHtml("<div>Hello & World</div>"); // "<div>Hello & World</div>"
 * escapeHtml("'Hello' " + '"World"'); // "&#039;Hello&#039; "World""
 * ```
 */
export const escapeHtml = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">")
        .replace(/"/g, '"')
        .replace(/'/g, "&#039;");
};

export * from "./prototype";
