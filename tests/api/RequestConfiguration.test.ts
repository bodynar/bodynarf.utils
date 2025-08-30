import { describe, it, expect } from "vitest";

import { RequestConfiguration } from "../../src/api";

describe("RequestConfiguration", () => {
    it("should allow creating configuration with timeout only", () => {
        const config: RequestConfiguration = {
            timeout: 5000
        };

        expect(config.timeout).toBe(5000);
        expect(config.headers).toBeUndefined();
    });

    it("should allow creating configuration with headers only", () => {
        const config: RequestConfiguration = {
            headers: {
                "Authorization": "Bearer token",
                "Content-Type": "application/json"
            }
        };

        expect(config.timeout).toBeUndefined();
        expect(config.headers).toEqual({
            "Authorization": "Bearer token",
            "Content-Type": "application/json"
        });
    });

    it("should allow creating configuration with both timeout and headers", () => {
        const config: RequestConfiguration = {
            timeout: 3000,
            headers: {
                "Custom-Header": "custom-value"
            }
        };

        expect(config.timeout).toBe(3000);
        expect(config.headers).toEqual({
            "Custom-Header": "custom-value"
        });
    });

    it("should allow creating empty configuration", () => {
        const config: RequestConfiguration = {};

        expect(config.timeout).toBeUndefined();
        expect(config.headers).toBeUndefined();
    });
});
