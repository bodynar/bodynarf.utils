import { describe, it, expect, vi } from "vitest";

import { simpleFetchAsync } from "../../src/api";

describe("simpleFetchAsync", () => {
    it("should call fetch and return text response", async () => {
        const mockTextResponse = "Simple text response";
        const mockResponse = {
            ok: true,
            text: vi.fn().mockResolvedValue(mockTextResponse)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        const result = await simpleFetchAsync(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(mockResponse.text).toHaveBeenCalled();
        expect(result).toBe(mockTextResponse);
    });

    it("should handle HTML response", async () => {
        const mockHtmlResponse = "<html><body><h1>Hello World</h1></body></html>";
        const mockResponse = {
            ok: true,
            text: vi.fn().mockResolvedValue(mockHtmlResponse)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "text/html"
            }
        };

        const result = await simpleFetchAsync(
            "https://api.example.com/test",
            requestParams
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/test",
            requestParams
        );
        expect(result).toBe(mockHtmlResponse);
    });

    it("should handle timeout configuration", async () => {
        const mockTextResponse = "Simple text response";
        const mockResponse = {
            ok: true,
            text: vi.fn().mockResolvedValue(mockTextResponse)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const requestParams = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };

        await simpleFetchAsync(
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
