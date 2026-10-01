import React from 'react';
import type { StatusLevel } from '../../types';

export interface StatusIndicatorProps {
  status: StatusLevel;
  label?: string;
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
}) => {
  const getColors = () => {
    switch (status) {
      case 'optimal':
      case 'normal':
        return { dot: 'bg-[#16A085]', pulse: 'bg-[#16A085]/40', text: 'text-[#16A085]' };
      case 'warning':
        return { dot: 'bg-[#F0A202]', pulse: 'bg-[#F0A202]/40', text: 'text-[#F0A202]' };
      case 'critical':
        return { dot: 'bg-[#D64550]', pulse: 'bg-[#D64550]/40', text: 'text-[#D64550]' };
      case 'info':
      default:
        return { dot: 'bg-[#314B80]', pulse: 'bg-[#314B80]/40', text: 'text-[#314B80]' };
    }
  };

  const colors = getColors();

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative flex items-center justify-center w-2.5 h-2.5">
        {pulse && (
          <span
            className={`absolute inline-flex w-full h-full rounded-full animate-ping opacity-75 ${colors.pulse}`}
          />
        )}
        <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${colors.dot}`} />
      </div>
      {label && <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>{label}</span>}
    </div>
  );
};
