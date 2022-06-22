import { isStringEmpty } from "../common";

/** Request body data */
export type RequestData = {
    [propertyName: string]: any;
} | string;

/** Map of http status codes to errors */
export const statusCodesErrorsMap = new Map<number, string>([
    [404, "Server is not reachable."],
    [415, "Server request failed: data is not valid."]
]);

/**
 * Send data to api to process
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns Promise with api processing result. If API returned empty response - will be `undefined`
 */
export const post = async <TResult extends object>(uri: string, requestData: RequestData): Promise<TResult | undefined> => {
    const requestParams: RequestInit = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(requestData)
    };

    return safeFetch(uri, requestParams)
        .then(x =>
            isStringEmpty(x)
                ? undefined
                : JSON.parse(x) as TResult
        );
};

/**
 * Gather data from specified api
 * @param uri Api endpoint address
 * @returns {Promise<TResult>} Promise with api get result
 */
export const get = async <TResult>(uri: string): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    };

    return safeFetch(uri, requestParams)
        .then(x => JSON.parse(x) as TResult);
};

/**
 * Send configured http request to specified api with error handling
 * @param uri Uri addres to fetch
 * @param requestParams Request parameters
 * @returns Fetch result: error message or response text
 */
export const safeFetch = async (uri: string, requestParams: RequestInit): Promise<string> => {
    try {
        const response: Response = await fetch(uri, requestParams);

        if (response.ok) {
            const textResponse: string = await response.text();

            return Promise.resolve(textResponse);
        } else {
            return Promise.reject(getErrorText(response));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject("Unexpected error.");
    }
};

/**
 * Get error message depending on http response
 * @param response Http response
 * @returns Error message to display
 */
export const getErrorText = (response: Response): string => {
    if (response.ok) {
        throw new Error("Response is ok, but error handler called.");
    }

    if (!statusCodesErrorsMap.has(response.status)) {
        return "Unexpected error.";
    }

    return statusCodesErrorsMap.get(response.status) as string;
};