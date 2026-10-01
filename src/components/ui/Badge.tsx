import React from 'react';
import type { StatusLevel, SeverityLevel } from '../../types';

export interface BadgeProps {
  status?: StatusLevel | SeverityLevel | string;
  variant?: string;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'info',
  variant,
  dot = false,
  children,
  className = '',
}) => {
  const activeType = variant || status;

  const styles: Record<string, string> = {
    optimal: 'bg-[#E8F5F1] text-[#16A085] border-[#16A085]/30',
    normal: 'bg-[#E8F5F1] text-[#16A085] border-[#16A085]/30',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-red-50 text-[#D64550] border-red-200',
    success: 'bg-[#E8F5F1] text-[#16A085] border-[#16A085]/30',
    danger: 'bg-red-50 text-[#D64550] border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const selectedStyle = styles[activeType] || styles.info;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${selectedStyle} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            activeType === 'critical' || activeType === 'danger'
              ? 'bg-[#D64550]'
              : activeType === 'warning'
              ? 'bg-[#F0A202]'
              : 'bg-[#16A085]'
          }`}
        />
      )}
      {children}
    </span>
  );
};
