import { describe, it, expect } from "vitest";

import "../../../src/string/prototype";

describe("String.prototype.toKebabCase", () => {
    it("should convert space-separated string to kebab-case", () => {
        expect("hello world".toKebabCase()).toBe("hello-world");
    });

    it("should convert camelCase string to kebab-case", () => {
        expect("helloWorld".toKebabCase()).toBe("hello-world");
        expect("helloWorldTest".toKebabCase()).toBe("hello-world-test");
    });

    it("should handle already kebab-case string", () => {
        expect("hello-world".toKebabCase()).toBe("hello-world");
    });

    it("should handle single word", () => {
        expect("hello".toKebabCase()).toBe("hello");
    });
});
