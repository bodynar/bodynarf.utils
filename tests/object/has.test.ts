import { describe, it, expect } from "vitest";

import { has } from "../../src/object";

describe("has", () => {
    it("should return true for existing simple path", () => {
        const obj = { a: 1, b: 2 };
        expect(has(obj, "a")).toBe(true);
        expect(has(obj, "b")).toBe(true);
    });

    it("should return false for non-existing simple path", () => {
        const obj = { a: 1 };
        expect(has(obj, "b")).toBe(false);
    });

    it("should return true for existing nested path", () => {
        const obj = { a: { b: { c: 3 } } };
        expect(has(obj, "a.b.c")).toBe(true);
    });

    it("should return false for non-existing nested path", () => {
        const obj = { a: { b: 1 } };
        expect(has(obj, "a.b.c")).toBe(false);
        expect(has(obj, "a.c")).toBe(false);
    });

    it("should return true for existing array path", () => {
        const obj = { a: [{ b: 1 }, { b: 2 }] };
        expect(has(obj, "a[0].b")).toBe(true);
        expect(has(obj, "a[1].b")).toBe(true);
    });

    it("should return false for non-existing array path", () => {
        const obj = { a: [{ b: 1 }] };
        expect(has(obj, "a[1].b")).toBe(false);
        expect(has(obj, "a[0].c")).toBe(false);
    });

    it("should return false for null or undefined object", () => {
        expect(has(null as any, "a")).toBe(false);
        expect(has(undefined as any, "a")).toBe(false);
    });

    it("should return false for null or undefined path", () => {
        const obj = { a: 1 };
        expect(has(obj, null as any)).toBe(false);
        expect(has(obj, undefined as any)).toBe(false);
    });
});
