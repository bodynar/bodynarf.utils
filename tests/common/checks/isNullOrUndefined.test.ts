import { describe, it, expect } from "vitest";

import { isNullOrUndefined } from "../../../src/common/checks";

describe("isNullOrUndefined", () => {
    it("should return true for null values", () => {
        expect(isNullOrUndefined(null)).toBe(true);
    });

    it("should return true for undefined values", () => {
        expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it("should return false for string values", () => {
        expect(isNullOrUndefined("test")).toBe(false);
    });

    it("should return false for number values", () => {
        expect(isNullOrUndefined(42)).toBe(false);
    });

    it("should return false for boolean values", () => {
        expect(isNullOrUndefined(true)).toBe(false);
        expect(isNullOrUndefined(false)).toBe(false);
    });

    it("should return false for object values", () => {
        expect(isNullOrUndefined({})).toBe(false);
    });

    it("should return false for array values", () => {
        expect(isNullOrUndefined([])).toBe(false);
    });

    it("should return false for Symbol values", () => {
        expect(isNullOrUndefined(Symbol("test"))).toBe(false);
    });

    it("should return false for BigInt values", () => {
        expect(isNullOrUndefined(BigInt(123))).toBe(false);
    });

    it("should return false for NaN values", () => {
        expect(isNullOrUndefined(NaN)).toBe(false);
    });

    it("should return false for Infinity values", () => {
        expect(isNullOrUndefined(Infinity)).toBe(false);
        expect(isNullOrUndefined(-Infinity)).toBe(false);
    });
});
