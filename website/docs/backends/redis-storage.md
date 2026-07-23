---
sidebar_label: Redis Storage
sidebar_position: 2
---

# Redis Storage

NSB's optional payload caching mechanism. This page explains what Redis does inside NSB and why it matters; for the YAML fields that control it, see [Configuration → Database Settings](/docs/configuration/database-settings).


## What Redis Does in NSB

When `use_db: true` is set, payloads are stored in a Redis database rather than transmitted directly. The key for each stored payload is routed through NSB, and the receiving side retrieves the full payload from Redis using that key. When `use_db: false`, payloads are transmitted directly through NSB without persistent storage.


## When It Helps

Caching is most valuable for **large payloads** — anything that would exceed network buffer sizes if relayed in full through the bridge. For small test payloads (as in the [Quickstart](/quickstart)), direct transmission (`use_db: false`) is simpler and requires no Redis server at all.


## The Payload Caching Sequence

NSB2 decouples payload content from the relay path using a fast, in-memory key-value store:

1. When `NsbAppClient.send()` is called → payload stored in Redis → **key returned** (`<32 bytes>`)
2. This key is transmitted through the bridge instead of the full payload
3. When `NsbSimClient.fetch()` retrieves the entry → uses the key to **check out** the full payload from Redis
4. When `NsbSimClient.post()` is called → payload re-cached → key transmitted back through bridge
5. When `NsbAppClient.receive()` retrieves the entry → uses the key to **check out** the full payload

The daemon **never sees the payload content** — only the key and metadata.


## Why Size Independence Matters

If payloads were transmitted through the bridge in full (as in NSB v1), payloads larger than the host environment's buffer size would need to be **chunked** at each leg of the pipeline — adding computational overhead, bandwidth consumption, and latency. By routing only a fixed-size key (`<32 bytes>`) regardless of payload size, NSB2 makes bridge performance **independent of payload size** — a 10-byte message and a 10-megabyte message cost the same to relay.

This is implemented through the `DBConnector` abstraction (`store()`, `checkOut()`, `peek()`), with Redis as the default implementation. See [Deep Architecture → Cache Abstraction](/docs/architecture/deep-architecture#cache-abstraction-dbconnector) for the full interface contract and possible alternative implementations.


## Go Deeper

- [Configuration → Database Settings](/docs/configuration/database-settings) — `use_db`, `db_address`, `db_port`, `db_num` fields and Redis startup commands
- [Deep Architecture → Payload Caching](/docs/architecture/deep-architecture#payload-caching) — the same sequence in full architectural context
- [Performance Evaluation](/docs/reference/performance) — empirical memory and latency measurements with caching enabled