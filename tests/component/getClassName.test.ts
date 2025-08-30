import { describe, it, expect } from "vitest";

import { getClassName } from "../../src/component";
import "../../src/array";

describe("getClassName", () => {
    it("should return empty string for empty array", () => {
        expect(getClassName([])).toBe("");
    });

    it("should return joined class names separated by space", () => {
        expect(getClassName(["class1", "class2", "class3"])).toBe("class1 class2 class3");
    });

    it("should filter out null values", () => {
        expect(getClassName(["class1", null, "class2"])).toBe("class1 class2");
    });

    it("should filter out undefined values", () => {
        expect(getClassName(["class1", undefined, "class2"])).toBe("class1 class2");
    });

    it("should filter out empty strings when removeEmptyString is true", () => {
        expect(getClassName(["class1", "", "class2"])).toBe("class1 class2");
    });

    it("should filter out all empty values", () => {
        expect(getClassName(["class1", null, undefined, "", "class2"])).toBe("class1 class2");
    });

    it("should remove duplicate class names", () => {
        expect(getClassName(["class1", "class2", "class1", "class3", "class2"])).toBe("class1 class2 class3");
    });

    it("should handle array with only empty values", () => {
        expect(getClassName([null, undefined, ""])).toBe("");
    });

    it("should handle array with single class name", () => {
        expect(getClassName(["single-class"])).toBe("single-class");
    });

    it("should handle complex scenario with duplicates and empty values", () => {
        expect(getClassName(["class1", "class2", null, "class1", "", "class3", undefined, "class2"])).toBe("class1 class2 class3");
    });
});
