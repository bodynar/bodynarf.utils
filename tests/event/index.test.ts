import { describe, it, expect, vi } from "vitest";

import { once, throttle, EventEmitter } from "../../src/event";

describe("Event utilities", () => {
    describe("once", () => {
        it("should execute function only once", () => {
            let count = 0;
            const increment = () => ++count;
            const onceIncrement = once(increment);

            expect(onceIncrement()).toBe(1);
            expect(onceIncrement()).toBe(1);
            expect(onceIncrement()).toBe(1);
            expect(count).toBe(1);
        });

        it("should handle function with arguments", () => {
            const sum = (a: number, b: number) => a + b;
            const onceSum = once(sum);

            expect(onceSum(2, 3)).toBe(5);
            expect(onceSum(4, 5)).toBe(5);
        });
    });

    describe("throttle", () => {
        it("should limit function execution rate", async () => {
            let count = 0;
            const increment = () => ++count;
            const throttledIncrement = throttle(increment, 50);

            throttledIncrement();
            throttledIncrement();
            throttledIncrement();

            expect(count).toBe(1);

            await new Promise(resolve => setTimeout(resolve, 60));

            throttledIncrement();
            expect(count).toBe(2);
        });
    });

    describe("EventEmitter", () => {
        it("should emit and listen to events", () => {
            const emitter = new EventEmitter();
            const callback = vi.fn();

            emitter.on("test", callback);
            emitter.emit("test", "arg1", "arg2");

            expect(callback).toHaveBeenCalledWith("arg1", "arg2");
        });

        it("should handle once listener", () => {
            const emitter = new EventEmitter();
            const callback = vi.fn();

            emitter.once("test", callback);
            emitter.emit("test", "arg1");
            emitter.emit("test", "arg2");

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith("arg1");
        });

        it("should remove listeners", () => {
            const emitter = new EventEmitter();
            const callback = vi.fn();

            emitter.on("test", callback);
            emitter.emit("test");
            expect(callback).toHaveBeenCalledTimes(1);

            emitter.off("test", callback);
            emitter.emit("test");
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should remove all listeners", () => {
            const emitter = new EventEmitter();
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            emitter.on("test1", callback1);
            emitter.on("test2", callback2);

            emitter.emit("test1");
            emitter.emit("test2");

            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);

            emitter.removeAllListeners();

            emitter.emit("test1");
            emitter.emit("test2");

            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);
        });
    });
});
