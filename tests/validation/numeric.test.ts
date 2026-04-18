import { describe, it, expect } from "vitest";

import { min, max, range } from "../../src/validation/validators";

describe("min", () => {
    it("should fail when value is below min", () => {
        expect(min(0)(-1).valid).toBe(false);
    });

    it("should pass at exactly min", () => {
        expect(min(0)(0).valid).toBe(true);
    });

    it("should pass when value exceeds min", () => {
        expect(min(0)(5).valid).toBe(true);
    });

    it("should use default message", () => {
        expect(min(0)(-1).message).toBe("Value must be at least 0.");
    });

    it("should use custom message", () => {
        expect(min(0, "Must be non-negative!")(-1).message).toBe("Must be non-negative!");
    });
});

describe("max", () => {
    it("should fail when value exceeds max", () => {
        expect(max(100)(101).valid).toBe(false);
    });

    it("should pass at exactly max", () => {
        expect(max(100)(100).valid).toBe(true);
    });

    it("should pass when value is below max", () => {
        expect(max(100)(50).valid).toBe(true);
    });

    it("should use default message", () => {
        expect(max(100)(101).message).toBe("Value must be at most 100.");
    });

    it("should use custom message", () => {
        expect(max(100, "Too big!")( 101).message).toBe("Too big!");
    });
});

describe("range", () => {
    it("should fail when value is below min", () => {
        expect(range(1, 10)(0).valid).toBe(false);
    });

    it("should fail when value exceeds max", () => {
        expect(range(1, 10)(11).valid).toBe(false);
    });

    it("should pass at exactly min", () => {
        expect(range(1, 10)(1).valid).toBe(true);
    });

    it("should pass at exactly max", () => {
        expect(range(1, 10)(10).valid).toBe(true);
    });

    it("should pass within range", () => {
        expect(range(1, 10)(5).valid).toBe(true);
    });

    it("should use default message", () => {
        expect(range(1, 10)(0).message).toBe("Value must be between 1 and 10.");
    });

    it("should use custom message", () => {
        expect(range(1, 10, "Out of range!")(0).message).toBe("Out of range!");
    });
});
