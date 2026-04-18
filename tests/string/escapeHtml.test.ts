import { describe, it, expect } from "vitest";

import { escapeHtml } from "../../src/string";

describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
        expect(escapeHtml("<div>Hello & World</div>")).toBe("&lt;div&gt;Hello &amp; World&lt;/div&gt;");
        expect(escapeHtml('"quoted"')).toBe("&quot;quoted&quot;");
        expect(escapeHtml("it's fine")).toBe("it&#039;s fine");
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
