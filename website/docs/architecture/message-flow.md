---
sidebar_label: Message Flow
sidebar_position: 2
---

# Message Flow

This page details how messages move through NSB at the protocol level — the RabbitMQ queue sequences, the full operations table with channel assignment, and the status codes returned in each response.


## Queue Naming Convention (RabbitMQ Backend)

```
nsb.{channel}.{client_id}
├── nsb.ctrl.{client_id}           # Control channel
├── nsb.send.{client_id}           # Outgoing payload channel
├── nsb.recv.{client_id}           # Incoming payload channel
├── nsb.config.request             # Daemon configuration request queue
└── nsb.config.response.{client_id} # Client-specific config response
```


## RabbitMQ Message Flow

### Client Initialization

```
1. Client creates NSBAppClient or NSBSimClient
2. Client sends INIT to nsb.config.request
3. Daemon responds to nsb.config.response.{client_id}
4. Client receives config and is ready
```

### Message Sending

```
1. App Client calls send(dest_id, payload)
2. Message published with routing_key = nsb.recv.{dest_id}
3. RabbitMQ routes directly to destination's RECV queue
4. No daemon mediation required
```

### Message Fetching (Simulator)

```
1. SimClient calls fetch()
2. Consumes directly from nsb.recv.{simulator_id}
3. Calls post() to return processed message
```

In the RabbitMQ backend, once a client is registered, the broker handles all routing natively — the daemon is only involved during the INIT handshake. Contrast this with the socket backend, where the daemon mediates every message. See [Socket Backend](/docs/backends/socket-backend) vs [RabbitMQ Backend](/docs/backends/rabbitmq-backend) for the full comparison.


## Operations Table

Every `nsbm` message carries a `Manifest` with an `Operation`, `Originator`, and `OpCode`. This table shows which channel each operation travels on and its direction:

| Operation | Originator | Channel | Direction | Description |
|---|---|---|---|---|
| `PING` | Any client | ctrl | ↔ | Liveness check; daemon echoes SUCCESS or FAILURE |
| `INIT` | Any client | ctrl | ↔ | Registration handshake; client sends `IntroDetails`; daemon responds with `ConfigParams` |
| `SEND` | AppClient | send | → Daemon | Submit payload to daemon TX buffer; no acknowledgement |
| `FETCH` | SimClient | recv | ↔ | Poll for outbound payload; daemon responds with MESSAGE or NO_MESSAGE (PULL mode) |
| `POST` | SimClient | send | → Daemon | Deliver arrived payload to daemon RX buffer; no acknowledgement |
| `RECEIVE` | AppClient | recv | ↔ | Poll for delivered payload; daemon responds with MESSAGE or NO_MESSAGE (PULL mode) |
| `FORWARD` | Daemon | recv | Daemon → | Proactively push payload to client (PUSH mode only) |
| `EXIT` | Any client | ctrl | → Daemon | Graceful shutdown signal; no response |

Notice that `SEND` and `POST` both travel on the `send` sub-channel (client → daemon, no response expected), while `FETCH` and `RECEIVE` both travel on `recv` (bidirectional poll/response). This symmetry is intentional — see [Deep Architecture → Multi-Channel Architecture](/docs/architecture/deep-architecture#multi-channel-architecture) for why.


## Status Codes Table

The `OpCode` field on a response tells the client how to interpret the message:

| Code | Used In | Meaning |
|---|---|---|
| `SUCCESS` | PING, INIT, RECEIVE, FETCH | Operation succeeded |
| `FAILURE` | PING, INIT | Operation failed |
| `MESSAGE` | SEND, POST, FETCH, RECEIVE, FORWARD | Message carries a payload or key |
| `NO_MESSAGE` | FETCH, RECEIVE | No payload found for requested node |

For the complete field-by-field schema (including `CLIENT_REQUEST`, `DAEMON_RESPONSE`, `IMPLICIT_TARGET`, and `EXPLICIT_TARGET` — used for routing context rather than final status) see [Protobuf Schema](/docs/protocol/protobuf-schema) and [Operations Reference](/docs/protocol/operations).


## Go Deeper

- [Payload Lifecycle](/docs/architecture/payload-lifecycle) — the exact step-by-step PULL and PUSH sequences these operations compose into
- [Protocol → Initialization Flow](/docs/protocol/initialization-flow) — every message flow shown with full manifest/metadata fields
- [RabbitMQ Backend](/docs/backends/rabbitmq-backend) — complete Python and C++ usage for this transport