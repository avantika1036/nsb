---
sidebar_label: Background & Related Work
sidebar_position: 3
---

# Background & Related Work

This page situates NSB2 within the broader landscape of network simulation and co-simulation tools, drawing from *"NSB2: An Open-Source Modular Pipeline for Application-Network Co-Simulation"* (ACM Middleware 2026).

## The Problem: Application-Network Co-Simulation

Connected applications — autonomous vehicles, IoT deployments, smart homes, distributed AI systems — increasingly have performance and safety properties that critically depend on the behavior of the underlying network: its latency, throughput, packet loss, mobility dynamics, and contention. This means the network is no longer a transparent layer; it is a **design factor** that must be modeled holistically alongside application logic.

Designing and validating connected applications under realistic network conditions is fundamentally hard. The two main approaches each have serious limitations:

### Physical Testbeds
Real hardware offers high realism but is:
- Expensive to build and maintain
- Brittle and difficult to reconfigure
- Hard to adapt to diverse topologies and conditions

### Network Simulators & Emulators
Tools like **ns-3** and **OMNeT++** provide high-fidelity, controllable, reproducible network models. But connecting full-fledged, unmodified applications to these simulators typically requires one of:
- **Re-implementing limited proxies** of application logic inside the simulator runtime
- **Privileged or platform-specific tunneling** (TAP/TUN interfaces) that are not widely available
- **Bespoke, tightly-coupled solutions** built for a narrow set of scenarios

Researchers and developers are thus forced to choose between **application realism** or **network realism** — rarely achieving both.

**Network co-simulation** — running application logic natively while a separate simulator models the communication layer — solves this tension. NSB2 provides the bridge that makes co-simulation accessible.


## Existing Tools and Their Limitations

### ns-3 TAP Interface
ns-3 provides a mechanism for injecting application processes into its network backend via the TAP interface. However:
- Available **only on Linux kernels**
- No cross-platform alternatives
- No mechanism for integrating **unmodified** applications directly with the simulator

### OMNeT++ INET TAP Interface
OMNeT++'s INET framework provides a similar interface through TAP. It faces the same constraints:
- Linux-only
- Platform-specific and not portable

### Mininet
Mininet is a widely-used network emulator in research and education. It exposes realistic interfaces to user-configurable network topologies. However:
- **Limited network configuration options**, making it less useful for complex network models
- Mininet-WiFi and similar variants extend it but don't fully close the gap

### nsclick
An early co-simulation tool designed to bridge applications to a network simulator backend:
- Strictly applicable to **ns-2** (now obsolete)
- Based on Linux kernel-level interfaces
- Not portable or general-purpose

### Dockemu / Dockemu 2.0
Dockemu provides a robust all-in-one co-simulation option:
- Heavily depends on **Docker** to orchestrate container-based nodes
- Limits usability in **non-containerized application environments**
- Useful but tightly integrated with a specific technology stack


## How NSB2 is Different

Unlike the tools above, NSB2:

- Is **platform-agnostic**: runs on macOS, Linux, and Windows (via WSL) without platform-specific tunneling
- Is **simulator-agnostic**: works with any network simulator, not just one
- Is **application-agnostic**: requires only swapping I/O calls in the application; no re-implementation needed
- Has **no dependency on Docker, TAP/TUN, or Linux-specific interfaces**
- Is **lightweight middleware**, not an all-in-one simulation environment
- Provides **modular, extensible abstractions** so users can adapt it to their specific needs


## NSB2 vs. NSB (Original Version)

NSB2 builds on foundational ideas from the earlier *Network Simulation Bridge* proof-of-concept [ACM QoS-Security 2023], primarily the server-client bridge architecture. However, NSB2 is a **complete redesign and re-implementation** — no code from the prior version is used.

The original NSB was a proof-of-concept that leveraged the bridge for applications including decentralized federated learning and autonomous vehicle platooning. NSB2 takes these foundations and makes them general-purpose, scalable, easy-to-use, and suitable for broad open-source adoption.

### Specific Improvements in NSB2

**Robust configuration options:**
The prior version had a fixed polling-based system and required separate simulator clients per node. NSB2 supports configurable system modes (PULL/PUSH), simulator modes (System-Wide/Per-Node), and optional payload caching.

**Multi-channel transport:**
The prior version used a single TCP socket connection per client to carry all control- and data-plane messages. NSB2 uses three independent sub-channels per client (ctrl, send, recv), eliminating head-of-line blocking and enabling parallel operations.

**Payload caching:**
The prior version relayed full payloads over the bridge. Large payloads were chunked at each leg of the pipeline, degrading performance. NSB2 uses an in-memory key-value store (Redis) to cache payloads and route only the key (`<32 bytes>`) through the bridge, removing payload size from the performance equation.

**Extensibility:**
The prior version had a fixed, tightly-integrated technology stack. NSB2 exposes transport and caching as abstract base classes with plug-and-play module interfaces.

**Other improvements:**
- Dynamic INIT handshake prevents inconsistent system configuration
- Full Python and C++ feature parity through a single Protobuf schema
- Mature CMake package installation and pkg-config registration
- Removal of unnecessary communication round-trips

See [Design Goals](/docs/introduction/design-goals) for how these improvements map to NSB2's four core properties.


## Academic Publication

NSB2 is documented in the peer-reviewed paper:

> *NSB2: An Open-Source Modular Pipeline for Application-Network Co-Simulation*
> ACM International Middleware Conference (ACM Middleware 2026)
> ACM, New York, NY, USA — 11 pages

The paper presents the full architecture, design rationale, and empirical performance evaluation across multiple co-simulation scenarios, demonstrating negligible latency and memory overhead in practical usage conditions.

The original NSB proof-of-concept was presented at:

> *Network Simulation Bridge: Bridging Applications to Network Simulators*
> 19th ACM International Symposium on QoS and Security for Wireless and Mobile Networks (ACM Q2SWinet 2023)
> pp. 39–46


## References

1. Duplyakin et al. (2019). *The Design and Operation of CloudLab*. USENIX ATC.
2. Fontes et al. (2015). *Mininet-WiFi: Emulating software-defined wireless networks*. CNSM.
3. Google (2008). *Protocol Buffers*. https://protobuf.dev/
4. H K. (2023). *Network simulation bridge: Bridging applications to network simulators*. ACM Q2SWinet. pp. 39–46.
5. Lantz, Heller, McKeown (2010). *A network in a laptop: rapid prototyping for software-defined networks*. ACM HotNets.
6. Neufeld, Jain, Grunwald (2002). *Nsclick: Bridging network simulation and deployment*. ACM MSWiM.
7. Petersen, Cotto, To (2019). *Dockemu 2.0: Evolution of a network emulation tool*. IEEE CONCAPAN.
8. Riley & Henderson (2010). *The ns-3 network simulator*. Modeling and Tools for Network Simulation, Springer.
9. To, Cano, Biba (2015). *DOCKEMU — A Network Emulation Tool*. IEEE AINA Workshops.
10. Varga & Hornig (2008). *An overview of the OMNeT++ simulation environment*. SIMUTools.


## Go Deeper

- [What is NSB?](/docs/introduction/what-is-nsb) — the project this background motivates
- [Design Goals](/docs/introduction/design-goals) — NSB2's four core properties in response to these limitations
- [Performance Evaluation](/docs/reference/performance) — the empirical results from the ACM Middleware 2026 paper