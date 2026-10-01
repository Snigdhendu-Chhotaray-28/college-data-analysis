/**
 * ECO PILLARS HUB - DATA QUALITY PAGE (PHASE 13)
 */

import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataQualityDashboard } from '../components/analytics/DataQualityDashboard';

export const DataQualityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="DATA QUALITY SYSTEM — SYSTEM GOVERNANCE"
        subtitle="Automated checks for missing dates, duplicate rows, invalid numbers, negative consumption, missing student counts, missing units, invalid columns, unexpected values & duplicate uploads"
        badgeText="PHASE 13 — DATA QUALITY GOVERNANCE"
        badgeVariant="optimal"
      />

      <DataQualityDashboard />
    </div>
  );
};

export default DataQualityPage;
