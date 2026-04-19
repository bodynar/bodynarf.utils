/**
 * Add specified number of days to a date
 * @param date - Source date
 * @param days - Number of days to add (can be negative)
 * @returns New date with added days
 * @example
 * ```typescript
 * addDays(new Date(2023, 0, 1), 5); // January 6, 2023
 * addDays(new Date(2023, 0, 1), -1); // December 31, 2022
 * ```
 */
export function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * Add specified number of months to a date.
 * If the resulting month has fewer days, the day is clamped to the last day of that month.
 * @param date - Source date
 * @param months - Number of months to add (can be negative)
 * @returns New date with added months
 * @example
 * ```typescript
 * addMonths(new Date(2023, 0, 31), 1); // February 28, 2023
 * addMonths(new Date(2023, 5, 15), -3); // March 15, 2023
 * ```
 */
export function addMonths(date: Date, months: number): Date {
	const result = new Date(date);
	const day = result.getDate();

	result.setDate(1);
	result.setMonth(result.getMonth() + months);

	const maxDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
	result.setDate(Math.min(day, maxDay));

	return result;
}

/**
 * Add specified number of years to a date.
 * Handles Feb 29 → Feb 28 for non-leap target years.
 * @param date - Source date
 * @param years - Number of years to add (can be negative)
 * @returns New date with added years
 * @example
 * ```typescript
 * addYears(new Date(2020, 1, 29), 1); // February 28, 2021
 * addYears(new Date(2023, 5, 15), 2); // June 15, 2025
 * ```
 */
export function addYears(date: Date, years: number): Date {
	return addMonths(date, years * 12);
}

/**
 * Calculate the difference in whole days between two dates.
 * The result is positive if `a` is after `b`.
 * @param a - First date
 * @param b - Second date
 * @returns Number of days between the dates
 * @example
 * ```typescript
 * diffInDays(new Date(2023, 0, 10), new Date(2023, 0, 1)); // 9
 * diffInDays(new Date(2023, 0, 1), new Date(2023, 0, 10)); // -9
 * ```
 */
export function diffInDays(a: Date, b: Date): number {
	const msPerDay = 86400000;
	const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	return Math.round((utcA - utcB) / msPerDay);
}

/**
 * Calculate the difference in whole months between two dates.
 * The result is positive if `a` is after `b`.
 * @param a - First date
 * @param b - Second date
 * @returns Number of months between the dates
 * @example
 * ```typescript
 * diffInMonths(new Date(2023, 5, 15), new Date(2023, 0, 15)); // 5
 * diffInMonths(new Date(2023, 5, 1), new Date(2023, 5, 30)); // 0
 * ```
 */
export function diffInMonths(a: Date, b: Date): number {
	return (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth());
}

/**
 * Calculate the difference in whole years between two dates.
 * The result is positive if `a` is after `b`.
 * @param a - First date
 * @param b - Second date
 * @returns Number of years between the dates
 * @example
 * ```typescript
 * diffInYears(new Date(2025, 5, 15), new Date(2020, 5, 15)); // 5
 * diffInYears(new Date(2023, 0, 1), new Date(2025, 0, 1)); // -2
 * ```
 */
export function diffInYears(a: Date, b: Date): number {
	return a.getFullYear() - b.getFullYear();
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns true if the date is today
 * @example
 * ```typescript
 * isToday(new Date()); // true
 * isToday(new Date(2020, 0, 1)); // false
 * ```
 */
export function isToday(date: Date): boolean {
	const now = new Date();
	return date.getFullYear() === now.getFullYear()
		&& date.getMonth() === now.getMonth()
		&& date.getDate() === now.getDate();
}

/**
 * Check if a date is tomorrow
 * @param date - Date to check
 * @returns true if the date is tomorrow
 * @example
 * ```typescript
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * isTomorrow(tomorrow); // true
 * ```
 */
export function isTomorrow(date: Date): boolean {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return date.getFullYear() === tomorrow.getFullYear()
		&& date.getMonth() === tomorrow.getMonth()
		&& date.getDate() === tomorrow.getDate();
}

/**
 * Check if a date is yesterday
 * @param date - Date to check
 * @returns true if the date is yesterday
 * @example
 * ```typescript
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * isYesterday(yesterday); // true
 * ```
 */
export function isYesterday(date: Date): boolean {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return date.getFullYear() === yesterday.getFullYear()
		&& date.getMonth() === yesterday.getMonth()
		&& date.getDate() === yesterday.getDate();
}

/**
 * Format a date as ISO date string (YYYY-MM-DD) without timezone issues.
 * Uses local date components instead of `toISOString()` which converts to UTC.
 * @param date - Date to format
 * @returns Date string in YYYY-MM-DD format
 * @example
 * ```typescript
 * toISODateString(new Date(2023, 0, 5)); // "2023-01-05"
 * toISODateString(new Date(2023, 11, 25)); // "2023-12-25"
 * ```
 */
export function toISODateString(date: Date): string {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}
