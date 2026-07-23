---
sidebar_label: FAQ
sidebar_position: 2
---

# Frequently Asked Questions


### What is the difference between NSBAppClient and NSBSimClient?

`NSBAppClient` is the application-side client — it presents a simplified `send()`/`receive()` interface so your application can communicate as if it were on a regular network. `NSBSimClient` is the simulator-side client — it presents a `fetch()`/`post()` interface that lets a network simulator intercept payloads, route them through a simulated network, and deliver them. See [What is NSB?](/docs/introduction/what-is-nsb) and [Architecture Overview](/docs/architecture/overview) for the full component breakdown.


### Do I need Redis to use NSB?

No. Set `use_db: false` in your `config.yaml`. Redis is optional — when disabled, payloads are transmitted directly through NSB without persistent storage. The [Quickstart](/quickstart) deliberately uses `use_db: false` so first-time users don't need to start Redis at all. See [Database Settings](/docs/configuration/database-settings).


### Can I use NSB without ns-3 or OMNeT++?

Yes. Any code that implements `fetch()` and `post()` through an `NSBSimClient` is a valid simulator — including the pre-built mock simulator used in the [Quickstart](/quickstart). NSB doesn't require a specific simulator; it's simulator-agnostic by design. See [Tutorials → Build a Mock Simulator](/tutorials/beginner/build-a-mock-simulator) for a hands-on example.


### What is the difference between PULL and PUSH mode?

In **PULL mode** (`mode: 0`), clients explicitly poll the daemon for messages — no message is delivered unless requested. In **PUSH mode** (`mode: 1`), the daemon automatically forwards payloads to clients as soon as they're available, requiring persistent connections. PULL is recommended for most configurations; PUSH suits latency-sensitive setups. See [System Modes](/docs/configuration/system-modes).


### Can Python and C++ clients talk to each other?

Yes. Python and C++ clients are fully wire-compatible — they use the same Protobuf message format (`nsbm`) and the same queue/channel naming conventions. A Python `NSBAppClient` can send to a C++ `NSBAppClientRMQ` and vice versa, with no code changes. See [Architecture Overview → Cross-Language Interoperability](/docs/architecture/overview#cross-language-interoperability).


### What is the difference between System-Wide and Per-Node simulator mode?

In **System-Wide mode** (`simulator_mode: 0`), a single `NSBSimClient` handles all message routing for the entire simulation — best for top-down simulators like ns-3. In **Per-Node mode** (`simulator_mode: 1`), each simulated node has its own `NSBSimClient`, identifier-matched to its corresponding `NSBAppClient` — best for bottom-up simulators like OMNeT++. See [Simulator Modes](/docs/configuration/simulator-modes).


### Does NSB work on Windows?

Yes, via WSL2 with Ubuntu 24.04. Native Windows support through vcpkg is under active development. See [Get Started → Windows (WSL2) tab](/get-started).


### What is the maximum number of nodes NSB supports?

Practically, NSB performs well up to ~100 concurrent nodes, with latency in the 6–16ms range and memory usage under 7MB. At 500+ nodes, a file-descriptor ceiling causes latency to climb sharply (142–233ms) — this is a known environmental constraint, not a fundamental design flaw, and can often be worked around by raising your shell's `ulimit -n`. See [Performance Evaluation](/docs/reference/performance) and [Troubleshooting → 500+ clients](/docs/help/troubleshooting#500-clients-fail-to-connect-or-behave-erratically).


### Is NSB production-ready?

NSB is currently in **beta**. The team actively invites feedback, feature requests, and collaborators for domain-specific simulator integrations. See [What is NSB? → Beta Status](/docs/introduction/what-is-nsb#beta-status).


### How do I cite NSB in a paper?

> *NSB2: An Open-Source Modular Pipeline for Application-Network Co-Simulation*
> ACM International Middleware Conference (ACM Middleware 2026)
> ACM, New York, NY, USA — 11 pages

The original proof-of-concept was presented at:

> *Network Simulation Bridge: Bridging Applications to Network Simulators*
> 19th ACM International Symposium on QoS and Security for Wireless and Mobile Networks (ACM Q2SWinet 2023)
> pp. 39–46

See [Background & Related Work → Academic Publication](/docs/reference/background-and-related-work#academic-publication) for full publication details and the complete reference list.


## Still Have Questions?

- [Troubleshooting](/docs/help/troubleshooting) — fixes for common installation and runtime errors
- [Glossary](/docs/reference/glossary) — short definitions for NSB's core terminology
- [Contribute](/contribute) — open a GitHub issue or join the discussion