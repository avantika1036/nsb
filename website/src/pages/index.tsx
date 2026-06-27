import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import "../css/index.css";

const IconBridge = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 5c0 0 0 5 8 5s8-5 8-5" />
    <path d="M2 10h20" />
    <path d="M4 10v8" />
    <path d="M20 10v8" />
    <path d="M10 18v-4" />
    <path d="M14 18v-4" />
  </svg>
);
const IconCode = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconLayers = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconDB = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const IconZap = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconShield = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const terminalSteps = [
  {
    type: "typed",
    text: "# Start Redis + NSB Daemon",
  },
  {
    type: "typed",
    text: "$ redis-server --port 5050 &",
  },
  {
    type: "typed",
    text: "$ ./build/nsb_daemon config.yaml",
  },
  {
    type: "output",
    text: "▶ NSB Daemon listening on 127.0.0.1:65432",
  },
  {
    type: "typed",
    text: "# Run your application",
  },
  {
    type: "typed",
    text: "$ python3 app_node0.py & python3 simulator.py",
  },
  {
    type: "output",
    text: "✓ node0 connected",
  },
  {
    type: "output",
    text: "✓ global_sim connected",
  },
  {
    type: "output",
    text: "✓ Co-simulation running — message round-trip successful",
  },
];

function AnimatedTerminal() {
  const [lines, setLines] = React.useState<string[]>([""]);
  const [step, setStep] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  React.useEffect(() => {
    // Finished everything: stop animation.
    if (step >= terminalSteps.length) {
      return;
    }

    const current = terminalSteps[step];

    // -----------------------
    // PROGRAM OUTPUT
    // -----------------------
    if (current.type === "output") {
      const timer = setTimeout(() => {
        setLines((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = current.text;
          return copy;
        });

        // Move to next line after a short pause
        setTimeout(() => {
          setLines((prev) => [...prev, ""]);
          setStep((s) => s + 1);
          setCharIndex(0);
        }, 600);
      }, 500);

      return () => clearTimeout(timer);
    }

    // -----------------------
    // TYPING
    // -----------------------
    if (charIndex < current.text.length) {
      const ch = current.text[charIndex];

      let delay = 35 + Math.random() * 25;

      if (current.text.startsWith("#")) {
        delay += 20;
      }

      if (ch === " ") delay += 15;

      if (",.:()-".includes(ch)) delay += 40;

      const timer = setTimeout(() => {
        setLines((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] += ch;
          return copy;
        });

        setCharIndex((c) => c + 1);
      }, delay);

      return () => clearTimeout(timer);
    }

    // -----------------------
    // FINISHED TYPING LINE
    // -----------------------
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, ""]);
      setStep((s) => s + 1);
      setCharIndex(0);
    }, 350);

    return () => clearTimeout(timer);
  }, [step, charIndex]);

  const finished = step >= terminalSteps.length;
  const currentStep = finished ? null : terminalSteps[step];

  const getClass = (line: string) => {
    if (line.startsWith("#")) return "t-comment";
    if (line.startsWith("$")) return "t-cmd";
    if (line.startsWith("✓")) return "t-success";
    if (line.startsWith("▶")) return "t-out";
    return "";
  };

  // Keep cursor visible while typing OR after completion.
  const cursorVisible =
    finished || (currentStep && currentStep.type === "typed");

  return (
    <div className="nsb-hero-terminal animate-fade-up animate-delay-5">
      <div className="nsb-term-bar">
        <div
          className="nsb-term-dot"
          style={{ background: "#ff5f57" }}
        />
        <div
          className="nsb-term-dot"
          style={{ background: "#febc2e" }}
        />
        <div
          className="nsb-term-dot"
          style={{ background: "#28c840" }}
        />
        <span style={{ marginLeft: 8 }}>
          terminal — ~/my-simulation
        </span>
      </div>

      <div className="nsb-term-body">
        {lines.map((line, idx) => (
          <div key={idx} className={getClass(line)}>
            {line}
            {idx === lines.length - 1 && cursorVisible && (
              <span className="terminal-cursor" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const ArchitectureDiagram = () => (
  <svg
    className="nsb-arch-diagram"
    viewBox="0 0 360 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    
    <defs>
      <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Application Layer */}
    <rect
      className="arch-box-app arch-blue-glow"
      x="20"
      y="20"
      width="320"
      height="88"
      rx="10"
    />
    <text
      className="arch-label"
      x="180"
      y="50"
      textAnchor="middle"
      letterSpacing="2"
    >
      APPLICATION LAYER
    </text>
    <text className="arch-main-text" x="180" y="70" textAnchor="middle">
      NSBAppClient (Python or C++)
    </text>
    <text className="arch-method" x="95" y="92" textAnchor="middle">
      send()
    </text>
    <text className="arch-method" x="265" y="92" textAnchor="middle">
      receive()
    </text>

    {/* Connector down */}
    <line className="arch-connector" x1="180" y1="108" x2="180" y2="158" />
    <polygon className="arch-arrow" points="174,152 180,165 186,152" />
    <text className="arch-conn-label" x="198" y="138">
      TCP / RabbitMQ
    </text>

    {/* NSB Daemon */}
    <rect
      className="arch-box-daemon arch-gold-glow"
      x="20"
      y="165"
      width="320"
      height="98"
      rx="10"
    />
    <text
      className="arch-label arch-label-gold"
      x="180"
      y="196"
      textAnchor="middle"
      letterSpacing="3"
    >
      NSB DAEMON
    </text>
    <text
      className="arch-main-text arch-main-text-gold"
      x="180"
      y="216"
      textAnchor="middle"
    >
      Central broker — compiled from source
    </text>
    <rect
      className="arch-badge-bg"
      x="40"
      y="228"
      width="128"
      height="22"
      rx="4"
    />
    <text className="arch-badge-text" x="104" y="243" textAnchor="middle">
      Routes payloads
    </text>
    <rect
      className="arch-badge-bg"
      x="192"
      y="228"
      width="128"
      height="22"
      rx="4"
    />
    <text className="arch-badge-text" x="256" y="243" textAnchor="middle">
      Distributes config
    </text>

    {/* Connector down */}
    <line className="arch-connector" x1="180" y1="263" x2="180" y2="308" />
    <polygon className="arch-arrow" points="174,302 180,315 186,302" />
    <text className="arch-conn-label" x="198" y="290">
      TCP / RabbitMQ
    </text>

    {/* Simulator Layer */}
    <rect
      className="arch-box-sim arch-blue-glow"
      x="20"
      y="315"
      width="320"
      height="88"
      rx="10"
    />
    <text
      className="arch-label"
      x="180"
      y="345"
      textAnchor="middle"
      letterSpacing="2"
    >
      SIMULATOR LAYER
    </text>
    <text className="arch-main-text" x="180" y="365" textAnchor="middle">
      NSBSimClient — embedded in simulator
    </text>
    <text className="arch-method" x="95" y="387" textAnchor="middle">
      fetch()
    </text>
    <text className="arch-method" x="265" y="387" textAnchor="middle">
      post()
    </text>

    {/* Redis note */}
    <text className="arch-note" x="180" y="422" textAnchor="middle">
      Optional: Redis payload storage beneath the Daemon
    </text>
  </svg>
);

const features = [
  {
    icon: <IconBridge />,
    title: "Simulator Agnostic",
    desc: "Supports ns-3, OMNeT++, and any simulator with a C++ or Python integration layer. No simulator modification required.",
  },
  {
    icon: <IconZap />,
    title: "Two Delivery Modes",
    desc: "PULL polling or PUSH forwarding. System-Wide or Per-Node simulator mode — match your exact co-simulation topology.",
  },
  {
    icon: <IconCode />,
    title: "Python & C++ APIs",
    desc: "Full-featured client libraries for both languages with identical interfaces, async support, and cross-language interoperability.",
  },
  {
    icon: <IconDB />,
    title: "Redis Payload Storage",
    desc: "Optional Redis-backed payload storage for large messages beyond TCP buffer limits, with transparent key routing.",
  },
  {
    icon: <IconLayers />,
    title: "RabbitMQ Backend",
    desc: "Swap the TCP daemon for a RabbitMQ broker for scalable, broker-native routing with priority queues and DLX support.",
  },
  {
    icon: <IconShield />,
    title: "Zero App Changes",
    desc: "NSB acts as a transparent bridge. Your application code stays completely untouched — no refactoring required.",
  },
];

const useCases = [
  {
    tag: "AV/V2X",
    title: "Autonomous Vehicle Platooning",
    desc: "Model V2V and V2X communication over realistic simulated radio channels without hardware.",
  },
  {
    tag: "Federated ML",
    title: "Federated Learning Networks",
    desc: "Simulate network effects on federated learning convergence — latency, partitions, packet loss.",
  },
  {
    tag: "SDN",
    title: "SDN Protocol Testing",
    desc: "Validate software-defined networking controllers and routing algorithms at scale, reproducibly.",
  },
  {
    tag: "Education",
    title: "Teaching Labs",
    desc: "Give students a consistent network lab experience that runs on any laptop, no physical hardware.",
  },
];

const messageSteps = [
  {
    n: "1",
    title: "Application sends",
    desc: "NSBAppClient.send(dest_id, payload) — fire-and-forget to the NSB Daemon.",
  },
  {
    n: "2",
    title: "Daemon stores & routes",
    desc: "Daemon receives the payload (optionally storing in Redis) and routes it toward the simulator client.",
  },
  {
    n: "3",
    title: "Simulator fetches",
    desc: "NSBSimClient.fetch() retrieves the payload, injects it into the simulated network topology.",
  },
  {
    n: "4",
    title: "Simulator posts back",
    desc: "After the packet traverses the simulated network, post() notifies NSB of successful delivery.",
  },
  {
    n: "5",
    title: "Application receives",
    desc: "NSBAppClient.receive() retrieves the delivered payload — transparent to the application.",
  },
];

const journeySteps = [
  {
    step: "1",
    title: "Discover",
    desc: "Understand what NSB does and why it exists",
    to: "/docs",
  },
  {
    step: "2",
    title: "Install",
    desc: "Get NSB running on macOS, Linux, or Windows WSL2",
    to: "/get-started",
  },
  {
    step: "3",
    title: "First run",
    desc: "Send your first message end-to-end in 10 minutes",
    to: "/quickstart",
  },
  {
    step: "4",
    title: "Learn",
    desc: "Understand the architecture and configuration system",
    to: "/docs/architecture/overview",
  },
  {
    step: "5",
    title: "Integrate",
    desc: "Connect ns-3, OMNeT++, or build your own simulator",
    to: "/tutorials",
  },
];

export default function Home() {
  return (
    <Layout
      title="NSB — Network Simulation Bridge"
      description="Open-source middleware bridging real applications with network simulators. From UC Santa Cruz INRG Lab."
    >
      {/* ── Hero ── */}
      <div className="nsb-hero">
        <div className="nsb-hero-left">
          <div className="nsb-hero-badge animate-fade-up animate-delay-1">
            <span className="nsb-hero-badge-dot" />
            <span style={{
              background: 'linear-gradient(135deg, var(--nsb-gold), var(--nsb-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Beta · Open Source · BSD 3-Clause · UC Santa Cruz INRG Lab
            </span>
          </div>
          <h1 className="nsb-hero-title animate-fade-up animate-delay-2">
            Bridge your
            <br />
            <span className="accent-blue">applications</span> to
            <br />
            <span className="accent-gold">any simulator</span>
          </h1>
          <p className="nsb-hero-subtitle animate-fade-up animate-delay-3">
            NSB is open-source middleware that connects real applications to
            network simulators — enabling co-simulation without modifying your
            application logic or simulator internals.
          </p>
          <div className="nsb-hero-btns animate-fade-up animate-delay-4">
            <Link
              className="nsb-btn-primary"
              to="/get-started"
            >
              Get Started <IconArrow />
            </Link>
            <Link
              className="nsb-btn-secondary"
              to="/quickstart"
            >
              <IconPlay /> Quickstart — 5 min
            </Link>
            <a
              className="nsb-btn-outline"
              href="https://github.com/nsb-ucsc/nsb_beta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGitHub /> GitHub
            </a>
          </div>

          <AnimatedTerminal />
        </div>

        <div className="nsb-hero-right animate-fade-right animate-delay-2">
          <ArchitectureDiagram />
        </div>
      </div>

      {/* ── Features ── */}
      <div className="nsb-features">
        {features.map((f) => (
          <div key={f.title} className="nsb-feat-card">
            <div className="nsb-feat-icon">{f.icon}</div>
            <div className="nsb-feat-title">{f.title}</div>
            <div className="nsb-feat-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Use Cases ── */}
      <div className="nsb-use-cases">
        <div className="nsb-section-header">
          <div className="nsb-section-label">Research Use Cases</div>
          <div className="nsb-section-title">
            Built for real research problems
          </div>
          <div className="nsb-section-sub">
            NSB was created at UC Santa Cruz INRG to address real co-simulation
            needs — from autonomous vehicle networking to federated learning
            over wireless.
          </div>
        </div>
        <div className="nsb-uc-grid">
          {useCases.map((uc) => (
            <div key={uc.title} className="nsb-uc-card">
              <div className="nsb-uc-tag">{uc.tag}</div>
              <div className="nsb-uc-title">{uc.title}</div>
              <div className="nsb-uc-desc">{uc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="nsb-how">
        <div className="nsb-section-header">
          <div className="nsb-section-label">Message Lifecycle</div>
          <div className="nsb-section-title">How NSB works</div>
          <div className="nsb-section-sub">
            A clean five-step pipeline from application send to application
            receive — with the network simulator transparently in the middle.
          </div>
        </div>
        <div className="nsb-how-grid">
          <div className="nsb-steps">
            {messageSteps.map((s) => (
              <div key={s.n} className="nsb-step">
                <div className="nsb-step-num">{s.n}</div>
                <div className="nsb-step-body">
                  <div className="nsb-step-title">{s.title}</div>
                  <div className="nsb-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="nsb-how-code">
            <div className="nsb-how-code-label">Message flow</div>
            <div className="nsb-flow-line">
              <span className="nsb-flow-node">App("node0")</span>
            </div>
            <div className="nsb-flow-child">└─ send("node1", payload)</div>
            <div className="nsb-flow-line">
              <span className="nsb-flow-daemon">NSB Daemon</span>
            </div>
            <div className="nsb-flow-child">├─ stores in Redis</div>
            <div className="nsb-flow-child">└─ routes to SimClient</div>
            <div className="nsb-flow-line">
              <span className="nsb-flow-node">Simulator</span>
            </div>
            <div className="nsb-flow-child">├─ fetch() → inject packet</div>
            <div className="nsb-flow-child">└─ post("node0","node1",p)</div>
            <div className="nsb-flow-line">
              <span className="nsb-flow-node">App("node1")</span>
            </div>
            <div className="nsb-flow-child">└─ receive() → payload</div>
            <div className="nsb-flow-modes">
              <div className="nsb-flow-modes-label">Simulator modes</div>
              <div className="nsb-flow-mode-row">
                <span className="nsb-mode-badge nsb-mode-blue">
                  System-Wide
                </span>
                <span className="nsb-flow-mode-desc">
                  ns-3 · one global SimClient
                </span>
              </div>
              <div className="nsb-flow-mode-row">
                <span className="nsb-mode-badge nsb-mode-gold">Per-Node</span>
                <span className="nsb-flow-mode-desc">
                  OMNeT++ · one SimClient per node
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Learning Journey ── */}
      <div className="nsb-journey">
        <div className="nsb-journey-bg" />
        <div
          className="nsb-section-header"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="nsb-section-label">Your path through NSB</div>
          <div className="nsb-section-title">First success, then depth</div>
          <div className="nsb-section-sub">
            Every step is designed so you always know what you completed and
            what comes next.
          </div>
        </div>
        <div className="nsb-journey-steps">
          {journeySteps.map((s, i) => (
            <Link key={s.step} className="nsb-journey-step" to={s.to}>
              <div className="nsb-journey-num-wrap">
                <div className={`nsb-journey-num nsb-journey-num-${i + 1}`}>
                  {s.step}
                </div>
                {i < journeySteps.length - 1 && (
                  <div className="nsb-journey-connector" />
                )}
              </div>
              <div className="nsb-journey-content">
                <div className="nsb-journey-title">{s.title}</div>
                <div className="nsb-journey-desc">{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="nsb-journey-cta">
          <Link
            className="nsb-btn-primary nsb-btn-lg"
            to="/get-started"
          >
            Start the journey <IconArrow />
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="nsb-cta">
        <div className="nsb-section-label">Ready to start?</div>
        <div className="nsb-section-title" style={{ marginBottom: 12 }}>
          Get your first simulation running
        </div>
        <p
          style={{
            fontSize: 15,
            color: "var(--text2)",
            maxWidth: 480,
            margin: "0 auto 32px",
            lineHeight: 1.65,
          }}
        >
          Follow the Quickstart to run a complete co-simulation in under 5
          minutes — no simulator experience required.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link className="nsb-btn-primary" to="/quickstart">
            <IconPlay /> Quickstart — 5 min
          </Link>
          <Link className="nsb-btn-secondary" to="/docs">
            Browse Documentation
          </Link>
          <Link className="nsb-btn-outline" to="/tutorials">
            View Tutorials
          </Link>
        </div>
      </div>
    </Layout>
  );
}