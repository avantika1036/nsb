---
sidebar_label: Python API Overview
sidebar_position: 1
---

# Python API Overview

NSB's Python client library provides the `NSBAppClient` and `NSBSimClient` interfaces for integrating applications and network simulators.


## Installation

Copy the contents of the `python/` directory (including the `proto/` subdirectory) to your Python project:

```
your_project/
├── nsb_client.py
├── proto/
│   └── proto/
│       └── nsb_pb2.py
└── your_code.py
```

Or install in development mode:

```bash
cd python/
pip install -e .
echo 'export PYTHONPATH="${PYTHONPATH}:/path/to/nsb/python"' >> ~/.zshrc
```

Install Python dependencies:

```bash
pip install -r python/requirements.txt
```

For the full installation walkthrough (system prerequisites, build steps, verification), see [Get Started](/get-started).


## Import

```python
import nsb_client as nsb
```


## Reference Pages

| Page | Covers |
|---|---|
| [MessageEntry](/docs/api-reference/python/message-entry) | The object returned by `receive()`, `fetch()`, and `listen()` |
| [NSBAppClient](/docs/api-reference/python/nsb-app-client) | `send()`, `receive()`, `listen()` — the application-side client |
| [NSBSimClient](/docs/api-reference/python/nsb-sim-client) | `fetch()`, `post()`, `listen()` — the simulator-side client |
| [Async Listeners](/docs/api-reference/python/async-listeners) | Full asyncio pattern, test files, and Doxygen generation |