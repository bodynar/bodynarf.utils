import { describe, it, expect } from "vitest";

// Импортируем файл, чтобы активировать расширение прототипа
import "../../src/date";

describe("Date.prototype.format", () => {
	// Фиксируем дату для тестов
	const testDate = new Date(2023, 5, 15, 14, 30, 45); // 15 июня 2023, 14:30:45

	it("should format date with dd.MM.yyyy", () => {
		const result = testDate.format("dd.MM.yyyy");
		expect(result).toBe("15.06.2023");
	});

	it("should format date with dd/MM/yyyy", () => {
		const result = testDate.format("dd/MM/yyyy");
		expect(result).toBe("15/06/2023");
	});

	it("should format date with yyyy-MM-dd", () => {
		const result = testDate.format("yyyy-MM-dd");
		expect(result).toBe("2023-06-15");
	});

	it("should format date with dd.MM.yyyy HH:mm:ss", () => {
		const result = testDate.format("dd.MM.yyyy HH:mm:ss");
		expect(result).toBe("15.06.2023 14:30:45");
	});

	it("should format date with dd.MM.yyyy H:m:s", () => {
		const result = testDate.format("dd.MM.yyyy H:m:s");
		expect(result).toBe("15.06.2023 14:30:45");
	});

	it("should format date with MM/dd/yyyy HH:mm", () => {
		const result = testDate.format("MM/dd/yyyy HH:mm");
		expect(result).toBe("06/15/2023 14:30");
	});

	it("should handle single digit days correctly with d token", () => {
		const date = new Date(2023, 5, 5, 14, 30, 45); // 5 июня 2023
		const result = date.format("d.MM.yyyy");
		expect(result).toBe("5.06.2023");
	});

	it("should handle single digit months correctly with M token", () => {
		const date = new Date(2023, 2, 15, 14, 30, 45); // 15 марта 2023
		const result = date.format("dd.M.yyyy");
		expect(result).toBe("15.3.2023");
	});

	it("should handle single digit hours correctly with H token", () => {
		const date = new Date(2023, 5, 15, 5, 30, 45); // 5 часов утра
		const result = date.format("dd.MM.yyyy H:mm:ss");
		expect(result).toBe("15.06.2023 5:30:45");
	});

	it("should handle single digit minutes correctly with m token", () => {
		const date = new Date(2023, 5, 15, 14, 5, 45); // 5 минут
		const result = date.format("dd.MM.yyyy HH:m:ss");
		expect(result).toBe("15.06.2023 14:5:45");
	});

	it("should handle single digit seconds correctly with s token", () => {
		const date = new Date(2023, 5, 15, 14, 30, 5); // 5 секунд
		const result = date.format("dd.MM.yyyy HH:mm:s");
		expect(result).toBe("15.06.2023 14:30:5");
	});

	it("should handle edge cases like midnight and noon", () => {
		const midnight = new Date(2023, 5, 15, 0, 0, 0);
		const noon = new Date(2023, 5, 15, 12, 0, 0);

		expect(midnight.format("HH:mm:ss")).toBe("00:00:00");
		expect(noon.format("HH:mm:ss")).toBe("12:00:00");
	});

	it("should handle edge cases like beginning of year", () => {
		const newYear = new Date(2023, 0, 1, 0, 0, 0); // 1 января 2023
		const result = newYear.format("dd.MM.yyyy");
		expect(result).toBe("01.01.2023");
	});
});
