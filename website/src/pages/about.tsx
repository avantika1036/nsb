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
    width="18"
    height="18"
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
const IconGitHub = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
const IconX = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconAlert = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconPlug = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8" />
  </svg>
);
const IconFile = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconGlobe = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

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
    tag: "Autonomous Vehicles",
    title: "V2X Communication",
    desc: "Simulate vehicle-to-everything networking at city scale with real application traffic.",
  },
  {
    tag: "Federated Learning",
    title: "Distributed ML Training",
    desc: "Test federated learning algorithms over realistic wireless network conditions.",
  },
  {
    tag: "IoT Networks",
    title: "Smart City Sensors",
    desc: "Model large-scale IoT deployments with thousands of sensors and actuators.",
  },
  {
    tag: "Network Research",
    title: "Protocol Evaluation",
    desc: "Evaluate new networking protocols in controlled yet realistic environments.",
  },
];

const messageSteps = [
  {
    n: 1,
    title: "Application sends",
    desc: "Your application calls NSBAppClient.send() with destination and payload.",
  },
  {
    n: 2,
    title: "Daemon routes",
    desc: "NSB Daemon stores the message and routes it to the appropriate simulator client.",
  },
  {
    n: 3,
    title: "Simulator processes",
    desc: "The simulator injects the packet into its network model and simulates transmission.",
  },
  {
    n: 4,
    title: "Daemon delivers",
    desc: "After simulation, the daemon delivers the message to the destination application.",
  },
  {
    n: 5,
    title: "Application receives",
    desc: "The destination application calls NSBAppClient.receive() to get the payload.",
  },
];

export default function About() {
  return (
    <Layout
      title="About — NSB"
      description="Learn about NSB's architecture, features, and use cases."
    >
      <div className="nsb-page">
        {/* ── Hero Section ── */}
        <div className="nsb-hero">
          <div className="nsb-hero-left">
            <div className="nsb-hero-badge animate-fade-up">
              <span className="nsb-hero-dot" />
              About NSB
            </div>
            <h1 className="nsb-hero-title animate-fade-up animate-delay-1">
              Why Network Simulation Bridge Exists
            </h1>
            <p className="nsb-content-subtitle animate-fade-up animate-delay-2">
              Modern networking research often requires integrating real applications with network simulators.
              Unfortunately, every simulator exposes different APIs, communication models, and integration workflows, 
              forcing developers to repeatedly build simulator-specific adapters.
              Network Simulation Bridge (NSB) eliminates that complexity through a unified middleware layer, 
              allowing one application to communicate with multiple network simulators without changing application logic.
            </p>
            <div className="nsb-hero-btns animate-fade-up animate-delay-3">
              <Link
                className="nsb-btn-primary"
                to="/get-started"
              >
                Get Started <IconArrow />
              </Link>
              <Link
                className="nsb-btn-secondary"
                to="https://github.com/nsb-ucsc/nsb_beta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGitHub /> GitHub
              </Link>
            </div>
          </div>

          <div className="nsb-hero-right animate-fade-right animate-delay-2">
            <ArchitectureDiagram />
          </div>
        </div>

        {/* ── The Challenge ── */}
        <div className="nsb-challenge">
          <div className="nsb-section-header">
            <div className="nsb-section-label">The Challenge</div>
            <div className="nsb-section-title nsb-statement-title">
            Traditional application-to-simulator integrations are often difficult to build, difficult to maintain, and impossible to reuse across different simulators.
          </div>
            <div className="nsb-section-sub">
              NSB introduces a reusable middleware layer that separates applications from simulator-specific implementations, making experiments more portable, maintainable, and reproducible.
            </div>
          </div>
          <div className="nsb-challenge-grid">
            <div className="nsb-challenge-card">
              <div className="nsb-challenge-icon">
                <IconX />
              </div>
              <div className="nsb-challenge-card-title">Traditional Approach</div>
              <ul className="nsb-challenge-list">
                <li>• One custom adapter per simulator</li>
                <li>• Duplicate integration code</li>
                <li>• Difficult maintenance</li>
                <li>• Poor portability</li>
              </ul>
            </div>
            <div className="nsb-challenge-card">
              <div className="nsb-challenge-icon">
                <IconAlert />
              </div>
              <div className="nsb-challenge-card-title">The Challenge</div>
              <div className="nsb-challenge-desc">
                Every simulator provides different APIs, communication mechanisms, and execution models.
                Applications become tightly coupled to simulator implementations, making experimentation harder to scale and reproduce.
              </div>
            </div>
            <div className="nsb-challenge-card nsb-challenge-card-highlight">
              <div className="nsb-challenge-icon nsb-challenge-icon-gold">
                <IconCheck />
              </div>
              <div className="nsb-challenge-card-title">The NSB Solution</div>
              <ul className="nsb-challenge-list">
                <li>• One middleware layer</li>
                <li>• One application implementation</li>
                <li>• Multiple supported simulators</li>
                <li>• Reusable experiments</li>
                <li>• Consistent communication interface</li>
              </ul>
            </div>
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

        {/* ── Built for Research ── */}
        <div className="nsb-research">
          <div className="nsb-section-header">
            <div className="nsb-section-label">Built for Research</div>
            <div className="nsb-section-title nsb-statement-title">
            Network Simulation Bridge was developed to support reproducible networking research while remaining practical for education, experimentation, and future simulator integrations.
          </div>
          </div>
          <div className="nsb-research-grid">
            <div className="nsb-research-card animate-fade-up">
              <div className="nsb-research-icon"><IconCode /></div>
              <div className="nsb-research-title">Python & C++</div>
            </div>
            <div className="nsb-research-card animate-fade-up animate-delay-1">
              <div className="nsb-research-icon"><IconPlug /></div>
              <div className="nsb-research-title">Simulator Agnostic</div>
            </div>
            <div className="nsb-research-card animate-fade-up animate-delay-2">
              <div className="nsb-research-icon"><IconFile /></div>
              <div className="nsb-research-title">BSD 3-Clause</div>
            </div>
            <div className="nsb-research-card animate-fade-up animate-delay-3">
              <div className="nsb-research-icon"><IconGlobe /></div>
              <div className="nsb-research-title">Open Source</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
