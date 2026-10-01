/**
 * ECO PILLARS HUB - ANALYSIS METHODOLOGY PAGE (PHASE 16)
 */

import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MethodologyEngine } from '../components/methodology/MethodologyEngine';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ANALYSIS METHODOLOGY & PLATFORM SPECIFICATION"
        subtitle="Detailed technical specification covering data acquisition, Excel parsing, student normalization formulas, 3-year historical baselines, deterministic 6-signal anomaly detection, and non-calculating AI evidence proxy"
        badgeText="PHASE 16 — DEMO POLISHED"
        badgeVariant="optimal"
      />

      <MethodologyEngine />
    </div>
  );
};

export default MethodologyPage;
