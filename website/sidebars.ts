import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',

    {
      type: 'category',
      label: 'Introduction',
      collapsed: true,
      items: [
        'introduction/what-is-nsb',
        'introduction/design-goals',
      ],
    },

    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/overview',
        'architecture/message-flow',
        'architecture/system-modes',
        'architecture/simulator-modes',
        'architecture/payload-lifecycle',
        'architecture/deep-architecture',
      ],
    },

    {
      type: 'category',
      label: 'Configuration',
      collapsed: true,
      items: [
        'configuration/overview',
        'configuration/config-reference',
        'configuration/system-modes',
        'configuration/simulator-modes',
        'configuration/database-settings',
      ],
    },

    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Python',
          collapsed: true,
          items: [
            'api-reference/python/overview',
            'api-reference/python/message-entry',
            'api-reference/python/nsb-app-client',
            'api-reference/python/nsb-sim-client',
            'api-reference/python/async-listeners',
          ],
        },
        {
          type: 'category',
          label: 'C++',
          collapsed: true,
          items: [
            'api-reference/cpp/setup',
            'api-reference/cpp/config-struct',
            'api-reference/cpp/message-entry',
            'api-reference/cpp/nsb-client',
            'api-reference/cpp/nsb-app-client',
            'api-reference/cpp/nsb-sim-client',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Protocol',
      collapsed: true,
      items: [
        'protocol/protobuf-overview',
        'protocol/protobuf-schema',
        'protocol/operations',
        'protocol/initialization-flow',
      ],
    },

    {
      type: 'category',
      label: 'Backends',
      collapsed: true,
      items: [
        'backends/socket-backend',
        'backends/redis-storage',
        'backends/rabbitmq-backend',
        'backends/rabbitmq-enhancements',
      ],
    },

    {
      type: 'category',
      label: 'Integrations',
      collapsed: true,
      items: [
        'integrations/overview',
        'integrations/system-wide-vs-per-node',
        'integrations/ns3-overview',
        'integrations/omnet-overview',
      ],
    },

    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/project-structure',
        'reference/performance',
        'reference/background-and-related-work',
        'reference/glossary',
      ],
    },

    {
      type: 'category',
      label: 'Help',
      collapsed: true,
      items: [
        'help/troubleshooting',
        'help/faq',
        'help/uninstallation',
      ],
    },
  ],
};

export default sidebars;