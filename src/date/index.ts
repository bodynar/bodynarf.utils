export { formatDate } from "./format";
export { isWeekend, isLeapYear, getDaysInMonth, isSameDay, startOfDay, getToday } from "./checks";
export { getMonthNames, getWeekdayLabels } from "./locale";
export {
	addDays, addMonths, addYears,
	diffInDays, diffInMonths, diffInYears,
	isToday, isTomorrow, isYesterday,
	toISODateString,
} from "./arithmetic";

/**
 * Extends the Date prototype with the format method.
 * Import this file to activate the extension.
 */
import "./prototype";
