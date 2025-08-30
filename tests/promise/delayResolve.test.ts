import { describe, it, expect } from "vitest";

import { delayResolve } from "../../src/promise";

describe("delayResolve", () => {
    it("should resolve promise after specified time with correct result", async () => {
        const startTime = Date.now();
        const result = await delayResolve(100, "test");
        const endTime = Date.now();

        expect(result).toBe("test");
        expect(endTime - startTime).toBeGreaterThanOrEqual(95);
    });

    it("should handle different result types", async () => {
        const objResult = await delayResolve(10, { a: 1 });
        expect(objResult).toEqual({ a: 1 });

        const numResult = await delayResolve(10, 42);
        expect(numResult).toBe(42);
    });
});
