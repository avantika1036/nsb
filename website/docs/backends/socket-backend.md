---
sidebar_label: Socket Backend
sidebar_position: 1
---

# Socket Backend

The default transport for NSB — raw TCP sockets, with the daemon actively routing every message.


## Architecture

```
NSBAppClient ──TCP──► NSBDaemon ──TCP──► NSBSimClient
                          │
                        Redis
                      (optional)
```

- Uses raw TCP sockets for all communication
- The daemon actively routes all messages
- Three logical channels per client: `CTRL`, `SEND`, `RECV`
- Best for single-machine setups

**Best for:** Single-machine setups and general use — no broker process to manage, minimal external dependencies, lowest latency floor.

For the rationale behind the 3-channel design, see [Deep Architecture → Multi-Channel Architecture](/docs/architecture/deep-architecture#multi-channel-architecture).


## Backend Comparison

| Feature | Socket Backend | RabbitMQ Backend |
|---|---|---|
| Transport | Raw TCP | AMQP (RabbitMQ) |
| Message Routing | Daemon-mediated | Broker-native |
| Daemon Role | Full router | Config service only |
| Scalability | Single-machine | Horizontal scale |
| Async Implementation | `select()` | `asyncio` + polling |
| Channel Architecture | TCP channels | RabbitMQ queues |
| Protobuf format | Same (`nsbm`) | Same (`nsbm`) |
| PULL/PUSH support | Yes | Yes |
| Simulator modes | Yes | Yes |
| Redis support | Yes | Yes |


## Go Deeper

- [RabbitMQ Backend](/docs/backends/rabbitmq-backend) — the alternative broker-based transport
- [Architecture Overview](/docs/architecture/overview) — where this backend fits in the full system
- [Deep Architecture](/docs/architecture/deep-architecture) — the `Comms` abstraction that makes this backend swappable