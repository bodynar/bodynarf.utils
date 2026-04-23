/** Default BCP 47 locale tag used when no locale is explicitly provided */
const DEFAULT_LOCALE = "en-US";

/**
 * Returns an array of 12 month names localized for the given locale.
 *
 * @param locale - BCP 47 language tag (e.g. `"en-US"`, `"ru-RU"`). Defaults to `"en-US"`.
 * @param format - Display format: `"long"` for full names, `"short"` for abbreviated. Defaults to `"long"`.
 * @returns Array of 12 strings representing month names, January at index 0.
 *
 * @example
 * ```typescript
 * getMonthNames("en-US", "long");
 * // → ["January", "February", ..., "December"]
 *
 * getMonthNames("en-US", "short");
 * // → ["Jan", "Feb", ..., "Dec"]
 *
 * getMonthNames("ru-RU", "long");
 * // → ["январь", "февраль", ..., "декабрь"]
 * ```
 */
export function getMonthNames(locale = DEFAULT_LOCALE, format: "long" | "short" = "long"): string[] {
	return Array.from({ length: 12 }, (_, i) =>
		new Intl.DateTimeFormat(locale, { month: format }).format(new Date(2000, i, 1))
	);
}

/**
 * Returns an array of 7 short weekday labels starting from Monday, localized for the given locale.
 * Uses the week of 2000-01-03 (a known Monday) as the reference point.
 *
 * @param locale - BCP 47 language tag. Defaults to `"en-US"`.
 * @returns Array of 7 strings in Monday–Sunday order.
 *
 * @example
 * ```typescript
 * getWeekdayLabels("en-US");
 * // → ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 *
 * getWeekdayLabels("ru-RU");
 * // → ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
 * ```
 */
export function getWeekdayLabels(locale = DEFAULT_LOCALE): string[] {
	const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
	// 2000-01-03 is a Monday; iterating 0-6 covers Mon through Sun
	return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2000, 0, 3 + i)));
}
