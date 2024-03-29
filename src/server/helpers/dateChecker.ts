export function isGreaterThanMonth(date1: string, date2: string): boolean {
    // One month to milliseconds
    const monthMillis = 30 * 24 * 60 * 60 * 1000;

    // Parse the input strings into Date objects
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);

    // Calculate the difference between the two dates in milliseconds
    const difference = Math.abs(parsedDate2.getTime() - parsedDate1.getTime());

    // Check if the difference is greater than or equal to one month in milliseconds
    if (difference >= monthMillis) {
        return true;
    } else {
        return false;
    }
}

// Example usage
const date1 = "2023-05-15";
const date2 = "2023-06-16";
const result = isGreaterThanMonth(date1, date2);
console.log(result); // Output: true



export function isToday(today: Date, givenDate: Date): boolean {

    const isToday = givenDate.toDateString() === today.toDateString();
    console.log(isToday ? 'today' : 'The given date is not today.');

    return isToday ? true : false
}

export function isGreaterThan24Hours(date1: Date, date2: Date): boolean {
    // 24 hours in milliseconds
    const dayMillis = 24 * 60 * 60 * 1000;

    // Parse the input strings into Date objects
    // const parsedDate1 = new Date(date1);
    // const parsedDate2 = new Date(date2);

    // Calculate the difference between the two dates in milliseconds
    const difference = Math.abs(date2.getTime() - date1.getTime());

    // Check if the difference is greater than or equal to 24 hours in milliseconds
    if (difference >= dayMillis) {
        return true;
    } else {
        return false;
    }
}
