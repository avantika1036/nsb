---
sidebar_label: Config Struct
sidebar_position: 2
---

# Key Constants & Config Struct


## Key Constants

Defined in `nsb.h`:

```cpp
#define SERVER_CONNECTION_TIMEOUT  10    // seconds — TCP connection timeout
#define DAEMON_RESPONSE_TIMEOUT    30    // seconds — default response timeout
#define RECEIVE_BUFFER_SIZE        4096  // bytes
#define SEND_BUFFER_SIZE           4096  // bytes
```

| Constant | Value | Meaning |
|---|---|---|
| `SERVER_CONNECTION_TIMEOUT` | `10` seconds | TCP connection timeout |
| `DAEMON_RESPONSE_TIMEOUT` | `30` seconds | Default response timeout used by `receive()` and `fetch()` |
| `RECEIVE_BUFFER_SIZE` | `4096` bytes | Size of the internal receive buffer |
| `SEND_BUFFER_SIZE` | `4096` bytes | Size of the internal send buffer |


## `Config` Struct

Populated automatically during client initialization from the daemon's INIT response.

```cpp
struct Config {
    enum class SystemMode { PULL = 0, PUSH = 1 };
    enum class SimulatorMode { SYSTEM_WIDE = 0, PER_NODE = 1 };

    SystemMode SYSTEM_MODE;
    SimulatorMode SIMULATOR_MODE;
    bool USE_DB;
    std::string DB_ADDRESS;
    int DB_PORT;
    int DB_NUM;
};
```

Accessible via `client.cfg` after initialization.


## Go Deeper

- [NSBClient](/docs/api-reference/cpp/nsb-client) — the base class that performs the INIT handshake populating this struct
- [Configuration Reference](/docs/configuration/config-reference) — the YAML fields these values are sourced from