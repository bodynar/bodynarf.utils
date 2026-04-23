import { isNullish } from "..";

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
