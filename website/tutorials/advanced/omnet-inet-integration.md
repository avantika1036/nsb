---
title: OMNeT++ with INET
---

[← Back to Tutorials](/tutorials)

# OMNeT++ with INET

**Difficulty:** Advanced · **Time:** ~90 minutes

This tutorial extends the [OMNeT++ Basic Integration](/tutorials/advanced/omnet-basic-integration) using the INET framework for realistic wireless and wired network modeling.

**Goal:** Build advanced OMNeT++ simulations with NSB.

If you haven't already, read the [OMNeT++ Basic Integration](/tutorials/advanced/omnet-basic-integration) tutorial first — it covers OMNeT++ installation and the Per-Node rationale this tutorial assumes.


## Prerequisites

INET version 4.5 is required. The easiest way is via the IDE:

1. Open the OMNeT++ IDE
2. On first launch, you'll be prompted to install INET — accept it
3. If you skipped this prompt: *Help → Install Simulation Models*, select INET, and follow the prompts

For further information: [INET Introduction](https://inet.omnetpp.org/Introduction.html).


## `INETAppFiles/` — NSB API Integration

These files integrate NSB into INET's application layer. They belong under `inet/src/inet/applications/udpapp/`:

| File | Description |
|---|---|
| `nsbBasicApp.cc` / `.h` / `.ned` | **Message source**: Fetches messages from NSB Daemon and injects them into the simulation via UDP |
| `nsbAppSink.cc` / `.h` / `.ned` | **Message receiver**: Receives UDP packets from the simulation and notifies NSB Daemon of successful delivery |

**`nsbBasicApp` role:** Acts as an `NSBSimClient` — it calls `fetch()` to get payloads from NSB and sends them into the OMNeT++ simulation using INET's UDP stack.

**`nsbSinkApp` role:** Receives UDP packets that arrive at the destination, then calls `post()` to notify NSB that the payload has been delivered.


## `nsb_beta_simulations/simulations/` — NED and INI Files

| File | Description |
|---|---|
| `WirelessNetworkTwoHosts.ned` | Two-host wireless network topology |
| `WirelessNetworkTenHosts.ned` | Ten-host wireless network topology |
| `omnetpp.ini` | Simulation configuration referencing either NED topology |


## Steps to Run

**1. Open the OMNeT++ IDE:**

```bash
cd omnetpp-6.1
source setenv
omnetpp
```

**2. Import projects** into your workspace:
- *File → Import → Existing project into workspace*
- Import both `nsb_beta_simulations` **and** `inet4.5`

**3. Set project references:**
- Right-click `nsb_beta_simulations` → *Properties → Project References*
- Check `inet4.5` as a reference

**4. Add NSB to INET's build:**
- Open `inet4.5/src/makefrag`
- Add:

```makefile
INCLUDE_PATH += $(shell pkg-config --cflags-only-I nsb)
LIBS         += $(shell pkg-config --libs nsb)
```

**5. Clean and build INET:**
- Right-click `inet4.5` → *Clean Local*
- Right-click `inet4.5` → *Build Project*

**6. Build and run the simulation:**
- Select `omnetpp.ini` from `nsb_beta_simulations/simulations/`
- *Project → Build Project*
- Run the simulation


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


## Notes

- The INET integration uses **UDP** as the application-layer transport within the simulation. The `nsbBasicApp` injects UDP packets; `nsbSinkApp` receives them.
- INET's chunk system replaces the role that `NSBMessage.msg` plays in the [pure OMNeT++ setup](/tutorials/advanced/omnet-basic-integration) — you don't need a custom `.msg` file here.
- Null-byte payload handling is more robust under INET than pure OMNeT++, since INET's chunk system handles binary data differently. See [Troubleshooting → Null byte in payload](/docs/help/troubleshooting#null-byte-00-in-payload-causes-issues) for the full limitation context.


## Go Deeper

- [OMNeT++ Overview](/docs/integrations/omnet-overview) — the conceptual Per-Node rationale shared by both OMNeT++ tutorials
- [C++ API → NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — the `fetch()`/`post()` methods `nsbBasicApp` and `nsbAppSink` use
- [Project Structure](/docs/reference/project-structure) — where the `nsb_omnet_inet` files live in the repository


You've now completed every tutorial. **[← Back to Tutorials](/tutorials)** to revisit any of them, or head to [Contribute](/contribute) to get involved with NSB's development.