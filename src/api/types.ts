/** Request body data */
export type RequestData = {
    [propertyName: string]: any;
} | string;

/** Additional request parameters */
export interface RequestParams {
    /**
     * Timeout in milliseconds.
     * If specified - request will be aborted after this time.
    */
    timeout?: number;
};

/** Result of fetching remote API */
export interface ApiResult<TResult> {
    /** Is request succeeded */
    success: boolean;

    /** Response code */
    code?: number;

    /** Textual response status */
    status?: string;

    /** Error short description */
    errorShortMessage?: string;

    /** Error */
    error?: Error;

    /** Textual response */
    response?: string;

    /** Response converted from JSON to object */
    responseObject?: TResult;
}
