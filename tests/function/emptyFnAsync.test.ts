import { describe, it, expect } from "vitest";

import { emptyFnAsync } from "../../src/function";

describe("emptyFnAsync", () => {
    it("should be a function", () => {
        expect(typeof emptyFnAsync).toBe("function");
    });

    it("should return a promise", () => {
        const result = emptyFnAsync();
        expect(result).toBeInstanceOf(Promise);
    });

    it("should resolve to undefined", async () => {
        const result = await emptyFnAsync();
        expect(result).toBeUndefined();
    });
});
