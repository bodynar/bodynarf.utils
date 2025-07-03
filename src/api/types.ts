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
