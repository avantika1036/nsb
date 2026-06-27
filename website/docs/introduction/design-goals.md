---
sidebar_label: Design Goals
sidebar_position: 2
---

# Design Goals

NSB2 was engineered around four core properties. These goals shaped every architectural decision described throughout this documentation — from the multi-channel transport to the modular abstraction layers.



## The Four Properties

### Lightweight
Resource-efficient, functionally minimal, and fast. NSB2 minimizes latency, memory utilization, and external dependencies so it does not impose unnecessary burden on users, simulations, or systems.

### Accessible
Uses tools and dependencies available on most widely-used platforms (Linux, macOS, Windows via WSL). Designed to download, install, and integrate with ease and transparency.

### Modular & Extensible
Provides well-defined interfaces and abstractions that users and contributors can adapt. Internal components are implemented as plug-and-play modules with abstract base classes and contracts.

### Symmetric
Both endpoint libraries expose small, consistent APIs — socket-like `send`/`receive` on the application side, HTTP-like `fetch`/`post` on the simulator side — implemented with full feature parity across Python and C++.



## What NSB2 Is Not

NSB2 does **not** re-implement network logic. It does not simulate any network behavior. It is a **relay pipeline** — it moves payloads between a native application and a network simulator so that the simulator can model how those payloads travel.



## NSB2 vs. NSB (Prior Version)

NSB2 is a **complete redesign and re-implementation** of the original Network Simulation Bridge. No code from the prior version is present or used.

| Feature | NSB (v1) | NSB2 |
|---|---|---|
| System modes | Fixed polling only | PULL and PUSH modes |
| Simulator modes | Per-node only | System-Wide and Per-Node |
| Transport | Single TCP socket per client | 3 dedicated sub-channels per client |
| Payload handling | Full payloads through bridge (chunked) | Payload key through bridge + Redis cache |
| Extensibility | Fixed, tightly-integrated stack | Modular plug-and-play components |
| Configuration | Static | Dynamic INIT handshake |
| Language support | Limited | Full Python and C++ feature parity |
| Protobuf schema | None | Single `.proto` schema for both languages |
| Package installation | Manual | CMake + pkg-config |



## Specific Improvements in NSB2

These four properties translate into concrete engineering decisions:

**Robust configuration options:**
The prior version had a fixed polling-based system and required separate simulator clients per node. NSB2 supports configurable system modes (PULL/PUSH), simulator modes (System-Wide/Per-Node), and optional payload caching. See [System Modes](/docs/architecture/system-modes) and [Simulator Modes](/docs/architecture/simulator-modes).

**Multi-channel transport:**
The prior version used a single TCP socket connection per client to carry all control- and data-plane messages. NSB2 uses three independent sub-channels per client (ctrl, send, recv), eliminating head-of-line blocking and enabling parallel operations. See [Deep Architecture](/docs/architecture/deep-architecture) for the full disentanglement rationale.

**Payload caching:**
The prior version relayed full payloads over the bridge. Large payloads were chunked at each leg of the pipeline, degrading performance. NSB2 uses an in-memory key-value store (Redis) to cache payloads and route only the key (`<32 bytes>`) through the bridge, removing payload size from the performance equation. See [Redis Storage](/docs/backends/redis-storage).

**Extensibility:**
The prior version had a fixed, tightly-integrated technology stack. NSB2 exposes transport and caching as abstract base classes with plug-and-play module interfaces.

**Other improvements:**
- Dynamic INIT handshake prevents inconsistent system configuration
- Full Python and C++ feature parity through a single Protobuf schema
- Mature CMake package installation and pkg-config registration
- Removal of unnecessary communication round-trips



## Next Steps

- [Architecture Overview](/docs/architecture/overview) — see how these goals translate into the actual component model
- [Deep Architecture](/docs/architecture/deep-architecture) — the formal ACM paper-level design detail
- [Background & Related Work](/docs/reference/background-and-related-work) — how NSB2 compares to ns-3 TAP, Mininet, nsclick, and Dockemu