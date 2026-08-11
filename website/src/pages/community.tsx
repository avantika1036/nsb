import React from 'react';
import Layout from '@theme/Layout';
import '../css/get-started.css';
import '../css/community.css';

/* ─── Icons ─── */
const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const IconMsg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconTeam = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconExtern = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="8.01"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ─── Data ─── */
const channels = [
  { icon: <IconGitHub/>, iconClass: 'comm-ch-icon-gh',   color: 'mono', name: 'GitHub Repository',  desc: 'Star, fork, and contribute to the source code.',          href: 'https://github.com/nsb-ucsc/nsb_beta' },
  { icon: <IconMsg/>,    iconClass: 'comm-ch-icon-disc',  color: 'blue', name: 'GitHub Discussions', desc: 'Ask questions, share ideas, and connect with users.',      href: 'https://github.com/nsb-ucsc/nsb_beta/discussions' },
  { icon: <IconMail/>,   iconClass: 'comm-ch-icon-mail',  color: 'blue', name: 'Email',              desc: 'Contact the INRG research team directly.',                href: 'mailto:hkuttive@ucsc.edu' },
  { icon: <IconTeam/>,   iconClass: 'comm-ch-icon-team',  color: 'gold', name: 'Team & Origin',      desc: 'Learn about the INRG lab and project contributors.',      href: 'https://inrg.engineering.ucsc.edu/' },
];

const papers = [
  {
    tag: 'ACM Middleware 2026',
    title: 'NSB2: An Open-Source Modular Pipeline for Application-Network Co-Simulation',
    desc: 'The foundational paper describing the NSB architecture, performance benchmarks against ns-3 and OMNeT++, and scalability limits.',
    href: 'https://dl.acm.org/doi/10.1145/3616391.3622771',
  },
  {
    tag: 'ACM MobiCom 2023',
    title: 'Initial Proof of Concept',
    desc: 'The original publication that introduced the concept of decoupled application-network simulation bridging.',
    href: 'https://dl.acm.org/doi/10.1145/3616391.3622771',
  },
];

const relatedProjects = [
  { name: 'ns-3',           desc: 'Discrete-event network simulator',       href: 'https://www.nsnam.org/' },
  { name: 'OMNeT++',        desc: 'Extensible simulation framework',         href: 'https://omnetpp.org/' },
  { name: 'INET Framework', desc: 'OMNeT++ network protocols suite',         href: 'https://inet.omnetpp.org/' },
  { name: 'RabbitMQ',       desc: 'Message broker for the RabbitMQ backend', href: 'https://www.rabbitmq.com/' },
  { name: 'Redis',          desc: 'In-memory data store for payload caching', href: 'https://redis.io/' },
];

/* ─── Page ─── */
export default function Community() {
  return (
    <Layout title="Community — NSB" description="Connect with the researchers and developers behind NSB. UC Santa Cruz INRG Lab.">
      <div className="comm-page">

        {/* ── Hero ── */}
        <div className="comm-hero animate-fade-up">
          <div className="gs-stage-badge">
            <span className="gs-stage-dot"/>
            Open Source · UC Santa Cruz
          </div>
          <h1 className="comm-page-title">Community</h1>
          <p className="comm-page-sub">
            Connect with the researchers and developers behind NSB — open-source, peer-reviewed, built at UC Santa Cruz.
          </p>
        </div>

        {/* ── Two-col: Connect + Research ── */}
        <div className="comm-two-col animate-fade-up animate-delay-1">

          {/* Left: Connect channels */}
          <div>
            <div className="comm-section-label">CONNECT</div>
            <h2 className="comm-section-title">Get in touch</h2>
            <p className="comm-section-sub">Reach the team, open issues, share use cases, and follow development.</p>
            <div className="comm-channels">
              {channels.map((ch) => (
                <a key={ch.name} className={`comm-channel comm-channel-${ch.color}`} href={ch.href} target="_blank" rel="noopener noreferrer">
                  <div className={`comm-ch-icon ${ch.iconClass}`}>{ch.icon}</div>
                  <div className="comm-ch-body">
                    <div className="comm-ch-name">{ch.name}</div>
                    <div className="comm-ch-desc">{ch.desc}</div>
                  </div>
                  <div className="comm-ch-arrow"><IconArrow/></div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Research papers */}
          <div>
            <div className="comm-section-label">RESEARCH</div>
            <h2 className="comm-section-title">Research Background</h2>
            <p className="comm-section-sub">NSB is backed by peer-reviewed research from UC Santa Cruz.</p>
            <div className="comm-papers">
              {papers.map((p) => (
                <div key={p.title} className="comm-paper-card">
                  <div className="comm-paper-tag">{p.tag}</div>
                  <div className="comm-paper-title">{p.title}</div>
                  <div className="comm-paper-desc">{p.desc}</div>
                  <a className="comm-paper-link" href={p.href} target="_blank" rel="noopener noreferrer">
                    Read paper <IconExtern/>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row: About + Maintainer + Related + Citation ── */}
        <div className="comm-bottom-grid animate-fade-up animate-delay-2">

          {/* About the Project */}
          <div className="comm-panel comm-panel-about">
            <div className="comm-panel-title">About the Project</div>
            <p>
              NSB was developed by Ph.D., M.S., and undergraduate students (past and present)
              at the <strong>UC Santa Cruz Internetworking Research Group (INRG)</strong> to address
              a common challenge in network research: testing real application protocols over
              realistic simulated network conditions.
            </p>
            <p>
              The earliest use cases were <strong>decentralized federated learning</strong> over
              simulated wireless networks and <strong>autonomous vehicle platooning</strong> with
              V2V/V2X communication modeled in network simulation.
            </p>
            <p>
              Special thanks to the UC Open Source Program Office (UC OSPO) in the Center for
              Research in Open Source Systems (CROSS) at UC Santa Cruz.
            </p>

            {/* Maintainer card — fills the empty space (Image 2 style) */}
            <div className="comm-maintainer">
              <div className="comm-maintainer-icon">
                <IconMail/>
              </div>
              <div className="comm-maintainer-body">
                <div className="comm-maintainer-label">Maintainer</div>
                <div className="comm-maintainer-name">Harikrishna Kuttivelil</div>
                <div className="comm-maintainer-role">for collaboration, citation, and feedback</div>
                <a className="comm-maintainer-link" href="mailto:hkuttive@ucsc.edu">
                  hkuttive@ucsc.edu <IconArrow/>
                </a>
              </div>
            </div>

            <div className="comm-ospo-badge">
              <IconInfo/>
              UC OSPO · UC Santa Cruz INRG · Beta 2026
            </div>
          </div>

          {/* Related Projects + Citation */}
          <div className="comm-panel comm-panel-related">
            <div className="comm-panel-title">Related Projects</div>
            <div className="comm-related-list">
              {relatedProjects.map((r) => (
                <a key={r.name} className="comm-related-row" href={r.href} target="_blank" rel="noopener noreferrer">
                  <div className="comm-related-body">
                    <div className="comm-related-name">{r.name}</div>
                    <div className="comm-related-desc">{r.desc}</div>
                  </div>
                  <IconExtern/>
                </a>
              ))}
            </div>

            <div className="comm-citation">
              <div className="comm-citation-title"><IconStar/> Citation</div>
              <div className="comm-citation-body">
                Network Simulation Bridge (NSB)<br/>
                UC Santa Cruz INRG Lab<br/>
                github.com/nsb-ucsc/nsb<br/>
                BSD 3-Clause License
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}