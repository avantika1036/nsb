import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const BASE_URL = '/nsb/';
const LOGO_URL = `${BASE_URL}img/nsb-logo.png`;

const config: Config = {
  title: 'NSB',
  tagline: 'Network Simulation Bridge — Bridge Your App to Any Network Simulator',
  favicon: 'img/nsb-logo.png',
  url: 'https://avantika1036.github.io',
  baseUrl: '/nsb/',
  organizationName: 'avantika1036',
  projectName: 'nsb',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
        docsRouteBasePath: 'docs',
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorials',
        path: 'tutorials',
        routeBasePath: 'tutorials',
        sidebarPath: false,
        editUrl: 'https://github.com/nsb-ucsc/nsb_beta/edit/main/tutorials/',
        breadcrumbs: false,
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nsb-ucsc/nsb_beta/edit/main/docs/',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/base.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'NSB',
      logo: {
        alt: 'NSB Logo',
        src: 'img/nsb-logo.png',
        style: { height: '32px', width: 'auto' },
      },
      items: [
        {
          to: '/get-started',
          label: 'Get Started',
          position: 'left',
        },
        {
          to: '/quickstart',
          label: 'Quickstart',
          position: 'left',
        },
        {
          to: '/docs',
          label: 'Docs',
          position: 'left',
          activeBaseRegex: '^/docs(?!/tutorials)',
        },
        {
          to: '/tutorials',
          label: 'Tutorials',
          position: 'left',
        },
        {
          to: '/contribute',
          label: 'Contribute',
          position: 'left',
        },
        {
          to: '/community',
          label: 'Community',
          position: 'left',
        },
        {
          type: 'html',
          position: 'right',
          value: '<a href="https://github.com/nsb-ucsc/nsb_beta" target="_blank" rel="noopener noreferrer" class="navbar-github-pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg><span>GitHub</span></a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'NSB Logo',
        src: 'img/nsb-logo.png',
        width: 28,
        height: 28,
      },
      links: [
          {
            title: null,
            items: [
              {
                html: `
                <div class="footer-brand">
                  <div class="footer-brand-header">
                    <div class="footer-brand-logo-wrap">
                      <img
                        src="${LOGO_URL}"
                        alt="NSB"
                        class="footer-brand-logo"
                      />
                    </div>

                    <div>
                      <div class="footer-brand-title">NSB</div>
                      <div class="footer-brand-subtitle">
                        Network Simulation Bridge
                      </div>
                    </div>
                  </div>

                  <p class="footer-blurb">
                    Open-source middleware for application-network
                    co-simulation developed by the Inter-Networking
                    Research Group (INRG) at UC Santa Cruz.
                  </p>

                  <a
                    href="https://github.com/nsb-ucsc/nsb_beta"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="footer-brand-github"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>

                    <span>GitHub</span>
                  </a>
                </div>
                `,
              },
            ],
        },
        {
          title: 'Learn',
          items: [
            { label: 'Get Started', to: '/get-started' },
            { label: 'Quickstart',  to: '/quickstart' },
            { label: 'Tutorials',   to: '/tutorials' },
            { label: 'Documentation', to: '/docs' },
          ],
        },
        {
          title: 'Reference',
          items: [
            { label: 'Architecture', to: '/docs/architecture/overview' },
            { label: 'Python API',   to: '/docs/api-reference/python/overview' },
            { label: 'C++ API',      to: '/docs/api-reference/cpp/setup' },
            { label: 'RabbitMQ',     to: '/docs/backends/rabbitmq-backend' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Contribute', to: '/contribute' },
            { label: 'Community',  to: '/community' },
            { label: 'GitHub', href: 'https://github.com/nsb-ucsc/nsb_beta' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} INRG · UC Santa Cruz · BSD 3-Clause   ·   NSB2 — Beta · Active Development`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'yaml', 'cmake', 'cpp', 'python', 'protobuf', 'makefile'],
    },
    mermaid: {
      theme: { light: 'default', dark: 'dark' },
      options: {
        themeVariables: {
          fontFamily: 'Sora, sans-serif',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;