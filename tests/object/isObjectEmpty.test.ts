import { describe, it, expect } from "vitest";

import { isObjectEmpty } from "../../src/object";

describe("isObjectEmpty", () => {
    it("should return true for empty objects", () => {
        expect(isObjectEmpty({})).toBe(true);
    });

    it("should return false for non-empty objects", () => {
        expect(isObjectEmpty({ a: 1 })).toBe(false);
        expect(isObjectEmpty({ a: 1, b: 2 })).toBe(false);
    });
});
