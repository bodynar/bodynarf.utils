import { describe, it, expect } from "vitest";

import { emptyFn } from "../../src/function";

describe("emptyFn", () => {
    it("should be a function that does nothing", () => {
        expect(typeof emptyFn).toBe("function");

        expect(() => emptyFn()).not.toThrow();
    });
});
