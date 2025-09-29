import { describe, it, expect } from "vitest";

import { isNotNullOrEmpty } from "../../src/string";

describe("isNotNullOrEmpty", () => {
    it("should return false for null values", () => {
        expect(isNotNullOrEmpty(null)).toBe(false);
    });

    it("should return false for undefined values", () => {
        expect(isNotNullOrEmpty(undefined)).toBe(false);
    });

    it("should return false for empty strings", () => {
        expect(isNotNullOrEmpty("")).toBe(false);
    });

    it("should return true for non-empty strings", () => {
        expect(isNotNullOrEmpty("test")).toBe(true);
        expect(isNotNullOrEmpty(" ")).toBe(true);
        expect(isNotNullOrEmpty("0")).toBe(true);
        expect(isNotNullOrEmpty("false")).toBe(true);
    });

    it("should handle strings with whitespace", () => {
        expect(isNotNullOrEmpty(" ")).toBe(true);
        expect(isNotNullOrEmpty("\t")).toBe(true);
        expect(isNotNullOrEmpty("\n")).toBe(true);
        expect(isNotNullOrEmpty(" \t\n ")).toBe(true);
    });

    it("should handle special characters", () => {
        expect(isNotNullOrEmpty("!")).toBe(true);
        expect(isNotNullOrEmpty("@#$%")).toBe(true);
        expect(isNotNullOrEmpty("测试")).toBe(true);
        expect(isNotNullOrEmpty("🌟")).toBe(true);
    });
});
