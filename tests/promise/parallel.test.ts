import { describe, it, expect } from "vitest";

import { parallel } from "../../src/promise";

describe("parallel", () => {
    it("should execute promises in parallel", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ];

        const result = await parallel(promises);
        expect(result).toEqual([1, 2, 3]);
    });

    it("should reject if any promise rejects", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject(new Error("Failed")),
            Promise.resolve(3)
        ];

        await expect(parallel(promises)).rejects.toThrow("Failed");
    });
});
