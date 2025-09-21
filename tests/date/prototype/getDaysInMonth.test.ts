import { describe, it, expect } from "vitest";

// Import the file to activate the prototype extension
import "../../../src/date";

describe("Date.prototype.getDaysInMonth", () => {
	it("should return correct days for months with 31 days", () => {
		const january = new Date(2023, 0, 1); // January
		const march = new Date(2023, 2, 1); // March
		const may = new Date(2023, 4, 1); // May
		const july = new Date(2023, 6, 1); // July
		const august = new Date(2023, 7, 1); // August
		const october = new Date(2023, 9, 1); // October
		const december = new Date(2023, 11, 1); // December

		expect(january.getDaysInMonth()).toBe(31);
		expect(march.getDaysInMonth()).toBe(31);
		expect(may.getDaysInMonth()).toBe(31);
		expect(july.getDaysInMonth()).toBe(31);
		expect(august.getDaysInMonth()).toBe(31);
		expect(october.getDaysInMonth()).toBe(31);
		expect(december.getDaysInMonth()).toBe(31);
	});

	it("should return correct days for months with 30 days", () => {
		const april = new Date(2023, 3, 1); // April
		const june = new Date(2023, 5, 1); // June
		const september = new Date(2023, 8, 1); // September
		const november = new Date(2023, 10, 1); // November

		expect(april.getDaysInMonth()).toBe(30);
		expect(june.getDaysInMonth()).toBe(30);
		expect(september.getDaysInMonth()).toBe(30);
		expect(november.getDaysInMonth()).toBe(30);
	});

	it("should return correct days for February in leap years", () => {
		const feb2020 = new Date(2020, 1, 1); // February 2020 (leap year)
		const feb2024 = new Date(2024, 1, 1); // February 2024 (leap year)

		expect(feb2020.getDaysInMonth()).toBe(29);
		expect(feb2024.getDaysInMonth()).toBe(29);
	});

	it("should return correct days for February in non-leap years", () => {
		const feb2021 = new Date(2021, 1, 1); // February 2021 (non-leap year)
		const feb2022 = new Date(2022, 1, 1); // February 2022 (non-leap year)
		const feb2023 = new Date(2023, 1, 1); // February 2023 (non-leap year)

		expect(feb2021.getDaysInMonth()).toBe(28);
		expect(feb2022.getDaysInMonth()).toBe(28);
		expect(feb2023.getDaysInMonth()).toBe(28);
	});
});
