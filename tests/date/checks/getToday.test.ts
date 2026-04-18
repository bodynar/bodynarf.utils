import { describe, it, expect } from "vitest";

import { getToday } from "../../../src/date/checks";

describe("getToday", () => {
	it("should return a date with time set to midnight", () => {
		const result = getToday();

		expect(result.getHours()).toBe(0);
		expect(result.getMinutes()).toBe(0);
		expect(result.getSeconds()).toBe(0);
		expect(result.getMilliseconds()).toBe(0);
	});

	it("should return today's calendar date", () => {
		const now = new Date();
		const result = getToday();

		expect(result.getFullYear()).toBe(now.getFullYear());
		expect(result.getMonth()).toBe(now.getMonth());
		expect(result.getDate()).toBe(now.getDate());
	});

	it("should return a Date instance", () => {
		expect(getToday()).toBeInstanceOf(Date);
	});
});
