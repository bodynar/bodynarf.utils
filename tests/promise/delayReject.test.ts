import { describe, it, expect } from "vitest";

import { delayReject } from "../../src/promise";

describe("delayReject", () => {
    it("should reject promise after specified time with correct error", async () => {
        const startTime = Date.now();
        let errorThrown = false;

        try {
            await delayReject(100, "test error");
        } catch (error) {
            errorThrown = true;
            expect(error).toBe("test error");
        }

        const endTime = Date.now();
        expect(errorThrown).toBe(true);
        expect(endTime - startTime).toBeGreaterThanOrEqual(95);
    });
});
