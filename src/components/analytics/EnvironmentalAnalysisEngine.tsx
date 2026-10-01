import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  getEnvironmentalTelemetry,
  getEnvironmentalCorrelationData,
  getNonCausalEnvironmentalEvidence
} from '../../services/environmentalAnalysisService';
import { MONTH_NAMES } from '../../services/historicalAnalysisService';
import {
  Thermometer,
  Wind,
  CloudRain,
  Activity,
  Calendar,
  Zap,
  Droplets,
  HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const EnvironmentalAnalysisEngine: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [activeCorrelationView, setActiveCorrelationView] = useState<
    'temp_vs_elec' | 'temp_vs_water' | 'humidity_vs_water' | 'temp_vs_aqi'
  >('temp_vs_elec');

  const telemetry = getEnvironmentalTelemetry(selectedMonth);
  const correlationData = getEnvironmentalCorrelationData();
  const nonCausalEvidence = getNonCausalEnvironmentalEvidence(
    activeCorrelationView === 'temp_vs_water' || activeCorrelationView === 'humidity_vs_water'
      ? 'Water'
      : activeCorrelationView === 'temp_vs_aqi'
      ? 'AQI'
      : 'Electricity',
    selectedMonth
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Control Panel */}
      <div className="p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md border border-[#142B4A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#16A085] text-white">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Environmental Telemetry & Correlation Engine (Phase 10)
            </h3>
            <p className="text-xs text-[#8A9AAB]">
              Tracks Temperature, Humidity, AQI, and PM2.5 with Non-Causal Correlation Intelligence
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

          <Badge variant="info">Phase 10 Environmental Engine</Badge>
        </div>
      </div>

      {/* Four Main Environmental Metric Summary Cards (Avg, Min, Max, Prev Year, Hist Avg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Temperature */}
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span className="uppercase tracking-wider">Temperature (°C)</span>
            <Thermometer className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#10213A]">{telemetry.avgTempCelsius}°C</span>
            <span className="text-xs text-[#8A9AAB] font-semibold">Monthly Avg</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-[#F4F7F6]">
            <div><span className="text-[#8A9AAB]">Min / Max:</span> <strong className="text-[#10213A]">{telemetry.minTempCelsius}° / {telemetry.maxTempCelsius}°C</strong></div>
            <div><span className="text-[#8A9AAB]">Prev Year:</span> <strong className="text-[#16A085]">{telemetry.prevYearAvgTemp}°C</strong></div>
            <div><span className="text-[#8A9AAB]">Hist Avg:</span> <strong className="text-[#314B80]">{telemetry.historicalAvgTemp}°C</strong></div>
          </div>
        </div>

        {/* 2. Humidity */}
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span className="uppercase tracking-wider">Relative Humidity</span>
            <CloudRain className="w-4 h-4 text-[#314B80]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#10213A]">{telemetry.avgHumidityPct}%</span>
            <span className="text-xs text-[#8A9AAB] font-semibold">% RH Avg</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-[#F4F7F6]">
            <div><span className="text-[#8A9AAB]">Min / Max:</span> <strong className="text-[#10213A]">{telemetry.minHumidityPct}% / {telemetry.maxHumidityPct}%</strong></div>
            <div><span className="text-[#8A9AAB]">Prev Year:</span> <strong className="text-[#16A085]">{telemetry.prevYearAvgHumidity}%</strong></div>
            <div><span className="text-[#8A9AAB]">Hist Avg:</span> <strong className="text-[#314B80]">{telemetry.historicalAvgHumidity}%</strong></div>
          </div>
        </div>

        {/* 3. AQI */}
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span className="uppercase tracking-wider">Air Quality Index</span>
            <Wind className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#10213A]">{telemetry.avgAqi}</span>
            <span className="text-xs text-[#16A085] font-bold">Good Quality</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-[#F4F7F6]">
            <div><span className="text-[#8A9AAB]">Min / Max:</span> <strong className="text-[#10213A]">{telemetry.minAqi} / {telemetry.maxAqi}</strong></div>
            <div><span className="text-[#8A9AAB]">Prev Year:</span> <strong className="text-[#16A085]">{telemetry.prevYearAvgAqi}</strong></div>
            <div><span className="text-[#8A9AAB]">Hist Avg:</span> <strong className="text-[#314B80]">{telemetry.historicalAvgAqi}</strong></div>
          </div>
        </div>

        {/* 4. PM2.5 */}
        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold">
            <span className="uppercase tracking-wider">PM2.5 Concentration</span>
            <Activity className="w-4 h-4 text-[#0B1F3A]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#10213A]">{telemetry.avgPm25}</span>
            <span className="text-xs text-[#8A9AAB] font-semibold">µg/m³ Avg</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-[#F4F7F6]">
            <div><span className="text-[#8A9AAB]">Min / Max:</span> <strong className="text-[#10213A]">{telemetry.minPm25} / {telemetry.maxPm25}</strong></div>
            <div><span className="text-[#8A9AAB]">Prev Year:</span> <strong className="text-[#16A085]">{telemetry.prevYearAvgPm25}</strong></div>
            <div><span className="text-[#8A9AAB]">Hist Avg:</span> <strong className="text-[#314B80]">{telemetry.historicalAvgPm25}</strong></div>
          </div>
        </div>
      </div>

      {/* Non-Causal Evidence Directive Explainer Banner */}
      <Card className="bg-[#F4F7F6] border border-[#D6E1DE]">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-[#0B1F3A] text-[#16A085]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-xs text-[#10213A]">
            <h4 className="font-extrabold text-[#0B1F3A] uppercase tracking-wider">
              Non-Causal Contextual Evidence Protocol
            </h4>
            <p className="text-[#536477]">
              Environmental telemetry is cross-referenced with utility consumption as contextual correlation evidence. Causation is never asserted without controlled sub-meter physical proof.
            </p>
            <div className="p-3 rounded-lg bg-white border border-[#D6E1DE] font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-2 text-[#16A085]">
                <strong className="uppercase">Correct Non-Causal Syntax:</strong>
                <span>"{nonCausalEvidence}"</span>
              </div>
              <div className="flex items-center gap-2 text-[#C92F80]">
                <strong className="uppercase">Prohibited Causal Assertion:</strong>
                <span>"Temperature caused the electricity increase." (Never use unless physically proven)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Four Correlation Views Switcher */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#F4F7F6] gap-3">
          <div>
            <h3 className="text-base font-bold text-[#10213A]">
              Environmental & Utility Telemetry Correlation Analysis
            </h3>
            <p className="text-xs text-[#536477]">
              Inspect co-variance across temperature, humidity, AQI, electricity, and water
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#F4F7F6] p-1 rounded-xl border border-[#D6E1DE]">
            <button
              onClick={() => setActiveCorrelationView('temp_vs_elec')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCorrelationView === 'temp_vs_elec'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-[#536477] hover:text-[#10213A]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#16A085]" />
              Temp vs Electricity
            </button>

            <button
              onClick={() => setActiveCorrelationView('temp_vs_water')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCorrelationView === 'temp_vs_water'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-[#536477] hover:text-[#10213A]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-[#314B80]" />
              Temp vs Water
            </button>

            <button
              onClick={() => setActiveCorrelationView('humidity_vs_water')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCorrelationView === 'humidity_vs_water'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-[#536477] hover:text-[#10213A]'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 text-[#D97706]" />
              Humidity vs Water
            </button>

            <button
              onClick={() => setActiveCorrelationView('temp_vs_aqi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCorrelationView === 'temp_vs_aqi'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-[#536477] hover:text-[#10213A]'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-[#16A085]" />
              Temp vs AQI
            </button>
          </div>
        </div>

        {/* Dynamic Correlation Chart Display */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {activeCorrelationView === 'temp_vs_elec' ? (
              <ComposedChart data={correlationData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
                <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#16A085" fontSize={11} tickLine={false} unit=" kWh" />
                <YAxis yAxisId="right" orientation="right" stroke="#D97706" fontSize={11} tickLine={false} unit="°C" />
                <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" name="Electricity Consumption (kWh)" dataKey="electricityKwh" fill="#0B1F3A" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" name="Temperature (°C)" dataKey="temperature" stroke="#D97706" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            ) : activeCorrelationView === 'temp_vs_water' ? (
              <ComposedChart data={correlationData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
                <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#314B80" fontSize={11} tickLine={false} unit=" L" />
                <YAxis yAxisId="right" orientation="right" stroke="#D97706" fontSize={11} tickLine={false} unit="°C" />
                <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" name="Water Consumption (Liters)" dataKey="waterLiters" fill="#314B80" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" name="Temperature (°C)" dataKey="temperature" stroke="#D97706" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            ) : activeCorrelationView === 'humidity_vs_water' ? (
              <ComposedChart data={correlationData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
                <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#314B80" fontSize={11} tickLine={false} unit=" L" />
                <YAxis yAxisId="right" orientation="right" stroke="#16A085" fontSize={11} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" name="Water Consumption (Liters)" dataKey="waterLiters" fill="#314B80" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" name="Humidity (% RH)" dataKey="humidity" stroke="#16A085" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            ) : (
              <ComposedChart data={correlationData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7F6" vertical={false} />
                <XAxis dataKey="month" stroke="#8A9AAB" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#16A085" fontSize={11} tickLine={false} unit=" AQI" />
                <YAxis yAxisId="right" orientation="right" stroke="#D97706" fontSize={11} tickLine={false} unit="°C" />
                <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderRadius: '8px', color: '#FFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar yAxisId="left" name="Air Quality Index (AQI)" dataKey="aqi" fill="#16A085" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" name="Temperature (°C)" dataKey="temperature" stroke="#D97706" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
