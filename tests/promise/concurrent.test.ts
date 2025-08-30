import { describe, it, expect } from "vitest";

import { concurrent } from "../../src/promise";

describe("concurrent", () => {
    it("should execute promises with concurrency limit", async () => {
        const callOrder: number[] = [];

        const promiseFns = [
            () => {
                callOrder.push(1);
                return Promise.resolve(1);
            },
            () => {
                callOrder.push(2);
                return Promise.resolve(2);
            },
            () => {
                callOrder.push(3);
                return Promise.resolve(3);
            },
            () => {
                callOrder.push(4);
                return Promise.resolve(4);
            }
        ];

        const result = await concurrent(promiseFns, 2);
        expect(result).toEqual([1, 2, 3, 4]);
        // We can't guarantee the exact order due to concurrency,
        // but all should be called
        expect(callOrder).toHaveLength(4);
    });

    it("should reject if any promise rejects", async () => {
        const promiseFns = [
            () => Promise.resolve(1),
            () => Promise.reject(new Error("Failed")),
            () => Promise.resolve(3)
        ];

        await expect(concurrent(promiseFns, 2)).rejects.toThrow("Failed");
    });
});
