import { describe, it, expect } from "vitest";

import { pattern, email } from "../../src/validation/validators";

describe("pattern", () => {
    it("should fail when value does not match regex", () => {
        expect(pattern(/^\d{4}$/)("12ab").valid).toBe(false);
    });

    it("should pass when value matches regex", () => {
        expect(pattern(/^\d{4}$/)("1234").valid).toBe(true);
    });

    it("should use default message", () => {
        expect(pattern(/^\d+$/)("abc").message).toBe("Value has an invalid format.");
    });

    it("should use custom message", () => {
        expect(pattern(/^\d+$/, "Digits only!")("abc").message).toBe("Digits only!");
    });
});

describe("email", () => {
    it("should fail for plain text", () => {
        expect(email()("bad").valid).toBe(false);
    });

    it("should fail for missing domain", () => {
        expect(email()("user@").valid).toBe(false);
    });

    it("should fail for missing TLD", () => {
        expect(email()("user@example").valid).toBe(false);
    });

    it("should pass for valid email", () => {
        expect(email()("user@example.com").valid).toBe(true);
    });

    it("should pass for email with subdomain", () => {
        expect(email()("user@mail.example.com").valid).toBe(true);
    });

    it("should use default message", () => {
        expect(email()("bad").message).toBe("Value must be a valid email address.");
    });

    it("should use custom message", () => {
        expect(email("Invalid email!")("bad").message).toBe("Invalid email!");
    });
});
