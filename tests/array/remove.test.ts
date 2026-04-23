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

describe("Array.prototype.removeByFn", () => {
    it("should remove items matching predicate", () => {
        const arr = [1, 2, 3, 4, 5];
        arr.removeByFn((item: number) => item % 2 === 0);

        expect(arr).toEqual([1, 3, 5]);
    });

    it("should remove all occurrences matching predicate", () => {
        const arr = [1, 2, 3, 2, 4, 2];
        arr.removeByFn((item: number) => item === 2);

        expect(arr).toEqual([1, 3, 4]);
    });

    it("should not modify array when no items match predicate", () => {
        const arr = [1, 2, 3];
        arr.removeByFn((item: number) => item > 10);

        expect(arr).toEqual([1, 2, 3]);
    });
});

describe("Array.prototype.removeByKey", () => {
    it("should remove items by key", () => {
        const arr = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
            { id: 4, name: "David" }
        ];

        arr.removeByKey([1, 3], "id");

        expect(arr).toEqual([
            { id: 2, name: "Bob" },
            { id: 4, name: "David" }
        ]);
    });

    it("should not modify array when no keys match", () => {
        const arr = [{ id: 1 }, { id: 2 }];
        arr.removeByKey([99, 100], "id");

        expect(arr).toEqual([{ id: 1 }, { id: 2 }]);
    });
});

describe("Array.prototype.removeDuplicate", () => {
    it("should remove duplicate primitive values", () => {
        const arr = [1, 2, 2, 3, 3, 4];
        arr.removeDuplicate();

        expect(arr).toEqual([1, 2, 3, 4]);
    });

    it("should not modify array without duplicates", () => {
        const arr = [1, 2, 3, 4];
        arr.removeDuplicate();

        expect(arr).toEqual([1, 2, 3, 4]);
    });

    it("should handle empty array", () => {
        const arr: number[] = [];
        arr.removeDuplicate();

        expect(arr).toEqual([]);
    });
});

describe("Array.prototype.removeDuplicateBy", () => {
    it("should remove duplicates by key selector", () => {
        const arr = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 1, name: "Alice Copy" },
            { id: 3, name: "Charlie" }
        ];

        arr.removeDuplicateBy((item: { id: number }) => item.id);

        expect(arr).toEqual([
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" }
        ]);
    });

    it("should not modify array without duplicates", () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        arr.removeDuplicateBy((item: { id: number }) => item.id);

        expect(arr).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
});

