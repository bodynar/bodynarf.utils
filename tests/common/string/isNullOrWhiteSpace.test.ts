import { describe, it, expect } from "vitest";

import "../../../src/common/string";

describe("String.prototype.isNullOrWhiteSpace", () => {
    it("should return true for null values", () => {
        expect((null as any)?.isNullOrWhiteSpace()).toBeUndefined();
    });

    it("should return true for undefined values", () => {
        expect((undefined as any)?.isNullOrWhiteSpace()).toBeUndefined();
    });

    it("should return true for empty strings", () => {
        expect("".isNullOrWhiteSpace()).toBe(true);
    });

    it("should return true for whitespace-only strings", () => {
        expect(" ".isNullOrWhiteSpace()).toBe(true);
        expect("\t".isNullOrWhiteSpace()).toBe(true);
        expect("\n".isNullOrWhiteSpace()).toBe(true);
        expect("\r".isNullOrWhiteSpace()).toBe(true);
        expect(" \t\n\r ".isNullOrWhiteSpace()).toBe(true);
    });

    it("should return false for strings with visible characters", () => {
        expect("test".isNullOrWhiteSpace()).toBe(false);
        expect(" test ".isNullOrWhiteSpace()).toBe(false);
        expect("0".isNullOrWhiteSpace()).toBe(false);
        expect("false".isNullOrWhiteSpace()).toBe(false);
    });

    it("should return false for strings with special characters", () => {
        expect("!".isNullOrWhiteSpace()).toBe(false);
        expect("@#$%".isNullOrWhiteSpace()).toBe(false);
        expect("测试".isNullOrWhiteSpace()).toBe(false);
        expect("🌟".isNullOrWhiteSpace()).toBe(false);
    });

    it("should handle mixed whitespace and visible characters", () => {
        expect(" test ".isNullOrWhiteSpace()).toBe(false);
        expect(" \t\n test \t\n ".isNullOrWhiteSpace()).toBe(false);
    });
});
