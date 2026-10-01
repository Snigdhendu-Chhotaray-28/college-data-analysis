import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChartContainer } from '../ui/ChartContainer';
import {
  getMonthlyNormalizedData,
  getNormalizedGrowthComparisons,
  type GrowthAssessment
} from '../../services/studentNormalizationService';
import { Users, TrendingUp, DollarSign, Activity, HelpCircle } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export const StudentNormalizationEngine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Cost' | 'Consumption'>('All');
  
  const monthlyData = getMonthlyNormalizedData();
  const comparisons = getNormalizedGrowthComparisons();
  const latestMonth = monthlyData[monthlyData.length - 1];

  const filteredComparisons = comparisons.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  // Growth comparison chart data
  const growthChartData = comparisons.map((comp) => ({
    metric: comp.metricLabel,
    'Resource Growth %': comp.resourceGrowthPercent,
    'Student Growth %': comp.studentGrowthPercent,
    'Normalized Difference': comp.normalizedDifferencePctPoints,
  }));

  // Per Student Monthly Cost Trend Chart
  const perStudentCostChartData = monthlyData.map((d) => ({
    month: d.month,
    'Electricity (₹/std)': d.electricityCostPerStudent,
    'Water (₹/std)': d.waterCostPerStudent,
    'Food (₹/std)': d.foodCostPerStudent,
    'Wi-Fi (₹/std)': d.wifiCostPerStudent,
    'Total (₹/std)': d.totalResourceCostPerStudent,
  }));

  // Per Student Consumption Trend Chart
  const perStudentConsumptionChartData = monthlyData.map((d) => ({
    month: d.month,
    'Electricity (kWh/std)': d.electricityConsumptionPerStudent,
    'Water (L/std)': d.waterConsumptionPerStudent,
    'Wi-Fi Data (GB/std)': d.wifiDataPerStudent,
    'Food Waste (kg/std)': d.foodConsumptionPerStudent,
  }));

  const getAssessmentBadge = (assessment: GrowthAssessment) => {
    switch (assessment) {
      case 'Below student growth':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF2F1] text-[#16A085] border border-[#16A085]/30">
            Below student growth
          </span>
        );
      case 'Similar to student growth':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#F4F7F6] text-[#0B1F3A] border border-[#D6E1DE]">
            Similar to student growth
          </span>
        );
      case 'Above student growth':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFF4E5] text-[#D97706] border border-[#FCD34D]">
            Above student growth
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Key Per-Student KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md space-y-2 border border-[#142B4A]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8A9AAB] font-bold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-2xl font-black text-white">{latestMonth.students.toLocaleString()}</div>
          <div className="text-[11px] text-[#16A085] font-semibold">Base Student Population</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#536477] font-bold uppercase tracking-wider">Elec Cost / Student</span>
            <DollarSign className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-xl font-extrabold text-[#10213A]">₹{latestMonth.electricityCostPerStudent}</div>
          <div className="text-[11px] text-[#536477]">Consumption: {latestMonth.electricityConsumptionPerStudent} kWh/std</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#536477] font-bold uppercase tracking-wider">Water Cost / Student</span>
            <Activity className="w-4 h-4 text-[#314B80]" />
          </div>
          <div className="text-xl font-extrabold text-[#10213A]">₹{latestMonth.waterCostPerStudent}</div>
          <div className="text-[11px] text-[#536477]">Consumption: {latestMonth.waterConsumptionPerStudent.toLocaleString()} L/std</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#536477] font-bold uppercase tracking-wider">Food Cost / Student</span>
            <TrendingUp className="w-4 h-4 text-[#F0A202]" />
          </div>
          <div className="text-xl font-extrabold text-[#10213A]">₹{latestMonth.foodCostPerStudent}</div>
          <div className="text-[11px] text-[#536477]">Waste: {latestMonth.foodConsumptionPerStudent} kg/std</div>
        </div>

        <div className="p-4 rounded-xl bg-[#16A085]/10 border border-[#16A085]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#16A085] font-extrabold uppercase tracking-wider">Total Cost / Student</span>
            <Badge variant="optimal">₹/Student</Badge>
          </div>
          <div className="text-xl font-black text-[#10213A]">₹{latestMonth.totalResourceCostPerStudent.toLocaleString()}</div>
          <div className="text-[11px] font-semibold text-[#16A085]">Combined Utility Baseline</div>
        </div>
      </div>

      {/* Clear Formula & Example Explainer Banner */}
      <Card className="bg-[#F4F7F6] border border-[#D6E1DE]">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-[#0B1F3A] text-[#16A085]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs text-[#10213A]">
            <h4 className="font-extrabold text-[#0B1F3A] uppercase tracking-wider">
              Student Growth Normalization Methodology & Assessment Rule
            </h4>
            <p className="text-[#536477]">
              Resource consumption and costs are evaluated relative to student population changes to decouple demographic expansion from real operational intensity changes.
            </p>
            <div className="mt-2 p-3 rounded-lg bg-white border border-[#D6E1DE] grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Formula</span>
                <span className="font-bold text-[#10213A]">Normalized Diff = Resource Growth % − Student Growth %</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Standard Example</span>
                <span className="font-bold text-[#16A085]">Student +5% | Elec Cost +8% → +3 percentage points</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Objective Assessment</span>
                <span className="font-bold text-[#0B1F3A]">Below (&lt;-1pp), Similar (±1pp), Above (&gt;+1pp)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Growth Comparison Table */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#F4F7F6] gap-3">
          <div>
            <h3 className="text-base font-bold text-[#10213A]">
              Student-Normalized Resource Analysis & Objective Growth Table
            </h3>
            <p className="text-xs text-[#536477]">
              Comparing current monthly resource consumption and cost growth against student population growth
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F4F7F6] p-1 rounded-xl border border-[#D6E1DE]">
            {(['All', 'Cost', 'Consumption'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'text-[#536477] hover:text-[#10213A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D6E1DE] bg-[#F4F7F6] text-[#536477] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4">Metric</th>
                <th className="py-3 px-4">Current Month</th>
                <th className="py-3 px-4">Previous Year</th>
                <th className="py-3 px-4">Resource Growth</th>
                <th className="py-3 px-4">Student Growth</th>
                <th className="py-3 px-4">Normalized Difference</th>
                <th className="py-3 px-4">Objective Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F6]">
              {filteredComparisons.map((item) => (
                <tr key={item.metricKey} className="hover:bg-[#F4F7F6]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#10213A]">
                    {item.metricLabel}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#10213A]">
                    {item.unit === '₹' ? `₹${item.currentValue.toLocaleString()}` : `${item.currentValue.toLocaleString()} ${item.unit}`}
                  </td>
                  <td className="py-3.5 px-4 text-[#536477]">
                    {item.unit === '₹' ? `₹${item.previousYearValue.toLocaleString()}` : `${item.previousYearValue.toLocaleString()} ${item.unit}`}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0B1F3A]">
                    {item.resourceGrowthPercent >= 0 ? `+${item.resourceGrowthPercent}%` : `${item.resourceGrowthPercent}%`}
                  </td>
                  <td className="py-3.5 px-4 text-[#16A085] font-bold">
                    +{item.studentGrowthPercent}%
                  </td>
                  <td className="py-3.5 px-4 font-extrabold">
                    <span className={item.normalizedDifferencePctPoints > 0 ? 'text-[#0B1F3A]' : 'text-[#16A085]'}>
                      {item.normalizedDifferencePctPoints >= 0 ? `+${item.normalizedDifferencePctPoints}` : item.normalizedDifferencePctPoints} percentage points
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getAssessmentBadge(item.assessment)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visual Charts: Student Growth vs Resource Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Student Growth vs Resource Growth Comparison (%)"
          subtitle="Side-by-side growth comparison & normalized variance"
          icon={<TrendingUp className="w-5 h-5 text-[#16A085]" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthChartData} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
              <XAxis
                dataKey="metric"
                stroke="#8A9AAB"
                fontSize={10}
                tickLine={false}
                interval={0}
                angle={-25}
                textAnchor="end"
              />
              <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }}
                formatter={(val: any, name: any) => [
                  name === 'Normalized Difference' ? `${val} percentage points` : `${val}%`,
                  String(name)
                ]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <ReferenceLine y={0} stroke="#D6E1DE" />
              <Bar name="Student Growth %" dataKey="Student Growth %" fill="#16A085" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Resource Growth %" dataKey="Resource Growth %" fill="#0B1F3A" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Normalized Difference" dataKey="Normalized Difference" fill="#F0A202" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Per-Student Utility Spend Trend (₹ / Student)"
          subtitle="Monthly breakdown of cost normalized per student"
          icon={<DollarSign className="w-5 h-5 text-[#16A085]" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={perStudentCostChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
              <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" name="Electricity (₹/std)" dataKey="Electricity (₹/std)" stroke="#16A085" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" name="Food (₹/std)" dataKey="Food (₹/std)" stroke="#0B1F3A" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" name="Water (₹/std)" dataKey="Water (₹/std)" stroke="#314B80" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" name="Wi-Fi (₹/std)" dataKey="Wi-Fi (₹/std)" stroke="#F0A202" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Per Student Consumption Trend Chart */}
      <ChartContainer
        title="Per-Student Consumption Intensity Telemetry"
        subtitle="Electricity (kWh/std), Water (L/std), Wi-Fi Data (GB/std), Mess Waste (kg/std)"
        icon={<Activity className="w-5 h-5 text-[#16A085]" />}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={perStudentConsumptionChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
            <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
            <YAxis stroke="#8A9AAB" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Line type="monotone" name="Electricity (kWh/std)" dataKey="Electricity (kWh/std)" stroke="#16A085" strokeWidth={2} />
            <Line type="monotone" name="Wi-Fi Data (GB/std)" dataKey="Wi-Fi Data (GB/std)" stroke="#C92F80" strokeWidth={2} />
            <Line type="monotone" name="Food Waste (kg/std)" dataKey="Food Waste (kg/std)" stroke="#F0A202" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

