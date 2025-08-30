import { describe, it, expect, vi } from "vitest";

import { plainFetchAsync } from "../../src/api";

describe("plainFetchAsync", () => {
    it("should call fetch and return Response object", async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            statusText: "OK"
        } as Response;
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        const result = await plainFetchAsync(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(result).toBe(mockResponse);
    });

    it("should handle POST requests with body", async () => {
        const mockResponse = {
            ok: true,
            status: 201,
            statusText: "Created"
        } as Response;
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: "test" })
        };

        const result = await plainFetchAsync(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(result).toBe(mockResponse);
    });

    it("should handle timeout configuration", async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            statusText: "OK"
        } as Response;
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        await plainFetchAsync(
            "https://api.example.com/test",
            requestParams,
            {
                timeout: 5000
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
