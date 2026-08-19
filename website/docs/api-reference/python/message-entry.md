---
sidebar_label: MessageEntry
sidebar_position: 2
---

# MessageEntry (Python)

When `receive()`, `fetch()`, or `listen()` methods return a payload, they return a `MessageEntry` object. If no payload is available, they return `None`.

---

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `source` | `str` | Identifier of the original sending application client |
| `destination` | `str` | Identifier of the intended receiving application client |
| `payload` | `bytes` | The raw payload bytes |
| `payload_size` | `int` | The original size of the payload in bytes |

---

## Example

```python
entry = nsb_conn.receive()
if entry:
    print(f"Source:       {entry.source}")
    print(f"Destination:  {entry.destination}")
    print(f"Payload size: {entry.payload_size}")
    print(f"Payload:      {entry.payload}")
```

---

## Go Deeper

- [NSBAppClient](/docs/api-reference/python/nsb-app-client) — `receive()` returns this object
- [NSBSimClient](/docs/api-reference/python/nsb-sim-client) — `fetch()` returns this object
- [C++ MessageEntry](/docs/api-reference/cpp/message-entry) — the equivalent struct in C++