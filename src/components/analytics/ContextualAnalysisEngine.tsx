import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  generateContextualAnalysis,
  DEFAULT_SEASON_CONFIGS,
  MOCK_ACADEMIC_CALENDAR_ENRICHED,
  MONTH_NAMES
} from '../../services/contextualAnalysisService';
import type { SeasonConfig, SeasonType } from '../../types';
import {
  Compass,
  Calendar,
  Sun,
  Thermometer,
  Users,
  CheckCircle2,
  Settings,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const ContextualAnalysisEngine: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [seasonConfigs, setSeasonConfigs] = useState<SeasonConfig[]>(DEFAULT_SEASON_CONFIGS);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('ctx-water-01');

  const candidates = generateContextualAnalysis(selectedMonth, seasonConfigs);
  const activeCandidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];
  const calendarRecord = MOCK_ACADEMIC_CALENDAR_ENRICHED.find(
    (c) => c.month.toLowerCase() === selectedMonth.toLowerCase()
  ) || MOCK_ACADEMIC_CALENDAR_ENRICHED[8];

  const handleSeasonMonthChange = (seasonName: SeasonType, field: 'startMonth' | 'endMonth', value: string) => {
    setSeasonConfigs((prev) =>
      prev.map((cfg) => (cfg.season === seasonName ? { ...cfg, [field]: value } : cfg))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Controls */}
      <div className="p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md border border-[#142B4A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#16A085] text-white">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Context-Aware Resource Analysis Engine (Phase 7)
            </h3>
            <p className="text-xs text-[#8A9AAB]">
              Evaluates resource variance against Academic Calendar, Student Population, Temperature, & Configurable Seasons
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Month Selector */}
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

          <Badge variant="info">Phase 7 Context Engine</Badge>
        </div>
      </div>

      {/* Configurable Season Ranges Control Panel */}
      <Card className="bg-[#F4F7F6] border border-[#D6E1DE]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D6E1DE]">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#16A085]" />
            <h4 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider">
              Configurable Seasonal Date Ranges & Microclimate Parameters
            </h4>
          </div>
          <span className="text-[10px] font-mono text-[#536477]">Dynamic (Non-Hardcoded)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seasonConfigs.map((cfg) => (
            <div key={cfg.season} className="p-3 rounded-lg bg-white border border-[#D6E1DE] space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#10213A]">
                <span className="flex items-center gap-1.5">
                  <Sun className={`w-3.5 h-3.5 ${cfg.season === 'Summer' ? 'text-[#D97706]' : cfg.season === 'Monsoon' ? 'text-[#16A085]' : 'text-[#314B80]'}`} />
                  {cfg.season} Season
                </span>
                <span className="text-[10px] text-[#536477] font-mono">{cfg.avgTempCelsius}°C Base</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <label className="block text-[10px] text-[#8A9AAB] font-bold">Start Month</label>
                  <select
                    value={cfg.startMonth}
                    onChange={(e) => handleSeasonMonthChange(cfg.season, 'startMonth', e.target.value)}
                    className="w-full p-1 rounded border border-[#D6E1DE] bg-[#F4F7F6] text-[#10213A] font-semibold outline-none"
                  >
                    {MONTH_NAMES.map((m: string) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8A9AAB] font-bold">End Month</label>
                  <select
                    value={cfg.endMonth}
                    onChange={(e) => handleSeasonMonthChange(cfg.season, 'endMonth', e.target.value)}
                    className="w-full p-1 rounded border border-[#D6E1DE] bg-[#F4F7F6] text-[#10213A] font-semibold outline-none"
                  >
                    {MONTH_NAMES.map((m: string) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Academic Calendar Context Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span>Academic Status</span>
            <BookOpen className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-base font-extrabold text-[#10213A]">{calendarRecord.eventType}</div>
          <div className="text-[11px] text-[#536477]">{calendarRecord.semester} • {calendarRecord.activeDays} Days</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span>Calendar Day Flags</span>
            <Calendar className="w-4 h-4 text-[#314B80]" />
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${calendarRecord.isExamDay ? 'bg-[#FFF4E5] text-[#D97706]' : 'bg-[#F4F7F6] text-[#8A9AAB]'}`}>
              Exam Day: {calendarRecord.isExamDay ? 'YES' : 'NO'}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${calendarRecord.isHoliday ? 'bg-[#FFF4E5] text-[#D97706]' : 'bg-[#EAF2F1] text-[#16A085]'}`}>
              Holiday: {calendarRecord.isHoliday ? 'YES' : 'NO'}
            </span>
          </div>
          <div className="text-[11px] text-[#536477]">Working Days: {calendarRecord.isWorkingDay ? 'Active' : 'Recess'}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span>Student Population</span>
            <Users className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-base font-extrabold text-[#10213A]">{activeCandidate.studentPopCurrent.toLocaleString()} Students</div>
          <div className="text-[11px] font-bold text-[#16A085]">+{activeCandidate.studentPopChangePct}% YoY Population Growth</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span>Environmental Season</span>
            <Thermometer className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-base font-extrabold text-[#10213A]">{activeCandidate.season} Season</div>
          <div className="text-[11px] text-[#536477]">Temp: {activeCandidate.avgTempCelsius}°C (+{activeCandidate.tempChangeCelsius}°C YoY)</div>
        </div>
      </div>

      {/* Main Analysis Candidate Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Selector List */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#10213A] uppercase tracking-wider">
            Resource Variance Candidates ({selectedMonth})
          </h4>
          {candidates.map((cand) => (
            <div
              key={cand.id}
              onClick={() => setActiveCandidateId(cand.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                activeCandidate.id === cand.id
                  ? 'bg-[#0B1F3A] text-white border-[#142B4A] shadow-md'
                  : 'bg-white text-[#10213A] border-[#D6E1DE] hover:border-[#16A085]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold">{cand.department}</span>
                <span
                  className={`text-xs font-black ${
                    activeCandidate.id === cand.id ? 'text-[#16A085]' : 'text-[#C92F80]'
                  }`}
                >
                  +{cand.percentChangeVsPrevYear}% YoY
                </span>
              </div>
              <div className="text-sm font-bold truncate">{cand.metric}</div>
              <div
                className={`text-[11px] ${
                  activeCandidate.id === cand.id ? 'text-[#8A9AAB]' : 'text-[#536477]'
                }`}
              >
                Current: {cand.currentValue.toLocaleString()} {cand.unit} vs Prev Year: {cand.prevYear1Value.toLocaleString()} {cand.unit}
              </div>
            </div>
          ))}
        </div>

        {/* 10-Point Contextual Checklist & Contextual Evidence Display */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F4F7F6]">
              <div>
                <h3 className="text-base font-bold text-[#10213A]">
                  10-Factor Contextual Evidence Matrix for {activeCandidate.metric}
                </h3>
                <p className="text-xs text-[#536477]">
                  Evaluating multi-year patterns, calendar events, population scaling, and seasonal microclimate
                </p>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#EAF2F1] text-[#16A085] border border-[#16A085]/30">
                Non-Anomaly Context
              </span>
            </div>

            {/* 10-Point Checklist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs mb-4">
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">1. Prev Year (Y-1)</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.prevYear1Value.toLocaleString()} {activeCandidate.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">2. Prev 2 Yrs (Y-2)</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.prevYear2Value.toLocaleString()} {activeCandidate.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">3. Prev 3 Yrs (Y-3)</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.prevYear3Value.toLocaleString()} {activeCandidate.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">4. Student Pop</span>
                <span className="font-extrabold text-[#16A085]">+{activeCandidate.studentPopChangePct}% Growth</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">5. Working Days</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.academicContext.workingDays} Days</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">6. Holidays</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.academicContext.isHoliday ? 'Holiday Active' : 'None'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">7. Exam Period</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.academicContext.isExamDay ? 'Exam Term' : 'Regular'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">8. Temperature</span>
                <span className="font-extrabold text-[#D97706]">+{activeCandidate.tempChangeCelsius}°C</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">9. Humidity</span>
                <span className="font-extrabold text-[#10213A]">{activeCandidate.humidityPct}% RH</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">10. Season</span>
                <span className="font-extrabold text-[#16A085]">{activeCandidate.season}</span>
              </div>
            </div>

            {/* Structured Evidence Output Box matching exact Prompt Format */}
            <div className="p-4 rounded-xl bg-[#0B1F3A] text-white space-y-3 border border-[#142B4A]">
              <div className="flex items-center justify-between border-b border-[#142B4A] pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#16A085] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Generated Contextual Evidence
                </span>
                <span className="text-[10px] font-mono text-[#8A9AAB]">Objective Telemetry Synthesis</span>
              </div>

              <div className="space-y-2 text-xs">
                {activeCandidate.evidenceBulletPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[#EAF2F1]">
                    <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0 mt-0.5" />
                    <span>"{pt}"</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#142B4A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#8A9AAB] uppercase font-bold block">Contextual Synthesis Conclusion</span>
                  <span className="text-xs font-extrabold text-[#16A085]">
                    Therefore: "{activeCandidate.contextualConclusion}"
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#16A085]/20 border border-[#16A085]/40 text-[#16A085] text-xs font-bold shrink-0">
                  Not Classified As Anomaly
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
