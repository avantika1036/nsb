---
sidebar_label: RabbitMQ Backend
sidebar_position: 3
---

# RabbitMQ Backend

NSB supports RabbitMQ as an alternative transport backend to raw TCP sockets. This page covers the architecture, Python usage, C++ usage, configuration, and testing of the RabbitMQ implementation.


## Overview

In the socket backend, the NSB Daemon acts as a central message router. In the RabbitMQ backend, the **RabbitMQ broker handles all message routing** natively, reducing the daemon's role to configuration distribution only.

This brings several advantages:
- Better horizontal scalability for large simulations
- Native message persistence, delivery acknowledgments, and queue durability
- Broker-native routing without daemon bottleneck
- Foundation for advanced messaging patterns (priority queues, dead letter exchanges, multicast)


## Architecture

### Components

| Component | File | Description |
|---|---|---|
| `RabbitMQInterface` | `nsb_rabbitmq.py` | Low-level AMQP transport; manages connections, channels, queues |
| `NSBAppClient` (RMQ) | `nsb_rabbitmq.py` | Application client using RabbitMQ transport |
| `NSBSimClient` (RMQ) | `nsb_rabbitmq.py` | Simulator client using RabbitMQ transport |
| `NSBDaemon` (RMQ) | `nsb_daemon.py` | Configuration-only daemon service |
| `NSBUnified` | `nsb_unified.py` | Drop-in unified client supporting both backends |

### Queue Naming Convention

All queues follow a consistent naming scheme:

```
nsb.{channel}.{client_id}

├── nsb.ctrl.{client_id}              # Control: PING, EXIT
├── nsb.send.{client_id}              # Outgoing payloads (for sim clients to fetch)
├── nsb.recv.{client_id}              # Incoming payloads (for app clients to receive)
├── nsb.config.request                # Daemon initialization queue
└── nsb.config.response.{client_id}  # Client-specific config response
```

### Message Flow

**Client Initialization:**
```
Client → INIT → nsb.config.request
Daemon → Config → nsb.config.response.{client_id}
Client ← receives config, is ready
```

**Application Client Sends:**
```
App.send("dest_id", payload)
  → Published with routing_key = nsb.recv.{dest_id}
  → RabbitMQ routes to dest's RECV queue
  → No daemon involvement
```

**Application Client Receives:**
```
App.receive()
  → Consumes from nsb.recv.{client_id}
  → Returns MessageEntry or None on timeout
```

**Simulator Client Fetches:**
```
Sim.fetch()
  → Consumes from nsb.recv.{sim_id}  (SEND messages routed here)
  → Returns MessageEntry
```

**Simulator Client Posts:**
```
Sim.post(src_id, dest_id, payload)
  → Published with routing_key = nsb.recv.{dest_id}
  → App client's RECV queue receives it
```


## Python Usage

### Prerequisites

```bash
pip install pika redis
```

### Starting the Daemon

**Programmatically:**

```python
from nsb_daemon import NSBDaemon, NSBDaemonConfig

config = NSBDaemonConfig(
    sys_mode=0,           # 0 = PULL, 1 = PUSH
    sim_mode=0,           # 0 = SYSTEM_WIDE, 1 = PER_NODE
    use_db=False,         # True = use Redis for large payloads
    db_address="localhost",
    db_port=6379,
    db_num=0
)

daemon = NSBDaemon("localhost", 5672, config)
daemon.start()
# ... run simulation ...
daemon.stop()
```

**From the command line:**

```bash
python3 rabbit/nsb_daemon.py
```

### Application Client (RabbitMQ-only module)

```python
from nsb_rabbitmq import NSBAppClient

client = NSBAppClient("app_node_0", "localhost", 5672)

# Send a message
client.send("app_node_1", b"Hello, World!")

# Receive a message (timeout in seconds)
msg = client.receive(timeout=5)
if msg:
    print(f"Received from {msg.src_id}: {msg.payload}")

# Cleanup
client.exit()
```

### Simulator Client (RabbitMQ-only module)

```python
from nsb_rabbitmq import NSBSimClient

sim = NSBSimClient("simulator", "localhost", 5672)

# Fetch a message
msg = sim.fetch(timeout=5)
if msg:
    print(f"Simulating: {msg.src_id} -> {msg.dest_id}")
    # Process message through simulation...
    sim.post(msg.src_id, msg.dest_id, b"Processed payload")

# Cleanup
sim.exit()
```

