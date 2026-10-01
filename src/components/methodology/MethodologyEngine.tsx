/**
 * ECO PILLARS HUB - ANALYSIS METHODOLOGY & SYSTEM ARCHITECTURE (PHASE 16)
 * Onboarding, Metric Formulation, Anomaly Signal Breakdown & AI Evidence Bound Proxy Documentation
 */

import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  FileSpreadsheet,
  Cpu,
  Users,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  BookOpen,
  ArrowRight,
  Database,
  CheckCircle2,
  Server,
} from 'lucide-react';

export const MethodologyEngine: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0B1F3A] border border-[#142B4A] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#16A085] to-[#0D6352] text-white shadow-lg">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">ANALYSIS METHODOLOGY & PLATFORM SPECIFICATION</h2>
              <Badge variant="optimal">METHODOLOGY VERIFIED</Badge>
            </div>
            <p className="text-xs text-[#8A9AAB] mt-1 leading-relaxed">
              Complete technical specification for data ingestion, student normalization, 3-year historical baselines, deterministic multi-signal anomaly scoring, and non-calculating AI evidence proxy.
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-[#16A085]/10 border border-[#16A085]/30 text-[#16A085] text-xs font-semibold flex items-center gap-1.5 shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>Production Ready Standard</span>
        </div>
      </div>

      {/* 6 Core Pillars Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Data Acquisition & Sources */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#16A085]/10 text-[#16A085]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                1. Data Acquisition & Sources
              </h3>
            </div>
            <Badge variant="optimal">7 Departments</Badge>
          </div>
          <ul className="text-xs text-[#536477] space-y-2 leading-relaxed font-sans">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Electricity:</strong> Smart meters, HVAC solar grid split (kWh, kW peak demand).</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Water:</strong> Flow meters & recycled rainwater intake (Liters).</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Wi-Fi & IT:</strong> Syslog routers & bandwidth telemetry (Data GB).</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Food & Mess:</strong> Mess meal billing & compost yield (Meals, Kg).</span>
            </li>
          </ul>
        </Card>

        {/* Pillar 2: Excel Upload & Normalization */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#3498DB]/10 text-[#3498DB]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                2. Excel Ingestion & Pipeline
              </h3>
            </div>
            <Badge variant="info">9-Step Processing</Badge>
          </div>
          <ol className="text-xs text-[#536477] space-y-1.5 leading-relaxed font-sans list-decimal list-inside">
            <li>File detection & metadata validation</li>
            <li>Spreadsheet binary parsing & header fuzzy match</li>
            <li>Field normalization & record type casting</li>
            <li>Row-level data quality validation (9 checks)</li>
            <li>Deduplication & hash collision check</li>
            <li>Firestore collection document creation</li>
            <li>Server-side Cloud Function monthly aggregation</li>
          </ol>
        </Card>

        {/* Pillar 3: Student Normalization Formulae */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#C92F80]/10 text-[#C92F80]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                3. Student Normalization Engine
              </h3>
            </div>
            <Badge variant="optimal">Demographic Base</Badge>
          </div>
          <div className="space-y-2 text-xs text-[#536477] font-mono">
            <div className="p-2 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
              <span className="text-[#10213A] font-bold block font-sans">Cost Per Student Formula:</span>
              <code>CostPerStudent = TotalMonthlyCost / TotalStudents</code>
            </div>
            <div className="p-2 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
              <span className="text-[#10213A] font-bold block font-sans">Normalized Growth Difference:</span>
              <code>GrowthDiff = ResourceGrowth% - StudentGrowth%</code>
            </div>
            <p className="text-[11px] font-sans text-[#64748B]">
              Classifies resource expansion objectively into <em>Below</em>, <em>Similar</em>, or <em>Above</em> student growth without subjective bias.
            </p>
          </div>
        </Card>

        {/* Pillar 4: Three-Year Historical Comparison */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#F0A202]/10 text-[#F0A202]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                4. Historical Baseline Comparison
              </h3>
            </div>
            <Badge variant="warning">3-Year Window</Badge>
          </div>
          <ul className="text-xs text-[#536477] space-y-2 leading-relaxed font-sans">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Same Month Multi-Year:</strong> Compares August 2026 vs August 2025, 2024, and 2023.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Baseline Range:</strong> Derives Historical Minimum, Historical Maximum, and Historical Baseline Average.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span>Growth is never labeled anomalous solely because it increased.</span>
            </li>
          </ul>
        </Card>

        {/* Pillar 5: Deterministic Anomaly Scoring */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#D64550]/10 text-[#D64550]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                5. Deterministic Anomaly Engine
              </h3>
            </div>
            <Badge variant="critical">6 Signals</Badge>
          </div>
          <div className="text-xs text-[#536477] space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span>1. YoY Deviation:</span>
              <strong className="text-[#10213A]">25% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>2. Historical Z-Score:</span>
              <strong className="text-[#10213A]">25% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>3. Student Normalization:</span>
              <strong className="text-[#10213A]">20% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>4. Seasonal Deviation:</span>
              <strong className="text-[#10213A]">10% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>5. Calendar Context:</span>
              <strong className="text-[#10213A]">10% Weight</strong>
            </div>
            <div className="flex justify-between">
              <span>6. Environment Correlation:</span>
              <strong className="text-[#10213A]">10% Weight</strong>
            </div>
            <p className="text-[11px] font-sans text-[#64748B] pt-1">
              Thresholds: NORMAL (&lt;25), WATCH (25-49), ANOMALY (50-74), CRITICAL (&ge;75).
            </p>
          </div>
        </Card>

        {/* Pillar 6: Non-Calculating AI Evidence Proxy */}
        <Card className="bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8F5F1] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#C92F80]/10 text-[#C92F80]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
                6. AI Eco Advisor Architecture
              </h3>
            </div>
            <Badge variant="optimal">Evidence Bound</Badge>
          </div>
          <ul className="text-xs text-[#536477] space-y-2 leading-relaxed font-sans">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>No Metric Calculation by AI:</strong> Backend computes verified metrics first.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Evidence Payload:</strong> LLM receives structured JSON payload (`buildVerifiedEvidencePayload`).</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
              <span><strong>Zero Invention:</strong> Returns <em>"Insufficient data is available to determine this."</em> if data is missing.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Comprehensive Architectural Data Flow Diagram */}
      <Card className="bg-[#0B1F3A] border-[#142B4A] text-white">
        <div className="flex items-center justify-between pb-3 border-b border-[#142B4A] mb-4">
          <h3 className="text-sm font-extrabold text-[#16A085] flex items-center gap-2">
            <Server className="w-4 h-4 text-[#F0A202]" /> End-to-End Platform Data Flow Architecture
          </h3>
          <Badge variant="optimal">Zero Client Secret Leakage</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-[#10243E] rounded-xl border border-[#1E3A5F] space-y-1">
            <FileSpreadsheet className="w-5 h-5 text-[#16A085] mx-auto" />
            <span className="font-bold text-white block">1. Excel Upload</span>
            <p className="text-[#8A9AAB] text-[10px]">Ingest Department XLSX Spreadsheet</p>
          </div>

          <div className="p-3 bg-[#10243E] rounded-xl border border-[#1E3A5F] space-y-1">
            <Cpu className="w-5 h-5 text-[#3498DB] mx-auto" />
            <span className="font-bold text-white block">2. Cloud Function</span>
            <p className="text-[#8A9AAB] text-[10px]">Parse, Normalize, 9-Check Audit</p>
          </div>

          <div className="p-3 bg-[#10243E] rounded-xl border border-[#1E3A5F] space-y-1">
            <Database className="w-5 h-5 text-[#F0A202] mx-auto" />
            <span className="font-bold text-white block">3. Firestore & Aggs</span>
            <p className="text-[#8A9AAB] text-[10px]">Store Records & Compute Baselines</p>
          </div>

          <div className="p-3 bg-[#10243E] rounded-xl border border-[#1E3A5F] space-y-1">
            <ShieldAlert className="w-5 h-5 text-[#D64550] mx-auto" />
            <span className="font-bold text-white block">4. Anomaly Engine</span>
            <p className="text-[#8A9AAB] text-[10px]">Evaluate 6-Signal Composite Score</p>
          </div>

          <div className="p-3 bg-[#10243E] rounded-xl border border-[#1E3A5F] space-y-1">
            <Sparkles className="w-5 h-5 text-[#C92F80] mx-auto" />
            <span className="font-bold text-white block">5. AI Eco Advisor</span>
            <p className="text-[#8A9AAB] text-[10px]">Cite Verified Evidence Telemetry</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
