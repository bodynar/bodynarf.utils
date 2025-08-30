import { describe, it, expect, vi } from "vitest";

import { retry, withTimeout, parallel, sequential, concurrent } from "../../src/promise";

describe("Promise utilities", () => {
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
});
