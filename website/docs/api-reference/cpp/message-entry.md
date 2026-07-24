---
sidebar_label: MessageEntry
sidebar_position: 3
---

# MessageEntry (C++)

Returned by `receive()` and `fetch()`. Represents a single message with metadata.

```cpp
struct MessageEntry {
    std::string source;       // identifier of original source
    std::string destination;  // identifier of final destination
    std::string payload_obj;  // raw payload bytes as string
    int payload_size;         // original payload size in bytes

    bool exists() const;      // returns true if entry is populated
};
```


## Usage Pattern

```cpp
MessageEntry entry = nsb_conn.receive();
if (entry.exists()) {
    std::string payload = entry.payload_obj;
    std::string src = entry.source;
    std::string dst = entry.destination;
    // process payload...
}
```


## Note on Bytestrings

The C++ implementation represents payloads as `std::string` constructed from a receive buffer with explicit length. This preserves binary data but note that some simulators (notably OMNeT++ without INET) may mishandle null bytes (`\00`) within strings. This is a known limitation being actively worked on.


## Go Deeper

- [NSBAppClient → receive()](/docs/api-reference/cpp/nsb-app-client) — returns this struct
- [NSBSimClient → fetch()](/docs/api-reference/cpp/nsb-sim-client) — returns this struct
- [Python MessageEntry](/docs/api-reference/python/message-entry) — the equivalent object in Python
- [OMNeT++ Basic Integration](/tutorials/advanced/omnet-basic-integration) — where the null-byte limitation is most relevant