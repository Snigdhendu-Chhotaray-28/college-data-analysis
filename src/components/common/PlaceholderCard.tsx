import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowRight, Layers, Cpu, Database, Sparkles } from 'lucide-react';

export interface PlaceholderCardProps {
  moduleName: string;
  moduleCode: string;
  description: string;
  plannedFeatures: string[];
  pillarColor?: string;
  icon?: React.ReactNode;
}

export const PlaceholderCard: React.FC<PlaceholderCardProps> = ({
  moduleName,
  moduleCode,
  description,
  plannedFeatures,
  pillarColor = '#16A085',
  icon,
}) => {
  return (
    <Card className="relative overflow-hidden border-dashed border-[#D6E1DE] bg-white/80">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#F4F7F6]">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-2xl text-white shadow-md"
            style={{ backgroundColor: pillarColor }}
          >
            {icon || <Layers className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#10213A]">{moduleName}</h3>
              <Badge variant="info">{moduleCode}</Badge>
            </div>
            <p className="text-xs text-[#536477] mt-0.5">{description}</p>
          </div>
        </div>

        <Badge variant="neutral" dot>
          Phase 0 Foundation Ready
        </Badge>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8A9AAB]">
          Phase 1 & 2 Planned Implementation Features
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {plannedFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE]/60 text-xs font-semibold text-[#10213A]"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#16A085] shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Backend Integration Badge strip */}
      <div className="mt-5 pt-4 border-t border-[#F4F7F6] flex flex-wrap items-center justify-between text-[11px] text-[#8A9AAB] gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-[#314B80]" /> IoT Sensor Stream
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#16A085]" /> Firebase Firestore
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C92F80]" /> Gemini AI Advisor
          </span>
        </div>
        <span className="font-mono text-[#536477]">Data Model & Service Abstraction Active</span>
      </div>
    </Card>
  );
};
