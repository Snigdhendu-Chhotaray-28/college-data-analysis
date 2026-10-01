import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartCard } from '../components/charts/ChartCard';
import { SimpleBarChart } from '../components/charts/SimpleBarChart';
import { Users, Home, GraduationCap, Briefcase } from 'lucide-react';

const mockStudentData = [
  { name: 'May', current: 7800, previous: 7400 },
  { name: 'Jun', current: 2100, previous: 2000 },
  { name: 'Jul', current: 4500, previous: 4200 },
  { name: 'Aug', current: 8450, previous: 8050 },
  { name: 'Sep', current: 8450, previous: 8050 },
  { name: 'Oct', current: 8450, previous: 8050 },
];

export const Students: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Student Demographics & Admissions"
        tagline="Core campus denominator tracking: total enrolled, hostel residents & day scholars"
        badgeText="Core Denominator"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          title="Total Enrolled Students"
          value="8,450"
          unit="Students"
          changePct={5.0}
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Hostel Residents"
          value="5,240"
          unit="62% of campus"
          changePct={6.2}
          icon={<Home className="w-5 h-5" />}
        />
        <MetricCard
          title="Day Scholars"
          value="3,210"
          unit="38% of campus"
          changePct={3.1}
          icon={<GraduationCap className="w-5 h-5" />}
        />
        <MetricCard
          title="Faculty & Staff"
          value="680"
          unit="Members"
          changePct={2.8}
          icon={<Briefcase className="w-5 h-5" />}
        />
      </div>

      <ChartCard
        title="Campus Active Population Trend"
        subtitle="Tracking seasonal student presence across academic terms"
      >
        <SimpleBarChart data={mockStudentData} />
      </ChartCard>
    </div>
  );
};
