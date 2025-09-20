import { describe, it, expect } from "vitest";

// Импортируем файл, чтобы активировать расширение прототипа
import "../../../src/date";

describe("Date.prototype.getDaysInMonth", () => {
	it("should return correct days for months with 31 days", () => {
		const january = new Date(2023, 0, 1); // Январь
		const march = new Date(2023, 2, 1); // Март
		const may = new Date(2023, 4, 1); // Май
		const july = new Date(2023, 6, 1); // Июль
		const august = new Date(2023, 7, 1); // Август
		const october = new Date(2023, 9, 1); // Октябрь
		const december = new Date(2023, 11, 1); // Декабрь

		expect(january.getDaysInMonth()).toBe(31);
		expect(march.getDaysInMonth()).toBe(31);
		expect(may.getDaysInMonth()).toBe(31);
		expect(july.getDaysInMonth()).toBe(31);
		expect(august.getDaysInMonth()).toBe(31);
		expect(october.getDaysInMonth()).toBe(31);
		expect(december.getDaysInMonth()).toBe(31);
	});

	it("should return correct days for months with 30 days", () => {
		const april = new Date(2023, 3, 1); // Апрель
		const june = new Date(2023, 5, 1); // Июнь
		const september = new Date(2023, 8, 1); // Сентябрь
		const november = new Date(2023, 10, 1); // Ноябрь

		expect(april.getDaysInMonth()).toBe(30);
		expect(june.getDaysInMonth()).toBe(30);
		expect(september.getDaysInMonth()).toBe(30);
		expect(november.getDaysInMonth()).toBe(30);
	});

	it("should return correct days for February in leap years", () => {
		const feb2020 = new Date(2020, 1, 1); // Февраль 2020 (високосный)
		const feb2024 = new Date(2024, 1, 1); // Февраль 2024 (високосный)

		expect(feb2020.getDaysInMonth()).toBe(29);
		expect(feb2024.getDaysInMonth()).toBe(29);
	});

	it("should return correct days for February in non-leap years", () => {
		const feb2021 = new Date(2021, 1, 1); // Февраль 2021 (не високосный)
		const feb2022 = new Date(2022, 1, 1); // Февраль 2022 (не високосный)
		const feb2023 = new Date(2023, 1, 1); // Февраль 2023 (не високосный)

		expect(feb2021.getDaysInMonth()).toBe(28);
		expect(feb2022.getDaysInMonth()).toBe(28);
		expect(feb2023.getDaysInMonth()).toBe(28);
	});
});
