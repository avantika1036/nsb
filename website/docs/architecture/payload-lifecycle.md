---
sidebar_label: Payload Lifecycle
sidebar_position: 5
---

# Payload Lifecycle

This page traces the exact, step-by-step sequence a payload follows from the sending application, through the simulated network, to the receiving application — in both PULL and PUSH mode — plus the initialization handshake every client performs before any payload can flow, and the shutdown sequence.


## Complete Payload Lifecycle (PULL Mode)

The four steps that move a payload from sender application → simulated network → receiver application:

```mermaid
sequenceDiagram
    participant AppA as AppClient A
    participant Redis as Redis Cache
    participant Daemon as NSB Daemon
    participant Sim as SimClient
    participant AppB as AppClient B

    Note over AppA,AppB: Step 1 — Send
    AppA->>Redis: store(payload) → payload_key
    AppA->>Daemon: SEND [payload_key, src=A, dest=B]
    Note over Daemon: Store entry in TX buffer

    Note over AppA,AppB: Step 2 — Fetch and relay
    Sim->>Daemon: FETCH request
    Daemon->>Sim: FETCH response [payload_key, metadata]
    Sim->>Redis: checkOut(key) → payload
    Note over Sim: Transmit through simulated network

    Note over AppA,AppB: Step 3 — Post
    Sim->>Redis: store(payload) → payload_key
    Sim->>Daemon: POST [payload_key, src=A, dest=B]
    Note over Daemon: Store entry in RX buffer

    Note over AppA,AppB: Step 4 — Receive
    AppB->>Daemon: RECEIVE request
    Daemon->>AppB: RECEIVE response [payload_key, metadata]
    AppB->>Redis: checkOut(key) → payload
    Note over AppB: Payload available to application
```


## Complete Payload Lifecycle (PUSH Mode)

In PUSH mode, the daemon proactively `FORWARD`s payload entries to clients. No polling is needed.

```mermaid
sequenceDiagram
    participant AppA as AppClient A
    participant Redis as Redis Cache
    participant Daemon as NSB Daemon
    participant Sim as SimClient
    participant AppB as AppClient B

    Note over AppA,AppB: Step 1 — Send
    AppA->>Redis: store(payload) → payload_key
    AppA->>Daemon: SEND [payload_key, src=A, dest=B]

    Note over AppA,AppB: Step 2 — Forward to simulator (no poll)
    Daemon->>Sim: FORWARD [payload_key, metadata]
    Sim->>Redis: checkOut(key) → payload
    Note over Sim: Transmit through simulated network

    Note over AppA,AppB: Step 3 — Post
    Sim->>Redis: store(payload) → payload_key
    Sim->>Daemon: POST [payload_key, src=A, dest=B]

    Note over AppA,AppB: Step 4 — Forward to receiver (no poll)
    Daemon->>AppB: FORWARD [payload_key, metadata]
    AppB->>Redis: checkOut(key) → payload
    Note over AppB: Payload available to application
```

Notice the structural symmetry between the two modes — the same four logical steps occur, but PULL mode has each client actively request ("Request" / "Response"), while PUSH mode has the daemon proactively deliver ("FORWARD"). See [System Modes](/docs/architecture/system-modes) for when to choose each.


## Initialization Handshake

Before any payload can flow, each client performs a **registration handshake** with the daemon:

```mermaid
sequenceDiagram
    participant C as Client
    participant D as NSB Daemon
    participant R as Redis Cache

    Note over C: Construct sub-channel ports (ctrl, send, recv)
    C->>D: INIT [identifier, address, ch_CTRL, ch_SEND, ch_RECV]
    Note over D: Parse INIT, register client, build persistent sub-channels
    D->>C: INIT response [sys_mode, sim_mode, use_db, db_address, db_port, db_num]
    Note over C: Save configuration parameters
    C->>R: Connect at configured address and port
    Note over C,R: Client is ready — send, receive, fetch, post
```

This **dynamic handshake** ensures that the same configuration is understood by the daemon and all endpoints, preventing inconsistent system behavior.


## Shutdown

Any framework component — daemon or client — can initiate shutdown by sending an `EXIT` message to the daemon. The daemon then:

1. Disseminates the EXIT message throughout the system
2. Tears down all transport connections
3. Clients terminate their Redis connections


## Go Deeper

- [Message Flow](/docs/architecture/message-flow) — the operations and status codes referenced in each step above
- [Deep Architecture](/docs/architecture/deep-architecture) — why the daemon never holds payload content, and the abstractions (`Comms`, `DBConnector`) behind `store()` / `checkOut()`
- [Protocol → Initialization Flow](/docs/protocol/initialization-flow) — the same handshake shown with full Protobuf message fields