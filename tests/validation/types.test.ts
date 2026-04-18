import { describe, it, expect } from "vitest";

import { validResult, invalidResult } from "../../src/validation/types";

describe("validResult", () => {
    it("should have valid: true and message: undefined", () => {
        expect(validResult.valid).toBe(true);
        expect(validResult.message).toBeUndefined();
    });
});

describe("invalidResult", () => {
    it("should have valid: false and the provided message", () => {
        const result = invalidResult("Something went wrong.");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Something went wrong.");
    });
});
