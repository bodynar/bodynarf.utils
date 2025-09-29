import { describe, it, expect } from "vitest";

import { isNotUndefined } from "../../../src/common/reverseChecks";

describe("isNotUndefined", () => {
    it("should return true for null values", () => {
        expect(isNotUndefined(null)).toBe(true);
    });

    it("should return false for undefined values", () => {
        expect(isNotUndefined(undefined)).toBe(false);
    });

    it("should return true for string values", () => {
        expect(isNotUndefined("test")).toBe(true);
    });

    it("should return true for number values", () => {
        expect(isNotUndefined(42)).toBe(true);
    });

    it("should return true for boolean values", () => {
        expect(isNotUndefined(true)).toBe(true);
        expect(isNotUndefined(false)).toBe(true);
    });

    it("should return true for object values", () => {
        expect(isNotUndefined({})).toBe(true);
    });

    it("should return true for array values", () => {
        expect(isNotUndefined([])).toBe(true);
    });

    it("should return true for Symbol values", () => {
        expect(isNotUndefined(Symbol("test"))).toBe(true);
    });

    it("should return true for BigInt values", () => {
        expect(isNotUndefined(BigInt(123))).toBe(true);
    });

    it("should return true for NaN values", () => {
        expect(isNotUndefined(NaN)).toBe(true);
    });

    it("should return true for Infinity values", () => {
        expect(isNotUndefined(Infinity)).toBe(true);
        expect(isNotUndefined(-Infinity)).toBe(true);
    });
});
