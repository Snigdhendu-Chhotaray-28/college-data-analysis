import React from 'react';
import { Card } from './Card';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export interface DataTableProps<T> {
  title?: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
}

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <Card padding="none" className="overflow-hidden">
      {(title || subtitle) && (
        <div className="p-5 border-b border-[#F4F7F6]">
          {title && <h3 className="text-base font-bold text-[#10213A]">{title}</h3>}
          {subtitle && <p className="text-xs text-[#536477] mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#10213A]">
          <thead className="bg-[#F4F7F6] border-b border-[#D6E1DE] text-[#8A9AAB] uppercase font-bold text-[10px]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`p-3.5 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F7F6]">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-[#F4F7F6]/50 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className={`p-3.5 ${col.className || ''}`}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
