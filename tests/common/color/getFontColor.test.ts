import { describe, it, expect } from "vitest";

import { getFontColor, getFontColorFromString } from "../../../src/common/color";

describe("getFontColor", () => {
    it("should return black hex for light colors", () => {
        expect(getFontColor({ red: 255, green: 255, blue: 255 })).toBe("#000000");
        expect(getFontColor({ red: 200, green: 200, blue: 200 })).toBe("#000000");
        expect(getFontColor({ red: 150, green: 150, blue: 150 })).toBe("#000000");
    });

    it("should return white hex for dark colors", () => {
        expect(getFontColor({ red: 0, green: 0, blue: 0 })).toBe("#ffffff");
        expect(getFontColor({ red: 50, green: 50, blue: 50 })).toBe("#ffffff");
        expect(getFontColor({ red: 100, green: 100, blue: 100 })).toBe("#ffffff");
    });

    it("should handle mixed colors", () => {
        // Light color (intensity > 125)
        expect(getFontColor({ red: 128, green: 128, blue: 128 })).toBe("#000000");

        // Dark color (intensity <= 125)
        expect(getFontColor({ red: 120, green: 120, blue: 120 })).toBe("#ffffff");
    });

    it("should handle pure colors", () => {
        // Red - intensity = 0.299 * 255 ≈ 76 (< 125) -> white
        expect(getFontColor({ red: 255, green: 0, blue: 0 })).toBe("#ffffff");

        // Green - intensity = 0.587 * 255 ≈ 150 (> 125) -> black
        expect(getFontColor({ red: 0, green: 255, blue: 0 })).toBe("#000000");

        // Blue - intensity = 0.114 * 255 ≈ 29 (< 125) -> white
        expect(getFontColor({ red: 0, green: 0, blue: 255 })).toBe("#ffffff");
    });
});

describe("getFontColorFromString", () => {
    it("should return empty string for null values", () => {
        expect(getFontColorFromString(null as any)).toBe("");
    });

    it("should return empty string for undefined values", () => {
        expect(getFontColorFromString(undefined as any)).toBe("");
    });

    it("should return empty string for empty strings", () => {
        expect(getFontColorFromString("")).toBe("");
    });

    it("should return empty string for invalid color strings", () => {
        expect(getFontColorFromString("invalid")).toBe("");
        expect(getFontColorFromString("rgb()")).toBe("");
        expect(getFontColorFromString("#gg0000")).toBe("");
    });

    it("should return font color for valid rgb strings", () => {
        // Light red - should return black
        expect(getFontColorFromString("rgb(255, 200, 200)")).toBe("#000000");

        // Dark red - should return white
        expect(getFontColorFromString("rgb(100, 0, 0)")).toBe("#ffffff");
    });

    it("should return font color for valid hex strings", () => {
        // White - should return black
        expect(getFontColorFromString("#ffffff")).toBe("#000000");

        // Black - should return white
        expect(getFontColorFromString("#000000")).toBe("#ffffff");

        // Red - should return white
        expect(getFontColorFromString("#ff0000")).toBe("#ffffff");
    });

    it("should return font color for hex strings without # prefix", () => {
        expect(getFontColorFromString("ffffff")).toBe("#000000");
        expect(getFontColorFromString("000000")).toBe("#ffffff");
    });
});
