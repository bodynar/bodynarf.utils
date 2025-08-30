import { describe, it, expect } from "vitest";

import { getPropertyValue } from "../../src/object";

describe("getPropertyValue", () => {
    it("should throw error when object is null", () => {
        expect(() => getPropertyValue(null as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when object is undefined", () => {
        expect(() => getPropertyValue(undefined as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when propertyName is null", () => {
        expect(() => getPropertyValue({}, null as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is undefined", () => {
        expect(() => getPropertyValue({}, undefined as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is empty string", () => {
        expect(() => getPropertyValue({}, "")).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should return undefined when property is not defined in object", () => {
        const obj = { a: 1, b: 2 };
        expect(getPropertyValue(obj, "c")).toBeUndefined();
    });

    it("should return property value when property is defined in object", () => {
        const obj = { a: 1, b: "test", c: true };
        expect(getPropertyValue<number>(obj, "a")).toBe(1);
        expect(getPropertyValue<string>(obj, "b")).toBe("test");
        expect(getPropertyValue<boolean>(obj, "c")).toBe(true);
    });

    it("should return undefined for properties with undefined values", () => {
        const obj = { a: undefined, b: null };
        expect(getPropertyValue(obj, "a")).toBeUndefined();
        expect(getPropertyValue(obj, "b")).toBeNull();
    });

    it("should work with inherited properties", () => {
        const obj = Object.create({ parentProp: "parent" });
        obj.childProp = "child";

        expect(getPropertyValue<string>(obj, "parentProp")).toBe("parent");
        expect(getPropertyValue<string>(obj, "childProp")).toBe("child");
    });
});
