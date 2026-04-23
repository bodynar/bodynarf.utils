import { describe, it, expect, vi } from "vitest";

import { EventEmitter } from "../../src/event";

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

    it("should not throw when calling off on a non-registered event", () => {
        const emitter = new EventEmitter();
        const callback = vi.fn();

        expect(() => emitter.off("nonexistent", callback)).not.toThrow();
    });

    it("should not throw when emitting a non-registered event", () => {
        const emitter = new EventEmitter();

        expect(() => emitter.emit("nonexistent", "arg")).not.toThrow();
    });

    it("should remove only listeners for specified event", () => {
        const emitter = new EventEmitter();
        const callback1 = vi.fn();
        const callback2 = vi.fn();

        emitter.on("event1", callback1);
        emitter.on("event2", callback2);

        emitter.removeAllListeners("event1");

        emitter.emit("event1");
        emitter.emit("event2");

        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).toHaveBeenCalledTimes(1);
    });
});
