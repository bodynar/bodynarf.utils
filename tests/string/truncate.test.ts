import { describe, it, expect } from "vitest";

import { truncate } from "../../src/string";

describe("truncate", () => {
    it("should truncate string with ellipsis", () => {
        expect(truncate("Hello World", 8)).toBe("Hello...");
        expect(truncate("Hello World", 5)).toBe("He...");
    });

    it("should not truncate short strings", () => {
        expect(truncate("Hello", 10)).toBe("Hello");
        expect(truncate("Hi", 5)).toBe("Hi");
    });

    it("should handle custom ellipsis", () => {
        expect(truncate("Hello World", 8, "---")).toBe("Hello---");
    });

    it("should handle edge cases", () => {
        expect(truncate("Hello", 0)).toBe("");
        expect(truncate("Hello", 3, "...")).toBe("...");
        expect(truncate("", 5)).toBe("");
    });
});
