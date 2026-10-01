import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Utensils, Trash2, Sprout, DollarSign } from 'lucide-react';

const mockFoodData = [
  { name: 'May', current: 185, previous: 170 },
  { name: 'Jun', current: 90, previous: 85 },
  { name: 'Jul', current: 120, previous: 110 },
  { name: 'Aug', current: 245, previous: 220 },
  { name: 'Sep', current: 255, previous: 235 },
  { name: 'Oct', current: 248, previous: 230 },
];

export const Food: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Food & Mess Operations"
        tagline="Track meals served, raw material cost, food waste generated & compost conversion"
        badgeText="Department Telemetry"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Total Meals Served"
          value="248,000"
          unit="Meals"
          changePct={7.8}
          icon={<Utensils className="w-5 h-5" />}
        />
        <MetricCard
          title="Food Waste Generated"
          value="4,820"
          unit="kg"
          changePct={-8.5}
          icon={<Trash2 className="w-5 h-5" />}
        />
        <MetricCard
          title="Compost Produced"
          value="1,950"
          unit="kg"
          changePct={14.2}
          icon={<Sprout className="w-5 h-5" />}
        />
        <MetricCard
          title="Mess Expenditure"
          value="₹ 42.8"
          unit="Lakhs"
          changePct={6.1}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Monthly Meals Served Trend ('000s)"
        subtitle="Comparing current monthly telemetry against historical baseline"
      >
        <SimpleBarChart data={mockFoodData} />
      </ChartCard>
    </div>
  );
};