### Asynchronous Operations

```python
import asyncio
from nsb_rabbitmq import NSBAppClient

async def listen_for_messages():
    client = NSBAppClient("listener", "localhost", 5672)
    while True:
        msg = await client.listen()
        if msg:
            print(f"Received: {msg.payload}")

asyncio.run(listen_for_messages())
```


## Unified Client (Recommended)

The `nsb_unified.py` module lets you switch backends with a single parameter. API is identical to standalone clients.

```python
import nsb_unified as nsb

# RabbitMQ backend
app = nsb.NSBAppClient("app_node_0", "localhost", 5672, backend="rabbitmq")
app.send("app_node_1", b"Hello!")
msg = app.receive(timeout=5)
app.exit()

# Socket backend — exact same code, different backend
app = nsb.NSBAppClient("app_node_0", "localhost", 5555, backend="socket")
```

**Via environment variable:**

```bash
export NSB_BACKEND=rabbitmq
export NSB_PORT=5672
```


## C++ RabbitMQ Library

### Prerequisites

```bash
# macOS
brew install rabbitmq-c
brew install simple-amqp-client
```

Protobuf-generated files are pre-built in `cpp/proto/`.

### Build

```bash
mkdir -p cpp/rabbit/build && cd cpp/rabbit/build
cmake ..
make -j
```

Build artifacts:

| File | Description |
|---|---|
| `libnsb_rabbitmq_cpp.a` | RabbitMQ-only static library |
| `libnsb_unified_cpp.a` | Unified library (socket + RabbitMQ) |
| `example_send_recv` | Two RabbitMQ app clients exchanging a message |
| `example_daemon` | Standalone C++ RabbitMQ daemon |
| `example_unified` | Unified client with backend selection via CLI argument |

### Class Hierarchy

```
NSBClientRMQ              (base: INIT, PING, EXIT, config)
├── NSBAppClientRMQ       (send, receive, listen)
└── NSBSimClientRMQ       (fetch, post, listen)
```

### `NSBAppClientRMQ`

```cpp
#include "NSBAppClientRMQ.hpp"

nsb::NSBAppClientRMQ app("my_app", "localhost", 5672);
app.initialize();   // INIT handshake with daemon

// Send to another client
app.send("dest_id", "payload bytes");

// Receive with timeout
nsb::MessageEntry msg;
if (app.receive(msg, /*timeout_sec=*/5)) {
    std::cout << msg.src_id << ": " << msg.payload << std::endl;
}

// Async listen (PUSH mode / background receive)
app.listen([](const nsb::MessageEntry& m) {
    std::cout << "Got: " << m.payload << std::endl;
});
app.stop_listen();
```

### `NSBSimClientRMQ`

```cpp
#include "NSBSimClientRMQ.hpp"

nsb::NSBSimClientRMQ sim("my_sim", "localhost", 5672);
sim.initialize();

nsb::MessageEntry msg;
if (sim.fetch(msg, /*timeout_sec=*/5)) {
    // simulate network effects...
    sim.post(msg.src_id, msg.dest_id, msg.payload);
}

// Async listen
sim.listen([](const nsb::MessageEntry& m) { /* ... */ });
sim.stop_listen();
```

### `NSBDaemonRMQ`

```cpp
#include "NSBDaemonRMQ.hpp"

nsb::NSBDaemonRMQ daemon("localhost", 5672);
daemon.set_config(/*sys_mode=*/0, /*sim_mode=*/0, /*use_db=*/false);
daemon.start();   // runs in background thread
// ...
daemon.stop();
```

### `MessageEntry` (C++ RMQ)

```cpp
struct MessageEntry {
    std::string src_id;
    std::string dest_id;
    std::string payload;
};
```

### Linking in Your CMake Project

```cmake
add_subdirectory(path/to/cpp/rabbit)
target_link_libraries(your_target nsb_rabbitmq_cpp)
```

Or link the static library directly:

```cmake
target_link_libraries(your_target
    /path/to/libnsb_rabbitmq_cpp.a
    SimpleAmqpClient rabbitmq protobuf
)
target_include_directories(your_target PRIVATE /path/to/cpp/rabbit/include)
```

### Running C++ Examples

**RabbitMQ backend:**

