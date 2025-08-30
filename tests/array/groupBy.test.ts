import { describe, it, expect } from "vitest";

import "../../src/array";

interface TestItem {
    id: number;
    name: string;
    category: string;
}

describe("Array.prototype.groupBy", () => {
    it("should group items by specified key", () => {
        const items: TestItem[] = [
            { id: 1, name: "Item 1", category: "A" },
            { id: 2, name: "Item 2", category: "B" },
            { id: 3, name: "Item 3", category: "A" },
            { id: 4, name: "Item 4", category: "B" }
        ];

        const grouped = items.groupBy<TestItem>("category");

        expect(grouped).toHaveLength(2);
        expect(grouped[0].key).toBe("A");
        expect(grouped[0].items).toHaveLength(2);
        expect(grouped[0].items[0].id).toBe(1);
        expect(grouped[0].items[1].id).toBe(3);

        expect(grouped[1].key).toBe("B");
        expect(grouped[1].items).toHaveLength(2);
        expect(grouped[1].items[0].id).toBe(2);
        expect(grouped[1].items[1].id).toBe(4);
    });

    it("should return empty array for empty input", () => {
        const items: TestItem[] = [];
        const grouped = items.groupBy("category");
        expect(grouped).toHaveLength(0);
    });

    it("should handle single item", () => {
        const items: TestItem[] = [{ id: 1, name: "Item 1", category: "A" }];
        const grouped = items.groupBy<TestItem>("category");

        expect(grouped).toHaveLength(1);
        expect(grouped[0].key).toBe("A");
        expect(grouped[0].items).toHaveLength(1);
        expect(grouped[0].items[0].id).toBe(1);
    });
});
