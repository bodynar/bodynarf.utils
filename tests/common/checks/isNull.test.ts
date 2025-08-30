import { describe, it, expect } from "vitest";

import { isNull } from "../../../src/common/checks";

describe("isNull", () => {
    it("should return true for null values", () => {
        expect(isNull(null)).toBe(true);
    });

    it("should return false for undefined values", () => {
        expect(isNull(undefined)).toBe(false);
    });

    it("should return false for string values", () => {
        expect(isNull("test")).toBe(false);
    });

    it("should return false for number values", () => {
        expect(isNull(42)).toBe(false);
    });

    it("should return false for boolean values", () => {
        expect(isNull(true)).toBe(false);
        expect(isNull(false)).toBe(false);
    });

    it("should return false for object values", () => {
        expect(isNull({})).toBe(false);
    });

    it("should return false for array values", () => {
        expect(isNull([])).toBe(false);
    });

    it("should return false for Symbol values", () => {
        expect(isNull(Symbol("test"))).toBe(false);
    });

    it("should return false for BigInt values", () => {
        expect(isNull(BigInt(123))).toBe(false);
    });

    it("should return false for NaN values", () => {
        expect(isNull(NaN)).toBe(false);
    });

    it("should return false for Infinity values", () => {
        expect(isNull(Infinity)).toBe(false);
        expect(isNull(-Infinity)).toBe(false);
    });
});
