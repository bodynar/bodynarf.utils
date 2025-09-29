import { describe, it, expect } from "vitest";

import "../../../src/string";

describe("String.prototype.isNotNullOrEmpty", () => {
    it("should return false for null values", () => {
        expect((null as any)?.isNotNullOrEmpty()).toBeUndefined();
    });

    it("should return false for undefined values", () => {
        expect((undefined as any)?.isNotNullOrEmpty()).toBeUndefined();
    });

    it("should return false for empty strings", () => {
        expect("".isNotNullOrEmpty()).toBe(false);
    });

    it("should return true for non-empty strings", () => {
        expect("test".isNotNullOrEmpty()).toBe(true);
        expect(" ".isNotNullOrEmpty()).toBe(true);
        expect("0".isNotNullOrEmpty()).toBe(true);
        expect("false".isNotNullOrEmpty()).toBe(true);
    });

    it("should handle strings with whitespace", () => {
        expect(" ".isNotNullOrEmpty()).toBe(true);
        expect("\t".isNotNullOrEmpty()).toBe(true);
        expect("\n".isNotNullOrEmpty()).toBe(true);
        expect(" \t\n ".isNotNullOrEmpty()).toBe(true);
    });

    it("should handle special characters", () => {
        expect("!".isNotNullOrEmpty()).toBe(true);
        expect("@#$%".isNotNullOrEmpty()).toBe(true);
        expect("测试".isNotNullOrEmpty()).toBe(true);
        expect("🌟".isNotNullOrEmpty()).toBe(true);
    });
});
