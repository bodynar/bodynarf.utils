import { describe, it, expect } from "vitest";

import { sequential } from "../../src/promise";

describe("sequential", () => {
    it("should execute promises sequentially", async () => {
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
            }
        ];

        const result = await sequential(promiseFns);
        expect(result).toEqual([1, 2, 3]);
        expect(callOrder).toEqual([1, 2, 3]);
    });

    it("should reject if any promise rejects", async () => {
        const promiseFns = [
            () => Promise.resolve(1),
            () => Promise.reject(new Error("Failed")),
            () => Promise.resolve(3)
        ];

        await expect(sequential(promiseFns)).rejects.toThrow("Failed");
    });
});
