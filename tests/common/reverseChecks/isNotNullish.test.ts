import { describe, it, expect } from "vitest";

import { isNotNullish } from "../../../src/common/reverseChecks";

describe("isNotNullish", () => {
    it("should return false for null values", () => {
        expect(isNotNullish(null)).toBe(false);
    });

    it("should return false for undefined values", () => {
        expect(isNotNullish(undefined)).toBe(false);
    });

    it("should return true for string values", () => {
        expect(isNotNullish("test")).toBe(true);
    });

    it("should return true for number values", () => {
        expect(isNotNullish(42)).toBe(true);
    });

    it("should return true for boolean values", () => {
        expect(isNotNullish(true)).toBe(true);
        expect(isNotNullish(false)).toBe(true);
    });

    it("should return true for object values", () => {
        expect(isNotNullish({})).toBe(true);
    });

    it("should return true for array values", () => {
        expect(isNotNullish([])).toBe(true);
    });

    it("should return true for Symbol values", () => {
        expect(isNotNullish(Symbol("test"))).toBe(true);
    });

    it("should return true for BigInt values", () => {
        expect(isNotNullish(BigInt(123))).toBe(true);
    });

    it("should return true for NaN values", () => {
        expect(isNotNullish(NaN)).toBe(true);
    });

    it("should return true for Infinity values", () => {
        expect(isNotNullish(Infinity)).toBe(true);
        expect(isNotNullish(-Infinity)).toBe(true);
    });

    it("should provide type narrowing for nullable types", () => {
        const value: string | null = "test";

        if (isNotNullish(value)) {
            // TypeScript should recognize that value is now of type string
            const upper: string = value.toUpperCase();
            expect(upper).toBe("TEST");
        } else {
            // In this branch, value should be null
            expect(value).toBe(null);
        }
    });
});
