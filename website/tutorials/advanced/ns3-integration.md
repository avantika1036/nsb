---
title: ns-3 Integration
---

[← Back to Tutorials](/tutorials)

# Integrating NSB with ns-3

**Difficulty:** Advanced · **Time:** ~60 minutes

This tutorial covers step-by-step instructions for integrating NSB with the ns-3 network simulator.

**Goal:** Connect NSB to a real network simulator.


## Overview

**ns-3** is a discrete-event network simulator that operates in a **top-down, system-wide** model — a single simulation script manages the entire network topology and traffic. Because of this, when using NSB with ns-3, you should configure NSB in **System-Wide simulator mode** (`simulator_mode: 0`).

In this integration:
- Your application(s) use `NSBAppClient` to send and receive payloads
- A single ns-3 simulation script uses `NSBSimClient` to fetch and post payloads as they travel through the simulated network


## Prerequisites

- NSB installed and working (see [Get Started](/get-started))
- ns-3 installed and working


## Step 1 — Install ns-3

Follow the official ns-3 installation documentation:

- [ns-3 Getting Started Guide](https://www.nsnam.org/docs/release/3.41/tutorial/html/getting-started.html)
- [Downloading ns-3 via Git](https://www.nsnam.org/docs/release/3.41/tutorial/html/getting-started.html#downloading-ns-3-using-git)

Once ns-3 is installed and you've run the [testing step](https://www.nsnam.org/docs/tutorial/html/getting-started.html#testing-ns-3), you're ready to integrate NSB.

All custom simulation scripts should be placed in ns-3's **`scratch/`** folder and run using:

```bash
./ns3 run scratch/<your_file_name>
```

To skip rebuilding every time:

```bash
./ns3 run scratch/<your_file_name> --no-build
```

## Step 2 — Link NSB with ns-3 via CMakeLists.txt

### Top-Level CMakeLists.txt

Open the ns-3 top-level `CMakeLists.txt` (e.g., in your `ns-3-dev/` folder). After the `process_options()` section, add the following to locate NSB via pkg-config and include its headers globally:

```cmake
find_package(PkgConfig REQUIRED)
pkg_check_modules(NSB REQUIRED nsb)

set(EXTERNAL_LIBS ${nsb})
set(EXTERNAL_INCLUDE_DIRS ${nsb})
set(EXTERNAL_CFLAGS ${nsb})

include_directories(${NSB_INCLUDE_DIRS})
link_directories(${NSB_LIBRARY_DIRS})

set(NSB_LINK_LIBS ${NSB_LIBRARIES})
```

### scratch/CMakeLists.txt

Open the `CMakeLists.txt` in ns-3's `scratch/` directory. Under the `build_exec` function, add NSB library linking:

```cmake
build_exec(
    EXECNAME ${scratch_name}
    EXECNAME_PREFIX ${target_prefix}
    SOURCE_FILES "${source_files}"
    LIBRARIES_TO_LINK "${ns3-libs}" "${ns3-contrib-libs}" "${NSB_LIBRARIES}"
    EXECUTABLE_DIRECTORY_PATH ${scratch_directory}
)
```

Additionally, before the `create_scratch` directive, add:

```cmake
include_directories(${NSB_INCLUDE_DIRS})
link_directories(${NSB_LIBRARY_DIRS})
```


## Step 3 — Configure NSB for System-Wide Mode

In your `config.yaml`, set simulator mode to System-Wide (`0`):

```yaml
system:
  daemon_address: 127.0.0.1
  daemon_port: 65432
  mode: 0             # PULL
  simulator_mode: 0   # System-Wide — one global SimClient

database:
  use_db: true
  db_address: 127.0.0.1
  db_port: 5050
  db_num: 0
```


## Step 4 — Implement NSB in Your ns-3 Script

Use the example script provided in `examples/ns3/ns3Simple-testing.cc` as your starting point. Copy it to the ns-3 `scratch/` folder.

A typical ns-3 NSB integration follows this pattern:

```cpp
#include "nsb_client.h"

// ... ns-3 includes ...

int main() {
    // 1. Create NSB Simulator Client (System-Wide mode: one global client)
    std::string server = "127.0.0.1";
    int port = 65432;
    nsb::NSBSimClient sim("global_sim", server, port);

    // 2. Create ns-3 topology (nodes, channels, links...)
    // ...

    // 3. Simulation loop / packet scheduler
    // Fetch payloads from NSB and inject into ns-3
    nsb::MessageEntry entry = sim.fetch();
    if (entry.exists()) {
        std::string src = entry.source;
        std::string dst = entry.destination;
        std::string payload = entry.payload_obj;

        // Use ns-3 APIs to send the packet from src to dst
        // ...
    }

    // 4. When a packet arrives at its destination in ns-3:
    sim.post(src_node, dest_node, payload);

    // 5. Run the ns-3 simulation
    Simulator::Run();
    Simulator::Destroy();

    return 0;
}
```


## Step 5 — Run the System

Start services in the correct order:

```bash
# 1. Start Redis
redis-server --port 5050

# 2. Start the NSB Daemon
./build/nsb_daemon config.yaml

# 3. Run the ns-3 simulation script (acts as the simulator client)
./ns3 run scratch/ns3Simple-testing.cc

# 4. Run your application(s) with NSBAppClient
python3 my_application.py
# or: ./my_app_binary
```


## Example Scripts

The `examples/ns3/` directory contains three example scripts:

| File | Description |
|---|---|
| `ns3Simple-testing.cc` | Simple NSB-ns3 AppClient integration test |
| `nsb-testing.cc` | Full integration test with SimClient |
| `nsb-testing-tcp.cc` | Integration test using TCP transport in ns-3 |


## Important Notes

- In ns-3 (top-down simulator), use **System-Wide simulator mode** (`simulator_mode: 0`) in `config.yaml`
- The single `NSBSimClient` in the ns-3 script fetches all payloads regardless of source
- Make sure the NSB Daemon is running **before** starting ns-3
- Detailed TCP integration documentation is coming soon


## Go Deeper

- [ns-3 Overview](/docs/integrations/ns3-overview) — the conceptual System-Wide rationale behind this integration
- [C++ API → NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) — full method reference for the code pattern above
- [Project Structure](/docs/reference/project-structure) — where the example scripts live in the repository


**Next:** [OMNeT++ Basic Integration →](/tutorials/advanced/omnet-basic-integration)