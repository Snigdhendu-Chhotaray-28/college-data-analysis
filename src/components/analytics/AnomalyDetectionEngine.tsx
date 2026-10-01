import React, { useState } from 'react';
import { Card } from '../ui/Card';
import {
  evaluateAllResourceAnomalies,
} from '../../services/anomalyDetectionService';
import { MONTH_NAMES, type ResourceCategory } from '../../services/historicalAnalysisService';
import type { AnomalyClassification } from '../../types';
import {
  ShieldAlert,
  Calendar,
  Layers,
  FileText,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

export const AnomalyDetectionEngine: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedResource, setSelectedResource] = useState<ResourceCategory>('Wi-Fi');

  const allRecords = evaluateAllResourceAnomalies(selectedMonth);
  const activeRecord = allRecords.find((r) => r.resource === selectedResource) || allRecords[0];

  const getClassificationBadge = (cls: AnomalyClassification) => {
    switch (cls) {
      case 'NORMAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF2F1] text-[#16A085] border border-[#16A085]/30">
            NORMAL
          </span>
        );
      case 'WATCH':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFF4E5] text-[#D97706] border border-[#FCD34D]">
            WATCH
          </span>
        );
      case 'ANOMALY':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFE4E6] text-[#E11D48] border border-[#FDA4AF]">
            ANOMALY
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#D64550] text-white shadow-xs animate-pulse">
            CRITICAL
          </span>
        );
    }
  };

  // 6 Signals bar chart data
  const signalsChartData = [
    { signal: 'YoY Deviation', score: activeRecord.signals.yoyDeviationScore },
    { signal: 'Historical Deviation', score: activeRecord.signals.historicalDeviationScore },
    { signal: 'Student Normalized', score: activeRecord.signals.studentNormalizedScore },
    { signal: 'Seasonal Deviation', score: activeRecord.signals.seasonalDeviationScore },
    { signal: 'Calendar Context', score: activeRecord.signals.calendarContextScore },
    { signal: 'Env Correlation', score: activeRecord.signals.environmentCorrelationScore },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Control Panel */}
      <div className="p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md border border-[#142B4A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#D64550] text-white shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Deterministic Anomaly Detection Engine (Phase 8)
            </h3>
            <p className="text-xs text-[#8A9AAB]">
              Multi-signal classification (YoY, Z-Score, Student-Normalized, Seasonal, Calendar, Environment)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#142B4A] px-3 py-1.5 rounded-lg border border-[#1E3A60]">
            <Calendar className="w-4 h-4 text-[#16A085]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              {MONTH_NAMES.map((m: string) => (
                <option key={m} value={m} className="bg-[#0B1F3A] text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#142B4A] px-3 py-1.5 rounded-lg border border-[#1E3A60]">
            <Layers className="w-4 h-4 text-[#F0A202]" />
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value as ResourceCategory)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              {(['Wi-Fi', 'Water', 'Electricity', 'Food', 'Finance', 'Environment'] as const).map((r) => (
                <option key={r} value={r} className="bg-[#0B1F3A] text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Anomaly Summary Matrix Table */}
      <Card>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F4F7F6]">
          <div>
            <h3 className="text-base font-bold text-[#10213A]">
              Departmental Multi-Signal Anomaly Assessment ({selectedMonth})
            </h3>
            <p className="text-xs text-[#536477]">
              Evaluated using 6 independent telemetry signals without single-threshold reliance
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F4F7F6] text-[#0B1F3A] border border-[#D6E1DE]">
            Phase 8 Multi-Signal Engine
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D6E1DE] bg-[#F4F7F6] text-[#536477] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Current Telemetry</th>
                <th className="py-3 px-4">Expected Baseline</th>
                <th className="py-3 px-4">YoY Deviation</th>
                <th className="py-3 px-4">Per-Student Telemetry</th>
                <th className="py-3 px-4">Composite Score</th>
                <th className="py-3 px-4">Deterministic Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F6]">
              {allRecords.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setSelectedResource(rec.resource)}
                  className={`cursor-pointer transition-colors ${
                    selectedResource === rec.resource ? 'bg-[#EAF2F1]/80 font-semibold' : 'hover:bg-[#F4F7F6]/60'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-[#10213A]">
                    {rec.resource}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#10213A]">
                    {rec.metrics.currentValue.toLocaleString()} {rec.unit}
                  </td>
                  <td className="py-3.5 px-4 text-[#536477]">
                    {rec.metrics.historicalAverage.toLocaleString()} {rec.unit}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0B1F3A]">
                    {rec.signals.yoyDeviationScore >= 40 ? `+${rec.explanation.deviationPercent}%` : `${rec.explanation.deviationPercent}%`}
                  </td>
                  <td className="py-3.5 px-4 text-[#16A085] font-mono">
                    {rec.metrics.studentNormalizedValue} {rec.unit}/std
                  </td>
                  <td className="py-3.5 px-4 font-extrabold">
                    <span className="font-mono text-sm text-[#0B1F3A]">{rec.signals.compositeScore}</span> / 100
                  </td>
                  <td className="py-3.5 px-4">
                    {getClassificationBadge(rec.classification)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Inspection for Selected Resource */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 6-Signal Radar/Bar Breakdown */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F4F7F6]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#16A085]" />
                <h4 className="text-xs font-bold text-[#10213A] uppercase tracking-wider">
                  6-Signal Telemetry Breakdown ({activeRecord.resource})
                </h4>
              </div>
              <span className="text-xs font-black text-[#0B1F3A] font-mono">
                Score: {activeRecord.signals.compositeScore}/100
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signalsChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#8A9AAB" fontSize={10} />
                  <YAxis type="category" dataKey="signal" stroke="#8A9AAB" fontSize={10} width={90} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
                  <Bar dataKey="score" fill="#16A085" radius={[0, 4, 4, 0]} barSize={14} />
                  <ReferenceLine x={50} stroke="#D64550" strokeDasharray="3 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Key Calculated Telemetry Metrics Card */}
          <Card className="bg-[#F4F7F6] border border-[#D6E1DE] space-y-2 text-xs">
            <h4 className="font-extrabold text-[#0B1F3A] uppercase tracking-wider border-b border-[#D6E1DE] pb-2">
              Calculated Deterministic Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Current Value</span>
                <span className="font-bold text-[#10213A]">{activeRecord.metrics.currentValue.toLocaleString()} {activeRecord.unit}</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Historical Avg</span>
                <span className="font-bold text-[#10213A]">{activeRecord.metrics.historicalAverage.toLocaleString()} {activeRecord.unit}</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Historical Min</span>
                <span className="font-bold text-[#16A085]">{activeRecord.metrics.historicalMinimum.toLocaleString()} {activeRecord.unit}</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Historical Max</span>
                <span className="font-bold text-[#0B1F3A]">{activeRecord.metrics.historicalMaximum.toLocaleString()} {activeRecord.unit}</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Hist Variation (StdDev)</span>
                <span className="font-bold text-[#536477]">±{Math.round(activeRecord.metrics.historicalVariation).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[#8A9AAB] block text-[10px] uppercase font-bold">Per Student</span>
                <span className="font-bold text-[#16A085]">{activeRecord.metrics.studentNormalizedValue} {activeRecord.unit}/std</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Structured Anomaly Explanation Object Card */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F4F7F6]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#16A085]" />
                <div>
                  <h3 className="text-base font-bold text-[#10213A]">
                    Structured Anomaly Explanation Object
                  </h3>
                  <p className="text-xs text-[#536477]">
                    Deterministic evidence breakdown for {activeRecord.explanation.anomalyType}
                  </p>
                </div>
              </div>
              {getClassificationBadge(activeRecord.classification)}
            </div>

            {/* Structured Field Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE] space-y-1">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">1. Anomaly Type & Resource</span>
                <span className="font-bold text-[#10213A]">{activeRecord.explanation.anomalyType} ({activeRecord.resource})</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE] space-y-1">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">2. Severity & Date</span>
                <span className="font-bold text-[#10213A]">{activeRecord.explanation.severity} • {activeRecord.explanation.date}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE] space-y-1">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">3. Current vs Expected Value</span>
                <span className="font-bold text-[#10213A]">
                  {activeRecord.explanation.currentValue.toLocaleString()} {activeRecord.unit} vs Expected {activeRecord.explanation.expectedValue.toLocaleString()} {activeRecord.unit}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE] space-y-1">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">4. Deviation Percentage</span>
                <span className="font-bold text-[#C92F80]">+{activeRecord.explanation.deviationPercent}% Variance</span>
              </div>
            </div>

            {/* Evidence Categories */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#D6E1DE] space-y-1">
                <strong className="text-[#0B1F3A] block font-bold">Historical Evidence:</strong>
                <p className="text-[#536477]">{activeRecord.explanation.historicalEvidence}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D6E1DE] space-y-1">
                <strong className="text-[#16A085] block font-bold">Student Population Evidence:</strong>
                <p className="text-[#536477]">{activeRecord.explanation.studentEvidence}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D6E1DE] space-y-1">
                <strong className="text-[#314B80] block font-bold">Academic Calendar Evidence:</strong>
                <p className="text-[#536477]">{activeRecord.explanation.calendarEvidence}</p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D6E1DE] space-y-1">
                <strong className="text-[#D97706] block font-bold">Environmental Correlation Evidence:</strong>
                <p className="text-[#536477]">{activeRecord.explanation.environmentEvidence}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#EAF2F1] border border-[#16A085]/30 space-y-1">
                <strong className="text-[#16A085] block font-bold">Actionable Evidence-Based Recommendation:</strong>
                <p className="text-[#10213A] font-semibold">{activeRecord.explanation.recommendation}</p>
              </div>
            </div>

            {/* Verbatim Evidence Paragraph Display matching User Prompt Example */}
            <div className="mt-4 p-4 rounded-xl bg-[#0B1F3A] text-white space-y-2 border border-[#142B4A]">
              <span className="text-[10px] text-[#16A085] uppercase font-black tracking-wider block">
                Verbatim Evidence Synthesis Paragraph
              </span>
              <p className="text-xs leading-relaxed text-[#EAF2F1]">
                "{activeRecord.explanation.fullEvidenceText}"
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
