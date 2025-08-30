import { describe, it, expect } from "vitest";

import "../../../src/common/string";

describe("String.prototype.isEmpty", () => {
    it("should return true for empty strings", () => {
        expect("".isEmpty()).toBe(true);
    });

    it("should return false for non-empty strings", () => {
        expect("test".isEmpty()).toBe(false);
        expect(" ".isEmpty()).toBe(false);
        expect("0".isEmpty()).toBe(false);
        expect("false".isEmpty()).toBe(false);
    });

    it("should handle strings with whitespace", () => {
        expect(" ".isEmpty()).toBe(false);
        expect("\t".isEmpty()).toBe(false);
        expect("\n".isEmpty()).toBe(false);
        expect(" \t\n ".isEmpty()).toBe(false);
    });

    it("should handle special characters", () => {
        expect("!".isEmpty()).toBe(false);
        expect("@#$%".isEmpty()).toBe(false);
        expect("测试".isEmpty()).toBe(false);
        expect("🌟".isEmpty()).toBe(false);
    });

    it("should handle null and undefined", () => {
        expect((null as any)?.isEmpty()).toBeUndefined();
        expect((undefined as any)?.isEmpty()).toBeUndefined();
    });
});
