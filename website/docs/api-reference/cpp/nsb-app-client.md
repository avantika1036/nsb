---
sidebar_label: NSBAppClient
sidebar_position: 5
---

# NSBAppClient (C++)

Application-side client. Inherits from [NSBClient](/docs/api-reference/cpp/nsb-client).


## Constructor

```cpp
nsb::NSBAppClient nsb_conn(identifier, serverAddress, serverPort);
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `identifier` | `const std::string&` | Unique client identifier (e.g. `"node0"`). Must match `NSBSimClient` identifier in Per-Node mode. |
| `serverAddress` | `std::string&` | IP address or hostname of the NSB Daemon. |
| `serverPort` | `int` | Port number of the NSB Daemon. |

**Construction behavior.** Upon construction, the client connects to the daemon, sends INIT, receives system configuration, and optionally connects to Redis.


## `send(dest_id, payload)`

Sends a payload to a destination via NSB.

```cpp
std::string key = nsb_conn.send(dest_id, payload);
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `dest_id` | `const std::string` | Identifier of the destination application client. |
| `payload` | `std::string` | The payload data to send. |

**Returns:** `std::string` — Redis key for stored message (if database is configured), otherwise empty string.

**Behavior:** Fire-and-forget. Creates a SEND message and transmits to daemon. Daemon routes to simulator.

**Example:**

```cpp
std::string payload = "Hello, World!";
nsb_conn.send("node1", payload);
```


## `receive()`

Receives a payload via NSB.

```cpp
// Default — receive for self, with default timeout
MessageEntry entry = nsb_conn.receive();

// With explicit destination and timeout
MessageEntry entry = nsb_conn.receive(&dest_id, timeout);

// With timeout only
MessageEntry entry = nsb_conn.receive(timeout);
```

**Signatures:**

```cpp
MessageEntry receive(std::string* destId, int timeout = DAEMON_RESPONSE_TIMEOUT);
MessageEntry receive(int timeout = DAEMON_RESPONSE_TIMEOUT);
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `destId` | `std::string*` | `nullptr` | Pointer to destination identifier. Pass `nullptr` to receive for self. |
| `timeout` | `int` | `DAEMON_RESPONSE_TIMEOUT` (30s) | Seconds to wait. Use `0` for non-blocking poll. |

**Returns:** [`MessageEntry`](/docs/api-reference/cpp/message-entry) — Populated if message found; call `exists()` to check.

**Behavior by mode:**

- **PULL mode:** Sends RECEIVE request to daemon. Daemon responds with MESSAGE or NO_MESSAGE.
- **PUSH mode:** Waits on RECV channel using `select` with given timeout. Use `timeout=0` for polling.

**Example:**

```cpp
MessageEntry entry = nsb_conn.receive();
if (entry.exists()) {
    std::string payload = entry.payload_obj;
    // process...
}
```


## `listenReceive()`

Blocking listener — for use in dedicated listener threads.

```cpp
MessageEntry entry = nsb_conn.listenReceive();
```

**Returns:** `MessageEntry`

**Purpose:** Designed for a dedicated thread that blocks waiting for the next incoming payload, as an alternative to polling `receive()` in a loop.


## Go Deeper

- [MessageEntry](/docs/api-reference/cpp/message-entry) — the struct returned by `receive()`
- [NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — the simulator-side counterpart, plus complete app/sim examples
- [Python NSBAppClient](/docs/api-reference/python/nsb-app-client) — the equivalent class in Python