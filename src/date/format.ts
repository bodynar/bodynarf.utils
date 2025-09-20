/**
 * Formats the date to a string according to the specified format
 * @param date - Date to format
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
export function formatDate(date: Date, format: string): string {
	const tokens: Record<string, () => string> = {
		"d": () => date.getDate().toString(),
		"dd": () => date.getDate().toString().padStart(2, "0"),
		"M": () => (date.getMonth() + 1).toString(),
		"MM": () => (date.getMonth() + 1).toString().padStart(2, "0"),
		"yyyy": () => date.getFullYear().toString(),
		"H": () => date.getHours().toString(),
		"HH": () => date.getHours().toString().padStart(2, "0"),
		"m": () => date.getMinutes().toString(),
		"mm": () => date.getMinutes().toString().padStart(2, "0"),
		"s": () => date.getSeconds().toString(),
		"ss": () => date.getSeconds().toString().padStart(2, "0"),
	};

	// Заменяем токены в формате на соответствующие значения
	// Используем регулярное выражение для замены более длинных токенов первыми
	// чтобы избежать частичной замены (например, "MM" -> "M" + "M")
	const tokenKeys = Object.keys(tokens).sort((a, b) => b.length - a.length);

	let result = format;
	for (const token of tokenKeys) {
		const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
		result = result.replace(regex, tokens[token]());
	}

	return result;
}
