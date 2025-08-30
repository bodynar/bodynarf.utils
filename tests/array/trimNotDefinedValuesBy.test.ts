import { describe, it, expect } from "vitest";

import "../../src/array";

describe("Array.prototype.trimNotDefinedValuesBy", () => {
    it("should remove border items with null or undefined values", () => {
        const items = [
            { id: null, name: "Item 1" },
            { id: undefined, name: "Item 2" },
            { id: 3, name: "Item 3" },
            { id: 4, name: "Item 4" },
            { id: null, name: "Item 5" }
        ];

        const result = items.trimNotDefinedValuesBy(item => item.id);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(3);
        expect(result[1].id).toBe(4);
    });

    it("should handle all items with null or undefined values", () => {
        const items = [
            { id: null, name: "Item 1" },
            { id: undefined, name: "Item 2" }
        ];

        const result = items.trimNotDefinedValuesBy(item => item.id);

        expect(result).toHaveLength(0);
    });

    it("should handle no items with null or undefined values", () => {
        const items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" }
        ];

        const result = items.trimNotDefinedValuesBy(item => item.id);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });
});
