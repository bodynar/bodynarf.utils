import { describe, it, expect } from "vitest";

import { promisify } from "../../src/promise";

describe("promisify", () => {
    it("should convert callback function to promise (success)", async () => {
        const callbackFn = (a: number, b: number, cb: (err: any, result?: number) => void) => {
            cb(null, a + b);
        };

        const promisified = promisify<number>(callbackFn);
        const result = await promisified(2, 3);

        expect(result).toBe(5);
    });

    it("should convert callback function to promise (error)", async () => {
        const callbackFn = (_a: number, cb: (err: any, result?: number) => void) => {
            cb(new Error("Something went wrong"));
        };

        const promisified = promisify<number>(callbackFn);

        await expect(promisified(1)).rejects.toThrow("Something went wrong");
    });

    it("should handle callback with no result", async () => {
        const callbackFn = (cb: (err: any, result?: string) => void) => {
            cb(null, "done");
        };

        const promisified = promisify<string>(callbackFn);
        const result = await promisified();

        expect(result).toBe("done");
    });
});
