import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { AnalysisPlaceholder } from '../components/analysis/AnalysisPlaceholder';

export const Analysis: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Cross-Resource Intelligence & Anomaly Engine"
        tagline="Multi-year variance decomposition, student normalization & calendar context analysis"
        badgeText="Analytical Framework"
      />
      <AnalysisPlaceholder />
    </div>
  );
};
