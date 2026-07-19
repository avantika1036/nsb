import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import "../css/index.css";

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
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.983-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
<defs>
  <marker
    id="arrow-down"
    markerWidth="10"
    markerHeight="10"
    refX="5"
    refY="5"
    orient="auto"
    markerUnits="strokeWidth"
  >
    <path d="M0,0 L10,5 L0,10 Z" fill="#6b8cff" />
  </marker>
</defs>

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

const ConceptualDiagram = () => (
  <svg
    className="nsb-conceptual-diagram"
    viewBox="0 0 600 620"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-gold" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>

      <radialGradient id="particle-blue" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(217,90%,70%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(217,90%,62%)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="particle-gold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(43,95%,65%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(43,95%,55%)" stopOpacity="0" />
      </radialGradient>

      {/* Particle motion paths — matched to actual connectors */}
      <path id="path-appL" d="M192.5 140 L192.5 170 L260 170 L260 200" />
      <path id="path-appR" d="M422.5 140 L422.5 170 L340 170 L340 200" />
      <path id="path-node1" d="M300 290 L300 370 L230 370 L230 400" />
      <path id="path-node2" d="M300 290 L300 370 L370 370 L370 400" />

    </defs>

    {/* Title */}
    <text x="300" y="30" textAnchor="middle" className="cd-label" style={{ fontSize: "12px" }}>
      DEVELOPING APPLICATIONS
    </text>

    {/* App box — left */}
    <rect x="130" y="60" width="125" height="80" rx="10" className="cd-node-app" />
    <text x="192.5" y="90" textAnchor="middle" className="cd-node-text">APP</text>
    <text x="192.5" y="118" textAnchor="middle" className="cd-node-text" style={{ fontSize: "13px" }}>
      Python
      <animate attributeName="opacity"
        values="0;1;1;0;0"
        keyTimes="0;0.05;0.45;0.5;1"
        dur="6s" repeatCount="indefinite" />
    </text>
    <text x="192.5" y="118" textAnchor="middle" className="cd-node-text" style={{ fontSize: "13px" }}>
      C++
      <animate attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.5;0.55;0.95;1;1"
        dur="6s" repeatCount="indefinite" />
    </text>

    {/* App box — right */}
    <rect x="360" y="60" width="125" height="80" rx="10" className="cd-node-app" />
    <text x="422.5" y="90" textAnchor="middle" className="cd-node-text">APP</text>
    <text x="422.5" y="118" textAnchor="middle" className="cd-node-text" style={{ fontSize: "13px" }}>
      Python
      <animate attributeName="opacity"
        values="0;1;1;0;0"
        keyTimes="0;0.05;0.45;0.5;1"
        dur="6s" repeatCount="indefinite" />
    </text>
    <text x="422.5" y="118" textAnchor="middle" className="cd-node-text" style={{ fontSize: "13px" }}>
      C++
      <animate attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.5;0.55;0.95;1;1"
        dur="6s" repeatCount="indefinite" />
    </text>

    {/* App -> Bridge connectors */}
    <path d="M192.5 140 L192.5 170 L260 170 L260 200" className="cd-connector-up" />
    <path d="M422.5 140 L422.5 170 L340 170 L340 200" className="cd-connector-up" />


    {/* NSB Bridge */}
    <rect x="160" y="200" width="280" height="90" rx="12" className="cd-node-nsb" />
    <text x="300" y="235" textAnchor="middle" className="cd-label-gold">NETWORK SIMULATION</text>
    <text x="300" y="260" textAnchor="middle" className="cd-label-gold">BRIDGE</text>

    {/* Bridge -> Nodes connectors */}
    <path d="M300 290 L300 370 L230 370 L230 410" className="cd-connector-down" />
    <path d="M300 290 L300 370 L370 370 L370 410" className="cd-connector-down" />

    {/* Outer encapsulating box */}
    <rect x="140" y="340" width="320" height="170" rx="14" className="cd-node-encapsulate" />

    {/* Node boxes moved upward */}
    <rect x="175" y="410" width="110" height="50" rx="10" className="cd-node-sim" />
    <text x="230" y="440" textAnchor="middle" className="cd-node-text">NODE</text>

    <rect x="315" y="410" width="110" height="50" rx="10" className="cd-node-sim" />
    <text x="370" y="440" textAnchor="middle" className="cd-node-text">NODE</text>

    {/* Rotating simulator labels shifted further down */}
    <text x="300" y="490" textAnchor="middle" className="cd-label-gold" style={{ fontSize: "13px" }}>
      ns-3
      <animate attributeName="opacity"
        values="0;1;1;0;0"
        keyTimes="0;0.05;0.30;0.35;1"
        dur="9s" repeatCount="indefinite" />
    </text>
    <text x="300" y="490" textAnchor="middle" className="cd-label-gold" style={{ fontSize: "13px" }}>
      OMNeT++ / INET
      <animate attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.35;0.40;0.65;0.70;1"
        dur="9s" repeatCount="indefinite" />
    </text>
    <text x="300" y="490" textAnchor="middle" className="cd-label-gold" style={{ fontSize: "13px" }}>
      Other Simulators
      <animate attributeName="opacity"
        values="0;0;0;1;1;0"
        keyTimes="0;0.70;0.75;0.95;1;1"
        dur="9s" repeatCount="indefinite" />
    </text>

    {/* Bottom label */}
    <text x="300" y="550" textAnchor="middle" className="cd-label" style={{ fontSize: "12px" }}>
      NETWORK SIMULATOR
    </text>


    {/* Animated particles */}
    <circle r="4" fill="url(#particle-blue)" filter="url(#glow-blue)">
      <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s"><mpath href="#path-appL" /></animateMotion>
    </circle>
    <circle r="4" fill="url(#particle-blue)" filter="url(#glow-blue)">
      <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.5s"><mpath href="#path-appR" /></animateMotion>
    </circle>
    <circle r="4" fill="url(#particle-gold)" filter="url(#glow-gold)">
      <animateMotion dur="2.0s" repeatCount="indefinite" begin="0.2s"><mpath href="#path-node1" /></animateMotion>
    </circle>
    <circle r="4" fill="url(#particle-gold)" filter="url(#glow-gold)">
      <animateMotion dur="2.1s" repeatCount="indefinite" begin="0.6s"><mpath href="#path-node2" /></animateMotion>
    </circle>
  </svg>
);

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
              to="/about"
            >
              About NSB
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
          <ConceptualDiagram />
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
          <Link className="nsb-btn-primary" to="/about">
            About
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