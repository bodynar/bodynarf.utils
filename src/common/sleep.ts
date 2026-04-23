/**
 * Pause execution for a specified number of milliseconds.
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after the delay
 * @example
 * ```typescript
 * await sleep(1000); // wait 1 second
 * console.log("done");
 * ```
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
