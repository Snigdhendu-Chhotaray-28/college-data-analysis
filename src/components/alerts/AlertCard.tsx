import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import type { Alert } from '../../types';

export interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge }) => {
  return (
    <Card hoverEffect className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F0A202] flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-[#10213A]">{alert.department}</span>
            <Badge status={alert.severity}>{alert.severity.toUpperCase()}</Badge>
            {alert.variancePercentage && (
              <span className="text-[11px] font-bold text-[#D64550] bg-red-50 px-1.5 py-0.5 rounded">
                +{alert.variancePercentage}% Deviation
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-[#10213A]">{alert.title}</h4>
          <p className="text-xs text-[#536477] mt-0.5">{alert.message}</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
            <Clock className="w-3 h-3" />
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {!alert.acknowledged && onAcknowledge && (
          <button
            type="button"
            onClick={() => onAcknowledge(alert.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#E8F5F1] text-[#16A085] hover:bg-[#d5eee6] transition-colors cursor-pointer"
          >
            Acknowledge
          </button>
        )}
        <button
          type="button"
          className="text-xs font-medium text-[#536477] hover:text-[#10213A] flex items-center gap-0.5 cursor-pointer"
        >
          Details <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
