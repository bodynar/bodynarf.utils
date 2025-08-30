import { describe, it, expect, vi } from "vitest";

import { fetchAsync } from "../../src/api";

describe("fetchAsync", () => {
    it("should call fetch and parse JSON response", async () => {
        const mockJsonData = { id: 1, name: "test" };
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockJsonData)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        const result = await fetchAsync<{ id: number, name: string }>(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(mockResponse.json).toHaveBeenCalled();
        expect(result).toEqual(mockJsonData);
    });

    it("should handle custom request parameters", async () => {
        const mockJsonData = { success: true };
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockJsonData)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer token"
            },
            body: JSON.stringify({ test: "data" })
        };

        const result = await fetchAsync<{ success: boolean }>(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(result).toEqual(mockJsonData);
    });

    it("should handle timeout configuration", async () => {
        const mockJsonData = { success: true };
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockJsonData)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        await fetchAsync(
            "https://api.example.com/test",
            requestParams,
            {
                timeout: 3000
            }
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            expect.objectContaining({
                ...requestParams,
                signal: expect.any(AbortSignal)
            })
        );
    });
});
