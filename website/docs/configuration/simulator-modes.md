---
sidebar_label: Simulator Modes
sidebar_position: 4
---

# Simulator Modes (Configuration)

This page documents the `simulator_mode` field in `config.yaml`. For the conceptual explanation of System-Wide and Per-Node topologies, see [Architecture → Simulator Modes](/docs/architecture/simulator-modes).


## System-Wide Mode (`simulator_mode: 0`)

A single `NSBSimClient` handles all message fetching and posting for the entire simulation. Only one simulator client can be connected to the daemon at a time.

- Best for **top-down** network simulators: **ns-3**, custom script-driven simulations
- The single simulator client fetches any message regardless of source

**Constraint:** Only one `NSBSimClient` may connect to the daemon at a time in this mode.

```yaml
system:
  simulator_mode: 0
```


## Per-Node Mode (`simulator_mode: 1`)

Each simulated node has its own `NSBSimClient`. The client identifier must exactly match the corresponding `NSBAppClient` identifier.

- Best for **bottom-up** network simulators: **OMNeT++**, node-module-based simulators
- `NSBSimClient("node0").fetch()` fetches only messages from `NSBAppClient("node0")`
- `NSBSimClient("node0").post(...)` makes the payload available to `NSBAppClient` at the destination

**Identifier matching rule:** the simulator client's identifier string must exactly match its corresponding application client's identifier string.

```yaml
system:
  simulator_mode: 1
```


## Go Deeper

- [Architecture → Simulator Modes](/docs/architecture/simulator-modes) — internal routing behavior and topology diagrams
- [Configuration Reference](/docs/configuration/config-reference) — full field table including defaults
- [Integrations → System-Wide vs Per-Node](/docs/integrations/system-wide-vs-per-node) — choosing a mode for your simulator