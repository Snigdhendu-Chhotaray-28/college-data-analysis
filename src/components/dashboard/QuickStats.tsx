import React from 'react';
import { MetricCard } from '../ui/MetricCard';
import { Zap, Droplets, Users, DollarSign } from 'lucide-react';

export const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <MetricCard
        title="Electricity Consumption"
        value="425,800"
        unit="kWh"
        changePct={7.8}
        comparisonLabel="vs prev year"
        icon={<Zap className="w-5 h-5" />}
      />
      <MetricCard
        title="Water Utilization"
        value="1.24"
        unit="M Liters"
        changePct={-3.2}
        comparisonLabel="vs prev year"
        icon={<Droplets className="w-5 h-5" />}
      />
      <MetricCard
        title="Active Campus Population"
        value="8,450"
        unit="Students & Staff"
        changePct={5.1}
        comparisonLabel="YoY Growth"
        icon={<Users className="w-5 h-5" />}
      />
      <MetricCard
        title="Monthly Utility Spend"
        value="₹ 48.2"
        unit="Lakhs"
        changePct={4.6}
        comparisonLabel="vs budgeted"
        icon={<DollarSign className="w-5 h-5" />}
      />
    </div>
  );
};
