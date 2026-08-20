---
sidebar_label: Initialization Flow
sidebar_position: 4
---

# Initialization Flow

The five typical message flows that occur in NSB, shown with their complete `manifest`, `metadata`, and `message` field values — plus how to construct, serialize, and parse the `nsbm` Protobuf message in both Python and C++.


## 1. Client INIT Handshake

```mermaid
sequenceDiagram
    participant C as Client
    participant D as NSB Daemon

    Note over C: op=INIT, og=APP_CLIENT, code=CLIENT_REQUEST
    C->>D: INIT [IntroDetails: identifier, address, ch_CTRL, ch_SEND, ch_RECV]
    Note over D: Registers client, builds persistent sub-channels
    Note over D: op=INIT, og=DAEMON, code=DAEMON_RESPONSE
    D->>C: INIT [ConfigParams: sys_mode, sim_mode, use_db, db_address, db_port, db_num]
```


## 2. AppClient SEND

```mermaid
sequenceDiagram
    participant A as AppClient
    participant D as NSB Daemon

    Note over A: op=SEND, og=APP_CLIENT, code=EXPLICIT_TARGET
    A->>D: SEND [src_id=node0, dest_id=node1, payload or msg_key]
    Note over D: Stores entry in TX buffer — no acknowledgement sent
```


## 3. SimClient FETCH (PULL mode)

```mermaid
sequenceDiagram
    participant S as SimClient
    participant D as NSB Daemon

    Note over S: op=FETCH, og=SIM_CLIENT, code=CLIENT_REQUEST
    S->>D: FETCH request
    alt message available
        Note over D: op=FETCH, og=DAEMON, code=MESSAGE
        D->>S: FETCH response [src_id=node0, dest_id=node1, payload]
    else no message
        Note over D: op=FETCH, og=DAEMON, code=NO_MESSAGE
        D->>S: FETCH response [NO_MESSAGE]
    end
```


## 4. SimClient POST

```mermaid
sequenceDiagram
    participant S as SimClient
    participant R as Redis
    participant D as NSB Daemon

    Note over S: op=POST, og=SIM_CLIENT
    S->>R: store(payload) → payload_key
    S->>D: POST [src_id=node0, dest_id=node1, payload_key]
    Note over D: Stores entry in RX buffer — no acknowledgement sent
```


## 5. AppClient RECEIVE (PULL mode)

```mermaid
sequenceDiagram
    participant A as AppClient
    participant D as NSB Daemon

    Note over A: op=RECEIVE, og=APP_CLIENT, code=CLIENT_REQUEST
    A->>D: RECEIVE request [dest_id optional]
    alt message available
        Note over D: code=MESSAGE
        D->>A: RECEIVE response [src, dest, size, payload]
    else no message
        Note over D: code=NO_MESSAGE
        D->>A: RECEIVE response [NO_MESSAGE]
    end
```


## Using the Proto in Python

```python
from proto.proto import nsb_pb2

# Create a message
msg = nsb_pb2.nsbm()
msg.manifest.op = nsb_pb2.nsbm.Manifest.Operation.SEND
msg.manifest.og = nsb_pb2.nsbm.Manifest.Originator.APP_CLIENT
msg.manifest.code = nsb_pb2.nsbm.Manifest.OpCode.CLIENT_REQUEST
msg.metadata.src_id = "node0"
msg.metadata.dest_id = "node1"
msg.payload = b"Hello!"

# Serialize
data = msg.SerializeToString()

# Deserialize
received = nsb_pb2.nsbm()
received.ParseFromString(data)
print(received.metadata.src_id)
```


## Using the Proto in C++

```cpp
#include "nsb.pb.h"

nsb::nsbm msg;
msg.mutable_manifest()->set_op(nsb::nsbm::Manifest::SEND);
msg.mutable_manifest()->set_og(nsb::nsbm::Manifest::APP_CLIENT);
msg.mutable_metadata()->set_src_id("node0");
msg.mutable_metadata()->set_dest_id("node1");
msg.set_payload("Hello!");

// Serialize
std::string serialized;
msg.SerializeToString(&serialized);

// Deserialize
nsb::nsbm received;
received.ParseFromString(serialized);
std::cout << received.metadata().src_id() << std::endl;
```


## Go Deeper

- [Protobuf Schema](/docs/protocol/protobuf-schema) — the full message definition these flows are built from
- [Operations Reference](/docs/protocol/operations) — every `op`/`og`/`code` value used above
- [Payload Lifecycle](/docs/architecture/payload-lifecycle) — these same flows shown as the higher-level PULL/PUSH lifecycle