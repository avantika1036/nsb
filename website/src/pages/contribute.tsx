import React, { useState } from 'react';
import Layout from '@theme/Layout';
import '../css/contribute.css';

/* ─── Icons ─── */
const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconFlask = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v7l4 10H5L9 10V3z"/><line x1="9" y1="3" x2="15" y2="3"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="8.01"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

/* ─── Copy code block ─── */
function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="contrib-code-block">
      {/* Header bar with copy button — sits ABOVE the code, never overlaps */}
      <div className="contrib-code-header">
        <button className="contrib-code-copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? <><IconCheck/> Copied</> : <><IconCopy/> Copy</>}
        </button>
      </div>
      <pre className="contrib-code-pre"><code>{code}</code></pre>
    </div>
  );
}

/* ─── Data ─── */
const ways = [
  {
    icon: <IconCode/>, color: 'blue',
    title: 'Code Contributions',
    desc: 'Improve the C++ daemon, expand the Python or C++ client libraries, add support for new simulators, or tackle items from the RabbitMQ enhancement roadmap.',
    linkText: 'View roadmap', link: 'https://github.com/nsb-ucsc/nsb_beta',
  },
  {
    icon: <IconBook/>, color: 'gold',
    title: 'Documentation',
    desc: 'Write tutorials for new simulators, improve API references, add Mermaid diagrams explaining architecture concepts, or fix typos in existing guides.',
    linkText: 'See tutorials', link: '/tutorials',
  },
  {
    icon: <IconFlask/>, color: 'teal',
    title: 'Research & Testing',
    desc: 'Use NSB in your research, report scale-testing results, create reproducible benchmarks, or bring NSB to a new domain like V2X or satellite networks.',
    linkText: 'Integration guide', link: '/docs/architecture',
  },
];

const devSteps = [
  { title: 'Fork & clone',            desc: 'Fork the main repository on GitHub to your account, then clone your fork locally.',   code: 'git clone https://github.com/your-username/nsb.git && cd nsb' },
  { title: 'Install dependencies',    desc: 'Follow the Get Started guide for your OS. macOS uses Homebrew; Linux uses apt.',      code: 'brew install cmake pkg-config abseil protobuf yaml-cpp redis hiredis' },
  { title: 'Build from source',       desc: 'CMake builds the daemon binary and shared library.',                                  code: 'cmake -B build && cmake --build build' },
  { title: 'Create a feature branch', desc: 'Always work on a descriptive feature branch, never directly on main.',               code: 'git checkout -b feature/my-improvement' },
  { title: 'Submit a pull request',   desc: 'Open a PR against the main branch with a clear description and the test you ran.',   code: null },
];

const goodFirstIssues = [
  { title: 'Dead Letter Exchange for the RMQ transport',               tags: ['good first issue'], tagTypes: ['green']  },
  { title: 'Publisher Confirms in NSBClientRMQ',                       tags: ['good first issue'], tagTypes: ['green']  },
  { title: 'Cross-simulator handling of null bytes in payloads',       tags: ['cpp'],              tagTypes: ['blue']   },
  { title: 'Add a third example: 50-node OMNeT++ network',             tags: ['docs'],             tagTypes: ['orange'] },
  { title: 'Mermaid diagram of the send→fetch→post→receive lifecycle', tags: ['docs'],             tagTypes: ['orange'] },
  { title: 'Consumer prefetch / QoS tuning in NSBClientRMQ',           tags: ['good first issue'], tagTypes: ['green']  },
];

const tagClassMap: Record<string, string> = {
  green: 'gfi-tag-green', blue: 'gfi-tag-blue',
  orange: 'gfi-tag-orange', red: 'gfi-tag-red',
};

