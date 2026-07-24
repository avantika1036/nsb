---
sidebar_label: NSBSimClient
sidebar_position: 6
---

# NSBSimClient (C++)

Simulator-side client. Inherits from [NSBClient](/docs/api-reference/cpp/nsb-client).


## Constructor

```cpp
nsb::NSBSimClient nsb_conn(identifier, serverAddress, serverPort);
```

**Parameters:** Same as `NSBAppClient` — see [NSBAppClient → Constructor](/docs/api-reference/cpp/nsb-app-client#constructor).

:::note
In **System-Wide** mode, only one `NSBSimClient` may connect. In **PUSH** mode, the client must remain connected throughout the simulation.
:::


## `fetch()`

Fetches a payload waiting to be transmitted through the simulated network.

```cpp
// Default — fetch the most recent message, default timeout
MessageEntry entry = nsb_conn.fetch();

// With explicit source and timeout
MessageEntry entry = nsb_conn.fetch(&src_id, timeout);

// With timeout only
MessageEntry entry = nsb_conn.fetch(timeout);
```

**Signatures:**

```cpp
MessageEntry fetch(std::string* srcId, int timeout = DAEMON_RESPONSE_TIMEOUT);
MessageEntry fetch(int timeout = DAEMON_RESPONSE_TIMEOUT);
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `srcId` | `std::string*` | `nullptr` | Pointer to source identifier to fetch from. `nullptr` = fetch most recent regardless of source. In Per-Node mode, this is overwritten with own ID. |
| `timeout` | `int` | `DAEMON_RESPONSE_TIMEOUT` (30s) | Seconds to wait. Use `0` for non-blocking poll. |

**Returns:** [`MessageEntry`](/docs/api-reference/cpp/message-entry) — Populated if message found.

**Behavior:** Sends FETCH request to daemon. Daemon responds with MESSAGE or NO_MESSAGE.

**Per-Node override:** In Per-Node mode, `srcId` is automatically set to the client's own identifier.

**Example:**

```cpp
MessageEntry entry = nsb_conn.fetch();
if (entry.exists()) {
    std::string src = entry.source;
    std::string dst = entry.destination;
    std::string payload = entry.payload_obj;
    // Simulate network transmission...
    nsb_conn.post(src, dst, payload);
}
```


## `post(src_id, dest_id, payload)`

Posts a payload as arrived at its destination in the simulated network.

```cpp
std::string result = nsb_conn.post(src_id, dest_id, payload);
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `src_id` | `std::string` | Identifier of the source application client. |
| `dest_id` | `std::string` | Identifier of the destination application client. |
| `payload` | `std::string&` | The payload data to post. |

**Returns:** `std::string` — Status or key from the post operation.

**Behavior:** Creates a POST message with source, destination, and payload, then transmits to the daemon. Makes the payload available for `NSBAppClient(dest_id).receive()`.


## `listenFetch()`

Blocking listener — for use in dedicated fetcher threads.

```cpp
MessageEntry entry = nsb_conn.listenFetch();
```

**Returns:** `MessageEntry`

**Purpose:** Designed for a dedicated thread that blocks waiting for the next payload to simulate, as an alternative to polling `fetch()` in a loop.


## Complete Example

### Application Side (`app_node.cpp`)

```cpp
#include "nsb_client.h"
#include <iostream>

int main() {
    // Initialize
    std::string server = "127.0.0.1";
    int port = 65432;
    nsb::NSBAppClient app("node0", server, port);

    // Send
    std::string outgoing = "Hello, World!";
    app.send("node1", outgoing);

    // Receive
    nsb::MessageEntry entry = app.receive();
    if (entry.exists()) {
        std::cout << "Source: "  << entry.source      << "\n"
                  << "Dest: "    << entry.destination  << "\n"
                  << "Payload: " << entry.payload_obj  << "\n";
    }
    return 0;
}
```

### Simulator Side (`sim_node.cpp`)

```cpp
#include "nsb_client.h"
#include <iostream>

int main() {
    std::string server = "127.0.0.1";
    int port = 65432;
    nsb::NSBSimClient sim("node0", server, port);

    // Fetch payload from NSB
    nsb::MessageEntry entry = sim.fetch();
    if (entry.exists()) {
        std::string src = entry.source;
        std::string dst = entry.destination;
        std::string payload = entry.payload_obj;

        std::cout << "Simulating: " << src << " -> " << dst << "\n";

        // ... simulate network transmission ...

        // Post back when "arrived"
        sim.post(src, dst, payload);
    }
    return 0;
}
```

:::note Note on AI Assistance
Portions of this C++ documentation were generated with assistance from Anthropic's Claude, based on internal code documentation, and were heavily reviewed and edited by human contributors. The NSB team takes full responsibility for accuracy.
:::


## Go Deeper

- [MessageEntry](/docs/api-reference/cpp/message-entry) — the struct returned by `fetch()`
- [NSBAppClient](/docs/api-reference/cpp/nsb-app-client) — the application-side counterpart
- [Python NSBSimClient](/docs/api-reference/python/nsb-sim-client) — the equivalent class in Python
- [Tutorials → Build a Mock Simulator](/tutorials/beginner/build-a-mock-simulator) — a hands-on walkthrough (Python version)