import { describe, it, expect } from "vitest";

import { escapeHtml } from "../../src/string";

describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
        expect(escapeHtml("<div>Hello & World</div>")).toBe("<div>Hello & World</div>");
    });

    it("should handle strings without special characters", () => {
        expect(escapeHtml("Hello World")).toBe("Hello World");
        expect(escapeHtml("123")).toBe("123");
    });

    it("should handle empty or null values", () => {
        expect(escapeHtml("")).toBe("");
        expect(escapeHtml(null as any)).toBe("");
        expect(escapeHtml(undefined as any)).toBe("");
    });
});
