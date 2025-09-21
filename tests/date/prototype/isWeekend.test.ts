import { describe, it, expect } from "vitest";

// Import file to activate prototype extension
import "../../../src/date";

describe("Date.prototype.isWeekend", () => {
	it("should return true for Sunday", () => {
		const sunday = new Date(2023, 5, 18); // June 18, 2023 - Sunday
		expect(sunday.isWeekend()).toBe(true);
	});

	it("should return true for Saturday", () => {
		const saturday = new Date(2023, 5, 17); // June 17, 2023 - Saturday
		expect(saturday.isWeekend()).toBe(true);
	});

	it("should return false for weekdays", () => {
		const monday = new Date(2023, 5, 19); // June 19, 2023 - Monday
		const tuesday = new Date(2023, 5, 20); // June 20, 2023 - Tuesday
		const wednesday = new Date(2023, 5, 21); // June 21, 2023 - Wednesday
		const thursday = new Date(2023, 5, 22); // June 22, 2023 - Thursday
		const friday = new Date(2023, 5, 23); // June 23, 2023 - Friday

		expect(monday.isWeekend()).toBe(false);
		expect(tuesday.isWeekend()).toBe(false);
		expect(wednesday.isWeekend()).toBe(false);
		expect(thursday.isWeekend()).toBe(false);
		expect(friday.isWeekend()).toBe(false);
	});
});
