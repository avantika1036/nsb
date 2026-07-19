---
sidebar_label: System Modes
sidebar_position: 3
---

# System Modes (Configuration)

This page documents the `mode` field in `config.yaml`. For the conceptual explanation of how PULL and PUSH actually work internally, see [Architecture → System Modes](/docs/architecture/system-modes).


## PULL Mode (`mode: 0`)

Clients must explicitly request messages from the daemon. No message is delivered unless asked for.

- `NSBAppClient.receive()` → sends a RECEIVE request → daemon responds with payload or `NO_MESSAGE`
- `NSBSimClient.fetch()` → sends a FETCH request → daemon responds with payload or `NO_MESSAGE`

**Recommended for:** Most configurations. Simpler to reason about and debug.

```yaml
system:
  mode: 0
```


## PUSH Mode (`mode: 1`)

The daemon automatically forwards payloads to clients as soon as they are available.

- When `send()` is called → daemon pushes directly to the simulator client
- When `post()` is called → daemon pushes directly to the destination application client
- Clients must maintain persistent connections throughout the simulation

**Recommended for:** Latency-sensitive setups.

:::warning NAT and Firewall Considerations
PUSH mode may not work in all network configurations (e.g., NAT, firewalls, unstable connections), since it relies on the daemon being able to proactively reach each client over a persistent connection.
:::

```yaml
system:
  mode: 1
```


## Go Deeper

- [Architecture → System Modes](/docs/architecture/system-modes) — internal behavior, polling vs forwarding mechanics
- [Configuration Reference](/docs/configuration/config-reference) — full field table including defaults
- [Payload Lifecycle](/docs/architecture/payload-lifecycle) — full PULL and PUSH sequence diagrams