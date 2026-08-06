---
title: OMNeT++ Basic Integration
---

[← Back to Tutorials](/tutorials)

# OMNeT++ Basic Integration

**Difficulty:** Advanced · **Time:** ~60 minutes

This tutorial covers step-by-step instructions for integrating NSB with a pure OMNeT++ setup (no INET).

**Goal:** Understand per-node simulator architecture.


## Overview

**OMNeT++** is a simulation framework that operates in a **bottom-up, per-node** model — each simulated host is an individual module that independently handles its own traffic. Because of this, when using NSB with OMNeT++, you should configure NSB in **Per-Node simulator mode** (`simulator_mode: 1`).

In this integration:
- Each simulated OMNeT++ node module has its own `NSBSimClient` instance, identified to match the corresponding `NSBAppClient`
- When the OMNeT++ module receives a message, it calls `post()` to notify NSB; when it needs to inject traffic, it calls `fetch()`

This tutorial uses **`nsb_omnet_basic`** — a complete example of NSB integration with pure OMNeT++ (no INET). For the more realistic wireless/wired setup, see [OMNeT++ with INET](/tutorials/advanced/omnet-inet-integration).


## Prerequisites

**Highly recommended: OMNeT++ 6.1**

Download from [omnetpp.org/download](https://omnetpp.org/download/).

For **macOS Apple Silicon**: download the `aarch` version and follow the [OMNeT++ Installation Guide](https://doc.omnetpp.org/omnetpp/InstallGuide.pdf).


## OMNeT++ Setup

After downloading and extracting OMNeT++:

1. Follow the [install instructions](https://doc.omnetpp.org/omnetpp/InstallGuide.pdf) for your platform.
2. Create an OMNeT++ workspace: `<your_workspace>` inside your `omnetpp-6.1/` folder.
3. From a terminal inside `omnetpp-6.1/`, run:

```bash
source setenv
omnetpp
```

This sets up the environment and opens the OMNeT++ IDE.


## `nsb_omnet_basic` Files

| File | Description |
|---|---|
| `NSBMessage.msg` | Custom OMNeT++ message type carrying NSB payload information |
| `NSBMessage_m.cc` / `.h` | Auto-generated C++ code from the `.msg` file |
| `NSBHost.cc` / `.h` / `.ned` | Host module that fetches from NSB Daemon, routes to the correct simulated host, and notifies NSB of message delivery |
| `NSBHostNetwork.ned` | Network definition: two hosts of `NSBHost` type for a simple ping test |
| `NSBHostNetworkTenHosts.ned` | Larger network definition: 10 hosts in a fully-connected topology |
| `omnetpp.ini` | Configuration file for running `NSBHostNetwork.ned` |
| `makefrag` | Build fragment that adds NSB include paths and libraries |


## Steps to Run

**1. Open the OMNeT++ IDE** from your terminal:

```bash
cd omnetpp-6.1
source setenv
omnetpp
```

**2. Import the project** into your workspace:
- *File → Import → Existing project into workspace*
- Select the `nsb_omnet_basic` folder

**3. Ensure the `makefrag` file** contains the following (it should already be there):

```makefile
INCLUDE_PATH += $(shell pkg-config --cflags-only-I nsb)
LIBS         += $(shell pkg-config --libs nsb)
```

**4. Build and run:**
- Select `omnetpp.ini`
- *Project → Build Project*
- Run the simulation — this runs a 10-host fully-connected network simulation


## Configuration for OMNeT++

Since OMNeT++ is a per-node simulator, use **Per-Node simulator mode** in your `config.yaml`:

```yaml
system:
  daemon_address: 127.0.0.1
  daemon_port: 65432
  mode: 0             # PULL
  simulator_mode: 1   # Per-Node — each host has its own SimClient

database:
  use_db: true
  db_address: 127.0.0.1
  db_port: 5050
  db_num: 0
```


## Startup Order

```bash
# 1. Start Redis
redis-server --port 5050

# 2. Start NSB Daemon
./build/nsb_daemon config.yaml

# 3. Start the OMNeT++ IDE and run the simulation
cd omnetpp-6.1 && source setenv && omnetpp
# (run simulation from IDE)

# 4. Run your application(s) with NSBAppClient
python3 my_application.py
```

:::warning Important
Start the NSB Daemon **before** opening the OMNeT++ IDE. When you're done, exit the OMNeT++ IDE **before** killing the NSB Daemon for a graceful shutdown.
:::

---

## Notes

- The `NSBMessage.msg` in `nsb_omnet_basic` defines the OMNeT++ message that carries NSB payload information. In INET setups, INET's chunk system would replace this.
- In pure OMNeT++ (without INET), null characters (`\00`) within payloads may cause issues in string handling. This is a known limitation under active development. See [Troubleshooting → Null byte in payload](/docs/help/troubleshooting#null-byte-00-in-payload-causes-issues).


## Go Deeper

- [OMNeT++ Overview](/docs/integrations/omnet-overview) — the conceptual Per-Node rationale behind this integration
- [C++ API → NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — the `fetch()`/`post()` methods `NSBHost` uses
- [Project Structure](/docs/reference/project-structure) — where the `nsb_omnet_basic` files live in the repository


**Next:** [OMNeT++ with INET →](/tutorials/advanced/omnet-inet-integration)