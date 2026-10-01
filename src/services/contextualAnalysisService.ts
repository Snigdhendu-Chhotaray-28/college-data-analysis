/**
 * ECO PILLARS HUB - CONTEXT-AWARE ANALYSIS ENGINE (PHASE 7)
 * Cross-references resource fluctuations with multi-year baselines, student population,
 * academic calendar events (exams, holidays, working days), and environmental seasons.
 * Generates objective contextual evidence without automatically labeling increases as anomalies.
 */

import type {
  SeasonType,
  SeasonConfig,
  AcademicCalendarRecord,
  ContextualAnalysisCandidate
} from '../types';

export const DEFAULT_SEASON_CONFIGS: SeasonConfig[] = [
  { season: 'Summer', startMonth: 'March', endMonth: 'June', startMonthIndex: 2, endMonthIndex: 5, avgTempCelsius: 32.5 },
  { season: 'Monsoon', startMonth: 'July', endMonth: 'October', startMonthIndex: 6, endMonthIndex: 9, avgTempCelsius: 27.0 },
  { season: 'Winter', startMonth: 'November', endMonth: 'February', startMonthIndex: 10, endMonthIndex: 1, avgTempCelsius: 18.0 },
];

export const MOCK_ACADEMIC_CALENDAR_ENRICHED: AcademicCalendarRecord[] = [
  { id: 'cal-01', month: 'January', year: 2026, isHoliday: false, isExamDay: false, isWorkingDay: true, eventType: 'Regular Class', semester: 'Even Semester', academicEvent: 'Spring Semester Commencement', activeDays: 22, expectedCampusPopulationPct: 95 },
  { id: 'cal-02', month: 'February', year: 2026, isHoliday: false, isExamDay: false, isWorkingDay: true, eventType: 'Fest', semester: 'Even Semester', academicEvent: 'Annual Cultural & Tech Fest Weekend', activeDays: 20, expectedCampusPopulationPct: 120 },
  { id: 'cal-03', month: 'March', year: 2026, isHoliday: false, isExamDay: true, isWorkingDay: true, eventType: 'Exam', semester: 'Even Semester', academicEvent: 'Mid-Semester Examinations', activeDays: 23, expectedCampusPopulationPct: 100 },
  { id: 'cal-04', month: 'April', year: 2026, isHoliday: false, isExamDay: false, isWorkingDay: true, eventType: 'Regular Class', semester: 'Even Semester', academicEvent: 'Regular Academic Sessions & Lab Projects', activeDays: 22, expectedCampusPopulationPct: 98 },
  { id: 'cal-05', month: 'May', year: 2026, isHoliday: false, isExamDay: true, isWorkingDay: true, eventType: 'Exam', semester: 'Even Semester', academicEvent: 'End-Semester Final Examinations', activeDays: 20, expectedCampusPopulationPct: 100 },
  { id: 'cal-06', month: 'June', year: 2026, isHoliday: true, isExamDay: false, isWorkingDay: false, eventType: 'Vacation', semester: 'Summer Term', academicEvent: 'Summer Term & Maintenance Break', activeDays: 8, expectedCampusPopulationPct: 35 },
  { id: 'cal-07', month: 'July', year: 2026, isHoliday: false, isExamDay: false, isWorkingDay: true, eventType: 'Admission Drive', semester: 'Odd Semester', academicEvent: 'New Student Orientation & Admission Drive', activeDays: 22, expectedCampusPopulationPct: 85 },
  { id: 'cal-08', month: 'August', year: 2026, isHoliday: false, isExamDay: false, isWorkingDay: true, eventType: 'Regular Class', semester: 'Odd Semester', academicEvent: 'Fall Semester Course Launch', activeDays: 23, expectedCampusPopulationPct: 96 },
  { id: 'cal-09', month: 'September', year: 2026, isHoliday: false, isExamDay: true, isWorkingDay: true, eventType: 'Exam', semester: 'Odd Semester', academicEvent: 'Mid-Term Examinations & Project Reviews', activeDays: 22, expectedCampusPopulationPct: 100 },
  { id: 'cal-10', month: 'October', year: 2026, isHoliday: true, isExamDay: false, isWorkingDay: true, eventType: 'Fest', semester: 'Odd Semester', academicEvent: 'Diwali Break & Inter-College Sports Fest', activeDays: 18, expectedCampusPopulationPct: 80 },
  { id: 'cal-11', month: 'November', year: 2026, isHoliday: false, isExamDay: true, isWorkingDay: true, eventType: 'Exam', semester: 'Odd Semester', academicEvent: 'End-Semester Theory & Practical Exams', activeDays: 22, expectedCampusPopulationPct: 100 },
  { id: 'cal-12', month: 'December', year: 2026, isHoliday: true, isExamDay: false, isWorkingDay: false, eventType: 'Vacation', semester: 'Odd Semester', academicEvent: 'Winter Vacation & Institutional Recess', activeDays: 10, expectedCampusPopulationPct: 40 },
];

import { MONTH_NAMES } from './historicalAnalysisService';

export { MONTH_NAMES };

export const detectSeason = (monthName: string, _seasonConfigs: SeasonConfig[] = DEFAULT_SEASON_CONFIGS): SeasonType => {
  const monthMap: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  const idx = monthMap[monthName.toLowerCase()] ?? 8;

  if (idx >= 2 && idx <= 5) return 'Summer';
  if (idx >= 6 && idx <= 9) return 'Monsoon';
  return 'Winter';
};

