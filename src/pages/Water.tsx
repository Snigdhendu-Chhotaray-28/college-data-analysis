import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Droplets, RefreshCw, CloudRain, ShieldCheck } from 'lucide-react';

const mockWaterData = [
  { name: 'May', current: 1.15, previous: 1.10 },
  { name: 'Jun', current: 0.85, previous: 0.82 },
  { name: 'Jul', current: 0.95, previous: 0.92 },
  { name: 'Aug', current: 1.28, previous: 1.18 },
  { name: 'Sep', current: 1.32, previous: 1.22 },
  { name: 'Oct', current: 1.24, previous: 1.28 },
];

export const Water: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Water Resource Management"
        tagline="Monitor borehole extraction, STP water recycling, rainwater harvesting and hostel consumption"
        badgeText="Department Telemetry"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Total Consumption"
          value="1.24"
          unit="Million L"
          changePct={-3.1}
          icon={<Droplets className="w-5 h-5" />}
        />
        <MetricCard
          title="STP Recycled Water"
          value="410"
          unit="kL"
          changePct={9.5}
          icon={<RefreshCw className="w-5 h-5" />}
        />
        <MetricCard
          title="Rainwater Captured"
          value="185"
          unit="kL"
          changePct={18.2}
          icon={<CloudRain className="w-5 h-5" />}
        />
        <MetricCard
          title="Water Recycling Rate"
          value="33.1%"
          changePct={4.2}
          icon={<ShieldCheck className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Monthly Water Consumption (Million Liters)"
        subtitle="Comparing current monthly telemetry against historical baseline"
      >
        <SimpleBarChart data={mockWaterData} />
      </ChartCard>
    </div>
  );
};
