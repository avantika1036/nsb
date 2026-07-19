---
sidebar_label: Configuration Reference
sidebar_position: 2
---

# Configuration Reference

Every field in `config.yaml`, with type, default, and description. This is the authoritative field-by-field reference. For the conceptual explanation behind `mode` and `simulator_mode`, see [Architecture → System Modes](/docs/architecture/system-modes) and [Architecture → Simulator Modes](/docs/architecture/simulator-modes).


## `system` Section

### `daemon_address`
- **Type:** `string`
- **Default:** `127.0.0.1`
- **Description:** The IP address or hostname on which the NSB Daemon is listening. Clients must use this same address when connecting.

### `daemon_port`
- **Type:** `integer`
- **Default:** `65432`
- **Description:** The port number on which the NSB Daemon listens for client connections. Make sure this port is not in use by another process.

### `mode`
- **Type:** `integer`
- **Values:** `0` (PULL) or `1` (PUSH)
- **Default:** `0` (PULL)
- **Description:** Sets the system operation mode. See [System Modes](/docs/configuration/system-modes).

### `simulator_mode`
- **Type:** `integer`
- **Values:** `0` (System-Wide) or `1` (Per-Node)
- **Default:** `1` (Per-Node)
- **Description:** Sets the simulator client mode. See [Simulator Modes](/docs/configuration/simulator-modes).


## `database` Section

### `use_db`
- **Type:** `boolean`
- **Values:** `true` or `false`
- **Default:** `true`
- **Description:** When `true`, payloads are stored in a Redis database. The message key is routed through NSB, and the receiving client retrieves the full payload from Redis. Useful for large payloads. When `false`, payloads are transmitted directly through NSB without persistent storage.

### `db_address`
- **Type:** `string`
- **Default:** `127.0.0.1`
- **Description:** The IP address or hostname of the Redis server.

### `db_port`
- **Type:** `integer`
- **Default:** `5050`
- **Description:** The port on which the Redis server is running. Note: Redis defaults to port `6379`, but NSB examples and guides use port `5050` — be sure to match your `redis-server` startup command.

### `db_num`
- **Type:** `integer`
- **Default:** `0`
- **Description:** Redis database number to use. Redis supports multiple logical databases (0–15 by default). Use `0` unless you have a specific reason to separate data.


## RabbitMQ Daemon Configuration

When using the Python RabbitMQ daemon (`rabbit/nsb_daemon.py`), configuration is passed programmatically via `NSBDaemonConfig` instead of a YAML file:

```python
from nsb_daemon import NSBDaemon, NSBDaemonConfig

config = NSBDaemonConfig(
    sys_mode=0,           # 0 = PULL, 1 = PUSH
    sim_mode=0,           # 0 = SYSTEM_WIDE, 1 = PER_NODE
    use_db=False,         # Whether to use Redis
    db_address="localhost",
    db_port=6379,
    db_num=0
)

daemon = NSBDaemon("localhost", 5672, config)
daemon.start()
```

Or run directly from the terminal (uses defaults):

```bash
python nsb_daemon.py
```

See [RabbitMQ Backend](/docs/backends/rabbitmq-backend) for the full Python and C++ usage guide.


## Environment Variable Configuration (Unified Client)

The Unified Client also supports backend selection via environment variables instead of constructor arguments:

```bash
export NSB_BACKEND=rabbitmq    # or "socket"
export NSB_PORT=5672           # port for the selected backend
```


## Go Deeper

- [System Modes](/docs/configuration/system-modes) — PULL vs PUSH behavior and recommendations
- [Simulator Modes](/docs/configuration/simulator-modes) — System-Wide vs Per-Node behavior and constraints
- [Database Settings](/docs/configuration/database-settings) — Redis setup, startup commands, and verification