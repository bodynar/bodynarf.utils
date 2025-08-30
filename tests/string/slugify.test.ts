import { describe, it, expect } from "vitest";

import { slugify } from "../../src/string";

describe("slugify", () => {
    it("should convert string to URL-friendly format", () => {
        expect(slugify("Hello World")).toBe("hello-world");
        expect(slugify("Hello, World!")).toBe("hello-world");
        expect(slugify("  Hello   World  ")).toBe("hello-world");
    });

    it("should handle special characters", () => {
        expect(slugify("café")).toBe("café");
        expect(slugify("Ñoño")).toBe("ñoño");
    });

    it("should handle empty or null values", () => {
        expect(slugify("")).toBe("");
        expect(slugify(null as any)).toBe("");
        expect(slugify(undefined as any)).toBe("");
    });
});
