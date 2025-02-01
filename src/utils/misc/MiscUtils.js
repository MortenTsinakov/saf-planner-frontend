/**
 * Clamp number into a given range
 */
export const clampNumber = (number, minValue, maxValue) => {
    return Math.min(maxValue, Math.max(minValue, number));
}

/**
 * Truncate string
 */
export const truncateString = (s, maxLen) => {
    if (s.length > maxLen) {
        return s.slice(0, maxLen) + '...';
    }
    return s;
}