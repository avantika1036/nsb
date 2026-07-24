---
sidebar_label: System-Wide vs Per-Node
sidebar_position: 2
---

# System-Wide vs Per-Node

The two simulator integration topologies NSB supports, with their diagrams, constraints, and which real-world simulators use each.


## System-Wide Pattern

A single simulator client handles all message routing. When a payload is fetched, it can come from any source node.

```
AppClient(node0) ──send──► Daemon ──fetch──► SimClient (global)
AppClient(node1) ──send──► Daemon ──fetch──► SimClient (global)
```

**Constraint:** Only one `NSBSimClient` may connect to the daemon at a time in this mode.

**Best for:** Top-down simulators like **ns-3**, custom script-driven simulations — where a single simulation script manages the entire network.


## Per-Node Pattern

Each simulated node has its own simulator client. The client identifier for `NSBSimClient` must match the corresponding `NSBAppClient` identifier.

```
AppClient("node0") ──send──► Daemon ──fetch──► SimClient("node0")
AppClient("node1") ──send──► Daemon ──fetch──► SimClient("node1")
```

**Identifier matching rule:** `NSBSimClient("node0")` only fetches messages sent from `AppClient("node0")`, and posts make the payload available to `AppClient` at the destination — so the simulator client's identifier string must exactly match its corresponding application client's identifier string.

**Best for:** Bottom-up simulators like **OMNeT++**, node-module-based simulators — where each simulated host module directly handles its own traffic.


## Which Simulators Use Which Pattern

| Simulator | Pattern | Why |
|---|---|---|
| **ns-3** | System-Wide | One script, one global topology, one `NSBSimClient` |
| **OMNeT++** | Per-Node | Each host module is independent, each needs its own `NSBSimClient` |


## Go Deeper

- [ns-3 Overview](/docs/integrations/ns3-overview) — System-Wide mode in practice
- [OMNeT++ Overview](/docs/integrations/omnet-overview) — Per-Node mode in practice
- [Architecture → Simulator Modes](/docs/architecture/simulator-modes) — the same patterns explained at the architecture level
- [Configuration → Simulator Modes](/docs/configuration/simulator-modes) — the `simulator_mode` YAML field