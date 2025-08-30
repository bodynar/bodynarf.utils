import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.chunk", () => {
    it("should split array into chunks of specified size", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8];
        const chunks = arr.chunk(3);

        expect(chunks).toHaveLength(3);
        expect(chunks[0]).toEqual([1, 2, 3]);
        expect(chunks[1]).toEqual([4, 5, 6]);
        expect(chunks[2]).toEqual([7, 8]);
    });

    it("should handle chunk size larger than array", () => {
        const arr = [1, 2, 3];
        const chunks = arr.chunk(5);

        expect(chunks).toHaveLength(1);
        expect(chunks[0]).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
        const arr: number[] = [];
        const chunks = arr.chunk(3);

        expect(chunks).toHaveLength(0);
    });

    it("should handle chunk size of 1", () => {
        const arr = [1, 2, 3];
        const chunks = arr.chunk(1);

        expect(chunks).toHaveLength(3);
        expect(chunks[0]).toEqual([1]);
        expect(chunks[1]).toEqual([2]);
        expect(chunks[2]).toEqual([3]);
    });
});
