import { describe, it, expect } from "vitest";

import { HttpError } from "../../src/api";

describe("HttpError", () => {
    it("should create an instance with correct message and response", () => {
        const mockResponse = {
            status: 404,
            statusText: "Not Found"
        } as Response;

        const error = new HttpError(mockResponse);

        expect(error).toBeInstanceOf(HttpError);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("HTTP Error: 404 Not Found");
        expect(error.response).toBe(mockResponse);
    });

    it("should have correct name property", () => {
        const mockResponse = {
            status: 500,
            statusText: "Internal Server Error"
        } as Response;

        const error = new HttpError(mockResponse);

        expect(error.name).toBe("HttpError");
    });

    it("should expose status via getter", () => {
        const mockResponse = {
            status: 404,
            statusText: "Not Found"
        } as Response;

        const error = new HttpError(mockResponse);

        expect(error.status).toBe(404);
    });

    it("should expose statusText via getter", () => {
        const mockResponse = {
            status: 403,
            statusText: "Forbidden"
        } as Response;

        const error = new HttpError(mockResponse);

        expect(error.statusText).toBe("Forbidden");
    });

    it("should expose url via getter", () => {
        const mockResponse = {
            status: 404,
            statusText: "Not Found",
            url: "https://api.example.com/data"
        } as Response;

        const error = new HttpError(mockResponse);

        expect(error.url).toBe("https://api.example.com/data");
    });
});
