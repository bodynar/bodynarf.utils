import { describe, it, expect } from "vitest";

import { omit } from "../../src/object";

describe("omit", () => {
    it("should omit specified properties from an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = omit(obj, ["b"]);
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should return the same object if no properties match", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = omit(obj, ["d", "e"]);
        expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("should handle null and undefined", () => {
        expect(omit({} as any, ["a"])).toEqual({});
    });
});
