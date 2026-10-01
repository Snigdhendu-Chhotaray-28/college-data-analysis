import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, Bot, ShieldAlert, ArrowRight } from 'lucide-react';

export const AIAdvisor: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="AI Campus Sustainability Advisor"
        tagline="LLM-driven anomaly diagnosis, historical root cause decomposition & actionable conservation strategies"
        badgeText="Edge Function Powered"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#D6E1DE]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10213A]">Campus Anomaly AI Diagnostic</h3>
              <p className="text-xs text-[#536477]">
                Backend Edge Function safely orchestrates context vectors without exposing API keys.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#10213A]">
              <span className="flex items-center gap-1.5 text-[#16A085]">
                <Bot className="w-4 h-4" /> Root Cause Synthesis
              </span>
              <span className="text-slate-500">Confidence: 94%</span>
            </div>
            <p className="text-xs text-[#10213A] leading-relaxed">
              <strong>Electricity vs. Temperature Cross-Correlation:</strong> Power demand increased
              by 7.8% YoY for October. Our multi-signal model isolated 65% of this variance to a +2.4°C
              increase in ambient temperature and 35% to new GPU computing clusters deployed in Block C.
            </p>
            <div className="pt-2 border-t border-[#D6E1DE] flex items-center justify-between">
              <span className="text-[11px] text-[#536477]">Recommendation:</span>
              <span className="text-xs font-semibold text-[#16A085]">
                Adjust HVAC chilled water setpoint from 22°C to 24°C during non-peak hours.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" size="sm">
              View Evidence Graph
            </Button>
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Generate Monthly Executive Report
            </Button>
          </div>
        </Card>

        {/* Security / Safe Calling Info */}
        <Card className="space-y-4 bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
            <ShieldAlert className="w-4 h-4 text-[#16A085]" />
            <span>AI Architecture & Security</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict enterprise protocol: Frontend communicates exclusively with Supabase Edge
            Functions. No proprietary API tokens or raw user credentials are ever client-exposed.
          </p>
          <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Backend Runtime:</span>
              <span className="font-semibold text-slate-800">Supabase Edge (Deno)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Model Engine:</span>
              <span className="font-semibold text-slate-800">Gemini 1.5 Pro / Flash</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Vector Search:</span>
              <span className="font-semibold text-slate-800">pgvector in Supabase</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
