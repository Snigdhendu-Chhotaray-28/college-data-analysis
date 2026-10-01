import React from 'react';
import { Card } from '../ui/Card';
import { BarChart3, TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';

export const AnalysisPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: TrendingUp,
            title: 'Multi-Year YoY Analysis',
            desc: 'Cross-analyzes current consumption against 1, 2, and 3-year historical patterns.',
          },
          {
            icon: Users,
            title: 'Student-Normalized Metrics',
            desc: 'Calculates per-capita baseline to isolate genuine waste from campus population growth.',
          },
          {
            icon: Calendar,
            title: 'Academic Context Layer',
            desc: 'Factors in exam days, fests, holidays, and semester breaks to prevent false alerts.',
          },
          {
            icon: Sparkles,
            title: 'AI Root Cause Engine',
            desc: 'Generates plain-English explanations correlating environmental and operational data.',
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} hoverEffect>
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#16A085] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#10213A] mb-1">{item.title}</h3>
              <p className="text-xs text-[#536477] leading-relaxed">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 text-center bg-white border border-[#D6E1DE]">
        <BarChart3 className="w-12 h-12 text-[#16A085] mx-auto mb-3 opacity-80" />
        <h3 className="text-base font-bold text-[#10213A]">Intelligence Engine Ready</h3>
        <p className="text-xs text-[#536477] max-w-lg mx-auto mt-1">
          Historical normalization formulas, multi-year comparison views, and contextual regression
          engines will be connected in Phase 1 & 2.
        </p>
      </Card>
    </div>
  );
};
