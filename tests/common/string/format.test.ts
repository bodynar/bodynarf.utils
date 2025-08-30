import { describe, it, expect } from "vitest";

import "../../../src/common/string";

describe("String.prototype.format", () => {
    it("should format string with single argument", () => {
        expect("{0} world!".format("Hello")).toBe("Hello world!");
    });

    it("should format string with multiple arguments", () => {
        expect("{0} {1} {2}".format("Hello", "world", "!")).toBe("Hello world !");
    });

    it("should format string with repeated arguments", () => {
        expect("{0} {1} {0}".format("Hello", "world")).toBe("Hello world Hello");
    });

    it("should format string with numeric arguments", () => {
        expect("Value: {0}".format(42)).toBe("Value: 42");
        expect("Pi: {0}".format(3.14159)).toBe("Pi: 3.14159");
    });

    it("should format string with boolean arguments", () => {
        expect("True: {0}, False: {1}".format(true, false)).toBe("True: true, False: false");
    });

    it("should format string with object arguments", () => {
        expect("Object: {0}".format({ name: "test" })).toBe('Object: [object Object]');
    });

    it("should format string with array arguments", () => {
        expect("Array: {0}".format([1, 2, 3])).toBe("Array: 1,2,3");
    });

    it("should format string with null and undefined arguments", () => {
        expect("Value: {0}".format(null)).toBe("Value: null");
        expect("Value: {0}".format(undefined)).toBe("Value: undefined");
    });

    it("should handle empty format string", () => {
        expect("".format()).toBe("");
    });

    it("should handle format string without placeholders", () => {
        expect("Hello world!".format()).toBe("Hello world!");
    });

    it("should handle extra arguments", () => {
        expect("{0}".format("Hello", "world")).toBe("Hello");
    });

    it("should handle missing arguments", () => {
        expect("{0} {1}".format("Hello")).toBe("Hello ");
    });
});
