import React from 'react';
import { Card } from './Card';
import { Layers } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
}) => {
  return (
    <Card className="border-dashed border-[#D6E1DE] bg-white/80" padding="lg">
      <div className="flex flex-col items-center justify-center text-center py-8 space-y-3">
        <div className="p-3.5 rounded-2xl bg-[#E8F5F1] text-[#16A085]">
          {icon || <Layers className="w-8 h-8" />}
        </div>
        <h3 className="text-base font-bold text-[#10213A]">{title}</h3>
        <p className="text-xs text-[#536477] max-w-md">{description}</p>
        {action && <div className="pt-2">{action}</div>}
      </div>
    </Card>
  );
};
