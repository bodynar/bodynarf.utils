import { describe, it, expect } from "vitest";

import "../../../src/string";

describe("String.prototype.capitalize", () => {
    it("should capitalize first letter of string", () => {
        expect("hello".capitalize()).toBe("Hello");
    });

    it("should capitalize first letter and leave rest unchanged", () => {
        expect("hello world".capitalize()).toBe("Hello world");
        expect("HELLO".capitalize()).toBe("HELLO");
        expect("hELLO".capitalize()).toBe("HELLO");
    });

    it("should handle single character strings", () => {
        expect("a".capitalize()).toBe("A");
        expect("A".capitalize()).toBe("A");
    });

    it("should handle empty strings", () => {
        expect("".capitalize()).toBe("");
    });

    it("should handle strings with special characters", () => {
        expect("123abc".capitalize()).toBe("123abc");
        expect("!hello".capitalize()).toBe("!hello");
        expect(" hello".capitalize()).toBe(" hello");
        expect("🌟hello".capitalize()).toBe("🌟hello");
    });

    it("should handle strings with unicode characters", () => {
        expect("привет".capitalize()).toBe("Привет");
        expect("ülke".capitalize()).toBe("Ülke");
    });

    it("should handle strings with numbers", () => {
        expect("123hello".capitalize()).toBe("123hello");
        expect("hello123".capitalize()).toBe("Hello123");
    });
});
