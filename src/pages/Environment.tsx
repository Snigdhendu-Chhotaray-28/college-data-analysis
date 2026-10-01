import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Leaf, Thermometer, Wind, CloudRain } from 'lucide-react';

const mockEnvData = [
  { name: 'May', current: 36.2, previous: 35.8 },
  { name: 'Jun', current: 34.5, previous: 34.1 },
  { name: 'Jul', current: 31.2, previous: 30.8 },
  { name: 'Aug', current: 29.8, previous: 29.5 },
  { name: 'Sep', current: 30.5, previous: 29.8 },
  { name: 'Oct', current: 28.4, previous: 26.0 },
];

export const Environment: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Environmental Telemetry & Climate"
        tagline="Ambient temperature, AQI, humidity & rainfall correlation for HVAC baseline adjustment"
        badgeText="Climate Context Layer"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Average Temperature"
          value="28.4"
          unit="°C"
          changePct={9.2}
          comparisonLabel="+2.4°C vs Oct 2025"
          icon={<Thermometer className="w-5 h-5" />}
        />
        <MetricCard
          title="Air Quality Index"
          value="88"
          unit="AQI (Moderate)"
          changePct={-12.0}
          icon={<Wind className="w-5 h-5" />}
        />
        <MetricCard
          title="Monthly Rainfall"
          value="45"
          unit="mm"
          changePct={-35.0}
          icon={<CloudRain className="w-5 h-5" />}
        />
        <MetricCard
          title="Campus Green Index"
          value="84.5"
          unit="/ 100"
          changePct={3.4}
          icon={<Leaf className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Average Monthly Temperature Trend (°C)"
        subtitle="Comparing current monthly telemetry against historical baseline"
      >
        <SimpleBarChart data={mockEnvData} unit="°C" />
      </ChartCard>
    </div>
  );
};
