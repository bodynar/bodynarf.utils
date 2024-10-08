import { isNullOrUndefined, Optional } from "..";

import { RequestConfiguration } from ".";

/**
 * Error caused during fetch request
 */
export class HttpError extends Error {
    /**
     * Create an instance of `HttpError`
     * @param response Fetch response
     */
    constructor(
        public response: Response
    ) {
        super(`Fetch error ${response.status}`);
    }
}

/**
 * Send HttpGet request to specified endpoint
 * @param uri Api endpoint address
 * @param config Additional request configuration
 * @throws {HttpError} Whether the response wasn't successful (status not in the range 200-299)
 * @throws {DOMException} When request is aborted due timeout (if timeout was specified)
 * @returns Promise with result parsed from json
 */
export const getAsync = <TResult = unknown>(
    uri: string,
    config?: RequestConfiguration
): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            ...config?.headers,
        },
    };

    return fetchAsync(uri, requestParams, config);
};

/**
 * Send HttpPost request to specified endpoint
 * @param uri Api endpoint address
 * @param requestData Request body (will be converted to json)
 * @param config Additional request configuration
 * @throws {HttpError} Whether the response wasn't successful (status not in the range 200-299)
 * @throws {DOMException} When request is aborted due timeout (if timeout was specified)
 * @returns Promise with result parsed from json
 */
export const postAsync = <TResult = unknown>(
    uri: string,
    requestData: Record<string, unknown>,
    config?: RequestConfiguration
): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            ...config?.headers,
        },
        body: JSON.stringify(requestData)
    };

    return fetchAsync(uri, requestParams, config);
};

/**
 * Send Http request to specified endpoint to retrieve json data
 * @param uri Api endpoint address
 * @param requestParams Request parameters
 * @param config Additional request configuration
 * @throws {HttpError} Whether the response wasn't successful (status not in the range 200-299)
 * @throws {DOMException} When request is aborted due timeout (if timeout was specified)
 * @returns Promise with result parsed from json
 */
export const fetchAsync = async <TResult = unknown>(
    uri: string,
    requestParams: RequestInit,
    config?: RequestConfiguration
): Promise<TResult> => {
    const response = await internalFetchAsync(uri, requestParams, config);

    return await response.json() as TResult;
};

/**
 * Send Http request to specified endpoint to retrieve text data
 * @param uri Api endpoint address
 * @param requestParams Request parameters
 * @param config Additional request configuration
 * @throws {HttpError} Whether the response wasn't successful (status not in the range 200-299)
 * @throws {DOMException} When request is aborted due timeout (if timeout was specified)
 * @returns Promise with result presented as text
 */
export const simpleFetchAsync = async (
    uri: string,
    requestParams: RequestInit,
    config?: RequestConfiguration
): Promise<string> => {
    const response = await internalFetchAsync(uri, requestParams, config);

    return await response.text();
};

/**
 * Send Http request to specified endpoint
 * @param uri Api endpoint address
 * @param requestParams Request parameters
 * @param config Additional request configuration
 * @throws {HttpError} Whether the response wasn't successful (status not in the range 200-299)
 * @throws {DOMException} When request is aborted due timeout (if timeout was specified)
 * @returns Promise with response
 */
const internalFetchAsync = async (
    uri: string,
    requestParams: RequestInit,
    config?: RequestConfiguration
): Promise<Response> => {
    let timeoutRequestCallNumber: Optional<number> = undefined;

    const timeout = config?.timeout ?? 0;

    if (timeout > 0) {
        const controller = new AbortController();
        timeoutRequestCallNumber = setTimeout(() => controller.abort(), timeout * 1000);

        requestParams = {
            ...requestParams,
            signal: controller.signal
        };
    }

    const response: Response = await fetch(uri, requestParams);

    if (!isNullOrUndefined(timeoutRequestCallNumber)) {
        clearTimeout(timeoutRequestCallNumber);
    }

    if (!response.ok) {
        throw new HttpError(response);
    }

    return response;
};
