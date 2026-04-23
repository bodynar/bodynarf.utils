import { describe, it, expect } from "vitest";

import { unescapeHtml, escapeHtml } from "../../src/string";

describe("unescapeHtml", () => {
    it("should unescape HTML entities", () => {
        expect(unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;")).toBe("<div>Hello</div>");
    });

    it("should unescape ampersand", () => {
        expect(unescapeHtml("Hello &amp; World")).toBe("Hello & World");
    });

    it("should unescape quotes", () => {
        expect(unescapeHtml("&quot;Hello&quot; &#039;World&#039;")).toBe('"Hello" \'World\'');
    });

    it("should handle empty string", () => {
        expect(unescapeHtml("")).toBe("");
    });

    it("should handle null", () => {
        expect(unescapeHtml(null as unknown as string)).toBe("");
    });

    it("should handle undefined", () => {
        expect(unescapeHtml(undefined as unknown as string)).toBe("");
    });

    it("should handle string without entities", () => {
        expect(unescapeHtml("Hello World")).toBe("Hello World");
    });

    it("should be inverse of escapeHtml", () => {
        const original = '<div class="test">Hello & World</div>';
        expect(unescapeHtml(escapeHtml(original))).toBe(original);
    });
});
