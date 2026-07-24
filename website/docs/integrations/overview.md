---
sidebar_label: Integrations Overview
sidebar_position: 1
---

# Integrations Overview

NSB works with any network simulator. It doesn't matter whether your simulator is top-down (a single script controlling an entire topology) or bottom-up (each host as an independent module) — NSB just needs the simulator side to implement `fetch()` and `post()` through an `NSBSimClient`.


## Two Integration Patterns

NSB supports simulator integration through exactly two topology patterns, selected via the `simulator_mode` field:

- **System-Wide** — a single `NSBSimClient` handles the entire simulation
- **Per-Node** — each simulated node has its own `NSBSimClient`

For the full comparison — diagrams, constraints, and the identifier-matching rule — see [System-Wide vs Per-Node](/docs/integrations/system-wide-vs-per-node).


## When to Use Each Pattern

| If your simulator... | Use |
|---|---|
| Manages the entire network from one script (ns-3 style) | System-Wide |
| Models each host as an independent module (OMNeT++ style) | Per-Node |


## Simulator-Specific Guides

- [ns-3 Overview](/docs/integrations/ns3-overview) — top-down, System-Wide integration
- [OMNeT++ Overview](/docs/integrations/omnet-overview) — bottom-up, Per-Node integration, with and without INET

For hands-on, step-by-step setup, see the [Tutorials](/tutorials) section — these overview pages cover the *what* and *why*; the tutorials cover the *how*.