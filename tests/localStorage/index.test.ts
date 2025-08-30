import { describe, it, expect, beforeEach } from "vitest";

import { localStorage } from "../../src/localStorage";

describe("localStorage API", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should export all required functions", () => {
        expect(localStorage).toBeDefined();
        expect(typeof localStorage.hasRecord).toBe("function");
        expect(typeof localStorage.getRecord).toBe("function");
        expect(typeof localStorage.saveRecord).toBe("function");
        expect(typeof localStorage.clear).toBe("function");
    });

    it("should work correctly as integrated API", () => {
        expect(localStorage.hasRecord("integration-test")).toBe(false);
        expect(localStorage.getRecord("integration-test")).toBeUndefined();

        const testData = { message: "Hello, World!", count: 42 };
        localStorage.saveRecord("integration-test", testData);

        expect(localStorage.hasRecord("integration-test")).toBe(true);
        expect(localStorage.getRecord<typeof testData>("integration-test")).toEqual(testData);

        localStorage.clear();

        expect(localStorage.hasRecord("integration-test")).toBe(false);
        expect(localStorage.getRecord("integration-test")).toBeUndefined();
    });

    it("should handle complex data structures", () => {
        const complexData = {
            id: 1,
            name: "Test",
            tags: ["tag1", "tag2"],
            metadata: {
                created: new Date().toISOString(),
                active: true,
                nested: {
                    value: 123
                }
            },
            list: [
                { id: 1, name: "Item 1" },
                { id: 2, name: "Item 2" }
            ]
        };

        localStorage.saveRecord("complex-data", complexData);
        expect(localStorage.getRecord("complex-data")).toEqual(complexData);
    });
});
