/**
 * Retry promise function with specified attempts
 * @param fn Function that returns promise
 * @param attempts Number of attempts (default: 3)
 * @param delay Delay between attempts in milliseconds (default: 1000)
 * @returns Promise with result
 * @example
 * ```typescript
 * const fetchData = () => fetch("/api/data").then(res => res.json());
 *
 * // Retry up to 3 times with 1 second delay
 * retry(fetchData, 3, 1000)
 *     .then(data => console.log("Success:", data))
 *     .catch(error => console.error("Failed after 3 attempts:", error));
 * ```
 */
export const retry = <T>(
    fn: () => Promise<T>,
    attempts: number = 3,
    delay: number = 1000
): Promise<T> => {
    return new Promise((resolve, reject) => {
        const attempt = (remainingAttempts: number) => {
            fn()
                .then(resolve)
                .catch((error) => {
                    if (remainingAttempts <= 1) {
                        reject(error);
                    } else {
                        setTimeout(() => {
                            attempt(remainingAttempts - 1);
                        }, delay);
                    }
                });
        };

        attempt(attempts);
    });
};

/**
 * Add timeout to promise
 * @param promise Promise to add timeout to
 * @param timeout Timeout in milliseconds
 * @returns Promise with timeout
 * @example
 * ```typescript
 * const slowFetch = fetch("/api/data");
 *
 * // Reject if slowFetch takes more than 5 seconds
 * withTimeout(slowFetch, 5000)
 *     .then(response => console.log("Success:", response))
 *     .catch(error => console.error("Timed out or failed:", error));
 * ```
 */
export const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Promise timeout")), timeout)
        )
    ]);
};

/**
 * Execute promises in parallel
 * @param promises Array of promises
 * @returns Promise with array of results
 * @example
 * ```typescript
 * const promises = [
 *     fetch("/api/users").then(res => res.json()),
 *     fetch("/api/posts").then(res => res.json()),
 *     fetch("/api/comments").then(res => res.json())
 * ];
 *
 * // Execute all fetch requests in parallel
 * parallel(promises)
 *     .then(([users, posts, comments]) => {
 *         console.log("All data loaded:", users, posts, comments);
 *     })
 *     .catch(error => console.error("One or more requests failed:", error));
 * ```
 */
export const parallel = <T>(promises: Array<Promise<T>>): Promise<T[]> => {
    return Promise.all(promises);
};

/**
 * Execute promises sequentially
 * @param promises Array of promises
 * @returns Promise with array of results
 * @example
 * ```typescript
 * const promiseFns = [
 *     () => fetch("/api/setup").then(res => res.json()),
 *     () => fetch("/api/users").then(res => res.json()),
 *     () => fetch("/api/posts").then(res => res.json())
 * ];
 *
 * // Execute fetch requests one after another
 * sequential(promiseFns)
 *     .then(([setup, users, posts]) => {
 *         console.log("All data loaded in order:", setup, users, posts);
 *     })
 *     .catch(error => console.error("One or more requests failed:", error));
 * ```
 */
export const sequential = <T>(promises: Array<() => Promise<T>>): Promise<T[]> => {
    return promises.reduce(
        (chain, promiseFn) => chain.then(results =>
            promiseFn().then(result => [...results, result])
        ),
        Promise.resolve([] as T[])
    );
};

/**
 * Execute promises with concurrency limit
 * @param promises Array of functions that return promises
 * @param limit Concurrency limit
 * @returns Promise with array of results
 * @example
 * ```typescript
 * const urls = ["/api/data1", "/api/data2", "/api/data3", "/api/data4", "/api/data5"];
 * const promiseFns = urls.map(url => () => fetch(url).then(res => res.json()));
 *
 * // Execute up to 3 fetch requests concurrently
 * concurrent(promiseFns, 3)
 *     .then(results => {
 *         console.log("All data loaded:", results);
 *     })
 *     .catch(error => console.error("One or more requests failed:", error));
 * ```
 */
export const concurrent = <T>(
    promises: Array<() => Promise<T>>,
    limit: number
): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        let currentIndex = 0;
        let completedCount = 0;
        let runningCount = 0;

        const runNext = () => {
            if (currentIndex >= promises.length && runningCount === 0) {
                resolve(results);
                return;
            }

            while (runningCount < limit && currentIndex < promises.length) {
                const index = currentIndex++;
                const promiseFn = promises[index];
                runningCount++;

                promiseFn()
                    .then(result => {
                        results[index] = result;
                        completedCount++;
                        runningCount--;
                        runNext();
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        };

        runNext();
    });
};

/**
 * Delay resolve of promise in specified amount of milliseconds
 * @param time Delay time in milliseconds
 * @param result Promise result
 * @returns Delayed resolved promise
 */
export const delayResolve = <TResult>(time: number, result: TResult): Promise<TResult> => {
    return new Promise(resolve => setTimeout(() => resolve(result), time));
};

/**
 * Delay reject of promise in specified amount of milliseconds
 * @param time Delay time in milliseconds
 * @param error Promise error
 * @returns Delayed rejected promise
 */
export const delayReject = <TResult>(time: number, error: string): Promise<TResult> => {
    return new Promise<TResult>((_, reject) => setTimeout(() => reject(error), time));
};
