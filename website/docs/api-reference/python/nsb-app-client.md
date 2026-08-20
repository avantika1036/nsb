---
sidebar_label: NSBAppClient
sidebar_position: 3
---

# NSBAppClient (Python)

The application-side client. Provides a simplified network interface for your application code.

---

## Constructor

```python
nsb_conn = nsb.NSBAppClient(identifier, server_address, server_port)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `identifier` | `str` | Unique identifier for this client (e.g. `"node0"`). Must match the corresponding `NSBSimClient` identifier when using Per-Node simulator mode. |
| `server_address` | `str` | IP address or hostname where the NSB Daemon is running. |
| `server_port` | `int` | Port number on which the NSB Daemon is listening. |

**Construction behavior.** Upon construction, the client:
1. Connects to the NSB Daemon
2. Sends an INIT message to register itself
3. Receives and stores the system configuration
4. Optionally connects to the Redis database (if `use_db` is enabled)

:::note
Keep the client alive throughout the simulation. In PUSH mode, this is required.
:::

---

## `send(dest_id, payload)`

Sends a payload to a destination through NSB.

```python
key = nsb_conn.send(dest_id, payload)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `dest_id` | `str` | Identifier of the destination application client. |
| `payload` | `bytes` | The data payload to send. |

**Returns:** `str | None` — The Redis key for the stored message if database is enabled, otherwise `None`.

**Behavior:** Fire-and-forget. Creates an NSB SEND message and transmits it to the daemon. The key return is useful for debugging; it is not needed in normal operation.

**Example:**

```python
nsb_conn.send("node1", b"Hello, network!")
```

---

## `receive(dest_id=None, timeout=None)`

Receives a payload via NSB.

```python
entry = nsb_conn.receive()
# or
entry = nsb_conn.receive(dest_id="node0", timeout=10)
# or
entry = nsb_conn.receive(timeout=5)
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `dest_id` | `str \| None` | `None` | The destination client to receive for. Defaults to `None` (self). |
| `timeout` | `int \| None` | `None` | Seconds to wait. `None` = block indefinitely. `0` = poll (non-blocking). |

**Returns:** [`MessageEntry`](/docs/api-reference/python/message-entry) `| None` — A populated `MessageEntry` if a message was received, otherwise `None`.

**Behavior by mode:**

- **PULL mode:** Sends a RECEIVE request to the daemon. Daemon responds with `MESSAGE` (containing payload) or `NO_MESSAGE`.
- **PUSH mode:** Waits on the RECV communication channel using `select` with the given timeout. Use `timeout=0` for polling, `timeout=None` for blocking.

**Example:**

```python
entry = nsb_conn.receive()
if entry:
    process(entry.payload)
else:
    print("No message available")
```

---

## `listen()`

An asynchronous coroutine for receiving payloads.

```python
async def run():
    received = await nsb_conn.listen()
    if received:
        process(received.payload)
```

**Returns:** [`MessageEntry`](/docs/api-reference/python/message-entry) `| None`

**Behavior:** Similar to `receive()` but designed for `async`/`await` contexts. Recommended for implementing asynchronous listener logic in asyncio-based applications. See [Async Listeners](/docs/api-reference/python/async-listeners) for a complete runnable example.

---

## Go Deeper

- [MessageEntry](/docs/api-reference/python/message-entry) — the object returned by `receive()`
- [NSBSimClient](/docs/api-reference/python/nsb-sim-client) — the simulator-side counterpart
- [Async Listeners](/docs/api-reference/python/async-listeners) — full asyncio usage pattern
- [C++ NSBAppClient](/docs/api-reference/cpp/nsb-app-client) — the equivalent class in C++
