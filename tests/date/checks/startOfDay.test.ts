import { describe, it, expect } from "vitest";

import { startOfDay } from "../../../src/date/checks";

describe("startOfDay", () => {
	it("should set time to midnight", () => {
		const date = new Date(2026, 3, 10, 15, 30, 45, 123);
		const result = startOfDay(date);

		expect(result.getHours()).toBe(0);
		expect(result.getMinutes()).toBe(0);
		expect(result.getSeconds()).toBe(0);
		expect(result.getMilliseconds()).toBe(0);
	});

	it("should preserve year, month and day", () => {
		const date = new Date(2026, 3, 10, 15, 30, 45);
		const result = startOfDay(date);

		expect(result.getFullYear()).toBe(2026);
		expect(result.getMonth()).toBe(3);
		expect(result.getDate()).toBe(10);
	});

	it("should return a new Date instance, not mutate input", () => {
		const date = new Date(2026, 3, 10, 15, 30, 45);
		const result = startOfDay(date);

		expect(result).not.toBe(date);
		expect(date.getHours()).toBe(15);
	});

	it("should work when input is already at midnight", () => {
		const date = new Date(2026, 3, 10, 0, 0, 0, 0);
		const result = startOfDay(date);

		expect(result.getHours()).toBe(0);
		expect(result.getMinutes()).toBe(0);
		expect(result.getSeconds()).toBe(0);
		expect(result.getMilliseconds()).toBe(0);
		expect(result.getDate()).toBe(10);
	});

	it("should work for the first day of the year", () => {
		const date = new Date(2023, 0, 1, 12, 0, 0);
		const result = startOfDay(date);

		expect(result.getFullYear()).toBe(2023);
		expect(result.getMonth()).toBe(0);
		expect(result.getDate()).toBe(1);
		expect(result.getHours()).toBe(0);
	});
});
