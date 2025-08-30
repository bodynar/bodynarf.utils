import { describe, it, expect } from "vitest";

import { toSnakeCase } from "../../src/string";

describe("toSnakeCase", () => {
    it("should convert string to snake_case", () => {
        expect(toSnakeCase("hello world")).toBe("hello_world");
        expect(toSnakeCase("Hello World")).toBe("hello_world");
        expect(toSnakeCase("helloWorld")).toBe("hello_world");
        expect(toSnakeCase("HelloWorld")).toBe("hello_world");
    });

    it("should handle single word", () => {
        expect(toSnakeCase("hello")).toBe("hello");
        expect(toSnakeCase("Hello")).toBe("hello");
    });

    it("should handle existing snake_case", () => {
        expect(toSnakeCase("hello_world_test")).toBe("hello_world_test");
    });

    it("should handle empty or null values", () => {
        expect(toSnakeCase("")).toBe("");
        expect(toSnakeCase(null as any)).toBe("");
        expect(toSnakeCase(undefined as any)).toBe("");
    });
});
