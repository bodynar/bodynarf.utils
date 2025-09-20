import { describe, it, expect } from "vitest";

import { pick } from "../../src/object";

describe("pick", () => {
    it("should pick specified properties from an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = pick(obj, ["a", "c"]);
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should return empty object if no properties match", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = pick(obj, ["d", "e"]);
        expect(result).toEqual({});
    });

    it("should handle null and undefined", () => {
        expect(pick({} as any, ["a"])).toEqual({});
    });
});
