import { describe, it, expect } from "vitest";

import { isUndefined } from "../../../src/common/checks";

describe("isUndefined", () => {
	it("should return true for undefined values", () => {
		expect(isUndefined(undefined)).toBe(true);
	});

	it("should return false for null values", () => {
		expect(isUndefined(null)).toBe(false);
	});

	it("should return false for string values", () => {
		expect(isUndefined("test")).toBe(false);
	});

	it("should return false for number values", () => {
		expect(isUndefined(42)).toBe(false);
	});

	it("should return false for boolean values", () => {
		expect(isUndefined(true)).toBe(false);
		expect(isUndefined(false)).toBe(false);
	});

	it("should return false for object values", () => {
		expect(isUndefined({})).toBe(false);
	});

	it("should return false for array values", () => {
	    expect(isUndefined([])).toBe(false);
	});

	it("should return false for Symbol values", () => {
	    expect(isUndefined(Symbol("test"))).toBe(false);
	});

	it("should return false for BigInt values", () => {
	    expect(isUndefined(BigInt(123))).toBe(false);
	});

	it("should return false for NaN values", () => {
	    expect(isUndefined(NaN)).toBe(false);
	});

	it("should return false for Infinity values", () => {
	    expect(isUndefined(Infinity)).toBe(false);
	    expect(isUndefined(-Infinity)).toBe(false);
	});
});
