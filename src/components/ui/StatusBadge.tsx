import React from 'react';
import type { StatusLevel } from '../../types';

export interface StatusBadgeProps {
  status: StatusLevel;
  label?: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  pulse = true,
}) => {
  const getColors = () => {
    switch (status) {
      case 'optimal':
      case 'normal':
        return { dot: 'bg-[#16A085]', pulse: 'bg-[#16A085]/40', text: 'text-[#16A085]', bg: 'bg-[#E8F5F1]' };
      case 'warning':
        return { dot: 'bg-[#F0A202]', pulse: 'bg-[#F0A202]/40', text: 'text-[#F0A202]', bg: 'bg-amber-50' };
      case 'critical':
        return { dot: 'bg-[#D64550]', pulse: 'bg-[#D64550]/40', text: 'text-[#D64550]', bg: 'bg-rose-50' };
      case 'info':
      default:
        return { dot: 'bg-[#314B80]', pulse: 'bg-[#314B80]/40', text: 'text-[#314B80]', bg: 'bg-blue-50' };
    }
  };

  const colors = getColors();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
      <span className="relative flex h-2 w-2">
        {pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors.pulse}`} />}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`} />
      </span>
      <span>{label || status.toUpperCase()}</span>
    </span>
  );
};
