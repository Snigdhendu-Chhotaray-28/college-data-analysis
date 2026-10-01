import React from 'react';

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading Campus Resource Telemetry...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 space-y-3">
      <span className="w-8 h-8 rounded-full border-3 border-[#16A085] border-t-transparent animate-spin" />
      <span className="text-xs font-semibold text-[#16A085]">{message}</span>
    </div>
  );
};
