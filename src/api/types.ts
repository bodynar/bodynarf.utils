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