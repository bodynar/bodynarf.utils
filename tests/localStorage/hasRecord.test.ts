import { describe, it, expect, beforeEach, vi } from "vitest";

import { localStorage } from "../../src/localStorage";

describe("localStorage.hasRecord", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should return false for empty key", () => {
        expect(localStorage.hasRecord("")).toBe(false);
        expect(localStorage.hasRecord(" ")).toBe(false);
    });

    it("should return false for non-existent key", () => {
        expect(localStorage.hasRecord("non-existent-key")).toBe(false);
    });

    it("should return true for existing key with value", () => {
        localStorage.saveRecord("test-key", "test-value");
        expect(localStorage.hasRecord("test-key")).toBe(true);
    });

    it("should return true for existing key with empty string value", () => {
        localStorage.saveRecord("empty-key", "");
        expect(localStorage.hasRecord("empty-key")).toBe(true);
    });

    it("should return false for existing key with null value", () => {
        const originalSetItem = window.localStorage.setItem;
        window.localStorage.setItem = vi.fn((key, value) => {
            if (key === "null-key") {
                originalSetItem.call(window.localStorage, key, "null");
            } else {
                originalSetItem.call(window.localStorage, key, value);
            }
        });

        window.localStorage.setItem("null-key", "null");
        expect(localStorage.hasRecord("null-key")).toBe(true);

        window.localStorage.setItem = originalSetItem;
    });
});
