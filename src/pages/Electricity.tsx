import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Zap, Sun, Activity, DollarSign } from 'lucide-react';

const mockPowerData = [
  { name: 'May', current: 380, previous: 350 },
  { name: 'Jun', current: 310, previous: 290 },
  { name: 'Jul', current: 340, previous: 320 },
  { name: 'Aug', current: 410, previous: 360 },
  { name: 'Sep', current: 430, previous: 375 },
  { name: 'Oct', current: 425, previous: 395 },
];

export const Electricity: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Electricity Intelligence"
        tagline="Monitor grid consumption, solar generation offset, peak demand & kWh per student"
        badgeText="Department Telemetry"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Total Consumption"
          value="425,800"
          unit="kWh"
          changePct={7.8}
          icon={<Zap className="w-5 h-5" />}
        />
        <MetricCard
          title="Solar Generation"
          value="84,200"
          unit="kWh"
          changePct={12.4}
          icon={<Sun className="w-5 h-5" />}
        />
        <MetricCard
          title="Peak Demand"
          value="1,240"
          unit="kW"
          changePct={4.1}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Electricity Cost"
          value="₹ 36.2"
          unit="Lakhs"
          changePct={8.2}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Monthly Power Consumption Trend (kWh)"
        subtitle="Comparing current monthly telemetry against historical baseline"
      >
        <SimpleBarChart data={mockPowerData} />
      </ChartCard>
    </div>
  );
};
