import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Database, Sliders } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase/supabaseClient';

export const Settings: React.FC = () => {
  const isConfigured = isSupabaseConfigured();

  return (
    <div>
      <PageHeader
        title="Platform Settings & Configuration"
        tagline="Manage database connections, anomaly sensitivity thresholds, and campus profiles"
        badgeText="System Admin"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Config */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#10213A] pb-3 border-b border-[#D6E1DE]">
            <Database className="w-4 h-4 text-[#16A085]" />
            <span>Supabase Database Connection</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status</label>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
                <span className="font-medium text-slate-800">
                  {isConfigured ? 'Connected to Supabase PostgreSQL' : 'Fallback / Local Demo Mode'}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project Host</label>
              <input
                type="text"
                readOnly
                value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                className="w-full bg-[#F4F7F6] border border-[#D6E1DE] rounded-xl px-3 py-2 text-slate-600 select-all"
              />
            </div>
          </div>
        </Card>

        {/* Anomaly Engine Settings */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#10213A] pb-3 border-b border-[#D6E1DE]">
            <Sliders className="w-4 h-4 text-[#16A085]" />
            <span>Anomaly Detection Sensitivity</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 font-semibold text-slate-700">
                <span>Threshold Deviation Trigger</span>
                <span className="text-[#16A085]">±12.0%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                defaultValue="12"
                className="w-full accent-[#16A085]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold text-slate-700">
                <span>Historical Baseline Window</span>
                <span className="text-[#16A085]">3 Academic Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                defaultValue="3"
                className="w-full accent-[#16A085]"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
