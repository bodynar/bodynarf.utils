import { describe, it, expect, beforeEach } from "vitest";

import { localStorage } from "../../src/localStorage";

describe("localStorage.saveRecord", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should not save record for empty key", () => {
        localStorage.saveRecord("", "test-value");
        expect(localStorage.getRecord("")).toBeUndefined();
    });

    it("should save string value", () => {
        localStorage.saveRecord("string-key", "test-string");
        expect(localStorage.getRecord("string-key")).toBe("test-string");
    });

    it("should save number value", () => {
        localStorage.saveRecord("number-key", 42);
        expect(localStorage.getRecord("number-key")).toBe(42);
    });

    it("should save boolean value", () => {
        localStorage.saveRecord("boolean-key", true);
        expect(localStorage.getRecord("boolean-key")).toBe(true);
    });

    it("should save object value", () => {
        const testData = { id: 1, name: "test", nested: { value: "nested" } };
        localStorage.saveRecord("object-key", testData);
        expect(localStorage.getRecord("object-key")).toEqual(testData);
    });

    it("should save array value", () => {
        const testArray = [1, 2, 3, "test", true, { id: 1 }];
        localStorage.saveRecord("array-key", testArray);
        expect(localStorage.getRecord("array-key")).toEqual(testArray);
    });

    it("should save null value", () => {
        localStorage.saveRecord("null-key", null);
        expect(localStorage.getRecord("null-key")).toBeNull();
    });


    it("should overwrite existing value", () => {
        localStorage.saveRecord("overwrite-key", "initial-value");
        expect(localStorage.getRecord("overwrite-key")).toBe("initial-value");

        localStorage.saveRecord("overwrite-key", "new-value");
        expect(localStorage.getRecord("overwrite-key")).toBe("new-value");
    });
});
