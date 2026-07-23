---
sidebar_label: OMNeT++ Overview
sidebar_position: 4
---

# OMNeT++ Overview

**OMNeT++** is a simulation framework that operates in a **bottom-up, per-node** model — each simulated host is an individual module that independently handles its own traffic. Because of this, when using NSB with OMNeT++, you should configure NSB in **Per-Node simulator mode** (`simulator_mode: 1`).


## What the Integration Looks Like

In this integration:
- Each simulated OMNeT++ node module has its own `NSBSimClient` instance, identified to match the corresponding `NSBAppClient`
- When the OMNeT++ module receives a message, it calls `post()` to notify NSB; when it needs to inject traffic, it calls `fetch()`


## Two Example Setups

| Setup | Covers |
|---|---|
| **`nsb_omnet_basic`** | Pure OMNeT++ (no INET) — a minimal `NSBHost` module wired into a NED network |
| **`nsb_omnet_inet`** | OMNeT++ with the INET framework — realistic wireless/wired simulation using UDP transport |


## Go Deeper

- [Tutorials → OMNeT++ Basic Integration](/tutorials/advanced/omnet-basic-integration) — full step-by-step setup for the pure OMNeT++ example
- [Tutorials → OMNeT++ with INET](/tutorials/advanced/omnet-inet-integration) — full step-by-step setup for the INET-based example
- [System-Wide vs Per-Node](/docs/integrations/system-wide-vs-per-node) — why Per-Node fits OMNeT++'s architecture
- [Configuration → Simulator Modes](/docs/configuration/simulator-modes) — the `simulator_mode: 1` field