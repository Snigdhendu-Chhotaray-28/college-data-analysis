import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export interface SimpleBarChartProps {
  data: Array<{ name: string; current: number; previous?: number; [key: string]: any }>;
  currentLabel?: string;
  previousLabel?: string;
  unit?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  currentLabel = 'Current Year',
  previousLabel = 'Previous Year',
}) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D6E1DE" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#536477', fontSize: 11 }}
            axisLine={{ stroke: '#D6E1DE' }}
          />
          <YAxis
            tick={{ fill: '#536477', fontSize: 11 }}
            axisLine={{ stroke: '#D6E1DE' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0B1F3A',
              borderColor: '#142B4A',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '12px',
            }}
          />
          {previousLabel && (
            <Bar dataKey="previous" name={previousLabel} fill="#D6E1DE" radius={[4, 4, 0, 0]} />
          )}
          <Bar dataKey="current" name={currentLabel} fill="#16A085" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
