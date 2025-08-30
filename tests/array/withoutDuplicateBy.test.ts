import { describe, it, expect } from "vitest";

import "../../src/array";

interface TestItem {
    id: number;
    name: string;
    category: string;
}

describe("Array.prototype.withoutDuplicateBy", () => {
    it("should remove duplicates by specific key selector", () => {
        const items: TestItem[] = [
            { id: 1, name: "Item 1", category: "A" },
            { id: 2, name: "Item 2", category: "B" },
            { id: 3, name: "Item 3", category: "A" },
            { id: 4, name: "Item 4", category: "B" }
        ];

        const result = items.withoutDuplicateBy(item => item.category);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it("should handle ignoreEmptyValues flag", () => {
        const items: TestItem[] = [
            { id: 1, name: "Item 1", category: "A" },
            { id: 2, name: "Item 2", category: null as any },
            { id: 3, name: "Item 3", category: "A" },
            { id: 4, name: "Item 4", category: null as any }
        ];

        const result = items.withoutDuplicateBy(item => item.category, true);

        expect(result).toHaveLength(3);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(4);
    });
});
