import { describe, it, expect } from "vitest";

import { deepClone } from "../../src/object";

describe("deepClone", () => {
    it("should deep clone an object", () => {
        const obj = {
            a: 1,
            b: {
                c: 2,
                d: [1, 2, 3]
            }
        };
        const cloned = deepClone(obj);

        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
        expect(cloned.b.d).not.toBe(obj.b.d);
    });

    it("should handle primitive values", () => {
        expect(deepClone(42)).toBe(42);
        expect(deepClone("string")).toBe("string");
        expect(deepClone(true)).toBe(true);
    });

    it("should handle dates", () => {
        const date = new Date();
        const cloned = deepClone(date);

        expect(cloned).toEqual(date);
        expect(cloned).not.toBe(date);
    });

    it("should handle arrays", () => {
        const arr = [1, 2, { a: 3 }];
        const cloned = deepClone(arr);

        expect(cloned).toEqual(arr);
        expect(cloned).not.toBe(arr);
        expect(cloned[2]).not.toBe(arr[2]);
    });
});
