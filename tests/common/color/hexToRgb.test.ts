import { describe, it, expect } from "vitest";

import { hexToRgb } from "../../../src/common/color";

describe("hexToRgb", () => {
    it("should return undefined for null values", () => {
        expect(hexToRgb(null as any)).toBeUndefined();
    });

    it("should return undefined for undefined values", () => {
        expect(hexToRgb(undefined as any)).toBeUndefined();
    });

    it("should return undefined for empty strings", () => {
        expect(hexToRgb("")).toBeUndefined();
    });

    it("should return undefined for invalid hex strings", () => {
        expect(hexToRgb("red")).toBeUndefined();
        expect(hexToRgb("rgb(255, 0, 0)")).toBeUndefined();
        expect(hexToRgb("#gg0000")).toBeUndefined();
        expect(hexToRgb("#ff00")).toBeUndefined();
        expect(hexToRgb("#ff00000")).toBeUndefined();
    });

    it("should parse valid 6-digit hex colors", () => {
        const result1 = hexToRgb("#ff0000");
        expect(result1).toEqual({ red: 255, green: 0, blue: 0 });

        const result2 = hexToRgb("#00ff00");
        expect(result2).toEqual({ red: 0, green: 255, blue: 0 });

        const result3 = hexToRgb("#0000ff");
        expect(result3).toEqual({ red: 0, green: 0, blue: 255 });

        const result4 = hexToRgb("#ffffff");
        expect(result4).toEqual({ red: 255, green: 255, blue: 255 });

        const result5 = hexToRgb("#000000");
        expect(result5).toEqual({ red: 0, green: 0, blue: 0 });

        const result6 = hexToRgb("#abcdef");
        expect(result6).toEqual({ red: 171, green: 205, blue: 239 });
    });

    it("should parse valid 3-digit hex colors", () => {
        const result1 = hexToRgb("#f00");
        expect(result1).toEqual({ red: 15, green: 0, blue: 0 });

        const result2 = hexToRgb("#0f0");
        expect(result2).toEqual({ red: 0, green: 15, blue: 0 });

        const result3 = hexToRgb("#00f");
        expect(result3).toEqual({ red: 0, green: 0, blue: 15 });

        const result4 = hexToRgb("#fff");
        expect(result4).toEqual({ red: 15, green: 15, blue: 15 });

        const result5 = hexToRgb("#abc");
        expect(result5).toEqual({ red: 10, green: 11, blue: 12 });
    });

    it("should parse hex colors without # prefix", () => {
        const result1 = hexToRgb("ff0000");
        expect(result1).toEqual({ red: 255, green: 0, blue: 0 });

        const result2 = hexToRgb("f00");
        expect(result2).toEqual({ red: 15, green: 0, blue: 0 });
    });

    it("should parse mixed case hex colors", () => {
        const result1 = hexToRgb("#FF0000");
        expect(result1).toEqual({ red: 255, green: 0, blue: 0 });

        const result2 = hexToRgb("#fF0000");
        expect(result2).toEqual({ red: 255, green: 0, blue: 0 });

        const result3 = hexToRgb("#AbCdEf");
        expect(result3).toEqual({ red: 171, green: 205, blue: 239 });
    });

    it("should throw error for hex strings with invalid length", () => {
        expect(hexToRgb("#ff00")).toBeUndefined();
        expect(hexToRgb("#ff00000")).toBeUndefined();
        expect(hexToRgb("#ff")).toBeUndefined();
        expect(hexToRgb("#f")).toBeUndefined();
    });
});
