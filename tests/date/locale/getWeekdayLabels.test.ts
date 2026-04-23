import { describe, it, expect } from "vitest";

import { getWeekdayLabels } from "../../../src/date/locale";

describe("getWeekdayLabels", () => {
	it("should return an array of 7 items", () => {
		expect(getWeekdayLabels()).toHaveLength(7);
	});

	it("should return English short weekday labels starting from Monday", () => {
		const result = getWeekdayLabels("en-US");
		expect(result).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
	});

	it("should default to en-US", () => {
		expect(getWeekdayLabels()).toEqual(getWeekdayLabels("en-US"));
	});

	it("should start with Monday at index 0", () => {
		// 2000-01-03 is a known Monday; its short label should be first
		const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short" });
		const monday = fmt.format(new Date(2000, 0, 3));
		expect(getWeekdayLabels("en-US")[0]).toBe(monday);
	});

	it("should end with Sunday at index 6", () => {
		const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short" });
		const sunday = fmt.format(new Date(2000, 0, 9));
		expect(getWeekdayLabels("en-US")[6]).toBe(sunday);
	});
});
