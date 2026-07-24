---
sidebar_label: Protobuf Schema
sidebar_position: 2
---

# Protobuf Schema

The complete `nsbm` message definition, with every field, sub-message, and enum explained.


## Full Schema

```protobuf
edition = "2023";

package nsb;

message nsbm {

    // ─── Manifest ───────────────────────────────────────────────────────────
    message Manifest {

        enum Operation {
            PING    = 0;   // Heartbeat / connectivity check
            INIT    = 1;   // Client registration + config request
            SEND    = 2;   // AppClient sending a payload
            FETCH   = 3;   // SimClient fetching a payload
            POST    = 4;   // SimClient posting a delivered payload
            RECEIVE = 5;   // AppClient requesting to receive a payload
            FORWARD = 6;   // Daemon forwarding a message (PUSH mode)
            EXIT    = 7;   // Graceful disconnection
        }
        Operation op = 1;

        enum Originator {
            DAEMON     = 0;  // Message from the NSB Daemon
            APP_CLIENT = 1;  // Message from an NSBAppClient
            SIM_CLIENT = 2;  // Message from an NSBSimClient
        }
        Originator og = 2;

        enum OpCode {
            SUCCESS          = 0;  // Operation succeeded
            FAILURE          = 1;  // Operation failed
            CLIENT_REQUEST   = 2;  // Message is a request from a client
            DAEMON_RESPONSE  = 3;  // Message is a response from the daemon
            IMPLICIT_TARGET  = 4;  // Destination determined implicitly (self)
            EXPLICIT_TARGET  = 5;  // Destination explicitly specified
            MESSAGE          = 6;  // Response contains a payload/message
            NO_MESSAGE       = 7;  // Response contains no payload
        }
        OpCode code = 3;
    }
    Manifest manifest = 1;

    // ─── Metadata ───────────────────────────────────────────────────────────
    message Metadata {
        string src_id       = 1;  // Identifier of the originating client
        string dest_id      = 2;  // Identifier of the destination client
        int32  payload_size = 3;  // Size of the payload in bytes
    }
    Metadata metadata = 2;

    // ─── ConfigParams ────────────────────────────────────────────────────────
    message ConfigParams {
        enum SystemMode {
            PULL = 0;  // Clients poll the daemon for messages
            PUSH = 1;  // Daemon forwards messages to clients automatically
        }
        SystemMode sys_mode = 1;

        enum SimulatorMode {
            SYSTEM_WIDE = 0;  // Single global simulator client
            PER_NODE    = 1;  // One simulator client per simulated node
        }
        SimulatorMode sim_mode = 2;

        bool   use_db     = 3;  // Whether to use Redis for payload storage
        string db_address = 4;  // Redis server address
        int32  db_port    = 5;  // Redis server port
        int32  db_num     = 6;  // Redis database number
    }

    // ─── IntroDetails ────────────────────────────────────────────────────────
    message IntroDetails {
        string identifier = 1;  // Client's unique identifier
        string address    = 2;  // Client's IP address
        int32  ch_CTRL    = 3;  // Control channel port
        int32  ch_SEND    = 4;  // Send channel port
        int32  ch_RECV    = 5;  // Receive channel port
    }

    // ─── Payload (oneof) ─────────────────────────────────────────────────────
    oneof message {
        bytes        payload = 3;  // Raw payload bytes
        string       msg_key = 4;  // Redis key (when use_db = true)
        IntroDetails intro   = 5;  // Client introduction details (INIT)
        ConfigParams config  = 6;  // System configuration (INIT response)
    }
}
```


## Message Fields Explained

### `manifest` Field

Contains routing metadata for every NSB message. Always present. For the full value tables of `op`, `og`, and `code`, see [Operations Reference](/docs/protocol/operations).

### `metadata` Field

Contains source/destination information and payload size. Present in most messages carrying payload.

| Field | Type | Description |
|---|---|---|
| `src_id` | `string` | Identifier of the originating `NSBAppClient` |
| `dest_id` | `string` | Identifier of the destination `NSBAppClient` |
| `payload_size` | `int32` | Size of the payload in bytes |

### `message` Field (oneof)

Contains the actual data being exchanged. Exactly one of these is set per message:

| Field | Type | Used When |
|---|---|---|
| `payload` | `bytes` | Direct payload transmission (when `use_db = false`) |
| `msg_key` | `string` | Redis lookup key (when `use_db = true`) |
| `intro` | `IntroDetails` | Client sending INIT introduction message |
| `config` | `ConfigParams` | Daemon responding with system configuration |


### `IntroDetails` Message

Sent by a client during INIT to identify itself:

| Field | Type | Description |
|---|---|---|
| `identifier` | `string` | Client's unique name (e.g. `"node0"`) |
| `address` | `string` | Client's IP address |
| `ch_CTRL` | `int32` | Port for the control channel |
| `ch_SEND` | `int32` | Port for the send channel |
| `ch_RECV` | `int32` | Port for the receive channel |


### `ConfigParams` Message

Returned by the daemon in response to an INIT message:

| Field | Type | Description |
|---|---|---|
| `sys_mode` | `SystemMode` | PULL (0) or PUSH (1) |
| `sim_mode` | `SimulatorMode` | SYSTEM_WIDE (0) or PER_NODE (1) |
| `use_db` | `bool` | Whether Redis is in use |
| `db_address` | `string` | Redis server address |
| `db_port` | `int32` | Redis server port |
| `db_num` | `int32` | Redis database number |


## Go Deeper

- [Operations Reference](/docs/protocol/operations) — full `op`, `og`, and `code` value tables
- [Initialization Flow](/docs/protocol/initialization-flow) — these fields populated in real message flows
- [Architecture Overview → Protocol](/docs/architecture/overview#protocol-protobuf-messages-nsbm) — where this schema fits in the bigger picture