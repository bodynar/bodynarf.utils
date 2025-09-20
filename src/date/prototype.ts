import { isNullish } from "../common/checks";

import { formatDate } from "./format";
import { isWeekend, isLeapYear, getDaysInMonth } from "./checks";

declare global {
	interface Date {
		/**
		 * Formats the date to a string according to the specified format
		 * @param format - Format string (e.g., "dd.MM.yyyy HH:mm:ss")
		 * @returns Formatted date string
		 *
		 * Supported tokens:
		 * - d: day of month (1-31)
		 * - dd: day of month (01-31)
		 * - M: month (1-12)
		 * - MM: month (01-12)
		 * - yyyy: year (4 digits)
		 * - H: hours (0-23)
		 * - HH: hours (00-23)
		 * - m: minutes (0-59)
		 * - mm: minutes (00-59)
		 * - s: seconds (0-59)
		 * - ss: seconds (00-59)
		 *
		 * Examples:
		 * - "dd.MM.yyyy" => "15.06.2023"
		 * - "d.M.yyyy" => "15.6.2023"
		 * - "HH:mm:ss" => "14:30:45"
		 * - "H:m:s" => "14:30:45"
		 * - "dd.MM.yyyy HH:mm:ss" => "15.06.2023 14:30:45"
		 * - "yyyy-MM-dd" => "2023-06-15"
		 */
		format(format: string): string;

		/**
		 * Checks if the date is a weekend day (Saturday or Sunday)
		 * @returns true if the date is a weekend, false otherwise
		 */
		isWeekend(): boolean;

		/**
		 * Checks if the date's year is a leap year
		 * @returns true if the year is a leap year, false otherwise
		 */
		isLeapYear(): boolean;

		/**
		 * Returns the number of days in the date's month
		 * @returns Number of days in the month
		 */
		getDaysInMonth(): number;
	}
}

// Check for method existence before defining
if (isNullish(Date.prototype.format)) {
	Date.prototype.format = function (format: string): string {
		return formatDate(this, format);
	};
}

if (isNullish(Date.prototype.isWeekend)) {
	Date.prototype.isWeekend = function (): boolean {
		return isWeekend(this);
	};
}

if (isNullish(Date.prototype.isLeapYear)) {
	Date.prototype.isLeapYear = function (): boolean {
		return isLeapYear(this.getFullYear());
	};
}

if (isNullish(Date.prototype.getDaysInMonth)) {
	Date.prototype.getDaysInMonth = function (): number {
		return getDaysInMonth(this.getFullYear(), this.getMonth());
	};
}
