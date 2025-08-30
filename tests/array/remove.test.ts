import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.remove", () => {
    it("should remove specified item from array", () => {
        const arr = [1, 2, 3, 2, 4];
        arr.remove(2);

        expect(arr).toEqual([1, 3, 2, 4]);
    });

    it("should not modify array when item is not found", () => {
        const arr = [1, 2, 3];
        arr.remove(4);

        expect(arr).toEqual([1, 2, 3]);
    });

    it("should remove only first occurrence", () => {
        const arr = [1, 2, 2, 3];
        arr.remove(2);

        expect(arr).toEqual([1, 2, 3]);
    });
});
