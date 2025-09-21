/**
 * Checks if the date is a weekend day (Saturday or Sunday)
 * @param date - Date to check
 * @returns true if the date is a weekend, false otherwise
 * @example
 * ```typescript
 * const saturday = new Date(2023, 5, 17); // Saturday, June 17, 2023
 * const monday = new Date(2023, 5, 19); // Monday, June 19, 2023
 *
 * isWeekend(saturday); // true
 * isWeekend(monday); // false
 * ```
 */
export function isWeekend(date: Date): boolean {
	const day = date.getDay();
	return day === 0 || day === 6; // 0 - Sunday, 6 - Saturday
}

/**
 * Checks if the year is a leap year
 * @param year - Year to check
 * @returns true if the year is a leap year, false otherwise
 * @example
 * ```typescript
 * isLeapYear(2020); // true
 * isLeapYear(2021); // false
 * isLeapYear(2000); // true (divisible by 400)
 * isLeapYear(1900); // false (divisible by 100 but not by 400)
 * ```
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Returns the number of days in the month for the given year
 * @param year - Year
 * @param month - Month (0-11, where 0 - January, 11 - December)
 * @returns Number of days in the month
 * @example
 * ```typescript
 * getDaysInMonth(2023, 1); // 28 (February 2023)
 * getDaysInMonth(2020, 1); // 29 (February 2020 - leap year)
 * getDaysInMonth(2023, 0); // 31 (January 2023)
 * getDaysInMonth(2023, 3); // 30 (April 2023)
 * ```
 */
export function getDaysInMonth(year: number, month: number): number {
	const lastDay = new Date(year, month + 1, 0);
	return lastDay.getDate();
}
