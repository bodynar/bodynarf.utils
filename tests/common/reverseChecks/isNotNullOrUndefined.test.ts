import { describe, it, expect } from "vitest";

import { isNotNullOrUndefined } from "../../../src/common/reverseChecks";

describe("isNotNullOrUndefined", () => {
    it("should return false for null values", () => {
        expect(isNotNullOrUndefined(null)).toBe(false);
    });

    it("should return false for undefined values", () => {
        expect(isNotNullOrUndefined(undefined)).toBe(false);
    });

    it("should return true for string values", () => {
        expect(isNotNullOrUndefined("test")).toBe(true);
    });

    it("should return true for number values", () => {
        expect(isNotNullOrUndefined(42)).toBe(true);
    });

    it("should return true for boolean values", () => {
        expect(isNotNullOrUndefined(true)).toBe(true);
        expect(isNotNullOrUndefined(false)).toBe(true);
    });

    it("should return true for object values", () => {
        expect(isNotNullOrUndefined({})).toBe(true);
    });

    it("should return true for array values", () => {
        expect(isNotNullOrUndefined([])).toBe(true);
    });

    it("should return true for Symbol values", () => {
        expect(isNotNullOrUndefined(Symbol("test"))).toBe(true);
    });

    it("should return true for BigInt values", () => {
        expect(isNotNullOrUndefined(BigInt(123))).toBe(true);
    });

    it("should return true for NaN values", () => {
        expect(isNotNullOrUndefined(NaN)).toBe(true);
    });

    it("should return true for Infinity values", () => {
        expect(isNotNullOrUndefined(Infinity)).toBe(true);
        expect(isNotNullOrUndefined(-Infinity)).toBe(true);
    });
});
