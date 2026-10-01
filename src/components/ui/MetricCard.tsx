import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  changePct?: number;
  comparisonLabel?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  status?: 'optimal' | 'warning' | 'critical' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  changePct,
  comparisonLabel = 'vs previous year',
  icon,
  subtitle,
}) => {
  const isPositive = changePct !== undefined && changePct > 0;
  const isNegative = changePct !== undefined && changePct < 0;
  const isZero = changePct !== undefined && changePct === 0;

  return (
    <Card hoverEffect className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#536477] uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl lg:text-3xl font-bold text-[#10213A] tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-semibold text-[#536477]">{unit}</span>}
          </div>
        </div>

        {icon && (
          <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#16A085] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      {changePct !== undefined && (
        <div className="mt-4 pt-3 border-t border-[#D6E1DE]/60 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded text-[11px] ${
              isPositive
                ? 'text-[#D64550] bg-red-50'
                : isNegative
                ? 'text-[#16A085] bg-[#E8F5F1]'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {isZero && <Minus className="w-3 h-3" />}
            {Math.abs(changePct)}%
          </span>
          <span className="text-[#536477] text-[11px]">{comparisonLabel}</span>
        </div>
      )}

      {subtitle && !changePct && (
        <p className="mt-3 text-xs text-[#536477]">{subtitle}</p>
      )}
    </Card>
  );
};
