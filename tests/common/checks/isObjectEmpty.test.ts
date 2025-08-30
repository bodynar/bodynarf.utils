import { describe, it, expect } from "vitest";

import { isObjectEmpty } from "../../../src/common/checks";

describe("isObjectEmpty", () => {
    it("should return true for null values", () => {
        expect(isObjectEmpty(null)).toBe(true);
    });

    it("should return true for undefined values", () => {
        expect(isObjectEmpty(undefined)).toBe(true);
    });

    it("should return true for empty objects", () => {
        expect(isObjectEmpty({})).toBe(true);
    });

    it("should return true for objects with only null values", () => {
        expect(isObjectEmpty({ a: null, b: null })).toBe(true);
    });

    it("should return true for objects with only undefined values", () => {
        expect(isObjectEmpty({ a: undefined, b: undefined })).toBe(true);
    });

    it("should return true for objects with null and undefined values", () => {
        expect(isObjectEmpty({ a: null, b: undefined })).toBe(true);
    });

    it("should return false for objects with at least one non-null/non-undefined value", () => {
        expect(isObjectEmpty({ a: null, b: "test" })).toBe(false);
    });

    it("should return false for objects with string values", () => {
        expect(isObjectEmpty({ a: "test", b: "another" })).toBe(false);
    });

    it("should return false for objects with number values", () => {
        expect(isObjectEmpty({ a: 1, b: 2 })).toBe(false);
    });

    it("should return false for objects with boolean values", () => {
        expect(isObjectEmpty({ a: true, b: false })).toBe(false);
    });

    it("should return false for objects with object values", () => {
        expect(isObjectEmpty({ a: {}, b: [] })).toBe(false);
    });

    it("should return false for objects with array values", () => {
        expect(isObjectEmpty({ a: [1, 2, 3] })).toBe(false);
    });

    it("should return false for objects with zero values", () => {
        expect(isObjectEmpty({ a: 0 })).toBe(false);
    });

    it("should return false for objects with empty string values", () => {
        expect(isObjectEmpty({ a: "" })).toBe(false);
    });

    it("should return false for objects with false boolean values", () => {
        expect(isObjectEmpty({ a: false })).toBe(false);
    });

    it("should handle nested objects correctly", () => {
        expect(isObjectEmpty({ a: { b: null } })).toBe(false);
        expect(isObjectEmpty({ a: { b: undefined } })).toBe(false);
        expect(isObjectEmpty({ a: { b: "test" } })).toBe(false);
    });

    it("should handle arrays (treated as objects)", () => {
        expect(isObjectEmpty([])).toBe(true);
        expect(isObjectEmpty([null])).toBe(true);
        expect(isObjectEmpty([undefined])).toBe(true);
        expect(isObjectEmpty([1])).toBe(false);
        expect(isObjectEmpty(["test"])).toBe(false);
    });

    it("should handle objects with Symbol properties", () => {
        const sym = Symbol("test");
        expect(isObjectEmpty({ [sym]: null })).toBe(true);
        expect(isObjectEmpty({ [sym]: undefined })).toBe(true);
        expect(isObjectEmpty({ [sym]: "value" })).toBe(true);
    });

    it("should handle objects without prototype", () => {
        const obj = Object.create(null);
        expect(isObjectEmpty(obj)).toBe(true);

        obj.prop = null;
        expect(isObjectEmpty(obj)).toBe(true);

        obj.prop = "value";
        expect(isObjectEmpty(obj)).toBe(false);
    });

    it("should handle special numeric values", () => {
        expect(isObjectEmpty({ a: NaN })).toBe(false);
        expect(isObjectEmpty({ a: Infinity })).toBe(false);
        expect(isObjectEmpty({ a: -Infinity })).toBe(false);
    });

    it("should handle objects with functions", () => {
        expect(isObjectEmpty({ a: function() {} })).toBe(false);
        expect(isObjectEmpty({ a: () => {} })).toBe(false);
    });

    it("should handle objects with getter/setter properties", () => {
        const obj = {
            get prop() {
                return null;
            }
        };
        expect(isObjectEmpty(obj)).toBe(true);

        const obj2 = {
            get prop() {
                return "value";
            }
        };
        expect(isObjectEmpty(obj2)).toBe(false);
    });
});
