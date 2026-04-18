/**
 * Extracts initials from a full display name.
 *
 * All non-letter characters are ignored using the Unicode `\p{L}` property,
 * so the function works correctly with Latin, Cyrillic, and any other script.
 *
 * Resolution rules (applied in order):
 * - **Two or more word-tokens** → first letter of the first two tokens, uppercased.
 * - **One token** → first two characters of that token, uppercased.
 * - **No letter content** → `"??"`.
 *
 * @param name - Full display name to extract initials from.
 * @returns Two-character uppercase initials, or `"??"` when no letters are found.
 *
 * @example
 * ```typescript
 * getInitials("John Doe")       // "JD"
 * getInitials("John")           // "JO"
 * getInitials('"Demo" agent')   // "DA"
 * getInitials("42 !!!")         // "??"
 * getInitials("")               // "??"
 * ```
 */
export const getInitials = (name: string): string => {
    const words = name.match(/\p{L}+/gu) ?? [];
    const first = words[0];
    const second = words[1];

    if (first === undefined) {
        return "??";
    }

    if (second !== undefined) {
        return (first[0] + second[0]).toUpperCase();
    }

    return first.slice(0, 2).toUpperCase();
};
