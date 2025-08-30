import { describe, it, expect } from "vitest";

import { once } from "../../src/event";

describe("once", () => {
    it("should execute function only once", () => {
        let count = 0;
        const increment = () => ++count;
        const onceIncrement = once(increment);

        expect(onceIncrement()).toBe(1);
        expect(onceIncrement()).toBe(1);
        expect(onceIncrement()).toBe(1);
        expect(count).toBe(1);
    });

    it("should handle function with arguments", () => {
        const sum = (a: number, b: number) => a + b;
        const onceSum = once(sum);

        expect(onceSum(2, 3)).toBe(5);
        expect(onceSum(4, 5)).toBe(5);
    });
});
