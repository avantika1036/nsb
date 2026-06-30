---
sidebar_label: What is NSB?
sidebar_position: 1
---

# What is NSB?

**NSB (Network Simulation Bridge)** is an open-source, low-overhead middleware framework that bridges real applications with network simulators. It provides a simple, unified pipeline — consisting of a message server (the **NSB Daemon**) and client interface libraries — that allows developers to integrate any application front-end with any network simulator back-end.

NSB is:
- **Application-agnostic** — it doesn't care what your application does
- **Simulator-agnostic** — it works with top-down simulators like ns-3 and bottom-up simulators like OMNeT++
- **Platform-agnostic** — supports macOS (Homebrew), Linux (Ubuntu), and Windows (via vcpkg, coming soon)
- **Language-agnostic** — provides identical APIs in both Python and C++

NSB was created at the [Inter-Networking Research Group (INRG)](https://inrg.engineering.ucsc.edu/) at the University of California, Santa Cruz, and is in active beta development as of 2026.

:::info Academic Citation
For academic citation, refer to the [NSB publication](https://dl.acm.org/doi/10.1145/3616391.3622771) on ACM Digital Library.
:::



## Core Concept

In real-world co-simulation setups, developers face a common problem: their application needs to communicate over a *simulated* network — one with configurable latency, packet loss, topology, or custom routing behaviors — but the application and the network simulator live in separate processes and often separate codebases.

NSB solves this by acting as a clean intermediary:

```
┌──────────────────┐        ┌──────────────┐        ┌──────────────────────┐
│   Application    │◄──────►│  NSB Daemon  │◄──────►│  Network Simulator   │
│  (NSBAppClient)  │        │  (+ Redis)   │        │   (NSBSimClient)     │
└──────────────────┘        └──────────────┘        └──────────────────────┘
```

1. The **application** sends a payload using `NSBAppClient.send()`.
2. The **NSB Daemon** stores the payload (optionally in Redis) and routes it.
3. The **network simulator** fetches the payload using `NSBSimClient.fetch()`, routes it through the simulated network, and then calls `NSBSimClient.post()` when it arrives.
4. The **application** on the receiving side retrieves it with `NSBAppClient.receive()`.

For the full breakdown of components and message flow, see [Architecture Overview](/docs/architecture/overview).



## Key Capabilities

| Feature | Description |
|---|---|
| **Dual Transport Backends** | Socket-based (default) or RabbitMQ-based transport |
| **Two Simulator Modes** | System-Wide (ns-3 style) or Per-Node (OMNeT++ style) |
| **Two System Modes** | PULL (polling) or PUSH (server-forwarded) |
| **Python + C++ APIs** | Full feature parity across both languages |
| **Async Support** | `listen()` coroutines in Python; threaded listeners in C++ |
| **Redis Integration** | Optional in-memory payload storage for large messages |
| **Protobuf Messaging** | Structured, versioned inter-component communication |
| **Cross-Language Interop** | Python and C++ clients can communicate through the same broker |



## Origin and Use Cases

NSB was first built to address real research needs. The earliest proofs-of-concept that used NSB were:
- **Decentralized federated learning** — where federated learning nodes communicate over simulated wireless networks
- **Autonomous vehicle platooning** — where vehicle-to-vehicle (V2V) communication is modeled using network simulation

The project is co-developed in part to model networking behind autonomous vehicles (AV) applications, and the team actively seeks collaborators for V2V and V2X network simulation use cases.



## Transport Backends

NSB supports two transport backends that can be selected at runtime:

### Socket Backend (Default)
The original implementation using raw TCP sockets. The NSB Daemon acts as a central message router between all clients. Best for single-machine setups and general use.

### RabbitMQ Backend
A newer implementation using RabbitMQ as the message broker. In this mode, the daemon's role is reduced to configuration management only — RabbitMQ handles actual message routing. Better for distributed setups, horizontal scaling, and advanced messaging patterns.

See [Architecture Overview](/docs/architecture/overview) for a detailed comparison, or jump straight to the [Socket Backend](/docs/backends/socket-backend) and [RabbitMQ Backend](/docs/backends/rabbitmq-backend) reference pages.



## Beta Status

NSB is currently in beta. The team explicitly invites:
- Feedback on usage experience
- Feature requests and motivating use cases
- Collaborators for domain-specific simulator integrations

📧 Contact: [hkuttive@ucsc.edu](mailto:hkuttive@ucsc.edu)



## License

NSB is released under the **BSD 3-Clause License**.

Copyright 2026 UC Santa Cruz

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.



## Acknowledgments

NSB was developed by Ph.D., M.S., and undergraduate students (past and present) at UCSC. Special thanks to the Open Source Program Office (OSPO) in the Center for Research in Open Source Systems (CROSS) at UC Santa Cruz for guidance in evolving NSB into an open-source ecosystem.



## Next Steps

- [Design Goals](/docs/introduction/design-goals) — the four properties NSB2 was engineered around
- [Get Started](/get-started) — install NSB on your machine
- [Quickstart](/quickstart) — run your first co-simulation in minutes