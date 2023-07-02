import { isNullOrEmpty } from "../common";

import { ApiResult, RequestParams, fetchApi, getErrorText } from ".";

/**
 * Send configured http request to specified api with error handling
 * @param uri Uri address to fetch
 * @param requestParams Request parameters
 * @param params Additional request configuration
 * @returns Promise with result of fetching API presented via complex object `ApiResult<TResult>>`
 */
export const safeFetch = async <TResult>(
    uri: string,
    requestParams: RequestInit,
    params?: RequestParams
): Promise<ApiResult<TResult>> => {
    try {
        const response: Response = await fetchApi(uri, requestParams);

        const textResponse: string = await response.text();

        const result: ApiResult<TResult> = {
            success: response.ok,
            code: response.status,
            status: response.statusText,
            response: textResponse,
            responseObject: safeParseJSON<TResult>(textResponse),
        };

        if (response.ok) {
            return Promise.resolve(result);
        } else {
            result.error = getErrorText(response, true);

            return Promise.reject(result);
        }
    } catch (error: any) {
        console.error(error);
        let errorMessage = "Unexpected error.";

        if (error.name === "AbortError") {
            errorMessage = `Request timeout after ${params!.timeout} ms`;
        }
        return Promise.reject({
            error: errorMessage,
        } as ApiResult<TResult>);
    }
};

/**
 * Parse json from string in safe mode
 * @param text String with possible json object in it
 * @returns Parsed value in specified type or undefined if string does not contain any json or specified type
 */
const safeParseJSON = <TResult>(text: string): TResult | undefined => {
    if (isNullOrEmpty(text)) {
        return undefined;
    }

    try {
        return JSON.parse(text) as TResult;
    } catch {
        return undefined;
    }
};
