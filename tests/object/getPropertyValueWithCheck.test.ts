import { describe, it, expect } from "vitest";

import { getPropertyValueWithCheck } from "../../src/object";

describe("getPropertyValueWithCheck", () => {
    it("should throw error when object is null", () => {
        expect(() => getPropertyValueWithCheck(null as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when object is undefined", () => {
        expect(() => getPropertyValueWithCheck(undefined as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when propertyName is null", () => {
        expect(() => getPropertyValueWithCheck({}, null as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is undefined", () => {
        expect(() => getPropertyValueWithCheck({}, undefined as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is empty string", () => {
        expect(() => getPropertyValueWithCheck({}, "")).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when property is not defined in object", () => {
        const obj = { a: 1, b: 2 };
        expect(() => getPropertyValueWithCheck(obj, "c")).toThrow('Key "c" is not defined in object');
    });

    it("should throw error when property value is undefined and throwOnUndefined is true", () => {
        const obj = { a: 1, b: undefined };
        expect(() => getPropertyValueWithCheck(obj, "b", true)).toThrow('Property "b" is not defined as requested type in object.');
    });

    it("should return undefined when property value is undefined and throwOnUndefined is false", () => {
        const obj = { a: 1, b: undefined };
        expect(getPropertyValueWithCheck(obj, "b", false)).toBeUndefined();
    });

    it("should return property value when property is defined in object", () => {
        const obj = { a: 1, b: "test", c: true };
        expect(getPropertyValueWithCheck<number>(obj, "a")).toBe(1);
        expect(getPropertyValueWithCheck<string>(obj, "b")).toBe("test");
        expect(getPropertyValueWithCheck<boolean>(obj, "c")).toBe(true);
    });

    it("should return null when property value is null and throwOnUndefined is false", () => {
        const obj = { a: 1, b: null };
        expect(getPropertyValueWithCheck(obj, "b", false)).toBeNull();
    });

    it("should throw error when property value is null and throwOnUndefined is true", () => {
        const obj = { a: 1, b: null };
        expect(() => getPropertyValueWithCheck(obj, "b", true)).toThrow('Property "b" is not defined as requested type in object.');
    });

    it("should work with inherited properties", () => {
        const obj = Object.create({ parentProp: "parent" });
        obj.childProp = "child";

        expect(getPropertyValueWithCheck<string>(obj, "parentProp")).toBe("parent");
        expect(getPropertyValueWithCheck<string>(obj, "childProp")).toBe("child");
    });
});
