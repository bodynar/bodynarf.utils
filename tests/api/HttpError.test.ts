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
        expect(error.message).toBe("Fetch error 404");
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
});