/* ─── Page ─── */
export default function Contribute() {
  return (
    <Layout title="Contribute — NSB" description="Contribute to NSB. Code, documentation, research, and testing contributions welcome.">
      <div className="contrib-page">

        {/* ── Hero ── */}
        <div className="contrib-hero animate-fade-up">
          {/* Badge with animated pulsing dot instead of tick */}
          <div className="contrib-hero-badge">
            <span className="contrib-hero-badge-dot"/>
            BETA · UC OSPO · Open Source
          </div>

          <h1 className="contrib-page-title">Contribute.</h1>
          <p className="contrib-page-sub">
            NSB is developed in the open at INRG, UC Santa Cruz. We welcome contributors
            across code, documentation and simulator integrations. BSD 3-Clause licensed.
          </p>
          <div className="contrib-hero-links">
            <a className="contrib-hero-btn contrib-hero-btn-primary" href="https://github.com/nsb-ucsc/nsb_beta" target="_blank" rel="noopener noreferrer">
              <IconGithub/> View on GitHub <IconArrow/>
            </a>
            <a className="contrib-hero-btn contrib-hero-btn-secondary" href="https://github.com/nsb-ucsc/nsb_beta/issues" target="_blank" rel="noopener noreferrer">
              Open Issues <IconArrow/>
            </a>
          </div>
        </div>

        {/* ── Three ways ── */}
        <div className="contrib-section-label animate-fade-up animate-delay-1">PICK A PATH</div>
        <h2 className="contrib-section-title">Three ways to contribute</h2>
        <div className="contrib-ways animate-fade-up animate-delay-1">
          {ways.map((w) => (
            <div key={w.title} className={`contrib-way-card contrib-way-card-${w.color}`}>
              <div className={`contrib-way-icon contrib-way-icon-${w.color}`}>{w.icon}</div>
              <div className="contrib-way-title">{w.title}</div>
              <div className="contrib-way-desc">{w.desc}</div>
              <a className="contrib-way-link" href={w.link}>
                {w.linkText} <IconArrow/>
              </a>
            </div>
          ))}
        </div>

        {/* ── Developer Setup + Project Structure ── */}
        <div className="contrib-section-label animate-fade-up animate-delay-2">DEVELOPER SETUP</div>
        <h2 className="contrib-section-title">Get a dev build running</h2>
        <div className="contrib-two-col animate-fade-up animate-delay-2">

          {/* Timeline with copy blocks */}
          <div className="contrib-panel">
            <div className="contrib-panel-title">Setup Steps</div>
            <div className="dev-steps">
              {devSteps.map((s, i) => (
                <div key={s.title} className={`dev-step${i === devSteps.length - 1 ? ' dev-step-last' : ''}`}>
                  <div className="dev-step-num">{i + 1}</div>
                  <div className="dev-step-body">
                    <div className="dev-step-title">{s.title}</div>
                    <div className="dev-step-desc">{s.desc}</div>
                    {s.code && <CopyBlock code={s.code}/>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project structure + guidelines */}
          <div className="contrib-right-col">
            <div className="contrib-panel">
              <div className="contrib-panel-title">Project Structure</div>
              <div className="contrib-tree">
                <div className="contrib-tree-root">nsb/</div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">├── cpp/</span><span className="contrib-tree-comment">C++ daemon and client</span></div>
                <div className="contrib-tree-line contrib-tree-indent"><span className="contrib-tree-path">└── rabbit/</span><span className="contrib-tree-comment">RabbitMQ transport</span></div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">├── proto/</span><span className="contrib-tree-comment">Protocol Buffer definitions</span></div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">├── python/</span><span className="contrib-tree-comment">Python client library</span></div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">├── rabbit/</span><span className="contrib-tree-comment">Python RabbitMQ backend</span></div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">├── examples/</span><span className="contrib-tree-comment">Usage examples</span></div>
                <div className="contrib-tree-line"><span className="contrib-tree-path">└── config.yaml</span><span className="contrib-tree-comment">Default configuration</span></div>
              </div>
            </div>

            <div className="contrib-guidelines">
              <div className="contrib-guidelines-title"><IconInfo/> Contribution Guidelines</div>
              <ul>
                <li><IconCheck/><span>NSB is licensed under the <strong>BSD 3-Clause License</strong>.</span></li>
                <li><IconCheck/><span>All code contributions should include corresponding tests.</span></li>
                <li><IconCheck/><span>Please open an issue to discuss large changes before implementing.</span></li>
                <li><IconCheck/><span>For documentation, match the existing MDX style and Mermaid conventions.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Good First Issues ── */}
        <div className="contrib-section-label animate-fade-up animate-delay-3">GOOD FIRST ISSUES</div>
        <h2 className="contrib-section-title">Friendly places to start</h2>
        <p className="contrib-section-sub">These issues are well-scoped and documented. Great for first-time contributors.</p>

        <div className="gfi-list animate-fade-up animate-delay-3">
          {goodFirstIssues.map((g) => (
            <a key={g.title} className="gfi-item" href="https://github.com/nsb-ucsc/nsb_beta/issues" target="_blank" rel="noopener noreferrer">
              <div className="gfi-dot"/>
              <div className="gfi-title">{g.title}</div>
              <div className="gfi-tags">
                {g.tags.map((tag, ti) => (
                  <span key={tag} className={`gfi-tag ${tagClassMap[g.tagTypes[ti]]}`}>{tag}</span>
                ))}
              </div>
              <IconArrow/>
            </a>
          ))}
        </div>

        <div className="contrib-gfi-footer">
          <a href="https://github.com/nsb-ucsc/nsb_beta/issues" target="_blank" rel="noopener noreferrer" className="contrib-gfi-all">
            <IconGithub/> View all issues on GitHub <IconArrow/>
          </a>
        </div>

      </div>
    </Layout>
  );
}