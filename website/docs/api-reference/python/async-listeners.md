---
sidebar_label: Async Listeners
sidebar_position: 5
---

# Async Listeners

`listen()` is the asynchronous, coroutine-based alternative to `receive()` and `fetch()`. This page shows the complete pattern alongside the application-side and simulator-side blocking patterns for comparison, plus the included test files and documentation generation steps.


## Application Side

```python
import nsb_client as nsb

# Initialize client
app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)

# Send a payload
app.send("node1", b"Hello from node0")

# Receive a payload (blocking)
entry = app.receive()
if entry:
    print(f"Got: {entry.payload} from {entry.source}")
```


## Simulator Side

```python
import nsb_client as nsb

# Initialize simulator client
sim = nsb.NSBSimClient("simulator", "127.0.0.1", 65432)

# Fetch a payload
entry = sim.fetch()
if entry:
    # Simulate network delay, loss, etc.
    simulate_network(entry)
    # Post it back when it "arrives"
    sim.post(entry.source, entry.destination, entry.payload)
```


## Async Pattern

```python
import asyncio
import nsb_client as nsb

async def app_listener():
    app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)
    while True:
        entry = await app.listen()
        if entry:
            print(f"Received: {entry.payload}")

asyncio.run(app_listener())
```

The same `listen()` pattern applies to `NSBSimClient` — see [NSBSimClient → listen()](/docs/api-reference/python/nsb-sim-client#listen) for the simulator-side coroutine signature.


## Test Files

The `python/` directory includes test and example scripts:

| File | Description |
|---|---|
| `nsb_test_client.py` | Basic single-node test client |
| `nsb_test_client_multipleHosts.py` | Multi-host test scenario |
| `tests.py` | Full Python test suite |

Run tests from the `python/` directory:

```bash
python tests.py
```


## Additional Documentation

The Python source (`nsb_client.py`) is commented with **Doxygen-style docstrings**. You can generate HTML documentation using Doxygen:

```bash
cd python/
doxygen Doxyfile
```


## Go Deeper

- [NSBAppClient](/docs/api-reference/python/nsb-app-client) — full `receive()` and `listen()` reference
- [NSBSimClient](/docs/api-reference/python/nsb-sim-client) — full `fetch()` and `listen()` reference
- [Tutorials → Build a Mock Simulator](/tutorials/beginner/build-a-mock-simulator) — a hands-on walkthrough using these APIs