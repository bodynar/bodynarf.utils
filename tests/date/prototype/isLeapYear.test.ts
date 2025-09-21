import { describe, it, expect } from "vitest";

// Import the file to activate the prototype extension
import "../../../src/date";

describe("Date.prototype.isLeapYear", () => {
	it("should return true for leap years", () => {
		const date1 = new Date(2020, 0, 1);
		const date2 = new Date(2024, 0, 1);
		const date3 = new Date(2000, 0, 1); // Divisible by 400

		expect(date1.isLeapYear()).toBe(true);
		expect(date2.isLeapYear()).toBe(true);
		expect(date3.isLeapYear()).toBe(true);
	});

	it("should return false for non-leap years", () => {
		const date1 = new Date(2021, 0, 1);
		const date2 = new Date(2022, 0, 1);
		const date3 = new Date(2023, 0, 1);
		const date4 = new Date(1900, 0, 1); // Divisible by 100, but not by 400

		expect(date1.isLeapYear()).toBe(false);
		expect(date2.isLeapYear()).toBe(false);
		expect(date3.isLeapYear()).toBe(false);
		expect(date4.isLeapYear()).toBe(false);
	});
});
