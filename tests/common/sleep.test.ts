import { describe, it, expect } from "vitest";

import { sleep } from "../../src/common";

describe("sleep", () => {
    it("should resolve after specified time", async () => {
        const start = Date.now();
        await sleep(50);
        const elapsed = Date.now() - start;

        expect(elapsed).toBeGreaterThanOrEqual(40);
    });

    it("should resolve to undefined", async () => {
        const result = await sleep(10);
        expect(result).toBeUndefined();
    });
});
