---
sidebar_label: Glossary
sidebar_position: 4
---

# Glossary

Short definitions for NSB's core terminology, each linked to the page that covers it in full.


**NSB Daemon** — The central server process that registers clients, distributes configuration, and routes payloads between application clients and simulator clients. See [Architecture Overview](/docs/architecture/overview#core-components).

**NSBAppClient** — The application-side client class. Presents a simplified `send()`/`receive()` interface so an application can communicate over NSB as if it were a regular network. See [Python](/docs/api-reference/python/nsb-app-client) / [C++](/docs/api-reference/cpp/nsb-app-client).

**NSBSimClient** — The simulator-side client class. Presents a `fetch()`/`post()` interface that integrates a network simulator into the NSB pipeline. See [Python](/docs/api-reference/python/nsb-sim-client) / [C++](/docs/api-reference/cpp/nsb-sim-client).

**MessageEntry** — The object/struct returned by `receive()`, `fetch()`, and `listen()`, containing the source, destination, payload, and payload size of a delivered message. See [Python](/docs/api-reference/python/message-entry) / [C++](/docs/api-reference/cpp/message-entry).

**PULL Mode** — A system mode (`mode: 0`) where clients explicitly poll the daemon for messages; no message is delivered unless requested. See [System Modes](/docs/architecture/system-modes).

**PUSH Mode** — A system mode (`mode: 1`) where the daemon automatically forwards payloads to clients as soon as they're available, requiring persistent connections. See [System Modes](/docs/architecture/system-modes).

**System-Wide Mode** — A simulator mode (`simulator_mode: 0`) where a single `NSBSimClient` handles all message routing for the entire simulation. Used by top-down simulators like ns-3. See [Simulator Modes](/docs/architecture/simulator-modes).

**Per-Node Mode** — A simulator mode (`simulator_mode: 1`) where each simulated node has its own `NSBSimClient`, identifier-matched to its corresponding `NSBAppClient`. Used by bottom-up simulators like OMNeT++. See [Simulator Modes](/docs/architecture/simulator-modes).

**Payload** — The actual data being transmitted between an application and a network simulator through NSB — raw bytes in Python, a `std::string` in C++. See [Payload Lifecycle](/docs/architecture/payload-lifecycle).

**Redis Key** — A short (`<32 byte>`) lookup string returned when a payload is cached in Redis, transmitted through the bridge instead of the full payload to keep bridge performance independent of payload size. See [Redis Storage](/docs/backends/redis-storage).

**`nsbm`** — The single Protobuf message type used for all communication between the daemon, application clients, and simulator clients in NSB. See [Protobuf Schema](/docs/protocol/protobuf-schema).

**INIT Handshake** — The registration sequence every client performs on startup: introducing itself to the daemon and receiving the system configuration in response. See [Payload Lifecycle → Initialization Handshake](/docs/architecture/payload-lifecycle#initialization-handshake).

**`fetch()`** — The `NSBSimClient` method that retrieves a payload waiting to be routed through the simulated network. See [Python](/docs/api-reference/python/nsb-sim-client#fetchsrc_idnone-timeoutnone) / [C++](/docs/api-reference/cpp/nsb-sim-client#fetch).

**`post()`** — The `NSBSimClient` method that notifies NSB a payload has arrived at its destination within the simulated network. See [Python](/docs/api-reference/python/nsb-sim-client#postsrc_id-dest_id-payload) / [C++](/docs/api-reference/cpp/nsb-sim-client#postsrc_id-dest_id-payload).

**Transport Backend** — The underlying mechanism NSB uses to move messages between clients and the daemon — either raw TCP sockets (default) or RabbitMQ (AMQP). See [Socket Backend](/docs/backends/socket-backend) / [RabbitMQ Backend](/docs/backends/rabbitmq-backend).

**Co-Simulation** — Running application logic natively in its own process while a separate network simulator models the communication layer, rather than re-implementing the application inside the simulator. See [Background & Related Work](/docs/reference/background-and-related-work).


## Go Deeper

- [What is NSB?](/docs/introduction/what-is-nsb) — the full conceptual introduction
- [Architecture Overview](/docs/architecture/overview) — how all of these terms fit together