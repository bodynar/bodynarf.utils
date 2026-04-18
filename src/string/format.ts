import { isNullish } from "..";

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
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
