import React from 'react';
import { Card } from './Card';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  height?: number;
  children: React.ReactNode;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  action,
  icon,
  height = 260,
  children,
  className = '',
}) => {
  return (
    <Card className={className} padding="md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F4F7F6]">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="p-2 rounded-lg bg-[#E8F5F1] text-[#16A085] shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-[#10213A] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#536477] mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div style={{ width: '100%', height }}>
        {children}
      </div>
    </Card>
  );
};
