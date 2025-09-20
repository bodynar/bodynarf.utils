/**
 * Checks if the date is a weekend day (Saturday or Sunday)
 * @param date - Date to check
 * @returns true if the date is a weekend, false otherwise
 */
export function isWeekend(date: Date): boolean {
	const day = date.getDay();
	return day === 0 || day === 6; // 0 - Sunday, 6 - Saturday
}

/**
 * Checks if the year is a leap year
 * @param year - Year to check
 * @returns true if the year is a leap year, false otherwise
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Returns the number of days in the month for the given year
 * @param year - Year
 * @param month - Month (0-11, where 0 - January, 11 - December)
 * @returns Number of days in the month
 */
export function getDaysInMonth(year: number, month: number): number {
	const lastDay = new Date(year, month + 1, 0);
	return lastDay.getDate();
}
