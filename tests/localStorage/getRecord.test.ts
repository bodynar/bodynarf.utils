import { describe, it, expect, beforeEach } from "vitest";

import { localStorage } from "../../src/localStorage";

describe("localStorage.getRecord", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should return undefined for empty key", () => {
        expect(localStorage.getRecord("")).toBeUndefined();
        expect(localStorage.getRecord(" ")).toBeUndefined();
    });

    it("should return undefined for non-existent key", () => {
        expect(localStorage.getRecord("non-existent-key")).toBeUndefined();
    });

    it("should return stored value for existing key", () => {
        const testData = { id: 1, name: "test", active: true };
        localStorage.saveRecord("test-key", testData);
        expect(localStorage.getRecord<typeof testData>("test-key")).toEqual(testData);
    });

    it("should return stored string value", () => {
        localStorage.saveRecord("string-key", "test-string");
        expect(localStorage.getRecord<string>("string-key")).toBe("test-string");
    });

    it("should return stored number value", () => {
        localStorage.saveRecord("number-key", 42);
        expect(localStorage.getRecord<number>("number-key")).toBe(42);
    });

    it("should return stored boolean value", () => {
        localStorage.saveRecord("boolean-key", true);
        expect(localStorage.getRecord<boolean>("boolean-key")).toBe(true);
    });

    it("should return stored array value", () => {
        const testArray = [1, 2, 3, "test", true];
        localStorage.saveRecord("array-key", testArray);
        expect(localStorage.getRecord<typeof testArray>("array-key")).toEqual(testArray);
    });

    it("should return stored null value as null", () => {
        localStorage.saveRecord("null-key", null);
        expect(localStorage.getRecord<null>("null-key")).toBeNull();
    });
});
