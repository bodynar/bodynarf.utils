import { describe, it, expect } from "vitest";

import { memoize } from "../../src/function";

describe("memoize", () => {
    it("should cache results for same arguments", () => {
        let callCount = 0;
        const fn = (n: number) => {
            callCount++;
            return n * 2;
        };

        const memoized = memoize(fn);

        expect(memoized(5)).toBe(10);
        expect(memoized(5)).toBe(10);
        expect(callCount).toBe(1);
    });

    it("should compute for different arguments", () => {
        let callCount = 0;
        const fn = (n: number) => {
            callCount++;
            return n * 2;
        };

        const memoized = memoize(fn);

        expect(memoized(5)).toBe(10);
        expect(memoized(3)).toBe(6);
        expect(callCount).toBe(2);
    });

    it("should use custom key resolver", () => {
        let callCount = 0;
        const fn = (a: number, b: number) => {
            callCount++;
            return a + b;
        };

        const memoized = memoize(fn, (a, b) => `${a}:${b}`);

        expect(memoized(1, 2)).toBe(3);
        expect(memoized(1, 2)).toBe(3);
        expect(memoized(2, 1)).toBe(3);
        expect(callCount).toBe(2);
    });

    it("should handle string arguments", () => {
        const fn = (s: string) => s.toUpperCase();
        const memoized = memoize(fn);

        expect(memoized("hello")).toBe("HELLO");
        expect(memoized("hello")).toBe("HELLO");
    });
});
