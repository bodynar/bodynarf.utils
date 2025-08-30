import { describe, it, expect } from "vitest";

import { debounce } from "../../src/function";

describe("debounce", () => {
    it("should delay function execution", async () => {
        let callCount = 0;
        const fn = () => {
            callCount++;
        };

        const debouncedFn = debounce(fn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        expect(callCount).toBe(0);

        await new Promise(resolve => setTimeout(resolve, 150));

        expect(callCount).toBe(1);
    });

    it("should restart delay when called again", async () => {
        let callCount = 0;
        const fn = () => {
            callCount++;
        };

        const debouncedFn = debounce(fn, 100);

        debouncedFn();

        await new Promise(resolve => setTimeout(resolve, 50));

        debouncedFn();

        await new Promise(resolve => setTimeout(resolve, 25));

        expect(callCount).toBe(0);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(callCount).toBe(1);
    });

    it("should pass arguments to the debounced function", async () => {
        let lastArgs: any[] = [];
        const fn = (...args: any[]) => {
            lastArgs = args;
        };

        const debouncedFn = debounce(fn, 50);

        debouncedFn("arg1", "arg2", 42);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(lastArgs).toEqual(["arg1", "arg2", 42]);
    });
});
