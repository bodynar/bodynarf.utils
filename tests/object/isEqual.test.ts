import { describe, it, expect } from "vitest";

import { isEqual } from "../../src/object";

describe("isEqual", () => {
    it("should return true for identical primitive values", () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual("hello", "hello")).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
    });

    it("should return false for different primitive values", () => {
        expect(isEqual(1, 2)).toBe(false);
        expect(isEqual("hello", "world")).toBe(false);
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(null, undefined)).toBe(false);
        expect(isEqual(0, false)).toBe(false);
        expect(isEqual("", false)).toBe(false);
    });

    it("should return true for identical objects", () => {
        const obj1 = { name: "Alice", age: 30 };
        const obj2 = { name: "Alice", age: 30 };
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it("should return false for objects with different properties", () => {
        const obj1 = { name: "Alice", age: 30 };
        const obj2 = { name: "Bob", age: 30 };
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it("should return false for objects with different number of properties", () => {
        const obj1 = { name: "Alice", age: 30 };
        const obj2 = { name: "Alice", age: 30, city: "New York" };
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it("should return true for deeply nested identical objects", () => {
        const obj1 = {
            name: "Alice",
            age: 30,
            address: {
                street: "123 Main St",
                city: "New York",
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060
                }
            }
        };
        const obj2 = {
            name: "Alice",
            age: 30,
            address: {
                street: "123 Main St",
                city: "New York",
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060
                }
            }
        };
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it("should return false for deeply nested different objects", () => {
        const obj1 = {
            name: "Alice",
            age: 30,
            address: {
                street: "123 Main St",
                city: "New York",
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0060
                }
            }
        };
        const obj2 = {
            name: "Alice",
            age: 30,
            address: {
                street: "123 Main St",
                city: "New York",
                coordinates: {
                    lat: 40.7128,
                    lng: -74.0061 // Different longitude
                }
            }
        };
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it("should return true for identical arrays", () => {
        const arr1 = [1, 2, 3, "hello", true];
        const arr2 = [1, 2, 3, "hello", true];
        expect(isEqual(arr1, arr2)).toBe(true);
    });

    it("should return false for different arrays", () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 4];
        expect(isEqual(arr1, arr2)).toBe(false);
    });

    it("should return false for arrays with different lengths", () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 3, 4];
        expect(isEqual(arr1, arr2)).toBe(false);
    });

    it("should return true for identical nested arrays", () => {
        const arr1 = [[1, 2], [3, 4], { name: "Alice" }];
        const arr2 = [[1, 2], [3, 4], { name: "Alice" }];
        expect(isEqual(arr1, arr2)).toBe(true);
    });

    it("should return false for different nested arrays", () => {
        const arr1 = [[1, 2], [3, 4], { name: "Alice" }];
        const arr2 = [[1, 2], [3, 5], { name: "Alice" }]; // Different nested array element
        expect(isEqual(arr1, arr2)).toBe(false);
    });

    it("should return true for identical dates", () => {
        const date1 = new Date("2023-01-01T00:00:00Z");
        const date2 = new Date("2023-01-01T00:00:00Z");
        expect(isEqual(date1, date2)).toBe(true);
    });

    it("should return false for different dates", () => {
        const date1 = new Date("2023-01-01T00:00:00Z");
        const date2 = new Date("2023-01-02T00:00:00Z");
        expect(isEqual(date1, date2)).toBe(false);
    });

    it("should return false when comparing objects and arrays", () => {
        const obj = { name: "Alice" };
        const arr = ["Alice"];
        expect(isEqual(obj, arr)).toBe(false);
    });

    it("should handle circular references", () => {
        const obj1: any = { name: "Alice" };
        obj1.self = obj1;

        const obj2: any = { name: "Alice" };
        obj2.self = obj2;

        // This should not cause infinite recursion
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it("should handle self-referencing objects", () => {
        const obj1: any = { name: "Alice" };
        obj1.self = obj1;

        const obj2: any = { name: "Alice" };
        obj2.self = obj2; // Pointing to itself

        // These should be equal because they have the same structure
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it("should handle different self-referencing objects", () => {
        const obj1: any = { name: "Alice" };
        obj1.self = obj1;

        const obj2: any = { name: "Bob" };
        obj2.self = obj2; // Pointing to itself

        // These should not be equal because they have different values
        expect(isEqual(obj1, obj2)).toBe(false);
    });
});
