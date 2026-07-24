---
sidebar_label: NSBClient (Base Class)
sidebar_position: 4
---

# NSBClient (Base Class)

Both `NSBAppClient` and `NSBSimClient` inherit from `NSBClient`. You typically do not instantiate this directly.

```cpp
class NSBClient {
public:
    NSBClient(const std::string& identifier, std::string serverAddress, int serverPort);
    ~NSBClient();

    const std::string getId() const;  // returns the client identifier
    void initialize();                // sends INIT to daemon, receives config
    bool ping();                      // sends PING, returns true if daemon responds
    void exit();                      // graceful EXIT message to daemon
};
```


## Method Descriptions

### `getId()`
Returns the client identifier passed into the constructor.

### `initialize()`
Sends an INIT message to the daemon and receives the system [Config struct](/docs/api-reference/cpp/config-struct) in response. Called automatically by the `NSBAppClient` and `NSBSimClient` constructors — you don't need to call this yourself in normal usage.

### `ping()`
Sends a PING message and returns `true` if the daemon responds. Useful for liveness checks.

### `exit()`
Sends a graceful EXIT message to the daemon, signaling disconnection.


## Go Deeper

- [NSBAppClient](/docs/api-reference/cpp/nsb-app-client) — application-side subclass
- [NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — simulator-side subclass
- [Payload Lifecycle → Initialization Handshake](/docs/architecture/payload-lifecycle#initialization-handshake) — the full INIT sequence `initialize()` performs