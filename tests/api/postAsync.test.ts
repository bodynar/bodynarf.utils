import { describe, it, expect, vi } from "vitest";

import { postAsync } from "../../src/api";

describe("postAsync", () => {
    it("should call fetch with correct parameters for POST request", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 1, name: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestData = { name: "test", value: "data" };
        const result = await postAsync<{ id: number, name: string }>(
            "https://api.example.com/test",
            requestData
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(requestData)
            }
        );
        expect(result).toEqual({ id: 1, name: "test" });
    });

    it("should include custom headers when provided", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 1, name: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestData = { name: "test", value: "data" };
        await postAsync(
            "https://api.example.com/test",
            requestData,
            {
                headers: {
                    "Authorization": "Bearer token",
                    "Custom-Header": "custom-value"
                }
            }
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer token",
                    "Custom-Header": "custom-value"
                },
                body: JSON.stringify(requestData)
            }
        );
    });

    it("should handle timeout configuration", async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 1, name: "test" })
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestData = { name: "test", value: "data" };
        await postAsync(
            "https://api.example.com/test",
            requestData,
            {
                timeout: 5000
            }
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            expect.objectContaining({
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(requestData),
                signal: expect.any(AbortSignal)
            })
        );
    });
});
