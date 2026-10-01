import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ChartContainer } from '../ui/ChartContainer';
import {
  getResourceHistoricalSummary,
  getAllResourcesHistoricalSummary,
  MONTH_NAMES,
  type ResourceCategory
} from '../../services/historicalAnalysisService';
import { Calendar, History, TrendingUp, BarChart2, ArrowUpRight, Layers } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

export const HistoricalAnalysisEngine: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedResource, setSelectedResource] = useState<ResourceCategory>('Electricity');

  const summary = getResourceHistoricalSummary(selectedResource, selectedMonth);
  const allSummaries = getAllResourcesHistoricalSummary(selectedMonth);

  // Month-by-month chart data for selected resource
  const monthByMonthChartData = summary.monthlyTrend.map((m) => ({
    month: m.month.slice(0, 3),
    '2023': m.year2023,
    '2024': m.year2024,
    '2025 (Prev Year)': m.year2025,
    '2026 (Current)': m.year2026,
  }));

  // Current vs Previous Year Line Chart
  const currentVsPrevChartData = summary.monthlyTrend.map((m) => ({
    month: m.month.slice(0, 3),
    '2026 (Current)': m.year2026,
    '2025 (Previous Year)': m.year2025,
  }));

  // Side-by-side Bar Chart for the current month across 4 years
  const selectedMonthMultiYearData = [
    { year: '2023 (3 Yrs Ago)', value: summary.prevYear3Value },
    { year: '2024 (2 Yrs Ago)', value: summary.prevYear2Value },
    { year: '2025 (Prev Year)', value: summary.prevYear1Value },
    { year: '2026 (Current)', value: summary.currentValue },
  ];

  return (
    <div className="space-y-6">
      {/* Top Selector Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md border border-[#142B4A]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#16A085] text-white">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Three-Year Historical Analysis Engine (Phase 6)
            </h3>
            <p className="text-xs text-[#8A9AAB]">
              Comparing {selectedMonth} 2026 against {selectedMonth} 2025, 2024, & 2023 historical baselines
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center gap-1.5 bg-[#142B4A] px-3 py-1.5 rounded-lg border border-[#1E3A60]">
            <Calendar className="w-4 h-4 text-[#16A085]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              {MONTH_NAMES.map((m) => (
                <option key={m} value={m} className="bg-[#0B1F3A] text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Selector */}
          <div className="flex items-center gap-1.5 bg-[#142B4A] px-3 py-1.5 rounded-lg border border-[#1E3A60]">
            <Layers className="w-4 h-4 text-[#F0A202]" />
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value as ResourceCategory)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              {(['Electricity', 'Water', 'Wi-Fi', 'Food', 'Finance', 'Environment'] as const).map((r) => (
                <option key={r} value={r} className="bg-[#0B1F3A] text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Required Historical Context KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <span className="text-xs text-[#536477] font-bold uppercase tracking-wider block">
            Current Value ({selectedMonth} 2026)
          </span>
          <div className="text-2xl font-black text-[#10213A]">
            {summary.unit === '₹' ? `₹${summary.currentValue.toLocaleString()}` : `${summary.currentValue.toLocaleString()} ${summary.unit}`}
          </div>
          <div className="text-[11px] font-bold text-[#16A085] flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {summary.yearOverYearChangePct >= 0 ? `+${summary.yearOverYearChangePct}%` : `${summary.yearOverYearChangePct}%`} YoY vs 2025
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <span className="text-xs text-[#536477] font-bold uppercase tracking-wider block">
            Historical Average
          </span>
          <div className="text-2xl font-black text-[#314B80]">
            {summary.unit === '₹' ? `₹${summary.historicalAverage.toLocaleString()}` : `${summary.historicalAverage.toLocaleString()} ${summary.unit}`}
          </div>
          <div className="text-[11px] text-[#536477]">
            3-Yr Prior Avg: {summary.unit === '₹' ? `₹${summary.threeYearAverage.toLocaleString()}` : `${summary.threeYearAverage.toLocaleString()} ${summary.unit}`}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <span className="text-xs text-[#536477] font-bold uppercase tracking-wider block">
            Historical Minimum
          </span>
          <div className="text-2xl font-black text-[#16A085]">
            {summary.unit === '₹' ? `₹${summary.historicalMinimum.toLocaleString()}` : `${summary.historicalMinimum.toLocaleString()} ${summary.unit}`}
          </div>
          <div className="text-[11px] text-[#536477]">
            Lowest recorded baseline value
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <span className="text-xs text-[#536477] font-bold uppercase tracking-wider block">
            Historical Maximum
          </span>
          <div className="text-2xl font-black text-[#0B1F3A]">
            {summary.unit === '₹' ? `₹${summary.historicalMaximum.toLocaleString()}` : `${summary.historicalMaximum.toLocaleString()} ${summary.unit}`}
          </div>
          <div className="text-[11px] text-[#536477]">
            Peak recorded historical value
          </div>
        </div>
      </div>

      {/* Multi-Resource Overview Table */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F4F7F6]">
          <div>
            <h3 className="text-base font-bold text-[#10213A]">
              Multi-Departmental Historical Comparison Overview ({selectedMonth})
            </h3>
            <p className="text-xs text-[#536477]">
              Current month compared with same month across 2025, 2024, and 2023
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF2F1] text-[#16A085] border border-[#16A085]/30">
            Historical Context Only
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D6E1DE] bg-[#F4F7F6] text-[#536477] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4">Resource Metric</th>
                <th className="py-3 px-4">{selectedMonth} 2026</th>
                <th className="py-3 px-4">{selectedMonth} 2025 (Y-1)</th>
                <th className="py-3 px-4">{selectedMonth} 2024 (Y-2)</th>
                <th className="py-3 px-4">{selectedMonth} 2023 (Y-3)</th>
                <th className="py-3 px-4">YoY Change</th>
                <th className="py-3 px-4">3-Yr Avg</th>
                <th className="py-3 px-4">Min / Max Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F6]">
              {allSummaries.map((item) => (
                <tr
                  key={item.resource}
                  onClick={() => setSelectedResource(item.resource)}
                  className={`cursor-pointer transition-colors ${
                    selectedResource === item.resource ? 'bg-[#EAF2F1]/80 font-semibold' : 'hover:bg-[#F4F7F6]/60'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-[#10213A]">
                    {item.resource} ({item.unit})
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#16A085]">
                    {item.currentValue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#536477]">
                    {item.prevYear1Value.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#8A9AAB]">
                    {item.prevYear2Value.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#8A9AAB]">
                    {item.prevYear3Value.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0B1F3A]">
                    {item.yearOverYearChangePct >= 0 ? `+${item.yearOverYearChangePct}%` : `${item.yearOverYearChangePct}%`}
                  </td>
                  <td className="py-3.5 px-4 text-[#314B80] font-semibold">
                    {item.threeYearAverage.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[11px] font-mono text-[#536477]">
                    {item.historicalMinimum.toLocaleString()} – {item.historicalMaximum.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Current vs Previous Year Line Chart */}
        <ChartContainer
          title={`${summary.resource}: Current (2026) vs Previous Year (2025)`}
          subtitle="Monthly comparison trajectory across all 12 months"
          icon={<TrendingUp className="w-5 h-5 text-[#16A085]" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentVsPrevChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
              <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" name="2026 (Current Year)" dataKey="2026 (Current)" stroke="#16A085" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" name="2025 (Previous Year)" dataKey="2025 (Previous Year)" stroke="#314B80" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* 2. Current Year vs Previous Three Years Bar Chart */}
        <ChartContainer
          title={`${summary.resource}: ${selectedMonth} Baseline Across 4 Years`}
          subtitle={`Side-by-side comparison for ${selectedMonth} (2023 to 2026)`}
          icon={<BarChart2 className="w-5 h-5 text-[#16A085]" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={selectedMonthMultiYearData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
              <XAxis dataKey="year" stroke="#8A9AAB" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
              <Bar name={`${summary.metricLabel} (${summary.unit})`} dataKey="value" fill="#0B1F3A" radius={[6, 6, 0, 0]} barSize={32} />
              <ReferenceLine y={summary.historicalAverage} stroke="#16A085" strokeDasharray="3 3" label={{ value: '3-Yr Avg', fill: '#16A085', fontSize: 10 }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* 3. Three-Year Historical Full Line Chart (Jan - Dec) */}
      <ChartContainer
        title={`${summary.resource}: 3-Year Historical Trajectory (2023 - 2026)`}
        subtitle="Complete 12-month trajectory across 2023, 2024, 2025, and 2026"
        icon={<History className="w-5 h-5 text-[#16A085]" />}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthByMonthChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
            <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
            <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Line type="monotone" name="2026 (Current)" dataKey="2026 (Current)" stroke="#16A085" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" name="2025 (Prev Year)" dataKey="2025 (Prev Year)" stroke="#314B80" strokeWidth={2} />
            <Line type="monotone" name="2024" dataKey="2024" stroke="#F0A202" strokeWidth={1.5} />
            <Line type="monotone" name="2023" dataKey="2023" stroke="#8A9AAB" strokeWidth={1.5} strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
