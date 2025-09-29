import { describe, it, expect } from "vitest";

import "../../../src/string";

describe("String.prototype.isNotEmpty", () => {
    it("should return false for empty strings", () => {
        expect("".isNotEmpty()).toBe(false);
    });

    it("should return true for non-empty strings", () => {
        expect("test".isNotEmpty()).toBe(true);
        expect(" ".isNotEmpty()).toBe(true);
        expect("0".isNotEmpty()).toBe(true);
        expect("false".isNotEmpty()).toBe(true);
    });

    it("should handle strings with whitespace", () => {
        expect(" ".isNotEmpty()).toBe(true);
        expect("\t".isNotEmpty()).toBe(true);
        expect("\n".isNotEmpty()).toBe(true);
        expect(" \t\n ".isNotEmpty()).toBe(true);
    });

    it("should handle special characters", () => {
        expect("!".isNotEmpty()).toBe(true);
        expect("@#$%".isNotEmpty()).toBe(true);
        expect("测试".isNotEmpty()).toBe(true);
        expect("🌟".isNotEmpty()).toBe(true);
    });
});
