/**
 * Determine whether the color (in hex) is light by
 * calculating the relative luminance of the color.
 * https://en.wikipedia.org/wiki/Relative_luminance
 */
export const isColorLight = (hex) => {
    const {r, g, b} = hexToRGB(hex)

    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 0.4;
}

/**
 * Adjust the lightness of a hex color.
 * @param hex - current hex value 
 * @param amount - how much to adjust 
 * @returns - adjusted color.
 */
export const adjustLightness = (hex, amount) => {
    const {h, s, l} = hexToHSL(hex);
    const newL = Math.max(0, Math.min(100, l + amount));
    return HSLToHex(h, s, newL);
}

/**
 * Convert hex color to HSL
 * @param hex - hex color 
 * @returns 
 */
const hexToHSL = (hex) => {
    const {r, g, b} = hexToRGB(hex);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                return h;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

/**
 * Convert HSL color to hex.
 * @param h - hue 
 * @param s - saturation 
 * @param l - luminance 
 * @returns - hex value of HSL color
 */
const HSLToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;

    function f(n) {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    }

    return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convert hex color to RGB
 * @param hex - hex color value 
 * @returns - three values representing red, green and blue respectively.
 */
const hexToRGB = (hex) => {
    let r = parseInt(hex.substr(1, 2), 16) / 255;
    let g = parseInt(hex.substr(3, 2), 16) / 255;
    let b = parseInt(hex.substr(5, 2), 16) / 255;   

    return {r, g, b};
}

const rgbToHex = (r, g, b) => {
    function f(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    return "#" + f(r) + f(g) + f(b);
}

/**
 * Generate a random hex color.
 */
export const generateRandomColor = () => {
    function f() {
        return Math.floor(Math.random() * 255);
    }
    const r = f();
    const g = f();
    const b = f();
    return rgbToHex(r, g, b);
}