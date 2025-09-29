import { describe, it, expect } from "vitest";

import { isStringNotEmpty } from "../../src/string";

describe("isStringNotEmpty", () => {
    it("should return false for empty strings", () => {
        expect(isStringNotEmpty("")).toBe(false);
    });

    it("should return true for non-empty strings", () => {
        expect(isStringNotEmpty("test")).toBe(true);
        expect(isStringNotEmpty(" ")).toBe(true);
        expect(isStringNotEmpty("0")).toBe(true);
        expect(isStringNotEmpty("false")).toBe(true);
    });

    it("should handle strings with whitespace", () => {
        expect(isStringNotEmpty(" ")).toBe(true);
        expect(isStringNotEmpty("\t")).toBe(true);
        expect(isStringNotEmpty("\n")).toBe(true);
        expect(isStringNotEmpty(" \t\n ")).toBe(true);
    });

    it("should handle special characters", () => {
        expect(isStringNotEmpty("!")).toBe(true);
        expect(isStringNotEmpty("@#$%")).toBe(true);
        expect(isStringNotEmpty("测试")).toBe(true);
        expect(isStringNotEmpty("🌟")).toBe(true);
    });
});
