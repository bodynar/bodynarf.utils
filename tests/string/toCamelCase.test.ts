import { describe, it, expect } from "vitest";

import { toCamelCase } from "../../src/string";

describe("toCamelCase", () => {
    it("should convert string to camelCase", () => {
        expect(toCamelCase("hello world")).toBe("helloWorld");
        expect(toCamelCase("Hello World")).toBe("helloWorld");
        expect(toCamelCase("hello_world")).toBe("helloWorld");
        expect(toCamelCase("hello-world")).toBe("helloWorld");
    });

    it("should handle single word", () => {
        expect(toCamelCase("hello")).toBe("hello");
        expect(toCamelCase("Hello")).toBe("hello");
    });

    it("should handle empty or null values", () => {
        expect(toCamelCase("")).toBe("");
        expect(toCamelCase(null as any)).toBe("");
        expect(toCamelCase(undefined as any)).toBe("");
    });
});
