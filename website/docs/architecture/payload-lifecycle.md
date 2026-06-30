---
sidebar_label: Payload Lifecycle
sidebar_position: 5
---

# Payload Lifecycle

This page traces the exact, step-by-step sequence a payload follows from the sending application, through the simulated network, to the receiving application — in both PULL and PUSH mode — plus the initialization handshake every client performs before any payload can flow, and the shutdown sequence.


## Complete Payload Lifecycle (PULL Mode)

The four steps that move a payload from sender application → simulated network → receiver application:

```
① AppA.send("B", data)
   ├── Comms.store(payload) → payload_key
   ├── [SEND message: payload_key + metadata] → Daemon
   └── Daemon stores payload entry in TX buffer

② SimClient.fetch()
   ├── [FETCH Request] → Daemon
   ├── Daemon searches TX buffer
   ├── [FETCH Response: payload_key + metadata] ← Daemon
   ├── (optional) SimClient.checkOut(key) → payload
   └── Transmit payload through simulated network

③ SimClient.post("A", "B", payload)
   ├── Comms.store(payload) → payload_key  (if use_db)
   ├── [POST message: payload_key + metadata] → Daemon
   └── Daemon stores payload entry in RX buffer

④ AppB.receive()
   ├── [RECV Request] → Daemon
   ├── Daemon searches RX buffer
   ├── [RECV Response: payload_key + metadata] ← Daemon
   ├── Comms.checkOut(key) → payload
   └── Payload available to application
```


## Complete Payload Lifecycle (PUSH Mode)

In PUSH mode, the daemon proactively `FORWARD`s payload entries to clients. No polling is needed.

```
① AppA.send("B", data)
   ├── Comms.store(payload) → payload_key
   └── [SEND message] → Daemon
       └── Daemon immediately [FORWARD]s → SimClient.listen()

② SimClient.listen() receives FORWARD
   ├── (optional) payload checkout from cache
   └── Transmit payload through simulated network

③ SimClient.post("A", "B", payload)
   └── [POST message] → Daemon
       └── Daemon immediately [FORWARD]s → AppB.listen()

④ AppB.listen() receives FORWARD
   ├── Comms.checkOut(key) → payload
   └── Payload available to application
```

Notice the structural symmetry between the two modes — the same four logical steps occur, but PULL mode has each client actively request ("Request" / "Response"), while PUSH mode has the daemon proactively deliver ("FORWARD"). See [System Modes](/docs/architecture/system-modes) for when to choose each.


## Initialization Handshake

Before any payload can flow, each client performs a **registration handshake** with the daemon:

```
Client:
  1. Construct sub-channel ports (ctrl, send, recv)
  2. Open temporary connection to daemon
  3. Send INIT message with: { identifier, address, ch_CTRL, ch_SEND, ch_RECV }

Daemon:
  4. Parse INIT message
  5. Register client in client registry
  6. Construct persistent sub-channel connections to client
  7. Respond with INIT message containing: { sys_mode, sim_mode, use_db, db_address, db_port, db_num }

Client:
  8. Receive daemon's INIT response
  9. Save configuration parameters
  10. Connect to Redis cache at configured address/port
  11. Ready to send/receive/fetch/post
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