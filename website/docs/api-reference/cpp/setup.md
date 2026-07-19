---
sidebar_label: Setup
sidebar_position: 1
---

# C++ API Setup

NSB's C++ client library provides the `NSBAppClient` and `NSBSimClient` interfaces. **C++17 is required.**


## Building and Installing

NSB is built with CMake. After following [Get Started](/get-started), the built library and headers are available:

- **Library:** `[install_path]/nsb/lib/libnsb.*`
- **Headers:** `[install_path]/nsb/include/`
- **pkg-config entry:** `nsb`


## Headers

```cpp
#include "nsb_client.h"   // Client API (NSBAppClient, NSBSimClient)
#include "nsb.h"          // General NSB internals (Config, MessageEntry, etc.)
```

All NSB types are in the `nsb` namespace:

```cpp
using namespace nsb;
```


## Compiling Your Project

**Using pkg-config (recommended):**

```bash
clang++ -Wall -std=c++17 $(pkg-config --cflags --libs nsb) your_source.cpp -o your_binary
```

**Using CMake:**

```cmake
find_package(PkgConfig REQUIRED)
pkg_check_modules(NSB REQUIRED nsb)

target_include_directories(your_target PRIVATE ${NSB_INCLUDE_DIRS})
target_link_directories(your_target PRIVATE ${NSB_LIBRARY_DIRS})
target_link_libraries(your_target ${NSB_LIBRARIES})
```


## Generating Documentation

The C++ headers (`nsb.h`, `nsb_client.h`, `nsb_daemon.h`) are annotated with **Doxygen-style comment blocks**. Generate documentation with:

```bash
cd cpp/
doxygen Doxyfile
```

:::note Note on AI Assistance
Portions of this C++ documentation were generated with assistance from Anthropic's Claude, based on internal code documentation, and were heavily reviewed and edited by human contributors. The NSB team takes full responsibility for accuracy.
:::


## Reference Pages

| Page | Covers |
|---|---|
| [Config Struct](/docs/api-reference/cpp/config-struct) | Key constants and the `Config` struct |
| [MessageEntry](/docs/api-reference/cpp/message-entry) | The struct returned by `receive()` and `fetch()` |
| [NSBClient](/docs/api-reference/cpp/nsb-client) | The shared base class |
| [NSBAppClient](/docs/api-reference/cpp/nsb-app-client) | `send()`, `receive()`, `listenReceive()` |
| [NSBSimClient](/docs/api-reference/cpp/nsb-sim-client) | `fetch()`, `post()`, `listenFetch()`, complete examples |