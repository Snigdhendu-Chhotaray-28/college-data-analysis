import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Wifi as WifiIcon, HardDrive, Smartphone, Clock } from 'lucide-react';

const mockWifiData = [
  { name: 'May', current: 72, previous: 60 },
  { name: 'Jun', current: 35, previous: 30 },
  { name: 'Jul', current: 48, previous: 40 },
  { name: 'Aug', current: 88, previous: 70 },
  { name: 'Sep', current: 96, previous: 78 },
  { name: 'Oct', current: 92, previous: 75 },
];

export const Wifi: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Wi-Fi & IT Infrastructure"
        tagline="Bandwidth usage, peak device concurrency, AP uptime & data consumed per capita"
        badgeText="Department Telemetry"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Data Transferred"
          value="92.4"
          unit="TB"
          changePct={22.6}
          icon={<HardDrive className="w-5 h-5" />}
        />
        <MetricCard
          title="Peak Concurrent Devices"
          value="8,210"
          unit="Nodes"
          changePct={15.4}
          icon={<Smartphone className="w-5 h-5" />}
        />
        <MetricCard
          title="Average Bandwidth"
          value="1.8"
          unit="Gbps"
          changePct={11.2}
          icon={<WifiIcon className="w-5 h-5" />}
        />
        <MetricCard
          title="Network Downtime"
          value="0.4"
          unit="Hours"
          changePct={-60.0}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Monthly Campus Wi-Fi Data Traffic (TB)"
        subtitle="Comparing current monthly telemetry against historical baseline"
      >
        <SimpleBarChart data={mockWifiData} />
      </ChartCard>
    </div>
  );
};
