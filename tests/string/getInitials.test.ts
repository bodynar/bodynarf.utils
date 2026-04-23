import { describe, it, expect } from "vitest";

import { getInitials } from "../../src/string/getInitials";

describe("getInitials", () => {
    it("should return initials from two-word name", () => {
        expect(getInitials("John Doe")).toBe("JD");
    });

    it("should return first two chars of a single word", () => {
        expect(getInitials("John")).toBe("JO");
    });

    it("should use only the first two word-tokens when name has more than two words", () => {
        expect(getInitials("John Michael Doe")).toBe("JM");
    });

    it("should ignore non-letter characters when extracting tokens", () => {
        expect(getInitials('"Demo" agent')).toBe("DA");
    });

    it("should ignore punctuation and digits between letters", () => {
        expect(getInitials("J. D.")).toBe("JD");
        expect(getInitials("J4 D9")).toBe("JD");
    });

    it("should return uppercase initials", () => {
        expect(getInitials("john doe")).toBe("JD");
        expect(getInitials("alice")).toBe("AL");
    });

    it("should handle Cyrillic names", () => {
        expect(getInitials("Иван Петров")).toBe("ИП");
        expect(getInitials("Мария")).toBe("МА");
    });

    it("should return ?? for empty string", () => {
        expect(getInitials("")).toBe("??");
    });

    it("should return ?? when string has no letters", () => {
        expect(getInitials("42 !!!")).toBe("??");
        expect(getInitials("   ")).toBe("??");
        expect(getInitials("123")).toBe("??");
    });

    it("should return single letter when word has only one character", () => {
        expect(getInitials("A")).toBe("A");
    });

    it("should handle names with multiple spaces between words", () => {
        expect(getInitials("John   Doe")).toBe("JD");
    });

    it("should handle names with leading and trailing non-letter characters", () => {
        expect(getInitials("  John Doe  ")).toBe("JD");
        expect(getInitials("---John---Doe---")).toBe("JD");
    });
});
