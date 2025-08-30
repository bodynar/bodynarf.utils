import { describe, it, expect } from "vitest";

import { withTimeout } from "../../src/promise";

describe("withTimeout", () => {
    it("should resolve if promise resolves before timeout", async () => {
        const fastPromise = new Promise(resolve => {
            setTimeout(() => resolve("Fast"), 10);
        });

        const result = await withTimeout(fastPromise, 50);
        expect(result).toBe("Fast");
    });

    it("should reject if promise takes longer than timeout", async () => {
        const slowPromise = new Promise(resolve => {
            setTimeout(() => resolve("Slow"), 100);
        });

        await expect(withTimeout(slowPromise, 50)).rejects.toThrow("Promise timeout");
    });
});
