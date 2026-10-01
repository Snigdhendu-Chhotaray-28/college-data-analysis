import React from 'react';
import { Card } from '../ui/Card';
import { UploadCloud, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const UploadPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="text-center py-12 border-dashed border-2 border-[#D6E1DE] hover:border-[#16A085] transition-colors bg-white">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E8F5F1] text-[#16A085] flex items-center justify-center">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#10213A] mb-1">
          Drop Monthly Department Excel Files
        </h3>
        <p className="text-xs text-[#536477] max-w-md mx-auto mb-6">
          Support for standard monthly consumption reports (.xlsx, .xls, .csv).
          Data will be validated, normalized, and stored in Supabase PostgreSQL.
        </p>
        <Button variant="primary" icon={<FileSpreadsheet className="w-4 h-4" />}>
          Browse File to Upload (Phase 1)
        </Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: '1. Validation', desc: 'Automatic header matching & row type validation' },
          { title: '2. Normalization', desc: 'Calculates per-student metrics & academic calendar weights' },
          { title: '3. Supabase Sync', desc: 'Batch persistence in PostgreSQL database' },
        ].map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white border border-[#D6E1DE] flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#16A085] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#10213A]">{step.title}</h4>
              <p className="text-[11px] text-[#536477] mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
