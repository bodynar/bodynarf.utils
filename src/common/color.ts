import { isNullOrUndefined } from "./checks";
import { isNullOrEmpty } from "./string";

/** Color RGB model*/
export interface Color {
    /** Red intensivity */
    red: number;

    /** Green intensivity */
    green: number;

    /** Blue intensivity */
    blue: number;
}

/**
 * @constant
 * Black color hex
 */
export const blackHex: string = "#000";

/**
 * @constant
 * White color hex
 */
export const whiteHex: string = "#fff";

/**
 * Check is specified string value is rgb color
 * @param colorString String to check
 * @returns `true` if string value is rgb color; otherwise - `false`
 */
export function isRgbColor(colorString: string): boolean {
    if (isNullOrEmpty(colorString)) {
        return false;
    }

    return colorString.trim().startsWith("rgb");
}

/**
 * Check is specified string value is hex color
 * @param colorString String to check
 * @returns `true` if string value is hex color; otherwise - `false`
 */
export function isHexColor(colorString: string): boolean {
    if (isNullOrEmpty(colorString)) {
        return false;
    }

    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(colorString);
}

/**
 * Parse string value with rgb color to model
 * @param colorString String with rgb color presented as rgb()
 * @returns Rgb color model if parse is succeded; otherwise - `undefined`
 */
export function getRgbColor(colorString: string): Color | undefined {
    if (isNullOrEmpty(colorString) || !isRgbColor(colorString)) {
        return undefined;
    }

    const colorGroups: Array<string> =
        colorString.trim().match(/\d+/g)!;

    return {
        red: parseInt(colorGroups[0], 10),
        green: parseInt(colorGroups[1], 10),
        blue: parseInt(colorGroups[2], 10),
    };
}

/**
 * Parse string with hex color to model
 * @param hexColor String with hex color presented as #{hex}
 * @returns Rgb color model if parse is succeded; otherwise - `undefined`
 */
export function hexToRgb(hexColor: string): Color | undefined {
    if (isNullOrEmpty(hexColor) || !isHexColor(hexColor)) {
        return undefined;
    }

    if (hexColor.startsWith("#")) {
        hexColor = hexColor.substring(1);
    }
    const aRgbHex: RegExpMatchArray =
        hexColor.match(/.{1,2}/g)!;

    const rgb: Array<number> = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];

    return {
        red: rgb[0],
        green: rgb[1],
        blue: rgb[2],
    };
}

/**
 * Calculate font color depending on background color
 * @param colorString String with rgb\hex color
 * @returns String with hex color: black or white if input string contains color; otherwise - empty string
 */
export function getFontColorFromString(colorString: string): string {
    const rgbColor: Color | undefined =
        isRgbColor(colorString)
            ? getRgbColor(colorString)
            : hexToRgb(colorString);

    if (isNullOrUndefined(rgbColor)) {
        return "";
    }

    return getFontColor(rgbColor!);
}

/**
 * Calculate font color depending on background color
 * @description According to https://stackoverflow.com/a/11868159/6089217
 * @param color Background color rgb model
 * @returns `#000` or `#fff`. Check description
 */
export function getFontColor(color: Color): string {
    const intensity: number
        = color.red * 0.299
        + color.green * 0.587
        + color.blue * 0.114;

    return intensity > 125 ? blackHex : whiteHex;
}
