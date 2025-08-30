import { describe, it, expect } from "vitest";

import { generateGuid } from "../../src/guid";

describe("generateGuid", () => {
    it("should return a string", () => {
        const guid = generateGuid();
        expect(typeof guid).toBe("string");
    });

    it("should return a string with correct GUID format", () => {
        const guid = generateGuid();

        expect(guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it("should generate unique GUIDs", () => {
        const guids = new Set<string>();

        for (let i = 0; i < 1000; i++) {
            const guid = generateGuid();
            expect(guids.has(guid)).toBe(false);
            guids.add(guid);
        }
    });

    it("should generate GUIDs with correct segments length", () => {
        const guid = generateGuid();
        const segments = guid.split("-");

        expect(segments).toHaveLength(5);
        expect(segments[0]).toHaveLength(8);
        expect(segments[1]).toHaveLength(4);
        expect(segments[2]).toHaveLength(4);
        expect(segments[3]).toHaveLength(4);
        expect(segments[4]).toHaveLength(12);
    });

    it("should generate GUIDs with only hexadecimal characters", () => {
        const guid = generateGuid();

        const hexString = guid.replace(/-/g, "");
        expect(hexString).toMatch(/^[0-9a-f]+$/);
    });
});
