import { describe, it, expect } from "vitest";

import { getRgbColor } from "../../../src/common/color";

describe("getRgbColor", () => {
    it("should return undefined for null values", () => {
        expect(getRgbColor(null as any)).toBeUndefined();
    });

    it("should return undefined for undefined values", () => {
        expect(getRgbColor(undefined as any)).toBeUndefined();
    });

    it("should return undefined for empty strings", () => {
        expect(getRgbColor("")).toBeUndefined();
    });

    it("should return undefined for invalid rgb strings", () => {
        expect(getRgbColor("red")).toBeUndefined();
        expect(getRgbColor("#ff0000")).toBeUndefined();
        expect(getRgbColor("rgb()")).toBeUndefined();
        expect(getRgbColor("rgb(255)")).toBeUndefined();
        expect(getRgbColor("rgb(255, 0)")).toBeUndefined();
    });

    it("should parse valid rgb strings", () => {
        const result1 = getRgbColor("rgb(255, 0, 0)");
        expect(result1).toEqual({ red: 255, green: 0, blue: 0 });

        const result2 = getRgbColor("rgb(0, 255, 0)");
        expect(result2).toEqual({ red: 0, green: 255, blue: 0 });

        const result3 = getRgbColor("rgb(0, 0, 255)");
        expect(result3).toEqual({ red: 0, green: 0, blue: 255 });

        const result4 = getRgbColor("rgb(128, 128, 128)");
        expect(result4).toEqual({ red: 128, green: 128, blue: 128 });
    });

    it("should parse rgb strings with whitespace", () => {
        const result = getRgbColor("  rgb(255, 0, 0)  ");
        expect(result).toEqual({ red: 255, green: 0, blue: 0 });
    });

    it("should parse rgb strings with decimal values", () => {
        expect(getRgbColor("rgb(255.5, 0.0, 128.7)")).toBeUndefined();
    });

    it("should parse rgb strings with negative values", () => {
        expect(getRgbColor("rgb(-10, 300, 50)")).toBeUndefined();
    });

    it("should return undefined for rgb strings with non-numeric values", () => {
        expect(getRgbColor("rgb(a, b, c)")).toBeUndefined();
        expect(getRgbColor("rgb(255, 0, blue)")).toBeUndefined();
    });
});
