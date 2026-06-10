import React from 'react';
import Layout from '@theme/Layout';

import SectionContainer from '../components/SectionContainer';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <Layout
      title="Network Simulation Bridge"
      description="Bridge applications with simulated networks">

      <SectionContainer>
        <h1>Network Simulation Bridge</h1>

        <p>
          Bridge real applications with simulated networks through a unified
          middleware layer.
        </p>

        <p>
          This website is currently being rebuilt as part of the NSB onboarding
          and documentation initiative.
        </p>

        <div className="nsb-card-grid">
          <FeatureCard
            title="Get Started"
            description="Install NSB and verify your environment."
            to="/get-started"
          />

          <FeatureCard
            title="Quickstart"
            description="Run your first NSB workflow."
            to="/quickstart"
          />

          <FeatureCard
            title="Documentation"
            description="Explore architecture and configuration."
            to="/documentation"
          />
        </div>
      </SectionContainer>

    </Layout>
  );
}