---
title: NetworkX Graph Simulator
---

[← Back to Tutorials](/tutorials)

# NetworkX Graph Simulator

**Difficulty:** Intermediate · **Time:** ~45 minutes

In the previous tutorials, every "network delay" was just a flat `time.sleep()`. That works for learning the NSB API, but it doesn't reflect anything about *how* a payload actually travels — how many hops it takes, or how topology shapes latency. This tutorial builds a simulator that routes messages across a real graph topology using [NetworkX](https://networkx.org/), a pure-Python graph library.

**Goal:** Understand how to build realistic network behavior using NSB.


## Install NetworkX

```bash
pip install networkx
```

NetworkX requires no build system and no external dependencies — it's a good first step toward realistic topology modeling before reaching for a full simulator like ns-3 or OMNeT++.


## Step 1 — Define a Graph Topology

NetworkX gives you several built-in topology generators. For a simple line of 3 nodes:

```python
import networkx as nx

G = nx.path_graph(3)  # nodes: 0 -- 1 -- 2
```

You can also build a topology manually:

```python
G = nx.Graph()
G.add_edge("node0", "node1")
G.add_edge("node1", "node2")
```

Either approach gives you a graph object you can query for paths between any two nodes.


## Step 2 — Look Up Source and Destination as Graph Nodes

When your simulator fetches a payload, the `MessageEntry`'s `source` and `destination` are strings (e.g. `"node0"`, `"node2"`). These need to correspond to node identifiers in your graph:

```python
entry = sim.fetch()
if entry:
    src = entry.source
    dst = entry.destination
```

If you used `nx.path_graph(3)`, your nodes are named `0`, `1`, `2` — make sure your application clients use matching identifiers, or map between the two naming schemes yourself.


## Step 3 — Find the Shortest Path

```python
path = nx.shortest_path(G, src, dst)
```

`nx.shortest_path()` returns the list of nodes the payload would traverse — for a 3-node line graph, sending from node `0` to node `2` returns `[0, 1, 2]`, a path of 2 hops.


## Step 4 — Calculate Delay from Path Length

Treat each hop as adding a fixed amount of latency:

```python
delay = len(path) * 0.02  # 20ms per hop
```

A 2-hop path costs `3 * 0.02 = 0.06` seconds (since `len(path)` counts nodes, not edges — adjust this formula if you want strict per-edge timing instead).


## Step 5 — Apply the Delay

```python
import time

time.sleep(delay)
```

This is the same mechanism every tutorial so far has used — the only difference now is that the delay value comes from actual topology instead of a hardcoded constant.

---

## Step 6 — Post the Payload

```python
sim.post(entry.source, entry.destination, entry.payload)
```

Exactly the same `post()` call as the mock simulator from the previous tutorial — NSB doesn't know or care that the delay this time came from a graph traversal.


## Full Working Code — 3-Node Example

```python
import time
import networkx as nx
from nsb_client import NSBSimClient

# Define a simple 3-node network topology
G = nx.path_graph(3)  # nodes: 0 -- 1 -- 2

sim = NSBSimClient("node0", "127.0.0.1", 65432)

while True:
    entry = sim.fetch()
    if entry:
        src, dst = 0, 2
        path = nx.shortest_path(G, src, dst)
        delay = len(path) * 0.02  # 20ms per hop
        time.sleep(delay)
        sim.post(entry.source, entry.destination, entry.payload)
```

:::tip Extending This
Try adding more nodes with `nx.path_graph(10)`, or use `nx.random_geometric_graph()` for a more realistic, irregular topology. As long as you can look up a path with `nx.shortest_path()`, the delay calculation and `post()` call stay the same.
:::


## What You Just Learned

- How to define and query a graph topology with NetworkX
- How to map `MessageEntry.source`/`destination` onto graph nodes
- How to compute a path-length-based delay instead of a flat constant
- That `post()` doesn't change regardless of how sophisticated your routing logic gets


## Go Deeper

- [Python API → NSBSimClient](/docs/api-reference/python/nsb-sim-client) — the `fetch()`/`post()` reference this tutorial builds on
- [Architecture → Simulator Modes](/docs/architecture/simulator-modes) — if you want to extend this to multiple Per-Node simulator instances


**Next:** [Integrate ns-3 →](/tutorials/advanced/ns3-integration)