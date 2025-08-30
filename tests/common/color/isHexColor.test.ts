import { describe, it, expect } from "vitest";
import { isHexColor } from "../../../src/common/color";

describe("isHexColor", () => {
    it("should return false for null values", () => {
        expect(isHexColor(null as any)).toBe(false);
    });

    it("should return false for undefined values", () => {
        expect(isHexColor(undefined as any)).toBe(false);
    });

    it("should return false for empty strings", () => {
        expect(isHexColor("")).toBe(false);
    });

    it("should return true for valid 6-digit hex colors", () => {
        expect(isHexColor("#ff0000")).toBe(true);
        expect(isHexColor("#00ff00")).toBe(true);
        expect(isHexColor("#0000ff")).toBe(true);
        expect(isHexColor("#ffffff")).toBe(true);
        expect(isHexColor("#000000")).toBe(true);
        expect(isHexColor("#abcdef")).toBe(true);
    });

    it("should return true for valid 3-digit hex colors", () => {
        expect(isHexColor("#f00")).toBe(true);
        expect(isHexColor("#0f0")).toBe(true);
        expect(isHexColor("#00f")).toBe(true);
        expect(isHexColor("#fff")).toBe(true);
        expect(isHexColor("#000")).toBe(true);
        expect(isHexColor("#abc")).toBe(true);
    });

    it("should return true for hex colors without # prefix", () => {
        expect(isHexColor("ff0000")).toBe(true);
        expect(isHexColor("f00")).toBe(true);
        expect(isHexColor("abcdef")).toBe(true);
        expect(isHexColor("abc")).toBe(true);
    });

    it("should return true for mixed case hex colors", () => {
        expect(isHexColor("#FF0000")).toBe(true);
        expect(isHexColor("#fF0000")).toBe(true);
        expect(isHexColor("#AbCdEf")).toBe(true);
    });

    it("should return false for invalid hex colors", () => {
        expect(isHexColor("#gg0000")).toBe(false);
        expect(isHexColor("#ff000")).toBe(false); // 5 digits
        expect(isHexColor("#ff00000")).toBe(false); // 7 digits
        expect(isHexColor("#ff00")).toBe(false); // 4 digits
        expect(isHexColor("#ff")).toBe(false); // 2 digits
        expect(isHexColor("#f")).toBe(false); // 1 digit
    });

    it("should return false for non-hex strings", () => {
        expect(isHexColor("red")).toBe(false);
        expect(isHexColor("rgb(255, 0, 0)")).toBe(false);
        expect(isHexColor("hello world")).toBe(false);
        expect(isHexColor("123")).toBe(true);
    });
});
