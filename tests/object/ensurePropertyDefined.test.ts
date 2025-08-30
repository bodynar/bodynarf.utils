import { describe, it, expect } from "vitest";

import { ensurePropertyDefined } from "../../src/object";

describe("ensurePropertyDefined", () => {
    it("should throw error when object is null", () => {
        expect(() => ensurePropertyDefined(null as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when object is undefined", () => {
        expect(() => ensurePropertyDefined(undefined as any, "prop")).toThrow("Parameter \"object\" is not defined.");
    });

    it("should throw error when propertyName is null", () => {
        expect(() => ensurePropertyDefined({}, null as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is undefined", () => {
        expect(() => ensurePropertyDefined({}, undefined as any)).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when propertyName is empty string", () => {
        expect(() => ensurePropertyDefined({}, "")).toThrow("Parameter \"propertyName\" is not defined");
    });

    it("should throw error when property is not defined in object", () => {
        const obj = { a: 1, b: 2 };
        expect(() => ensurePropertyDefined(obj, "c")).toThrow('Key "c" is not defined in object');
    });

    it("should not throw error when property is defined in object", () => {
        const obj = { a: 1, b: 2 };
        expect(() => ensurePropertyDefined(obj, "a")).not.toThrow();
        expect(() => ensurePropertyDefined(obj, "b")).not.toThrow();
    });

    it("should work with inherited properties", () => {
        const obj = Object.create({ parentProp: "parent" });
        obj.childProp = "child";

        expect(() => ensurePropertyDefined(obj, "parentProp")).not.toThrow();
        expect(() => ensurePropertyDefined(obj, "childProp")).not.toThrow();
    });
});
