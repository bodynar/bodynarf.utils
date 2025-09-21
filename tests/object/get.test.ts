import { describe, it, expect } from "vitest";

import { get } from "../../src/object";

describe("get", () => {
    it("should get value by simple path", () => {
        const obj = { a: 1, b: 2 };
        expect(get(obj, "a")).toBe(1);
        expect(get(obj, "b")).toBe(2);
    });

    it("should get value by nested path", () => {
        const obj = { a: { b: { c: 3 } } };
        expect(get(obj, "a.b.c")).toBe(3);
    });

    it("should get value by array path", () => {
        const obj = { a: [{ b: 1 }, { b: 2 }] };
        expect(get(obj, "a[0].b")).toBe(1);
        expect(get(obj, "a[1].b")).toBe(2);
    });

    it("should return undefined for non-existent path", () => {
        const obj = { a: 1 };
        expect(get(obj, "b")).toBeUndefined();
        expect(get(obj, "a.b")).toBeUndefined();
    });

    it("should return undefined for null or undefined object", () => {
        expect(get(null as any, "a")).toBeUndefined();
        expect(get(undefined as any, "a")).toBeUndefined();
    });

    it("should return undefined for null or undefined path", () => {
        const obj = { a: 1 };
        expect(get(obj, null as any)).toBeUndefined();
        expect(get(obj, undefined as any)).toBeUndefined();
    });
});
