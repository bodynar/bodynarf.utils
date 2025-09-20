/**
 * Форматирует дату в строку согласно заданному формату
 * @param date - Дата для форматирования
 * @param format - Строка формата (например, "dd.MM.yyyy HH:mm:ss")
 * @returns Отформатированная строка даты
 *
 * Поддерживаемые токены:
 * - dd: день месяца (01-31)
 * - MM: месяц (01-12)
 * - yyyy: год (4 цифры)
 * - HH: часы (00-23)
 * - mm: минуты (00-59)
 * - ss: секунды (00-59)
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
