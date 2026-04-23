import { describe, it, expect } from "vitest";

import {
    addDays, addMonths, addYears,
    diffInDays, diffInMonths, diffInYears,
    isToday, isTomorrow, isYesterday,
    toISODateString,
} from "../../src/date";

describe("addDays", () => {
    it("should add days", () => {
        const date = new Date(2023, 0, 1);
        const result = addDays(date, 5);
        expect(result.getDate()).toBe(6);
        expect(result.getMonth()).toBe(0);
    });

    it("should subtract days with negative value", () => {
        const date = new Date(2023, 0, 1);
        const result = addDays(date, -1);
        expect(result.getFullYear()).toBe(2022);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(31);
    });

    it("should not mutate original date", () => {
        const date = new Date(2023, 0, 1);
        addDays(date, 5);
        expect(date.getDate()).toBe(1);
    });
});

describe("addMonths", () => {
    it("should add months", () => {
        const date = new Date(2023, 0, 15);
        const result = addMonths(date, 3);
        expect(result.getMonth()).toBe(3);
        expect(result.getDate()).toBe(15);
    });

    it("should clamp day when target month is shorter", () => {
        const date = new Date(2023, 0, 31); // Jan 31
        const result = addMonths(date, 1); // Feb
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(28);
    });

    it("should handle leap year", () => {
        const date = new Date(2020, 0, 31); // Jan 31, 2020
        const result = addMonths(date, 1); // Feb 2020 (leap)
        expect(result.getDate()).toBe(29);
    });

    it("should subtract months with negative value", () => {
        const date = new Date(2023, 5, 15);
        const result = addMonths(date, -3);
        expect(result.getMonth()).toBe(2);
    });
});

describe("addYears", () => {
    it("should add years", () => {
        const date = new Date(2023, 5, 15);
        const result = addYears(date, 2);
        expect(result.getFullYear()).toBe(2025);
    });

    it("should handle Feb 29 to non-leap year", () => {
        const date = new Date(2020, 1, 29);
        const result = addYears(date, 1);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(28);
    });
});

describe("diffInDays", () => {
    it("should return positive for a after b", () => {
        const a = new Date(2023, 0, 10);
        const b = new Date(2023, 0, 1);
        expect(diffInDays(a, b)).toBe(9);
    });

    it("should return negative for a before b", () => {
        const a = new Date(2023, 0, 1);
        const b = new Date(2023, 0, 10);
        expect(diffInDays(a, b)).toBe(-9);
    });

    it("should return 0 for same day", () => {
        const date = new Date(2023, 5, 15);
        expect(diffInDays(date, date)).toBe(0);
    });
});

describe("diffInMonths", () => {
    it("should return difference in months", () => {
        const a = new Date(2023, 5, 15);
        const b = new Date(2023, 0, 15);
        expect(diffInMonths(a, b)).toBe(5);
    });

    it("should handle cross-year difference", () => {
        const a = new Date(2024, 2, 1);
        const b = new Date(2023, 10, 1);
        expect(diffInMonths(a, b)).toBe(4);
    });
});

describe("diffInYears", () => {
    it("should return difference in years", () => {
        const a = new Date(2025, 5, 15);
        const b = new Date(2020, 5, 15);
        expect(diffInYears(a, b)).toBe(5);
    });

    it("should return negative", () => {
        const a = new Date(2020, 0, 1);
        const b = new Date(2025, 0, 1);
        expect(diffInYears(a, b)).toBe(-5);
    });
});

describe("isToday", () => {
    it("should return true for today", () => {
        expect(isToday(new Date())).toBe(true);
    });

    it("should return false for other dates", () => {
        expect(isToday(new Date(2020, 0, 1))).toBe(false);
    });
});

describe("isTomorrow", () => {
    it("should return true for tomorrow", () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(isTomorrow(tomorrow)).toBe(true);
    });

    it("should return false for today", () => {
        expect(isTomorrow(new Date())).toBe(false);
    });
});

describe("isYesterday", () => {
    it("should return true for yesterday", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(isYesterday(yesterday)).toBe(true);
    });

    it("should return false for today", () => {
        expect(isYesterday(new Date())).toBe(false);
    });
});

describe("toISODateString", () => {
    it("should format date as YYYY-MM-DD", () => {
        expect(toISODateString(new Date(2023, 0, 5))).toBe("2023-01-05");
    });

    it("should pad month and day", () => {
        expect(toISODateString(new Date(2023, 11, 25))).toBe("2023-12-25");
    });

    it("should handle single-digit values", () => {
        expect(toISODateString(new Date(2023, 0, 1))).toBe("2023-01-01");
    });
});
