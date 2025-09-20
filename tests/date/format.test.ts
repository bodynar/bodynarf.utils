import { describe, it, expect } from "vitest";

import { formatDate } from "../../src/date/format";

describe("formatDate", () => {
	// Фиксируем дату для тестов
	const testDate = new Date(2023, 5, 15, 14, 30, 45); // 15 июня 2023, 14:30:45

	it("should format date with dd.MM.yyyy", () => {
		const result = formatDate(testDate, "dd.MM.yyyy");
		expect(result).toBe("15.06.2023");
	});

	it("should format date with dd/MM/yyyy", () => {
		const result = formatDate(testDate, "dd/MM/yyyy");
		expect(result).toBe("15/06/2023");
	});

	it("should format date with yyyy-MM-dd", () => {
		const result = formatDate(testDate, "yyyy-MM-dd");
		expect(result).toBe("2023-06-15");
	});

	it("should format date with dd.MM.yyyy HH:mm:ss", () => {
		const result = formatDate(testDate, "dd.MM.yyyy HH:mm:ss");
		expect(result).toBe("15.06.2023 14:30:45");
	});

	it("should format date with dd.MM.yyyy H:m:s", () => {
		const result = formatDate(testDate, "dd.MM.yyyy H:m:s");
		expect(result).toBe("15.06.2023 14:30:45");
	});

	it("should format date with MM/dd/yyyy HH:mm", () => {
		const result = formatDate(testDate, "MM/dd/yyyy HH:mm");
		expect(result).toBe("06/15/2023 14:30");
	});

	it("should handle single digit days correctly with d token", () => {
		const date = new Date(2023, 5, 5, 14, 30, 45); // 5 июня 2023
		const result = formatDate(date, "d.MM.yyyy");
		expect(result).toBe("5.06.2023");
	});

	it("should handle single digit months correctly with M token", () => {
		const date = new Date(2023, 2, 15, 14, 30, 45); // 15 марта 2023
		const result = formatDate(date, "dd.M.yyyy");
		expect(result).toBe("15.3.2023");
	});

	it("should handle single digit hours correctly with H token", () => {
		const date = new Date(2023, 5, 15, 5, 30, 45); // 5 часов утра
		const result = formatDate(date, "dd.MM.yyyy H:mm:ss");
		expect(result).toBe("15.06.2023 5:30:45");
	});

	it("should handle single digit minutes correctly with m token", () => {
		const date = new Date(2023, 5, 15, 14, 5, 45); // 5 минут
		const result = formatDate(date, "dd.MM.yyyy HH:m:ss");
		expect(result).toBe("15.06.2023 14:5:45");
	});

	it("should handle single digit seconds correctly with s token", () => {
		const date = new Date(2023, 5, 15, 14, 30, 5); // 5 секунд
		const result = formatDate(date, "dd.MM.yyyy HH:mm:s");
		expect(result).toBe("15.06.2023 14:30:5");
	});

	it("should handle edge cases like midnight and noon", () => {
		const midnight = new Date(2023, 5, 15, 0, 0, 0);
		const noon = new Date(2023, 5, 15, 12, 0, 0);

		expect(formatDate(midnight, "HH:mm:ss")).toBe("00:00:00");
		expect(formatDate(noon, "HH:mm:ss")).toBe("12:00:00");
	});

	it("should handle edge cases like beginning of year", () => {
		const newYear = new Date(2023, 0, 1, 0, 0, 0); // 1 января 2023
		const result = formatDate(newYear, "dd.MM.yyyy");
		expect(result).toBe("01.01.2023");
	});
});
