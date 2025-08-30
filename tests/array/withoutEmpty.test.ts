import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.withoutEmpty", () => {
    it("should remove null and undefined values", () => {
        const arr = [1, null, 2, undefined, 3];
        const result = arr.withoutEmpty();

        expect(result).toEqual([1, 2, 3]);
    });

    it("should not remove empty strings by default", () => {
        const arr = [1, "", 2, "", 3];
        const result = arr.withoutEmpty();

        expect(result).toEqual([1, "", 2, "", 3]);
    });

    it("should remove empty strings when removeEmptyString is true", () => {
        const arr = [1, "", 2, "", 3];
        const result = arr.withoutEmpty(true);

        expect(result).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
        const arr: any[] = [];
        const result = arr.withoutEmpty();

        expect(result).toEqual([]);
    });

    it("should handle array with only empty values", () => {
        const arr = [null, undefined];
        const result = arr.withoutEmpty();

        expect(result).toEqual([]);
    });
});
