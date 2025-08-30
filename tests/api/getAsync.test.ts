import { describe, it, expect, vi } from "vitest";

import { getAsync } from "../../src/api";

describe("getAsync", () => {
    it("should call fetch with correct parameters for GET request", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ data: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const result = await getAsync<{ data: string }>("https://api.example.com/test");

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            }
        );
        expect(result).toEqual({ data: "test" });
    });

    it("should include custom headers when provided", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ data: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        await getAsync("https://api.example.com/test", {
            headers: {
                "Authorization": "Bearer token",
                "Custom-Header": "custom-value"
            }
        });

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer token",
                    "Custom-Header": "custom-value"
                }
            }
        );
    });

    it("should handle timeout configuration", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ data: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        await getAsync("https://api.example.com/test", {
            timeout: 5000
        });

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            expect.objectContaining({
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                signal: expect.any(AbortSignal)
            })
        );
    });
});
