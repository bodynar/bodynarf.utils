import { describe, it, expect } from "vitest";

import { rgbToHex } from "../../../src/common/color";

describe("rgbToHex", () => {
    it("should convert rgb color to hex", () => {
        expect(rgbToHex({ red: 255, green: 0, blue: 0 })).toBe("#ff0000");
        expect(rgbToHex({ red: 0, green: 255, blue: 0 })).toBe("#00ff00");
        expect(rgbToHex({ red: 0, green: 0, blue: 255 })).toBe("#0000ff");
        expect(rgbToHex({ red: 255, green: 255, blue: 255 })).toBe("#ffffff");
        expect(rgbToHex({ red: 0, green: 0, blue: 0 })).toBe("#000000");
    });

    it("should convert rgb color with decimal values", () => {
        expect(rgbToHex({ red: 15, green: 15, blue: 15 })).toBe("#0f0f0f");
        expect(rgbToHex({ red: 171, green: 205, blue: 239 })).toBe("#abcdef");
    });

    it("should handle edge cases", () => {
        expect(rgbToHex({ red: -10, green: 300, blue: 50 })).toBe("#-a12c32");
    });

    it("should handle zero values", () => {
        expect(rgbToHex({ red: 0, green: 0, blue: 0 })).toBe("#000000");
    });

    it("should handle maximum values", () => {
        expect(rgbToHex({ red: 255, green: 255, blue: 255 })).toBe("#ffffff");
    });
});
