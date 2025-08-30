import { describe, it, expect } from "vitest";

import { throttle } from "../../src/event";

describe("throttle", () => {
    it("should limit function execution rate", async () => {
        let count = 0;
        const increment = () => ++count;
        const throttledIncrement = throttle(increment, 50);

        throttledIncrement();
        throttledIncrement();
        throttledIncrement();

        expect(count).toBe(1);

        await new Promise(resolve => setTimeout(resolve, 60));

        throttledIncrement();
        expect(count).toBe(2);
    });
});
