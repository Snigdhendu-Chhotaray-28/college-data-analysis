import React from 'react';
import { Card } from '../ui/Card';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  action,
  children,
}) => {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D6E1DE]/60">
        <div>
          <h3 className="text-sm font-bold text-[#10213A]">{title}</h3>
          {subtitle && <p className="text-xs text-[#536477]">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 w-full min-h-[220px]">{children}</div>
    </Card>
  );
};
