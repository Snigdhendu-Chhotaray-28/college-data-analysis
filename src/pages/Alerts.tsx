import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { AlertCard } from '../components/alerts/AlertCard';
import type { Alert } from '../types';

const sampleAlerts: Alert[] = [
  {
    id: 'ALT-101',
    department: 'Water',
    title: 'Unusual Nighttime Water Flow in Block 4 Hostel',
    message: 'Detected sustained 420 L/hr flow between 2:00 AM - 5:00 AM. Potential underground pipe rupture or tank valve leakage.',
    severity: 'critical',
    timestamp: '2 hours ago',
    acknowledged: false,
    variancePercentage: 38.4,
  },
  {
    id: 'ALT-102',
    department: 'Electricity',
    title: 'HVAC Base Consumption Exceeds Historical Maximum',
    message: 'Engineering Block A air conditioning baseline is 18.2% higher than comparable October 2025 benchmark despite identical student occupancy.',
    severity: 'warning',
    timestamp: '5 hours ago',
    acknowledged: false,
    variancePercentage: 18.2,
  },
  {
    id: 'ALT-103',
    department: 'Food',
    title: 'Mess Compost Yield Variance',
    message: 'Food waste generation is down 8.5% YoY following the new trayless dining policy implementation.',
    severity: 'info',
    timestamp: '1 day ago',
    acknowledged: true,
  },
];

export const Alerts: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="System Alerts & Anomaly Feed"
        tagline="Real-time multi-signal alerts generated from statistical deviation & contextual machine intelligence"
        badgeText="2 Unresolved"
      />

      <div className="space-y-4">
        {sampleAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onAcknowledge={(id) => console.log('Acknowledge', id)} />
        ))}
      </div>
    </div>
  );
};
