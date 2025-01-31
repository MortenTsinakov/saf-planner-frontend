/**
 * Clamp number into a given range
 */
export const clampNumber = (number, minValue, maxValue) => {
    return Math.min(maxValue, Math.max(minValue, number));
}