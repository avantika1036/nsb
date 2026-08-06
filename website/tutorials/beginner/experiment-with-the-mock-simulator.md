---
title: Run Your First Co-Simulation
---

[← Back to Tutorials](/tutorials)

# Run Your First Co-Simulation

**Difficulty:** Beginner · **Time:** ~15 minutes

This tutorial picks up exactly where the [Quickstart](/quickstart) left off. If you haven't completed it yet, do that first — this tutorial assumes your daemon, mock simulator, and application client are already working.

**Goal:** Understand how NSB behaves before writing simulator code.


## Why Experiment First?

You've already seen one message travel through NSB successfully. Before building your own simulator, it's worth spending a few minutes changing small things and watching what happens. This builds intuition for the config fields, timing, and message flow you'll rely on in every future NSB project.


## 1. Add a Delay to the Mock Simulator

Open `simulator.py` from the Quickstart and add a small delay before posting the payload back:

```python
import nsb_client as nsb
import time

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)

entry = sim.fetch()
if entry:
    src = entry.source
    dst = entry.destination
    payload = entry.payload

    print(f"Simulating: {src} -> {dst}, payload: {payload}")

    time.sleep(0.1)   # <-- new: simulate 100ms of "network" delay

    sim.post(src, dst, payload)
    print("Posted payload as delivered")
```

Run the Quickstart sequence again (daemon → simulator → application). The application still receives the message — it just takes slightly longer. This `time.sleep()` call is literally how every example in this documentation simulates network latency until you plug in a real simulator like ns-3 or OMNeT++.


## 2. Observe the Difference in Receive Timing

In `app.py`, the application calls `time.sleep(1)` before `receive()`. Try lowering it:

```python
time.sleep(0.05)   # was: time.sleep(1)
entry = app.receive()
```

If you set this lower than the simulator's delay (`0.1` from Step 1), the application may poll too early and get `None` back. Try a few values and watch what changes. This is the same race condition any PULL-mode integration has to account for — the receiver only sees a message if it asks *after* the simulator has posted it.


## 3. Change the Payload Size

Send a much larger payload and see that nothing about the flow changes:

```python
app.send("node1", b"x" * 5000)   # 5000 bytes instead of a short string
```

With `use_db: false` (the Quickstart default), this larger payload is sent directly — no extra setup needed. If you switch to `use_db: true`, NSB caches the payload in Redis and routes only a short key through the bridge instead, regardless of size. See [Redis Storage](/docs/backends/redis-storage) for why this matters at scale.


## 4. Switch from PULL to PUSH Mode

Edit your `config.yaml`:

```yaml
system:
  mode: 1   # was: mode: 0  (PULL → PUSH)
```

Restart the daemon, simulator, and application. In PUSH mode, the daemon forwards payloads to clients automatically instead of waiting to be asked — you may notice the message arrives with less code-level polling on the application side. For the full mechanics of why this happens, see [System Modes](/docs/architecture/system-modes).


## 5. Switch from Per-Node to System-Wide Simulator Mode

Edit `config.yaml` again:

```yaml
system:
  simulator_mode: 0   # was: simulator_mode: 1  (Per-Node → System-Wide)
```

With this change, a single simulator client now fetches messages from *any* source node, not just the one matching its identifier. If you're running the single-node Quickstart example, behavior looks the same — the difference only becomes visible once multiple nodes are involved, which is exactly what the next section demonstrates. See [Simulator Modes](/docs/architecture/simulator-modes) for the full comparison.


## 6. Run the Two-Node Example

This is where Per-Node vs. System-Wide actually matters. The following three files show `node0` sending to `node1`, with `node1` replying back — using **Per-Node mode**, so set `simulator_mode: 1` again before running this.

### `app_node0.py`

```python
import nsb_client as nsb
import time

app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)
app.send("node1", b"Hello, node1!")
print("[node0] Sent message")

time.sleep(2)
entry = app.receive()
if entry:
    print(f"[node0] Received reply: {entry.payload}")
```

### `app_node1.py`

```python
import nsb_client as nsb
import time

app = nsb.NSBAppClient("node1", "127.0.0.1", 65432)
time.sleep(1)
entry = app.receive()
if entry:
    print(f"[node1] Received: {entry.payload}")
    app.send(entry.source, b"Hello back, node0!")
```

### `simulator.py` — Per-Node, handles both nodes

```python
import nsb_client as nsb
import time

sim0 = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
sim1 = nsb.NSBSimClient("node1", "127.0.0.1", 65432)

for _ in range(2):
    for sim in [sim0, sim1]:
        entry = sim.fetch(timeout=0)  # non-blocking poll
        if entry:
            print(f"[sim] Routing {entry.source} -> {entry.destination}")
            time.sleep(0.1)  # simulate 100ms network delay
            sim.post(entry.source, entry.destination, entry.payload)

time.sleep(3)
```

Run all three (daemon already running from earlier):

```bash
python3 simulator.py     # Terminal 1
python3 app_node1.py      # Terminal 2 — start before node0 sends
python3 app_node0.py      # Terminal 3
```


## 7. Observe the `[sim] Routing` Output

Watch the simulator terminal. You'll see two lines like:

```
[sim] Routing node0 -> node1
[sim] Routing node1 -> node0
```

This is the simulator polling **both** `sim0` and `sim1` in a loop and routing whichever message is currently waiting. Each `NSBSimClient` only ever sees messages addressed to its own identifier — that's the Per-Node identifier-matching rule in action, not a coincidence of this example's code.


## What You Just Learned

- How a `time.sleep()` in the mock simulator stands in for real network latency
- Why receive timing matters in PULL mode
- That payload size doesn't change the NSB flow
- The observable difference between PULL/PUSH and System-Wide/Per-Node
- How a two-node round-trip looks with a single Per-Node simulator script handling multiple identities


## Go Deeper

- [System Modes](/docs/architecture/system-modes) — the full PULL vs PUSH mechanics
- [Simulator Modes](/docs/architecture/simulator-modes) — the full System-Wide vs Per-Node mechanics


**Next:** [Build a Mock Simulator →](/tutorials/beginner/build-a-mock-simulator)