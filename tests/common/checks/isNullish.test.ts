import { describe, it, expect } from "vitest";

import { isNullish } from "../../../src/common/checks";

describe("isNullish", () => {
    it("should return true for null values", () => {
        expect(isNullish(null)).toBe(true);
    });

    it("should return true for undefined values", () => {
        expect(isNullish(undefined)).toBe(true);
    });

    it("should return false for string values", () => {
        expect(isNullish("test")).toBe(false);
    });

    it("should return false for number values", () => {
        expect(isNullish(42)).toBe(false);
    });

    it("should return false for boolean values", () => {
        expect(isNullish(true)).toBe(false);
        expect(isNullish(false)).toBe(false);
    });

    it("should return false for object values", () => {
        expect(isNullish({})).toBe(false);
    });

    it("should return false for array values", () => {
        expect(isNullish([])).toBe(false);
    });

    it("should return false for Symbol values", () => {
        expect(isNullish(Symbol("test"))).toBe(false);
    });

    it("should return false for BigInt values", () => {
        expect(isNullish(BigInt(123))).toBe(false);
    });

    it("should return false for NaN values", () => {
        expect(isNullish(NaN)).toBe(false);
    });

    it("should return false for Infinity values", () => {
        expect(isNullish(Infinity)).toBe(false);
        expect(isNullish(-Infinity)).toBe(false);
    });
});
