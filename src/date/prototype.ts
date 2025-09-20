import { formatDate } from './format';

declare global {
	interface Date {
		/**
		 * Форматирует дату в строку согласно заданному формату
		 * @param format - Строка формата (например, 'dd.MM.yyyy HH:mm:ss')
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
		format(format: string): string;
	}
}

/**
 * Расширение прототипа Date методом format
 */
Date.prototype.format = function (format: string): string {
	return formatDate(this, format);
};
