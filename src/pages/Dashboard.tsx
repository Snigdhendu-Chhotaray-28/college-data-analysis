import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { QuickStats } from '../components/dashboard/QuickStats';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, AlertTriangle, ArrowUpRight, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const sampleChartData = [
  { name: 'Jun', current: 310, previous: 290 },
  { name: 'Jul', current: 340, previous: 320 },
  { name: 'Aug', current: 410, previous: 360 },
  { name: 'Sep', current: 430, previous: 375 },
  { name: 'Oct', current: 425, previous: 395 },
];

export const Dashboard: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Campus Resource Intelligence"
        tagline="Unified cross-department telemetry, multi-year comparisons & AI anomaly tracking"
        badgeText="Academic Year 2026–27"
        actions={
          <Link to="/upload">
            <Button variant="primary" icon={<UploadCloud className="w-4 h-4" />}>
              Upload Data
            </Button>
          </Link>
        }
      />

      {/* KPI Stats */}
      <QuickStats />

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartCard
            title="Total Campus Power Consumption (MWh)"
            subtitle="Comparing current monthly telemetry against previous year baseline"
            action={
              <Link
                to="/electricity"
                className="text-xs font-semibold text-[#16A085] hover:underline flex items-center gap-1"
              >
                Detailed View <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <SimpleBarChart data={sampleChartData} unit="MWh" />
          </ChartCard>
        </div>

        {/* AI Insight & Active Alerts */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#0B1F3A] to-[#142B4A] text-white border-none shadow-md">
            <div className="flex items-center gap-2 text-[#16A085] font-bold text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI CAMPUS ADVISOR</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Elevated Oct Electricity vs Student Growth
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Electricity increased +7.8% YoY, while student population grew +5.1%. Variance is
              primarily correlated with 2.4°C higher average temperatures and evening lab sessions.
            </p>
            <Link to="/ai-advisor">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
              >
                Open Full AI Diagnostic
              </Button>
            </Link>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10213A]">
                <AlertTriangle className="w-4 h-4 text-[#F0A202]" />
                <span>Active Anomalies (2)</span>
              </div>
              <Link to="/alerts" className="text-xs text-[#16A085] font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                <p className="font-bold text-[#10213A]">Water Flow Surge in North Hostels</p>
                <p className="text-[11px] text-[#536477] mt-0.5">+14% vs expected student baseline</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs">
                <p className="font-bold text-[#10213A]">Wi-Fi Peak Concurrency Alert</p>
                <p className="text-[11px] text-[#536477] mt-0.5">8,200 active client nodes recorded</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
