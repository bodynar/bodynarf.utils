import { describe, it, expect } from "vitest";

import { mergeObjects } from "../../src/object";

describe("mergeObjects", () => {
    it("should merge two objects", () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const result = mergeObjects(obj1, obj2);

        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("should deep merge nested objects", () => {
        const obj1 = { a: 1, b: { c: 2, d: 3 } };
        const obj2 = { b: { d: 4, e: 5 }, f: 6 };
        const result = mergeObjects(obj1, obj2);

        expect(result).toEqual({ a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 });
    });

    it("should handle null and undefined", () => {
        expect(mergeObjects({} as any, { a: 1 })).toEqual({ a: 1 });
        expect(mergeObjects({ a: 1 }, {} as any)).toEqual({ a: 1 });
    });
});
