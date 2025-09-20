import { describe, it, expect } from "vitest";

// Импортируем файл, чтобы активировать расширение прототипа
import "../../../src/date";

describe("Date.prototype.isWeekend", () => {
	it("should return true for Sunday", () => {
		const sunday = new Date(2023, 5, 18); // 18 июня 2023 - воскресенье
		expect(sunday.isWeekend()).toBe(true);
	});

	it("should return true for Saturday", () => {
		const saturday = new Date(2023, 5, 17); // 17 июня 2023 - суббота
		expect(saturday.isWeekend()).toBe(true);
	});

	it("should return false for weekdays", () => {
		const monday = new Date(2023, 5, 19); // 19 июня 2023 - понедельник
		const tuesday = new Date(2023, 5, 20); // 20 июня 2023 - вторник
		const wednesday = new Date(2023, 5, 21); // 21 июня 2023 - среда
		const thursday = new Date(2023, 5, 22); // 22 июня 2023 - четверг
		const friday = new Date(2023, 5, 23); // 23 июня 2023 - пятница

		expect(monday.isWeekend()).toBe(false);
		expect(tuesday.isWeekend()).toBe(false);
		expect(wednesday.isWeekend()).toBe(false);
		expect(thursday.isWeekend()).toBe(false);
		expect(friday.isWeekend()).toBe(false);
	});
});
