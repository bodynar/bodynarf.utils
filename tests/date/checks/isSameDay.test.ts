import { describe, it, expect } from "vitest";

import { isSameDay } from "../../../src/date/checks";

describe("isSameDay", () => {
	it("should return true for same day with different times", () => {
		const a = new Date(2026, 3, 10, 12, 0, 0);
		const b = new Date(2026, 3, 10, 23, 59, 59);
		expect(isSameDay(a, b)).toBe(true);
	});

	it("should return true for identical date objects", () => {
		const date = new Date(2026, 3, 10, 8, 30, 0);
		expect(isSameDay(date, date)).toBe(true);
	});

	it("should return true for midnight and end of day", () => {
		const midnight = new Date(2026, 3, 10, 0, 0, 0, 0);
		const endOfDay = new Date(2026, 3, 10, 23, 59, 59, 999);
		expect(isSameDay(midnight, endOfDay)).toBe(true);
	});

	it("should return false for consecutive days", () => {
		const a = new Date(2026, 3, 10);
		const b = new Date(2026, 3, 11);
		expect(isSameDay(a, b)).toBe(false);
	});

	it("should return false for different months", () => {
		const a = new Date(2026, 3, 10);
		const b = new Date(2026, 4, 10);
		expect(isSameDay(a, b)).toBe(false);
	});

	it("should return false for different years", () => {
		const a = new Date(2025, 3, 10);
		const b = new Date(2026, 3, 10);
		expect(isSameDay(a, b)).toBe(false);
	});

	it("should return false for same day and month but different year", () => {
		const a = new Date(2023, 0, 1);
		const b = new Date(2024, 0, 1);
		expect(isSameDay(a, b)).toBe(false);
	});
});
