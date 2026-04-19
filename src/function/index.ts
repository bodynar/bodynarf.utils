import { ActionFn, ActionFnAsync } from "..";
import { isNullish } from "../common";

/**
 * Perform action after some delay specified in milliseconds
 * @param time Delay time in milliseconds
 * @param action Action to perform after delay
 * @returns Number of delayed action to cancel via `clearTimeout`
 * @example
 * ```typescript
 * const timeoutId = withDelay(1000, () => {
 *   console.log("This will be logged after 1 second");
 * });
 *
 * // To cancel the delayed action:
 * // clearTimeout(timeoutId);
 * ```
 */
export const withDelay = (time: number, action: Function): number => {
    return setTimeout(action, time);
};

/**
 * Empty function
 * @example
 * ```typescript
 * // Useful as a default callback or placeholder
 * const callback = someCondition ? actualFunction : emptyFn;
 * callback(); // Does nothing
 * ```
 */
export const emptyFn: ActionFn = () => { };

/**
 * Empty async function
 * @example
 * ```typescript
 * const asyncCallback = someCondition ? actualAsyncFunction : emptyFnAsync;
 * await asyncCallback(); // Does nothing
 * ```
 */
export const emptyFnAsync: ActionFnAsync = async () => { };

/**
 * Wrap function execution to prevent calls in specified delay
 * @description Delays function execution with specified amount of time (ms) to prevent several executions.
 * @example
 *  const fn = () => alert("text");
 *  const handler = debounce(fn, 500);
 *  handler(); // started a timer with 500ms
 *  handler(); // restarted timer with 500ms, previous call will be not executed
 *  handler(); // restarted timer with 500ms, previous call will be not executed & fn will be executed only here
 * @param fn Function to execute
 * @param delay Delay before function execution
 * @returns Wrapped function
 */
export const debounce = (fn: Function, delay: number): Function => {
    let timerId: NodeJS.Timeout | null = null;

    return function(...args: unknown[]) {
        if (!isNullish(timerId)) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
};

/**
 * Create a memoized version of a function that caches results
 * @param fn Function to memoize
 * @param keyResolver Optional function to resolve cache key from arguments (default: first argument)
 * @returns Memoized function
 * @example
 * ```typescript
 * const expensive = (n: number) => { console.log("computing"); return n * 2; };
 * const memoized = memoize(expensive);
 *
 * memoized(5); // logs "computing", returns 10
 * memoized(5); // returns 10 (cached, no log)
 * memoized(3); // logs "computing", returns 6
 * ```
 */
export const memoize = <TArgs extends unknown[], TResult>(
    fn: (...args: TArgs) => TResult,
    keyResolver?: (...args: TArgs) => string,
): ((...args: TArgs) => TResult) => {
    const cache = new Map<string, TResult>();

    return (...args: TArgs): TResult => {
        const key = keyResolver ? keyResolver(...args) : String(args[0]);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};
