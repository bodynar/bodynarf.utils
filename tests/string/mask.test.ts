import { describe, it, expect } from "vitest";

import { mask } from "../../src/string";

describe("mask", () => {
    it("should mask string with default parameters", () => {
        expect(mask("1234567890")).toBe("******7890");
    });

    it("should mask with custom visible chars", () => {
        expect(mask("1234567890", 2)).toBe("********90");
    });

    it("should mask with custom mask character", () => {
        expect(mask("1234567890", 4, "#")).toBe("######7890");
    });

    it("should return original string if shorter than visibleChars", () => {
        expect(mask("abc", 4)).toBe("abc");
    });

    it("should return original string if equal to visibleChars", () => {
        expect(mask("abcd", 4)).toBe("abcd");
    });

    it("should handle empty string", () => {
        expect(mask("")).toBe("");
    });

    it("should handle null", () => {
        expect(mask(null as unknown as string)).toBe("");
    });

    it("should handle undefined", () => {
        expect(mask(undefined as unknown as string)).toBe("");
    });

    it("should mask email-like string", () => {
        expect(mask("user@example.com", 4)).toBe("************.com");
    });
});
