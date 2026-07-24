---
sidebar_label: RabbitMQ Enhancements
sidebar_position: 4
---

# RabbitMQ Enhancement Roadmap

This document lists identified opportunities where RabbitMQ-native features could significantly improve the NSB architecture. These are engineering proposals ranging from low-effort improvements to longer-term redesigns.


## 1. Message Priority Queues

### Current State
All messages are treated equally. The `nsb.recv.{client_id}` queues process messages in FIFO order.

### Opportunity
RabbitMQ supports **priority queues** (up to 255 priority levels). This could enable:
- Control messages (INIT, PING, EXIT) to take precedence over data messages
- Urgent simulation events to bypass queued payloads
- QoS simulation where high-priority network traffic is modeled

### Impact
- More realistic network simulation (priority-based routing)
- Better responsiveness for control-plane operations
- Enables modeling of DiffServ or similar QoS mechanisms


## 2. Dead Letter Exchanges (DLX) for Message Tracking

### Current State
Messages that fail to be processed or time out are silently dropped with no visibility.

### Opportunity
RabbitMQ's **Dead Letter Exchanges** can capture:
- Messages that exceed TTL (simulating network timeouts/drops)
- Rejected or failed messages
- Messages from deleted queues (client disconnection)

### Impact
- **Debugging:** Track why messages weren't delivered
- **Metrics:** Count dropped packets for simulation accuracy
- **Timeout simulation:** Model network latency/drops via per-message TTL
- **Audit trail:** Log all failed communications


## 3. Topic Exchange for Multicast/Broadcast

### Current State
The implementation uses a **direct exchange** with point-to-point routing (`nsb.recv.{client_id}`). Broadcasting requires sending to each client individually.

### Opportunity
A **topic exchange** enables:
- **Multicast:** `nsb.recv.group.*` → all nodes in a group
- **Broadcast:** `nsb.recv.#` → all nodes
- **Hierarchical addressing:** `nsb.recv.datacenter1.rack2.node5`

### Impact
- Efficient broadcast: single publish reaches all subscribers
- Group communication: model network segments, VLANs, multicast groups
- Hierarchical networks: natural fit for datacenter and IoT topologies


## 4. Message TTL for Network Latency Simulation

### Current State
Messages are delivered as fast as possible. Network latency must be simulated externally.

### Opportunity
RabbitMQ's **per-message TTL** and **delayed message plugins** can model:
- Network propagation delay
- Congestion-induced delays
- Timeout behaviors at the transport layer

:::note Design Question
There is a design question here — it may be better to isolate latency modeling within the network simulator rather than the broker. This is not a clear win and warrants discussion.
:::

### Impact
- Realistic latency modeling without application-level `sleep()`
- Configurable per-link delays for heterogeneous networks
- Decoupled timing from application logic


## 5. Publisher Confirms for Reliable Delivery

### Current State
`basic_publish()` is fire-and-forget. There is no confirmation that messages reached the broker.

### Opportunity
**Publisher confirms** provide acknowledgment that messages were:
- Received by the broker
- Persisted to disk (if durable queues are configured)
- Routed to at least one queue

### Impact
- Guaranteed delivery for critical simulation events
- Error detection when a destination doesn't exist
- Flow control to prevent overwhelming the broker


## 6. Consumer Prefetch for Flow Control

### Current State
The `_recv_msg()` implementation uses `basic_get()`, which polls one message at a time.

### Opportunity
**Prefetch (QoS)** settings can:
- Batch message retrieval for higher throughput
- Limit in-flight messages to prevent memory exhaustion
- Balance load across multiple consumers

### Impact
- Higher throughput for high-volume simulations
- Backpressure prevents fast producers from overwhelming slow consumers
- Fair dispatch across multiple simulator instances


## 7. Quorum Queues for High Availability

### Current State
Single-node RabbitMQ setup. Queue data is lost if the broker crashes.

### Opportunity
**Quorum queues** provide:
- Replicated queues across a RabbitMQ cluster
- Automatic leader election on failure
- Strong data safety guarantees

### Impact
- Fault tolerance for long-running simulations
- No message loss during broker restarts
- Distributed deployment for large-scale simulations


## 8. Streams for Event Sourcing / Replay

### Current State
Messages are consumed and deleted. No mechanism exists to replay simulation events.

### Opportunity
RabbitMQ **Streams** (v3.9+) provide:
- Persistent, append-only log of messages
- Multiple consumers can read from any offset
- Full replay capability

### Impact
- Simulation replay for debugging
- Event sourcing for simulation state reconstruction
- Analytics on historical simulation data
- Multiple consumers can process the same events differently (e.g., logging + processing)


## 9. Alternate Exchange for Unroutable Messages

### Current State
Messages sent to non-existent destinations are silently dropped.

### Opportunity
**Alternate exchanges** catch unroutable messages and redirect them to a handling queue.

### Impact
- Error detection for misconfigured routing
- Graceful handling of messages to disconnected clients
- Easier debugging of topology mismatches


## 10. Headers Exchange for Content-Based Routing

### Current State
Routing is based solely on the destination client ID.

### Opportunity
A **headers exchange** routes messages based on metadata attributes:
- Message type (control vs. data)
- Payload size category
- Simulation metadata tags

### Impact
- Content-aware routing without parsing message bodies
- Specialized handlers for different message types
- Load distribution based on message characteristics


## 11. Connection/Channel Pooling

### Current State
Each client creates its own connection with 3 channels (CTRL, SEND, RECV).

### Opportunity
**Connection pooling** could reduce overhead when many clients share the same broker.

:::note Design Note
This was discussed and deliberately not implemented in the initial version due to:
- Difficulty tracking per-client routing over shared connections
- Increased per-message overhead

May be worth revisiting for large-scale simulations.
:::

### Impact
- Scalability for simulations with many nodes
- Resource efficiency on broker and clients
- Reduced connection setup latency


## 12. Management API Integration

### Current State
No programmatic visibility into queue depths, message rates, or client status.

### Opportunity
RabbitMQ's **Management HTTP API** provides:
- Queue statistics (depth, rates, consumer count)
- Connection and channel monitoring
- Dynamic configuration

### Impact
- Monitoring dashboard for simulation health
- Dynamic scaling based on queue depth
- Client discovery without daemon tracking
- Alerting on queue buildup or disconnections


## 13. Lazy Queues for Large Simulations

### Current State
Messages are held in memory, which limits simulation scale for large payloads or many clients.

### Opportunity
**Lazy queues** store messages on disk:
- Support millions of messages per queue
- Reduced memory footprint
- Trade-off: slightly higher latency

### Impact
- Large-scale simulations with many queued messages
- Memory efficiency for resource-constrained environments
- Burst handling without memory exhaustion


## Prioritized Recommendations

### Short-Term (Low Effort, High Value)
1. **Dead Letter Exchanges** — immediate debugging visibility with minimal code changes
2. **Publisher Confirms** — improves reliability without major architectural changes
3. **Consumer Prefetch** — performance improvement with a simple config change

### Medium-Term
4. **Topic Exchange** — enables multicast and broadcast patterns
5. **Message TTL** — built-in latency simulation (pending design decision)
6. **Management API** — monitoring and observability dashboard

### Long-Term Strategic
7. **Streams** — event sourcing and replay capability
8. **Priority Queues** — QoS simulation support
9. **Quorum Queues** — high availability for production deployments


## Go Deeper

- [RabbitMQ Backend](/docs/backends/rabbitmq-backend) — the current implementation these proposals build on
- [Contribute](/contribute) — these proposals are open for community implementation