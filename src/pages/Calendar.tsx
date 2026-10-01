import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, Clock, CheckCircle, Info } from 'lucide-react';

const mockCalendarEvents = [
  {
    month: 'October 2026',
    eventType: 'Mid-Semester Examinations',
    type: 'Exam',
    activeDays: 24,
    expectedOccupancy: '98%',
    status: 'High Load Phase',
    notes: 'Late-night library and computing labs operating at 24/7 capacity.',
  },
  {
    month: 'November 2026',
    eventType: 'Annual Tech & Cultural Fest',
    type: 'Fest',
    activeDays: 22,
    expectedOccupancy: '105%',
    status: 'Surge Load Phase',
    notes: 'External visitors expected. High power & food consumption expected.',
  },
  {
    month: 'December 2026',
    eventType: 'Semester End Break & Winter Vacation',
    type: 'Vacation',
    activeDays: 10,
    expectedOccupancy: '20%',
    status: 'Low Baseline Phase',
    notes: 'Hostels largely vacant except for research scholars.',
  },
];

export const Calendar: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Academic Calendar & Campus Schedule"
        tagline="Incorporate active working days, exams, fests and vacation schedules into anomaly normalization"
        badgeText="Operational Baseline"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card hoverEffect>
          <div className="flex items-center gap-2 text-xs font-bold text-[#10213A] mb-2">
            <CalendarIcon className="w-4 h-4 text-[#16A085]" />
            <span>Current Term Context</span>
          </div>
          <h3 className="text-lg font-bold text-[#10213A]">Odd Semester (Autumn 2026)</h3>
          <p className="text-xs text-[#536477] mt-1">
            24 Active Instruction & Exam Days in current evaluation cycle.
          </p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center gap-2 text-xs font-bold text-[#10213A] mb-2">
            <Clock className="w-4 h-4 text-[#16A085]" />
            <span>Expected Campus Occupancy</span>
          </div>
          <h3 className="text-lg font-bold text-[#10213A]">98% Full Operational Load</h3>
          <p className="text-xs text-[#536477] mt-1">
            All hostel blocks, mess facilities & lab centers fully active.
          </p>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center gap-2 text-xs font-bold text-[#10213A] mb-2">
            <Info className="w-4 h-4 text-[#16A085]" />
            <span>Anomaly Suppression Rule</span>
          </div>
          <h3 className="text-lg font-bold text-[#10213A]">Exam Week Dynamic Tolerance</h3>
          <p className="text-xs text-[#536477] mt-1">
            +10% baseline tolerance automatically applied during active examination windows.
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#10213A]">Upcoming Academic Milestones</h3>
        {mockCalendarEvents.map((event, idx) => (
          <Card key={idx} hoverEffect className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#16A085] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#10213A]">{event.month}</span>
                  <Badge status="optimal">{event.type}</Badge>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {event.expectedOccupancy} Expected Occupancy
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#10213A]">{event.eventType}</h4>
                <p className="text-xs text-[#536477] mt-0.5">{event.notes}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-[#16A085] bg-[#E8F5F1] px-2.5 py-1 rounded-lg">
                {event.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
