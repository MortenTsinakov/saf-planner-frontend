/**
 * Format ISO date to a LocaleDateString.
 * 
 * Parameters:
 *  - isoDate - date in ISO format
 *  - fields - fields to be included in the formatted date
 */
export const formatDate = (isoDate, fields = []) => {
    const date = new Date(isoDate);

    const options = {
        year: fields.includes('year') ? 'numeric' : undefined,
        month: fields.includes('month') ? '2-digit' : undefined,
        day: fields.includes('day') ? '2-digit' : undefined,
        hour: fields.includes('hour') ? '2-digit' : undefined,
        minute: fields.includes('minute') ? '2-digit' : undefined,
        second: fields.includes('second') ? '2-digit' : undefined,
        hourCycle: 'h24'
    };

    const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
    return formattedDate;
}

/**
 * Format a length of time given in seconds to
 * hours, minutes and seconds.
 */
export const formatSecondsToHMS = (timeInSeconds) => {
    if (timeInSeconds === null || timeInSeconds === 0) {
        return '-'
    }
    const hours = Math.floor(timeInSeconds / (60 * 60));
    timeInSeconds = timeInSeconds - (hours * 60 * 60);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const hoursString = hours !== 0 ? `${hours}h` : '';
    const minutesString = minutes !== 0 ? `${minutes}min` : '';
    const secondsString = seconds !== 0 ? `${seconds}sec`: '';

    return [hoursString, minutesString, secondsString].join(" ");
}

/**
 * Convert minutes and seconds into seconds.
 */
export const timeInMinsSecsToTimeInSeconds = (minutes, seconds) => {
    return minutes * 60 + seconds;
}
