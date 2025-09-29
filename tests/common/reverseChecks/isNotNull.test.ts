import { describe, it, expect } from "vitest";

import { isNotNull } from "../../../src/common/reverseChecks";

describe("isNotNull", () => {
    it("should return false for null values", () => {
        expect(isNotNull(null)).toBe(false);
    });

    it("should return true for undefined values", () => {
        expect(isNotNull(undefined)).toBe(true);
    });

    it("should return true for string values", () => {
        expect(isNotNull("test")).toBe(true);
    });

    it("should return true for number values", () => {
        expect(isNotNull(42)).toBe(true);
    });

    it("should return true for boolean values", () => {
        expect(isNotNull(true)).toBe(true);
        expect(isNotNull(false)).toBe(true);
    });

    it("should return true for object values", () => {
        expect(isNotNull({})).toBe(true);
    });

    it("should return true for array values", () => {
        expect(isNotNull([])).toBe(true);
    });

    it("should return true for Symbol values", () => {
        expect(isNotNull(Symbol("test"))).toBe(true);
    });

    it("should return true for BigInt values", () => {
        expect(isNotNull(BigInt(123))).toBe(true);
    });

    it("should return true for NaN values", () => {
        expect(isNotNull(NaN)).toBe(true);
    });

    it("should return true for Infinity values", () => {
        expect(isNotNull(Infinity)).toBe(true);
        expect(isNotNull(-Infinity)).toBe(true);
    });
});
