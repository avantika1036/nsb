---
sidebar_label: ns-3 Overview
sidebar_position: 3
---

# ns-3 Overview

**ns-3** is a discrete-event network simulator that operates in a **top-down, system-wide** model — a single simulation script manages the entire network topology and traffic. Because of this, when using NSB with ns-3, you should configure NSB in **System-Wide simulator mode** (`simulator_mode: 0`).


## What the Integration Looks Like

In this integration:
- Your application(s) use `NSBAppClient` to send and receive payloads
- A single ns-3 simulation script uses `NSBSimClient` to fetch and post payloads as they travel through the simulated network

Exactly one `NSBSimClient` exists for the entire simulation — it fetches all payloads regardless of source node, routes them through the ns-3 topology, and posts them back when they arrive.


## Important Notes

- In ns-3 (top-down simulator), use **System-Wide simulator mode** (`simulator_mode: 0`) in `config.yaml`
- The single `NSBSimClient` in the ns-3 script fetches all payloads regardless of source
- Make sure the NSB Daemon is running **before** starting ns-3
- Detailed TCP integration documentation is coming soon


## Go Deeper

- [Tutorials → Integrate ns-3](/tutorials/advanced/ns3-integration) — full step-by-step setup, CMakeLists changes, and example scripts
- [System-Wide vs Per-Node](/docs/integrations/system-wide-vs-per-node) — why System-Wide fits ns-3's architecture
- [Configuration → Simulator Modes](/docs/configuration/simulator-modes) — the `simulator_mode: 0` field