```bash
# 1. Start RabbitMQ broker
docker run -d --name rabbitmq -p 5672:5672 rabbitmq:4.1-management

# 2. Start daemon (Python daemon recommended)
python3 rabbit/nsb_daemon.py
# or C++ daemon:
./cpp/rabbit/build/example_daemon

# 3. Run example
./cpp/rabbit/build/example_send_recv
# or unified:
./cpp/rabbit/build/example_unified rabbitmq
```

**Socket backend (using main NSB daemon):**

```bash
# Build main project first
mkdir -p build && cd build && cmake .. && make -j
./bin/nsb_daemon ../config.yaml

# In another terminal
./cpp/rabbit/build/example_unified socket
```


## Cross-Language Interoperability

Python and C++ RabbitMQ clients are **fully wire-compatible**:

- Same Protobuf format: `nsb.proto` → `nsbm` message type
- Same queue naming: `nsb.{channel}.{client_id}`
- Either daemon (Python or C++) works with clients of either language
- Client IDs must be **unique across all clients** on the same broker

This means you can have a Python `NSBAppClient` sending to a C++ `NSBAppClientRMQ` receiver — or vice versa — with no code changes.


## File Index

### Python RabbitMQ Files (`rabbit/`)

| File | Description |
|---|---|
| `nsb_rabbitmq.py` | Main implementation: RabbitMQInterface, NSBAppClient, NSBSimClient |
| `nsb_daemon.py` | Configuration daemon service |
| `nsb_unified.py` | Unified client supporting socket and RabbitMQ backends |
| `example_usage.py` | 5 standalone examples using RabbitMQ-only module |
| `Implementation.md` | Implementation notes and class overview |
| `requirements.txt` | Python dependencies (`pika`, `redis`) |
| `tests/test_unified.py` | Comprehensive test suite |
| `tests/example_unified.py` | 7 examples using the unified client |
| `tests/testing.txt` | Test prerequisites, env variables, troubleshooting |

### C++ RabbitMQ Files (`cpp/rabbit/`)

| File | Description |
|---|---|
| `include/RabbitMQInterface.hpp` | Low-level RabbitMQ transport layer |
| `include/NSBClientRMQ.hpp` | Base client: config, INIT, PING, EXIT |
| `include/NSBAppClientRMQ.hpp` | Application client: send, receive, listen |
| `include/NSBSimClientRMQ.hpp` | Simulator client: fetch, post, listen |
| `include/NSBDaemonRMQ.hpp` | Standalone C++ daemon |
| `src/RabbitMQInterface.cpp` | Transport implementation |
| `src/NSBClientRMQ.cpp` | Base client implementation |
| `src/NSBAppClientRMQ.cpp` | App client implementation |
| `src/NSBSimClientRMQ.cpp` | Sim client implementation |
| `src/NSBDaemonRMQ.cpp` | Daemon implementation |
| `examples/example_send_recv.cpp` | App client demo |
| `examples/example_daemon.cpp` | Daemon demo |
| `examples/example_unified.cpp` | Unified client demo |
| `CMakeLists.txt` | Build configuration |


## Testing

### Python Test Suite

```bash
# Start RabbitMQ and daemon
docker run -d -p 5672:5672 rabbitmq:4.1-management
python3 rabbit/nsb_daemon.py

# Run tests
cd rabbit/tests
python3 test_unified.py
```

The test suite covers:
- Redis integration
- PULL/PUSH modes
- Backend switching (RabbitMQ ↔ socket)
- Simulator operations (fetch/post)
- Latency benchmarks

See `tests/testing.txt` for full prerequisites, environment variables, and troubleshooting guidance.

### Quick Inline Test

```python
from nsb_rabbitmq import NSBAppClient, NSBSimClient

# Start daemon first: python3 nsb_daemon.py

app = NSBAppClient("app", "localhost", 5672)
sim = NSBSimClient("sim", "localhost", 5672)

# Send
app.send("app", b"test payload")

# Fetch and post
msg = sim.fetch(timeout=5)
if msg:
    sim.post(msg.src_id, msg.dest_id, msg.payload)

# Receive
received = app.receive(timeout=5)
print(f"Received: {received.payload if received else 'Nothing'}")

app.exit()
sim.exit()
```


## Go Deeper

- [Socket Backend](/docs/backends/socket-backend) — the default transport this is an alternative to
- [RabbitMQ Enhancements](/docs/backends/rabbitmq-enhancements) — 13 proposed upgrades to this backend
- [Configuration Reference](/docs/configuration/config-reference) — the `NSBDaemonConfig` and environment variable fields used above