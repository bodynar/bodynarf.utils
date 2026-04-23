import { describe, it, expect } from "vitest";

import { required } from "../../src/validation/validators";

describe("required", () => {
    it("should fail for empty string", () => {
        const v = required();
        expect(v("").valid).toBe(false);
    });

    it("should fail for whitespace-only string", () => {
        const v = required();
        expect(v("   ").valid).toBe(false);
    });

    it("should pass for non-empty string", () => {
        const v = required();
        expect(v("hello").valid).toBe(true);
        expect(v("hello").message).toBeUndefined();
    });

    it("should use default message", () => {
        expect(required()("").message).toBe("Value is required.");
    });

    it("should use custom message", () => {
        expect(required("Required!")("").message).toBe("Required!");
    });
});
