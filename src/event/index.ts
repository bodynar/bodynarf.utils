import { isNullOrUndefined } from "..";

/**
 * Execute function only once
 * @param fn Function to execute only once
 * @returns Wrapped function that executes only once
 * @example
 * ```typescript
 * const initialize = once(() => {
 *     console.log("Initializing...");
 *     // initialization code here
 * });
 *
 * initialize(); // "Initializing..." - executed
 * initialize(); // not executed
 * initialize(); // not executed
 * ```
 */
export const once = <T extends (...args: any[]) => any>(fn: T): T => {
    let called = false;
    let result: ReturnType<T>;

    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    } as T;
};

/**
 * Limit function execution rate
 * @param fn Function to throttle
 * @param delay Delay in milliseconds
 * @returns Throttled function
 * @example
 * ```typescript
 * const throttledHandler = throttle((event) => {
 *     console.log("Handling event:", event);
 *     // expensive operation here
 * }, 1000);
 *
 * // This will only execute once per second
 * throttledHandler("event1");
 * throttledHandler("event2"); // ignored if called within 1 second
 * throttledHandler("event3"); // ignored if called within 1 second
 * ```
 */
export const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
    let lastExecutionTime = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
        const now = Date.now();

        if (now - lastExecutionTime >= delay) {
            lastExecutionTime = now;
            return fn.apply(this, args);
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                lastExecutionTime = Date.now();
                fn.apply(this, args);
                timeoutId = null;
            }, delay - (now - lastExecutionTime));
        }
    } as T;
};

/**
 * Simple event emitter implementation
 * @example
 * ```typescript
 * const emitter = new EventEmitter();
 *
 * // Subscribe to event
 * emitter.on("data", (data) => {
 *     console.log("Received data:", data);
 * });
 *
 * // Subscribe to event once
 * emitter.once("init", () => {
 *     console.log("Initialized!");
 * });
 *
 * // Emit events
 * emitter.emit("init"); // "Initialized!" - executed
 * emitter.emit("init"); // not executed (once listener)
 * emitter.emit("data", { id: 1, value: "test" }); // "Received data: { id: 1, value: "test" }"
 *
 * // Unsubscribe
 * const callback = (data) => console.log("Callback:", data);
 * emitter.on("test", callback);
 * emitter.off("test", callback);
 * ```
 */
export class EventEmitter {
    private events: Record<string, Array<Function>> = {};

    /**
     * Subscribe to event
     * @param event Event name
     * @param callback Callback function
     * @example
     * ```typescript
     * const emitter = new EventEmitter();
     *
     * emitter.on("data", (data) => {
     *     console.log("Received data:", data);
     * });
     *
     * emitter.emit("data", { id: 1, value: "test" });
     * // Logs: "Received data: { id: 1, value: "test" }"
     * ```
     */
    on(event: string, callback: Function): void {
        if (isNullOrUndefined(this.events[event])) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * Subscribe to event and unsubscribe after first execution
     * @param event Event name
     * @param callback Callback function
     * @example
     * ```typescript
     * const emitter = new EventEmitter();
     *
     * emitter.once("init", () => {
     *     console.log("Initialized!");
     * });
     *
     * emitter.emit("init"); // Logs: "Initialized!"
     * emitter.emit("init"); // No log (callback was unsubscribed after first execution)
     * ```
     */
    once(event: string, callback: Function): void {
        const wrappedCallback = (...args: any[]) => {
            callback(...args);
            this.off(event, wrappedCallback);
        };
        this.on(event, wrappedCallback);
    }

    /**
     * Unsubscribe from event
     * @param event Event name
     * @param callback Callback function
     * @example
     * ```typescript
     * const emitter = new EventEmitter();
     *
     * const callback = (data) => console.log("Callback:", data);
     * emitter.on("test", callback);
     *
     * emitter.emit("test", "data"); // Logs: "Callback: data"
     *
     * emitter.off("test", callback);
     * emitter.emit("test", "data"); // No log (callback was unsubscribed)
     * ```
     */
    off(event: string, callback: Function): void {
        if (isNullOrUndefined(this.events[event])) {
            return;
        }

        const index = this.events[event].indexOf(callback);
        if (index !== -1) {
            this.events[event].splice(index, 1);
        }
    }

    /**
     * Emit event
     * @param event Event name
     * @param args Arguments to pass to callbacks
     * @example
     * ```typescript
     * const emitter = new EventEmitter();
     *
     * emitter.on("data", (data, extra) => {
     *     console.log("Received data:", data, extra);
     * });
     *
     * emitter.emit("data", { id: 1 }, "extra info");
     * // Logs: "Received data: { id: 1 } extra info"
     * ```
     */
    emit(event: string, ...args: any[]): void {
        if (isNullOrUndefined(this.events[event])) {
            return;
        }

        // Create a copy of the array to avoid issues when callbacks modify the listeners
        const callbacks = [...this.events[event]];
        for (const callback of callbacks) {
            callback(...args);
        }
    }

    /**
     * Remove all listeners for event or all events
     * @param event Event name (optional)
     * @example
     * ```typescript
     * const emitter = new EventEmitter();
     *
     * emitter.on("event1", () => console.log("Event 1"));
     * emitter.on("event2", () => console.log("Event 2"));
     *
     * // Remove all listeners for a specific event
     * emitter.removeAllListeners("event1");
     * emitter.emit("event1"); // No log
     * emitter.emit("event2"); // Logs: "Event 2"
     *
     * // Remove all listeners for all events
     * emitter.removeAllListeners();
     * emitter.emit("event2"); // No log
     * ```
     */
    removeAllListeners(event?: string): void {
        if (isNullOrUndefined(event)) {
            this.events = {};
        } else {
            delete this.events[event!];
        }
    }
}
