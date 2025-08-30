import { describe, it, expect } from "vitest";

import { retry } from "../../src/promise";

describe("retry", () => {
    it("should retry failed promise", async () => {
        let attemptCount = 0;

        const failingFn = () => {
            attemptCount++;
            if (attemptCount < 3) {
                return Promise.reject(new Error("Failed"));
            }
            return Promise.resolve("Success");
        };

        const result = await retry(failingFn, 3, 10);
        expect(result).toBe("Success");
        expect(attemptCount).toBe(3);
    });

    it("should reject if all attempts fail", async () => {
        const failingFn = () => Promise.reject(new Error("Always fails"));

        await expect(retry(failingFn, 3, 10)).rejects.toThrow("Always fails");
    });
});