export const generateContextualAnalysis = (
  monthName: string = 'August',
  customSeasonConfigs: SeasonConfig[] = DEFAULT_SEASON_CONFIGS
): ContextualAnalysisCandidate[] => {
  const calendarRecord = MOCK_ACADEMIC_CALENDAR_ENRICHED.find(
    (c) => c.month.toLowerCase() === monthName.toLowerCase()
  ) || MOCK_ACADEMIC_CALENDAR_ENRICHED[7];

  const season = detectSeason(monthName, customSeasonConfigs);

  // Pre-configured resource candidates for evaluation
  const candidatesRaw = [
    {
      id: 'ctx-water-01',
      department: 'Water',
      metric: 'Water Consumption',
      unit: 'Liters',
      currentValue: 11200000,
      prevYear1Value: 9800000,  // Y-1 (2025)
      prevYear2Value: 9200000,  // Y-2 (2024)
      prevYear3Value: 8800000,  // Y-3 (2023)
      studentPopCurrent: 4850,
      studentPopPrevYear: 4600,
      avgTempCelsius: 28.4,
      prevYearTempCelsius: 25.2,
      humidityPct: 48,
    },
    {
      id: 'ctx-elec-01',
      department: 'Electricity',
      metric: 'Electricity Consumption',
      unit: 'kWh',
      currentValue: 310000,
      prevYear1Value: 265000,
      prevYear2Value: 240000,
      prevYear3Value: 225000,
      studentPopCurrent: 4850,
      studentPopPrevYear: 4600,
      avgTempCelsius: 29.8,
      prevYearTempCelsius: 26.5,
      humidityPct: 52,
    },
    {
      id: 'ctx-wifi-01',
      department: 'Wi-Fi / IT',
      metric: 'Wi-Fi Data Usage',
      unit: 'GB',
      currentValue: 54000,
      prevYear1Value: 41000,
      prevYear2Value: 32000,
      prevYear3Value: 24000,
      studentPopCurrent: 4850,
      studentPopPrevYear: 4600,
      avgTempCelsius: 28.4,
      prevYearTempCelsius: 25.2,
      humidityPct: 48,
    },
    {
      id: 'ctx-food-01',
      department: 'Food / Mess',
      metric: 'Mess Food Expenditure',
      unit: '₹',
      currentValue: 3108000,
      prevYear1Value: 2850000,
      prevYear2Value: 2680000,
      prevYear3Value: 2500000,
      studentPopCurrent: 4850,
      studentPopPrevYear: 4600,
      avgTempCelsius: 28.4,
      prevYearTempCelsius: 25.2,
      humidityPct: 48,
    }
  ];

  return candidatesRaw.map((item) => {
    const percentChangeVsPrevYear = Number(
      ((((item.currentValue - item.prevYear1Value) / item.prevYear1Value) * 100)).toFixed(1)
    );
    const studentPopChangePct = Number(
      ((((item.studentPopCurrent - item.studentPopPrevYear) / item.studentPopPrevYear) * 100)).toFixed(1)
    );
    const tempChangeCelsius = Number((item.avgTempCelsius - item.prevYearTempCelsius).toFixed(1));

    // Check if multi-year increases were recorded in 2024 and 2025
    const similarHistoricalIncreaseInPrevYears =
      item.prevYear1Value > item.prevYear2Value && item.prevYear2Value > item.prevYear3Value;

    // Generate strict step-by-step contextual evidence as requested
    const evidenceBulletPoints: string[] = [
      `${item.metric} increased ${percentChangeVsPrevYear}% compared with the same month last year.`,
      `Student population increased ${studentPopChangePct}%.`,
      `Average temperature changed ${tempChangeCelsius >= 0 ? `+${tempChangeCelsius}°C` : `${tempChangeCelsius}°C`}.`,
      calendarRecord.isExamDay
        ? `Active exam period (${calendarRecord.academicEvent}) with 100% expected campus population.`
        : `Academic Status: ${calendarRecord.eventType} (${calendarRecord.academicEvent}) with ${calendarRecord.activeDays} working days.`,
      similarHistoricalIncreaseInPrevYears
        ? `Similar seasonal increases occurred in 2024 and 2025.`
        : `Baseline comparison across 2023-2025 indicates steady operational scaling.`
    ];

    const contextualConclusion = similarHistoricalIncreaseInPrevYears || tempChangeCelsius > 2.0
      ? `Historical pattern indicates this increase may be seasonally associated with ${season} conditions and academic schedule.`
      : `Operational scaling aligns with student growth (+${studentPopChangePct}%) and academic calendar activity.`;

    return {
      id: item.id,
      department: item.department,
      metric: item.metric,
      unit: item.unit,
      currentMonth: monthName,
      currentYear: 2026,
      currentValue: item.currentValue,
      prevYear1Value: item.prevYear1Value,
      prevYear2Value: item.prevYear2Value,
      prevYear3Value: item.prevYear3Value,
      percentChangeVsPrevYear,
      studentPopCurrent: item.studentPopCurrent,
      studentPopPrevYear: item.studentPopPrevYear,
      studentPopChangePct,
      avgTempCelsius: item.avgTempCelsius,
      prevYearTempCelsius: item.prevYearTempCelsius,
      tempChangeCelsius,
      humidityPct: item.humidityPct,
      season,
      academicContext: {
        isHoliday: Boolean(calendarRecord.isHoliday),
        isExamDay: Boolean(calendarRecord.isExamDay),
        isWorkingDay: Boolean(calendarRecord.isWorkingDay),
        eventType: calendarRecord.eventType || 'Regular Class',
        semester: calendarRecord.semester || 'Even Semester',
        academicEvent: calendarRecord.academicEvent || 'Regular Academic Activity',
        workingDays: calendarRecord.activeDays,
      },
      similarHistoricalIncreaseInPrevYears,
      evidenceBulletPoints,
      contextualConclusion,
      isAutomaticallyClassifiedAsAnomaly: false,
    };
  });
};
