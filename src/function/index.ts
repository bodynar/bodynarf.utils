import { ActionFn } from "..";
import { isNullOrUndefined } from "../common";

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

/**
 * Perform action after some delay specified in milliseconds
 * @param time Delay time in milliseconds
 * @param action Action to perform after delay
 * @returns Number of delayed action to cancel via `clearTimeout`
 */
export const withDelay = (time: number, action: Function): number => {
    return setTimeout(action, time);
};

/**
 * Empty function
 */
export const emptyFn: ActionFn = () => { };

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
    let timerId: NodeJS.Timeout;

    return function(...args: unknown[]) {
        if (!isNullOrUndefined(timerId)) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
