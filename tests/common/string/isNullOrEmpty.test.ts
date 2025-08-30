import { describe, it, expect } from "vitest";

import "../../../src/common/string";

describe("String.prototype.isNullOrEmpty", () => {
    it("should return true for null values", () => {
        expect((null as any)?.isNullOrEmpty()).toBeUndefined();
    });

    it("should return true for undefined values", () => {
        expect((undefined as any)?.isNullOrEmpty()).toBeUndefined();
    });

    it("should return true for empty strings", () => {
        expect("".isNullOrEmpty()).toBe(true);
    });

    it("should return false for non-empty strings", () => {
        expect("test".isNullOrEmpty()).toBe(false);
        expect(" ".isNullOrEmpty()).toBe(false);
        expect("0".isNullOrEmpty()).toBe(false);
        expect("false".isNullOrEmpty()).toBe(false);
    });

    it("should handle strings with whitespace", () => {
        expect(" ".isNullOrEmpty()).toBe(false);
        expect("\t".isNullOrEmpty()).toBe(false);
        expect("\n".isNullOrEmpty()).toBe(false);
        expect(" \t\n ".isNullOrEmpty()).toBe(false);
    });

    it("should handle special characters", () => {
        expect("!".isNullOrEmpty()).toBe(false);
        expect("@#$%".isNullOrEmpty()).toBe(false);
        expect("测试".isNullOrEmpty()).toBe(false);
        expect("🌟".isNullOrEmpty()).toBe(false);
    });
});
