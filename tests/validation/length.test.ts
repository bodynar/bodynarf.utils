import { describe, it, expect } from "vitest";

import { minLength, maxLength, lengthBetween } from "../../src/validation/validators";

describe("minLength", () => {
    it("should fail when string is shorter than min", () => {
        expect(minLength(3)("ab").valid).toBe(false);
    });

    it("should pass when string equals min length", () => {
        expect(minLength(3)("abc").valid).toBe(true);
    });

    it("should pass when string is longer than min", () => {
        expect(minLength(3)("abcdef").valid).toBe(true);
    });

    it("should trim before checking length", () => {
        expect(minLength(3)("  a  ").valid).toBe(false);
    });

    it("should use default message", () => {
        expect(minLength(3)("a").message).toBe("Value must be at least 3 characters long.");
    });

    it("should use custom message", () => {
        expect(minLength(3, "Too short!")("a").message).toBe("Too short!");
    });
});

describe("maxLength", () => {
    it("should fail when string is longer than max", () => {
        expect(maxLength(5)("toolong").valid).toBe(false);
    });

    it("should pass when string equals max length", () => {
        expect(maxLength(5)("hello").valid).toBe(true);
    });

    it("should pass when string is shorter than max", () => {
        expect(maxLength(5)("hi").valid).toBe(true);
    });

    it("should trim before checking length", () => {
        expect(maxLength(3)("  a  ").valid).toBe(true);
    });

    it("should use default message", () => {
        expect(maxLength(5)("toolong").message).toBe("Value must be at most 5 characters long.");
    });

    it("should use custom message", () => {
        expect(maxLength(5, "Too long!")("toolong").message).toBe("Too long!");
    });
});

describe("lengthBetween", () => {
    it("should fail when shorter than min", () => {
        expect(lengthBetween(2, 5)("a").valid).toBe(false);
    });

    it("should fail when longer than max", () => {
        expect(lengthBetween(2, 5)("toolong").valid).toBe(false);
    });

    it("should pass at exactly min", () => {
        expect(lengthBetween(2, 5)("ab").valid).toBe(true);
    });

    it("should pass at exactly max", () => {
        expect(lengthBetween(2, 5)("hello").valid).toBe(true);
    });

    it("should pass within range", () => {
        expect(lengthBetween(2, 5)("abc").valid).toBe(true);
    });

    it("should use default message", () => {
        expect(lengthBetween(2, 5)("a").message).toBe("Value must be between 2 and 5 characters long.");
    });

    it("should use custom message", () => {
        expect(lengthBetween(2, 5, "Bad length!")("a").message).toBe("Bad length!");
    });
});
