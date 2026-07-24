import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/tutorials.css';

const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconPlay = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconBridge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5c0 0 0 5 8 5s8-5 8-5"/>
    <path d="M2 10h20"/><path d="M4 10v8"/><path d="M20 10v8"/>
    <path d="M10 18v-4"/><path d="M14 18v-4"/>
  </svg>
);

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface Tutorial {
  id: number;
  title: string;
  desc: string;
  difficulty: Difficulty;
  time: string;
  link: string;
  tags: string[];
}

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: 'Run Your First Co-Simulation',
    desc: 'No prior knowledge needed. Modify the pre-built mock simulator from Quickstart — add delays, change payload sizes, and switch PULL/PUSH and System-Wide/Per-Node modes.',
    difficulty: 'beginner',
    time: '15 min',
    link: '/tutorials/beginner/experiment-with-the-mock-simulator',
    tags: ['Python', 'PULL Mode'],
  },
  {
    id: 2,
    title: 'Build a Mock Simulator',
    desc: 'Build a simulator client from scratch using NSBSimClient. Learn fetch(), post(), MessageEntry, and the simulator lifecycle step by step.',
    difficulty: 'beginner',
    time: '25 min',
    link: '/tutorials/beginner/build-a-mock-simulator',
    tags: ['Python', 'NSBSimClient'],
  },
  {
    id: 3,
    title: 'NetworkX Graph Simulator',
    desc: 'Use NetworkX to model a graph topology and simulate shortest-path routing with realistic per-hop delays.',
    difficulty: 'intermediate',
    time: '45 min',
    link: '/tutorials/intermediate/networkx-graph-simulator',
    tags: ['Python', 'NetworkX'],
  },
  {
    id: 4,
    title: 'ns-3 Integration',
    desc: 'Connect NSB to ns-3 in System-Wide mode. Link via CMake and inject payloads into ns-3 topologies.',
    difficulty: 'advanced',
    time: '60 min',
    link: '/tutorials/advanced/ns3-integration',
    tags: ['C++', 'ns-3', 'System-Wide'],
  },
  {
    id: 5,
    title: 'OMNeT++ Basic Integration',
    desc: 'Per-Node mode with OMNeT++. Build an NSBHost module, wire it into a NED network, and run the simulation.',
    difficulty: 'advanced',
    time: '60 min',
    link: '/tutorials/advanced/omnet-basic-integration',
    tags: ['C++', 'OMNeT++', 'Per-Node'],
  },
  {
    id: 6,
    title: 'OMNeT++ with INET',
    desc: 'Per-Node mode with UDP integration in OMNeT++ and the INET framework, for realistic wireless and wired simulation.',
    difficulty: 'advanced',
    time: '90 min',
    link: '/tutorials/advanced/omnet-inet-integration',
    tags: ['C++', 'OMNeT++', 'INET', 'Wireless'],
  },
];

const diffLabel: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function Tutorials() {
  const [active, setActive] = useState<'all' | Difficulty>('all');
  const filtered = active === 'all' ? tutorials : tutorials.filter(t => t.difficulty === active);

  return (
    <Layout title="Tutorials — NSB" description="Step-by-step guides for integrating NSB with ns-3, OMNeT++, and more.">
      <div className="tut-page">
        {/* Header */}
        <div className="tut-page-header animate-fade-up">
          <h1 className="tut-page-title">Tutorials</h1>
          <p className="tut-page-sub">
            Step-by-step guides to mastering NSB — from basics to advanced simulator integration.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs animate-fade-up animate-delay-1">
          {(['all','beginner','intermediate','advanced'] as const).map(f => (
            <button
              key={f}
              className={`filter-tab${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f === 'all' ? 'All' : diffLabel[f]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="tut-grid">
          {filtered.map((t, i) => (
            <div key={t.id} className={`tut-card animate-fade-up animate-delay-${Math.min(i+1,5)}`}>
              <div className="tut-card-top">
                <div className="tut-card-top-left">
                  <span className="tut-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`tut-difficulty-badge tut-diff-${t.difficulty}`}>
                    {diffLabel[t.difficulty]}
                  </span>
                </div>
                <span className="tut-time-badge">
                  <IconClock/>&nbsp;{t.time}
                </span>
              </div>
              <div className="tut-card-title">{t.title}</div>
              <div className="tut-card-desc">{t.desc}</div>
              <div className="tut-card-tags">
                {t.tags.map(tag => (
                  <span key={tag} className="tut-tag">{tag}</span>
                ))}
              </div>
              <Link className="tut-card-btn" to={t.link}>
                <IconPlay/> Start Tutorial
              </Link>
            </div>
          ))}
        </div>

        {/* Learning stages */}
        <div className="tut-stages animate-fade-up animate-delay-3">
          <div className="tut-stages-title">Learning Stages</div>
          <div className="tut-stages-grid">
            <div className="tut-stage">
              <div className="tut-stage-icon tut-stage-icon-blue"><IconBook/></div>
              <div className="tut-stage-name">Stage 1: Foundation</div>
              <div className="tut-stage-desc">Understand the daemon, clients, and basic message flow by experimenting with and then building a mock simulator.</div>
            </div>
            <div className="tut-stage">
              <div className="tut-stage-icon tut-stage-icon-gold"><IconLayers/></div>
              <div className="tut-stage-name">Stage 2: Real Topologies</div>
              <div className="tut-stage-desc">Create custom network topologies and handle realistic shortest-path routing scenarios with NetworkX.</div>
            </div>
            <div className="tut-stage">
              <div className="tut-stage-icon tut-stage-icon-blue"><IconBridge/></div>
              <div className="tut-stage-name">Stage 3: Advanced Integrations</div>
              <div className="tut-stage-desc">Connect to production-grade network simulators — ns-3 in System-Wide mode, and OMNeT++ (basic and with INET) in Per-Node mode.</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}