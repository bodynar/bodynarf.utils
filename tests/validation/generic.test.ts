import { describe, it, expect } from "vitest";

import { notNull, compose, required, minLength, maxLength } from "../../src/validation/validators";

describe("notNull", () => {
    it("should fail for null", () => {
        expect(notNull()(null).valid).toBe(false);
    });

    it("should fail for undefined", () => {
        expect(notNull()(undefined).valid).toBe(false);
    });

    it("should pass for a defined value", () => {
        expect(notNull()("hello").valid).toBe(true);
        expect(notNull()(0).valid).toBe(true);
        expect(notNull()(false).valid).toBe(true);
    });

    it("should use default message", () => {
        expect(notNull()(null).message).toBe("Value is required.");
    });

    it("should use custom message", () => {
        expect(notNull("Cannot be null!")(null).message).toBe("Cannot be null!");
    });
});

describe("compose", () => {
    const v = compose(required(), minLength(3), maxLength(10));

    it("should return first failure when value is empty", () => {
        const result = v("");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Value is required.");
    });

    it("should return second failure when value is too short", () => {
        const result = v("ab");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Value must be at least 3 characters long.");
    });

    it("should return third failure when value is too long", () => {
        const result = v("this is way too long");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Value must be at most 10 characters long.");
    });

    it("should pass when all validators pass", () => {
        const result = v("hello");
        expect(result.valid).toBe(true);
        expect(result.message).toBeUndefined();
    });

    it("should pass immediately with no validators", () => {
        const empty = compose<string>();
        expect(empty("anything").valid).toBe(true);
    });
});
