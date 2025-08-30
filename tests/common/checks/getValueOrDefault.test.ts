import { describe, it, expect } from "vitest";

import { getValueOrDefault } from "../../../src/common/checks";

describe("getValueOrDefault", () => {
    it("should return default value for null inputs", () => {
        expect(getValueOrDefault(null, true)).toBe(true);
    });

    it("should return default value for undefined inputs", () => {
        expect(getValueOrDefault(undefined, true)).toBe(true);
    });

    it("should return actual value for string inputs", () => {
        expect(getValueOrDefault("test", "ddd")).toBe("test");
    });

    it("should return actual value for number inputs", () => {
        expect(getValueOrDefault(42, 10_000)).toBe(42);
    });

    it("should return actual value for boolean inputs", () => {
        expect(getValueOrDefault(true, false)).toBe(true);
        expect(getValueOrDefault(false, true)).toBe(false);
    });

    it("should return actual value for object inputs", () => {
        expect(getValueOrDefault({ valid: 1 }, { test: "test" })).toStrictEqual({ valid: 1 });
    });

    it("should return actual value for array inputs", () => {
        expect(getValueOrDefault([10, 20], ["a"])).toStrictEqual([10, 20]);
    });

    it("should return actual value for NaN inputs", () => {
        expect(getValueOrDefault(NaN, 42)).toBeNaN();
    });

    it("should return actual value for zero inputs", () => {
        expect(getValueOrDefault(0, 100)).toBe(0);
    });

    it("should return actual value for empty string inputs", () => {
        expect(getValueOrDefault("", "default")).toBe("");
    });

    it("should return actual value for false inputs", () => {
        expect(getValueOrDefault(false, true)).toBe(false);
    });

    it("should handle Symbol values", () => {
        const sym = Symbol("test");
        expect(getValueOrDefault(sym, Symbol("default"))).toBe(sym);
        expect(getValueOrDefault(null, sym)).toBe(sym);
    });

    it("should handle BigInt values", () => {
        const bigIntValue = BigInt(123);
        expect(getValueOrDefault(bigIntValue, BigInt(456))).toBe(bigIntValue);
        expect(getValueOrDefault(null, bigIntValue)).toBe(bigIntValue);
    });

    it("should handle Infinity values", () => {
        expect(getValueOrDefault(Infinity, 0)).toBe(Infinity);
        expect(getValueOrDefault(-Infinity, 0)).toBe(-Infinity);
    });
});
