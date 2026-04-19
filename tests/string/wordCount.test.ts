import { describe, it, expect } from "vitest";

import { wordCount } from "../../src/string";

describe("wordCount", () => {
    it("should count words in a simple string", () => {
        expect(wordCount("Hello World")).toBe(2);
    });

    it("should handle multiple spaces", () => {
        expect(wordCount("  multiple   spaces  ")).toBe(2);
    });

    it("should return 0 for empty string", () => {
        expect(wordCount("")).toBe(0);
    });

    it("should return 0 for whitespace-only string", () => {
        expect(wordCount("   ")).toBe(0);
    });

    it("should handle single word", () => {
        expect(wordCount("hello")).toBe(1);
    });

    it("should handle null", () => {
        expect(wordCount(null as unknown as string)).toBe(0);
    });

    it("should handle undefined", () => {
        expect(wordCount(undefined as unknown as string)).toBe(0);
    });

    it("should handle tabs and newlines", () => {
        expect(wordCount("hello\tworld\nnew line")).toBe(4);
    });
});
