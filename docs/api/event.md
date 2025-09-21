# Event Utilities

Utilities for event management, including once, throttle, and EventEmitter.

## Functions

### once

Executes a function only once.

```typescript
import { once } from "@bodynarf/utils";

const initialize = once(() => {
    console.log("Initializing...");
    // initialization code here
});

initialize(); // "Initializing..." - executed
initialize(); // not executed
initialize(); // not executed
```

### throttle

Limits the execution rate of a function.

```typescript
import { throttle } from "@bodynarf/utils";

const throttledHandler = throttle((event) => {
    console.log("Handling event:", event);
    // expensive operation here
}, 1000);

// This will only execute once per second
throttledHandler("event1");
throttledHandler("event2"); // ignored if called within 1 second
throttledHandler("event3"); // ignored if called within 1 second
```

## EventEmitter

A simple event emitter implementation.

### on

Subscribes to an event.

```typescript
import { EventEmitter } from "@bodynarf/utils";

const emitter = new EventEmitter();

emitter.on("data", (data) => {
    console.log("Received data:", data);
});

emitter.emit("data", { id: 1, value: "test" });
// Logs: "Received data: { id: 1, value: "test" }"
```

### once

Subscribes to an event and unsubscribes after the first execution.

```typescript
import { EventEmitter } from "@bodynarf/utils";

const emitter = new EventEmitter();

emitter.once("init", () => {
    console.log("Initialized!");
});

emitter.emit("init"); // Logs: "Initialized!"
emitter.emit("init"); // No log (callback was unsubscribed after first execution)
```

### off

Unsubscribes from an event.

```typescript
import { EventEmitter } from "@bodynarf/utils";

const emitter = new EventEmitter();

const callback = (data) => console.log("Callback:", data);
emitter.on("test", callback);

emitter.emit("test", "data"); // Logs: "Callback: data"

emitter.off("test", callback);
emitter.emit("test", "data"); // No log (callback was unsubscribed)
```

### emit

Emits an event.

```typescript
import { EventEmitter } from "@bodynarf/utils";

const emitter = new EventEmitter();

emitter.on("data", (data, extra) => {
    console.log("Received data:", data, extra);
});

emitter.emit("data", { id: 1 }, "extra info");
// Logs: "Received data: { id: 1 } extra info"
```

### removeAllListeners

Removes all listeners for an event or all events.

```typescript
import { EventEmitter } from "@bodynarf/utils";

const emitter = new EventEmitter();

emitter.on("event1", () => console.log("Event 1"));
emitter.on("event2", () => console.log("Event 2"));

// Remove all listeners for a specific event
emitter.removeAllListeners("event1");
emitter.emit("event1"); // No log
emitter.emit("event2"); // Logs: "Event 2"

// Remove all listeners for all events
emitter.removeAllListeners();
emitter.emit("event2"); // No log
