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

/**
 * Returns `true` when two Date values fall on the same calendar day.
 * Year, month and day-of-month are compared; time components are ignored.
 *
 * @param a - First date to compare.
 * @param b - Second date to compare.
 *
 * @example
 * ```typescript
 * isSameDay(new Date(2026, 3, 10, 12, 0), new Date(2026, 3, 10, 23, 59)); // true
 * isSameDay(new Date(2026, 3, 10), new Date(2026, 3, 11)); // false
 * ```
 */
export function isSameDay(a: Date, b: Date): boolean {
	return a.getFullYear() === b.getFullYear()
		&& a.getMonth() === b.getMonth()
		&& a.getDate() === b.getDate();
}

/**
 * Returns a new Date set to midnight (00:00:00.000) of the given date's local calendar day.
 * Useful for date-only comparisons that should ignore time.
 *
 * @param date - Source date.
 *
 * @example
 * ```typescript
 * startOfDay(new Date(2026, 3, 10, 15, 30, 0));
 * // → new Date(2026, 3, 10, 0, 0, 0, 0)
 * ```
 */
export function startOfDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Returns a new Date set to the start of the current calendar day (midnight, local time).
 * Equivalent to `startOfDay(new Date())`.
 *
 * @example
 * ```typescript
 * getToday(); // → new Date(2026, 3, 18, 0, 0, 0, 0)
 * ```
 */
export function getToday(): Date {
	return startOfDay(new Date());
}
