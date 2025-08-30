import { describe, it, expect } from "vitest";

import { isStringEmpty } from "../../../src/common/string";

describe("isStringEmpty", () => {
    it("should return true for empty strings", () => {
        expect(isStringEmpty("")).toBe(true);
    });

    it("should return false for non-empty strings", () => {
        expect(isStringEmpty("test")).toBe(false);
        expect(isStringEmpty(" ")).toBe(false);
        expect(isStringEmpty("0")).toBe(false);
        expect(isStringEmpty("false")).toBe(false);
    });

    it("should handle strings with whitespace", () => {
        expect(isStringEmpty(" ")).toBe(false);
        expect(isStringEmpty("\t")).toBe(false);
        expect(isStringEmpty("\n")).toBe(false);
        expect(isStringEmpty(" \t\n ")).toBe(false);
    });

    it("should handle special characters", () => {
        expect(isStringEmpty("!")).toBe(false);
        expect(isStringEmpty("@#$%")).toBe(false);
        expect(isStringEmpty("测试")).toBe(false);
        expect(isStringEmpty("🌟")).toBe(false);
    });
});
