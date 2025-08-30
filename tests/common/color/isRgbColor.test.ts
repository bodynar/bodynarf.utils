import { describe, it, expect } from "vitest";

import { isRgbColor } from "../../../src/common/color";

describe("isRgbColor", () => {
    it("should return false for null values", () => {
        expect(isRgbColor(null as any)).toBe(false);
    });

    it("should return false for undefined values", () => {
        expect(isRgbColor(undefined as any)).toBe(false);
    });

    it("should return false for empty strings", () => {
        expect(isRgbColor("")).toBe(false);
    });

    it("should return true for valid rgb strings", () => {
        expect(isRgbColor("rgb(255, 0, 0)")).toBe(true);
        expect(isRgbColor("rgb(0, 255, 0)")).toBe(true);
        expect(isRgbColor("rgb(0, 0, 255)")).toBe(true);
        expect(isRgbColor("rgb(128, 128, 128)")).toBe(true);
    });

    it("should return true for valid rgba strings", () => {
        expect(isRgbColor("rgba(255, 0, 0, 0.5)")).toBe(true);
        expect(isRgbColor("rgba(0, 255, 0, 1)")).toBe(true);
    });

    it("should return true for rgb strings with whitespace", () => {
        expect(isRgbColor("  rgb(255, 0, 0)  ")).toBe(true);
        expect(isRgbColor("\trgb(0, 255, 0)\n")).toBe(true);
    });

    it("should return false for invalid color strings", () => {
        expect(isRgbColor("red")).toBe(false);
        expect(isRgbColor("#ff0000")).toBe(false);
        expect(isRgbColor("hsl(0, 100%, 50%)")).toBe(false);
    });

    it("should return false for non-color strings", () => {
        expect(isRgbColor("hello world")).toBe(false);
        expect(isRgbColor("123")).toBe(false);
        expect(isRgbColor("rgb(")).toBe(false);
    });
});
