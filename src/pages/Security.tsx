/**
 * ECO PILLARS HUB - SECURITY HARDENING PAGE (PHASE 14)
 */

import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { SecurityHardeningDashboard } from '../components/security/SecurityHardeningDashboard';

export const SecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SECURITY HARDENING & ROLE-BASED ACCESS CONTROL"
        subtitle="Firebase Authentication, Firestore/Storage Security Rules, Role-Based Access Control (ADMIN, ANALYST, VIEWER), Cloud Function Protection & Zero Secret Exposure Shield"
        badgeText="PHASE 14 — SECURITY HARDENED"
        badgeVariant="optimal"
      />

      <SecurityHardeningDashboard />
    </div>
  );
};

export default SecurityPage;
