import { describe, it, expect } from "vitest";

import { withDelay } from "../../src/function";

describe("withDelay", () => {
    it("should execute action after specified delay", async () => {
        let executed = false;
        const action = () => {
            executed = true;
        };

        const timeoutId = withDelay(100, action);

        expect(executed).toBe(false);

        await new Promise(resolve => setTimeout(resolve, 150));

        expect(executed).toBe(true);

        clearTimeout(timeoutId);
    });

    it("should return timeout ID that can be used to cancel execution", async () => {
        let executed = false;
        const action = () => {
            executed = true;
        };

        const timeoutId = withDelay(100, action);

        clearTimeout(timeoutId);

        await new Promise(resolve => setTimeout(resolve, 150));

        expect(executed).toBe(false);
    });
});
