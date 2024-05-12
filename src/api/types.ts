/**
 * Request body data
 * @deprecated 1.3.0 | Use "./simple" for fetching data
 */
export type RequestData = {
    [propertyName: string]: any;
} | string;

/** Additional fetch request configuration */
export type RequestConfiguration = {
    /**
     * Timeout in milliseconds.
     * If specified - request will be aborted after this time.
    */
    timeout?: number;

    /**
     * Headers
     */
    headers?: HeadersInit;
};

/**
 * Additional request parameters
 * @deprecated 1.3.0 | Use "./simple" for fetching data
 */
export interface RequestParams {
    /**
     * Timeout in milliseconds.
     * If specified - request will be aborted after this time.
    */
    timeout?: number;

    /**
     * Headers
     */
    headers?: HeadersInit;
};

/**
 * Result of fetching remote API
 * @deprecated 1.3.0 | Use "./simple" for fetching data
 */
export interface ApiResult<TResult> {
    /** Is request succeeded */
    success: boolean;

    /** Response code */
    code?: number;

    /** Textual response status */
    status?: string;

    /**
     * Error short description
     * @deprecated 1.2.0 | Use `error`. This message is dummy duplicate
    */
    errorShortMessage?: string;

    /** Error */
    error?: Error;

    /** Textual response */
    response?: string;

    /** Response converted from JSON to object */
    responseObject?: TResult;
}
