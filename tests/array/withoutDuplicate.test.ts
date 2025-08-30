import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.withoutDuplicate", () => {
    it("should remove duplicate primitive values", () => {
        const arr = [1, 2, 2, 3, 1, 4];
        const result = arr.withoutDuplicate();

        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should handle array with no duplicates", () => {
        const arr = [1, 2, 3, 4];
        const result = arr.withoutDuplicate();

        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should handle empty array", () => {
        const arr: any[] = [];
        const result = arr.withoutDuplicate();

        expect(result).toEqual([]);
    });

    it("should handle array with all same values", () => {
        const arr = [1, 1, 1, 1];
        const result = arr.withoutDuplicate();

        expect(result).toEqual([1]);
    });
});
