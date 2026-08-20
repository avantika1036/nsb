---
sidebar_label: NSBSimClient
sidebar_position: 4
---

# NSBSimClient (Python)

The simulator-side client. Integrates into network simulator code to route payloads through a simulated network.

---

## Constructor

```python
nsb_conn = nsb.NSBSimClient(identifier, server_address, server_port)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `identifier` | `str` | Unique identifier for this simulator client. Must match the corresponding `NSBAppClient` identifier in Per-Node mode. In System-Wide mode, one identifier is used for all. |
| `server_address` | `str` | IP address or hostname of the NSB Daemon. |
| `server_port` | `int` | Port number of the NSB Daemon. |

:::note
In **System-Wide** mode, only one `NSBSimClient` may connect. In **PUSH** mode, the client must remain connected for the duration of the simulation.
:::

---

## `fetch(src_id=None, timeout=None)`

Fetches a payload that was sent by an application client and is waiting to be routed through the simulated network.

```python
entry = nsb_conn.fetch()
# or
entry = nsb_conn.fetch(src_id="node0", timeout=10)
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `src_id` | `str \| None` | `None` | Identifier of the source to fetch from. `None` = fetch the most recent message regardless of source. Overwritten with own ID in Per-Node mode. |
| `timeout` | `int \| None` | `None` | Seconds to wait. `None` = wait indefinitely. `0` = non-blocking poll. |

**Returns:** [`MessageEntry`](/docs/api-reference/python/message-entry) `| None`

**Behavior by mode:**

- **PULL mode:** Sends a FETCH request to the daemon. Daemon responds with `MESSAGE` or `NO_MESSAGE`.
- **PUSH mode:** Waits for forwarded payloads from the daemon/broker.

**Per-Node override:** When `sim_mode` is `PER_NODE`, `src_id` is automatically overwritten with the client's own identifier — it only fetches on its own behalf.

**Example:**

```python
entry = nsb_conn.fetch()
if entry:
    src = entry.source
    dst = entry.destination
    payload = entry.payload
    # Route payload through simulated network...
    nsb_conn.post(src, dst, processed_payload)
```

---

## `listen()`

An asynchronous coroutine for fetching payloads.

```python
async def simulator_loop():
    entry = await nsb_conn.listen()
    if entry:
        src_id = entry.source
        dest_id = entry.destination
        payload = entry.payload
        # Send through simulated network...
```

**Returns:** [`MessageEntry`](/docs/api-reference/python/message-entry) `| None`

**Behavior:** Similar to `fetch()` but for `async`/`await` contexts. See [Async Listeners](/docs/api-reference/python/async-listeners) for a complete runnable example.

---

## `post(src_id, dest_id, payload)`

Notifies NSB that a payload has arrived at its destination within the simulated network and makes it available for reception by the application client.

```python
nsb_conn.post(src_id, dest_id, payload)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `src_id` | `str` | Identifier of the original source application client. |
| `dest_id` | `str` | Identifier of the destination application client. |
| `payload` | `bytes` | The payload data (may have been processed/modified by the simulator). |

**Behavior:** Creates an NSB POST message with the source, destination, and payload, then transmits it to the daemon. The daemon stores or routes it so that `NSBAppClient(dest_id).receive()` can retrieve it.

**Example:**

```python
nsb_conn.post(src_id="node0", dest_id="node1", payload=b"delivered payload")
```

---

## Go Deeper

- [MessageEntry](/docs/api-reference/python/message-entry) — the object returned by `fetch()`
- [NSBAppClient](/docs/api-reference/python/nsb-app-client) — the application-side counterpart
- [Async Listeners](/docs/api-reference/python/async-listeners) — full asyncio usage pattern
- [C++ NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — the equivalent class in C++
