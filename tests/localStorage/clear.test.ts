import { describe, it, expect, beforeEach } from "vitest";

import { localStorage } from "../../src/localStorage";

describe("localStorage.clear", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should clear empty storage", () => {
        localStorage.clear();
        expect(localStorage.getRecord("any-key")).toBeUndefined();
    });

    it("should clear storage with single item", () => {
        localStorage.saveRecord("test-key", "test-value");
        expect(localStorage.getRecord("test-key")).toBe("test-value");

        localStorage.clear();
        expect(localStorage.getRecord("test-key")).toBeUndefined();
    });

    it("should clear storage with multiple items", () => {
        localStorage.saveRecord("key1", "value1");
        localStorage.saveRecord("key2", "value2");
        localStorage.saveRecord("key3", { id: 1, name: "test" });

        expect(localStorage.getRecord("key1")).toBe("value1");
        expect(localStorage.getRecord("key2")).toBe("value2");
        expect(localStorage.getRecord("key3")).toEqual({ id: 1, name: "test" });

        localStorage.clear();

        expect(localStorage.getRecord("key1")).toBeUndefined();
        expect(localStorage.getRecord("key2")).toBeUndefined();
        expect(localStorage.getRecord("key3")).toBeUndefined();
    });

    it("should make hasRecord return false for all keys after clear", () => {
        localStorage.saveRecord("test-key", "test-value");
        expect(localStorage.hasRecord("test-key")).toBe(true);

        localStorage.clear();
        expect(localStorage.hasRecord("test-key")).toBe(false);
    });
});
