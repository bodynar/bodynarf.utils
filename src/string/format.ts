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

/**
 * Unescape HTML special characters
 * @param str String to unescape
 * @returns Unescaped string
 * @example
 * ```typescript
 * unescapeHtml("&lt;div&gt;Hello &amp; World&lt;/div&gt;"); // "<div>Hello & World</div>"
 * unescapeHtml("&#039;Hello&#039; &quot;World&quot;"); // "'Hello' \"World\""
 * ```
 */
export const unescapeHtml = (str: string): string => {
    if (isNullish(str)) {
        return "";
    }

    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
};

/**
 * Count the number of words in a string
 * @param str String to count words in
 * @returns Number of words
 * @example
 * ```typescript
 * wordCount("Hello World"); // 2
 * wordCount("  multiple   spaces  "); // 2
 * wordCount(""); // 0
 * ```
 */
export const wordCount = (str: string): number => {
    if (isNullish(str)) {
        return 0;
    }

    const trimmed = str.trim();

    if (trimmed.length === 0) {
        return 0;
    }

    return trimmed.split(/\s+/).length;
};

/**
 * Mask a string, showing only the last N characters
 * @param str String to mask
 * @param visibleChars Number of visible characters at the end (default: 4)
 * @param maskChar Character used for masking (default: "*")
 * @returns Masked string
 * @example
 * ```typescript
 * mask("1234567890"); // "******7890"
 * mask("1234567890", 2); // "********90"
 * mask("1234567890", 4, "#"); // "######7890"
 * mask("abc", 4); // "abc"
 * ```
 */
export const mask = (str: string, visibleChars: number = 4, maskChar: string = "*"): string => {
    if (isNullish(str)) {
        return "";
    }

    if (str.length <= visibleChars) {
        return str;
    }

    const masked = maskChar.repeat(str.length - visibleChars);
    return masked + str.slice(-visibleChars);
};
