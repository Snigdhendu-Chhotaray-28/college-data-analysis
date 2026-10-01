import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { DollarSign, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

const mockFinanceData = [
  { name: 'May', current: 72, previous: 68 },
  { name: 'Jun', current: 48, previous: 44 },
  { name: 'Jul', current: 55, previous: 52 },
  { name: 'Aug', current: 86, previous: 80 },
  { name: 'Sep', current: 92, previous: 84 },
  { name: 'Oct', current: 89, previous: 82 },
];

export const Finance: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Finance & Utility Expenditure"
        tagline="Comprehensive utility ledger, budget variance analysis & per-student operational cost"
        badgeText="Department Telemetry"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Total Utility Spend"
          value="₹ 89.4"
          unit="Lakhs"
          changePct={8.5}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <MetricCard
          title="Electricity Portion"
          value="40.5%"
          unit="of total"
          changePct={1.2}
          icon={<PieChart className="w-5 h-5" />}
        />
        <MetricCard
          title="Cost Per Student"
          value="₹ 1,058"
          unit="/ month"
          changePct={3.2}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Budget Variance"
          value="+4.2%"
          unit="over-budget"
          changePct={2.1}
          icon={<AlertCircle className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Monthly Utility Spend Trend (₹ Lakhs)"
        subtitle="Comparing actual monthly utility spend against budget baseline"
      >
        <SimpleBarChart data={mockFinanceData} />
      </ChartCard>
    </div>
  );
};
