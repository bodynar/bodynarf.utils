export { formatDate } from "./format";
export { isWeekend, isLeapYear, getDaysInMonth, isSameDay, startOfDay, getToday } from "./checks";
export { getMonthNames, getWeekdayLabels } from "./locale";

/**
 * Extends the Date prototype with the format method.
 * Import this file to activate the extension.
 */
import "./prototype";
