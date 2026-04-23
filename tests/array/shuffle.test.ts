import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.shuffle", () => {
    it("should return a new array with the same elements", () => {
        const arr = [1, 2, 3, 4, 5];
        const shuffled = arr.shuffle();

        expect(shuffled).toHaveLength(arr.length);
        expect(shuffled.sort()).toEqual(arr.sort());
    });

    it("should not mutate the original array", () => {
        const arr = [1, 2, 3, 4, 5];
        const copy = [...arr];
        arr.shuffle();

        expect(arr).toEqual(copy);
    });

    it("should handle empty array", () => {
        const arr: number[] = [];
        const shuffled = arr.shuffle();

        expect(shuffled).toHaveLength(0);
        expect(shuffled).toEqual([]);
    });

    it("should handle single element array", () => {
        const arr = [42];
        const shuffled = arr.shuffle();

        expect(shuffled).toEqual([42]);
    });

    it("should return a new array instance", () => {
        const arr = [1, 2, 3];
        const shuffled = arr.shuffle();

        expect(shuffled).not.toBe(arr);
    });
});
