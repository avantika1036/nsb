import React from 'react';
import Layout from '@theme/Layout';

import SectionContainer from '../components/SectionContainer';
import PageHeader from '../components/PageHeader';
import CalloutBox from '../components/CalloutBox';

export default function GetStarted() {
  return (
    <Layout title="Get Started">
      <SectionContainer>

        <PageHeader
          title="Get Started"
          description="Install NSB and prepare your environment."
        />

        <CalloutBox title="Work in Progress">
          This page is currently under development.
        </CalloutBox>

      </SectionContainer>
    </Layout>
  );
}