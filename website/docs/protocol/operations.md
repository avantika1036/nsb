---
sidebar_label: Operations Reference
sidebar_position: 3
---

# Operations Reference

The full value tables for the three enums inside `Manifest`: `op` (Operation), `og` (Originator), and `code` (OpCode).


## `op` — Operation

Identifies what the message is doing:

| Value | Enum | Sent By | Description |
|---|---|---|---|
| 0 | `PING` | Any | Heartbeat check — verify the daemon or a client is alive |
| 1 | `INIT` | Client | Initial handshake — client introduces itself and requests configuration |
| 2 | `SEND` | AppClient | Application sending a payload for network simulation |
| 3 | `FETCH` | SimClient | Simulator requesting a payload to route through the simulated network |
| 4 | `POST` | SimClient | Simulator reporting a payload has arrived at its destination |
| 5 | `RECEIVE` | AppClient | Application requesting a payload that has arrived from the simulator |
| 6 | `FORWARD` | Daemon | Daemon proactively pushing a message to a client (PUSH mode only) |
| 7 | `EXIT` | Client | Client gracefully disconnecting from the daemon |


## `og` — Originator

Identifies which side sent the message:

| Value | Enum | Meaning |
|---|---|---|
| 0 | `DAEMON` | Sent by the NSB Daemon |
| 1 | `APP_CLIENT` | Sent by an `NSBAppClient` |
| 2 | `SIM_CLIENT` | Sent by an `NSBSimClient` |


## `code` — OpCode

Provides additional context about the message's intent or response status:

| Value | Enum | Meaning |
|---|---|---|
| 0 | `SUCCESS` | The operation succeeded |
| 1 | `FAILURE` | The operation failed |
| 2 | `CLIENT_REQUEST` | This message is a request from a client |
| 3 | `DAEMON_RESPONSE` | This message is a response from the daemon |
| 4 | `IMPLICIT_TARGET` | Destination is inferred (e.g. "receive for self") |
| 5 | `EXPLICIT_TARGET` | Destination was explicitly specified |
| 6 | `MESSAGE` | The response carries a payload |
| 7 | `NO_MESSAGE` | The response has no payload (nothing available) |


## Go Deeper

- [Protobuf Schema](/docs/protocol/protobuf-schema) — where these enums are defined inside `Manifest`
- [Initialization Flow](/docs/protocol/initialization-flow) — every message flow shown with real `op`/`og`/`code` values
- [Architecture → Message Flow](/docs/architecture/message-flow) — these operations mapped to channels and direction