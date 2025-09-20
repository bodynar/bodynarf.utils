import { describe, it, expect } from "vitest";

import { toKebabCase } from "../../src/string";

describe("toKebabCase", () => {
    it("should convert string to kebab-case", () => {
        expect(toKebabCase("hello world")).toBe("hello-world");
        expect(toKebabCase("Hello World")).toBe("hello-world");
        expect(toKebabCase("helloWorld")).toBe("hello-world");
        expect(toKebabCase("HelloWorld")).toBe("hello-world");
        expect(toKebabCase("hello_world")).toBe("hello-world");
        expect(toKebabCase("hello-world")).toBe("hello-world");
    });

    it("should handle single word", () => {
        expect(toKebabCase("hello")).toBe("hello");
        expect(toKebabCase("Hello")).toBe("hello");
    });

    it("should handle existing kebab-case", () => {
        expect(toKebabCase("hello-world-test")).toBe("hello-world-test");
    });

    it("should handle empty or null values", () => {
        expect(toKebabCase("")).toBe("");
        expect(toKebabCase(null as any)).toBe("");
        expect(toKebabCase(undefined as any)).toBe("");
    });
});
