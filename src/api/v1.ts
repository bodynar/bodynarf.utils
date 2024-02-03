import { isNullOrUndefined, isStringEmpty } from "../common";

import { RequestData, RequestParams } from ".";

/**
 * Map of http status codes to errors
 * @deprecated 1.2.0 | Do not use this useless map
 */
export const statusCodesErrorsMap = new Map<number, string>([
    [404, "Server is not reachable."],
    [415, "Server request failed: data is not valid."]
]);

/**
 * Send data to api to process
 * @param uri Api endpoint address
 * @param requestData Request data
 * @param params Additional request configuration
 * @returns Promise with api processing result. If API returned empty response - will be `undefined`
 */
export const post = async <TResult extends object>(
    uri: string,
    requestData: RequestData,
    params?: RequestParams
): Promise<TResult | undefined> => {
    const requestParams: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    };

    return safeFetch(uri, requestParams, params)
        .then(x =>
            isStringEmpty(x)
                ? undefined
                : JSON.parse(x) as TResult
        );
};

/**
 * Gather data from specified api
 * @param uri Api endpoint address
 * @param params Additional request configuration
 * @returns {Promise<TResult>} Promise with api get result
 */
export const get = async <TResult>(
    uri: string,
    params?: RequestParams
): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    };

    return safeFetch(uri, requestParams, params)
        .then(x => JSON.parse(x) as TResult);
};

/**
 * Send configured http request to specified api with error handling
 * @deprecated 1.2.0 | Use `safeFetch` from `v2`
 * @param uri Uri address to fetch
 * @param requestParams Request parameters
 * @param params Additional request configuration
 * @returns Fetch result: error message or response text
 */
export const safeFetch = async (
    uri: string,
    requestParams: RequestInit,
    params?: RequestParams
): Promise<string> => {
    try {
        const response: Response = await fetchApi(uri, requestParams);

        if (response.ok) {
            const textResponse: string = await response.text();

            return Promise.resolve(textResponse);
        } else {
            return Promise.reject(getErrorText(response));
        }
    } catch (error: any) {
        console.error(error);
        let errorMessage = "Unexpected error.";

        if (error.name === "AbortError") {
            errorMessage = `Request timeout after ${params!.timeout} ms`;
        }
        return Promise.reject(errorMessage);
    }
};

/**
 * Fetch data by specified configuration
 * @param uri Uri address to fetch
 * @param requestParams Request parameters
 * @param params Additional request configuration
 * @returns API response
 */
export const fetchApi = async (
    uri: string,
    requestParams: RequestInit,
    params?: RequestParams
): Promise<Response> => {
    let timeoutRequestCallNumber: number | undefined = undefined;

    if (!isNullOrUndefined(params)
        && !isNullOrUndefined(params!.timeout)
        && params!.timeout! > 0
    ) {
        const controller = new AbortController();
        timeoutRequestCallNumber = setTimeout(() => controller.abort(), params!.timeout! * 1000);

        requestParams = {
            ...requestParams,
            signal: controller.signal
        }
    }

    const response: Response = await fetch(uri, requestParams);

    if (!isNullOrUndefined(timeoutRequestCallNumber)) {
        clearTimeout(timeoutRequestCallNumber);
    }

    return response;
}

/**
 * Get error message depending on http response
 * @deprecated 1.2.0 | Do not use this useless fn
 * @param response Http response
 * @param suppressStateCheck Should `response.ok` check be suppressed in case of using v2
 * @returns Error message to display
 */
export const getErrorText = (response: Response, suppressStateCheck: boolean = false): string => {
    if (response.ok && !suppressStateCheck) {
        throw new Error("Response is ok, but error handler called.");
    }

    if (!statusCodesErrorsMap.has(response.status)) {
        return "Unexpected error.";
    }

    return statusCodesErrorsMap.get(response.status) as string;
};
