import { describe, it, expect } from "vitest";

import { getMonthNames } from "../../../src/date/locale";

describe("getMonthNames", () => {
	it("should return an array of 12 items", () => {
		expect(getMonthNames()).toHaveLength(12);
	});

	it("should return full English month names by default", () => {
		const result = getMonthNames("en-US", "long");
		expect(result).toEqual([
			"January", "February", "March", "April",
			"May", "June", "July", "August",
			"September", "October", "November", "December",
		]);
	});

	it("should return abbreviated English month names for short format", () => {
		const result = getMonthNames("en-US", "short");
		expect(result).toEqual([
			"Jan", "Feb", "Mar", "Apr",
			"May", "Jun", "Jul", "Aug",
			"Sep", "Oct", "Nov", "Dec",
		]);
	});

	it("should default to en-US and long format", () => {
		expect(getMonthNames()).toEqual(getMonthNames("en-US", "long"));
	});

	it("should place January at index 0 and December at index 11", () => {
		const result = getMonthNames("en-US", "long");
		expect(result[0]).toBe("January");
		expect(result[11]).toBe("December");
	});
});
