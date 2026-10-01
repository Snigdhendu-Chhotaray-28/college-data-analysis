/**
 * ECO PILLARS HUB - THREE-YEAR HISTORICAL ANALYSIS SERVICE (PHASE 6)
 * Calculates multi-year historical comparison baselines across 1-3 years
 * for Electricity, Water, Wi-Fi, Food, Finance, and Environment.
 */

export type ResourceCategory = 'Electricity' | 'Water' | 'Wi-Fi' | 'Food' | 'Finance' | 'Environment';

export interface MonthlyHistoricalPoint {
  month: string;
  year2023: number;
  year2024: number;
  year2025: number;
  year2026: number;
}

export interface ResourceHistoricalSummary {
  resource: ResourceCategory;
  metricLabel: string;
  unit: string;
  currentMonthName: string;
  currentYear: number;
  currentValue: number;
  prevYear1Value: number; // Y-1
  prevYear2Value: number; // Y-2
  prevYear3Value: number; // Y-3
  yearOverYearChangePct: number; // YoY change %
  threeYearAverage: number;
  historicalMinimum: number;
  historicalMaximum: number;
  historicalAverage: number;
  monthlyTrend: MonthlyHistoricalPoint[];
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Seed realistic multi-year historical telemetry for 12 months x 4 years
const generateResourceMonthlyTrend = (
  resource: ResourceCategory
): MonthlyHistoricalPoint[] => {
  const baseMap: Record<ResourceCategory, { base2023: number; growthRate: number; variance: number }> = {
    Electricity: { base2023: 215000, growthRate: 1.08, variance: 15000 },
    Water: { base2023: 8400000, growthRate: 1.07, variance: 500000 },
    'Wi-Fi': { base2023: 26000, growthRate: 1.22, variance: 2500 },
    Food: { base2023: 2450000, growthRate: 1.06, variance: 120000 },
    Finance: { base2023: 4600000, growthRate: 1.09, variance: 200000 },
    Environment: { base2023: 42, growthRate: 1.02, variance: 6 } // AQI index
  };

  const { base2023, growthRate, variance } = baseMap[resource];

  // Seasonal multipliers for months (Jan to Dec)
  const seasonalFactors = [0.92, 0.98, 1.12, 1.18, 1.25, 0.85, 0.80, 0.88, 1.05, 1.10, 1.04, 0.95];

  return MONTH_NAMES.map((month, idx) => {
    const factor = seasonalFactors[idx];
    const noise = (idx % 3 === 0 ? 1 : idx % 2 === 0 ? -0.5 : 0.2) * (variance * 0.3);

    const val2023 = Math.round((base2023 * factor) + noise);
    const val2024 = Math.round((val2023 * growthRate) + (noise * 0.5));
    const val2025 = Math.round((val2024 * growthRate) + (noise * 0.8));
    const val2026 = Math.round((val2025 * growthRate) + noise);

    return {
      month,
      year2023: val2023,
      year2024: val2024,
      year2025: val2025,
      year2026: val2026,
    };
  });
};

export const getResourceHistoricalSummary = (
  resource: ResourceCategory,
  selectedMonthName: string = 'August'
): ResourceHistoricalSummary => {
  const monthlyTrend = generateResourceMonthlyTrend(resource);
  const targetMonth = monthlyTrend.find((m) => m.month.toLowerCase() === selectedMonthName.toLowerCase()) || monthlyTrend[7]; // August default (index 7)

  const unitMap: Record<ResourceCategory, { label: string; unit: string }> = {
    Electricity: { label: 'Electricity Consumption', unit: 'kWh' },
    Water: { label: 'Water Consumption', unit: 'Liters' },
    'Wi-Fi': { label: 'Wi-Fi Data Traffic', unit: 'GB' },
    Food: { label: 'Food & Mess Expenditure', unit: '₹' },
    Finance: { label: 'Total Utility Spend', unit: '₹' },
    Environment: { label: 'Air Quality Index (AQI)', unit: 'AQI' },
  };

  const currentValue = targetMonth.year2026;
  const prevYear1Value = targetMonth.year2025; // Y-1 (September 2025)
  const prevYear2Value = targetMonth.year2024; // Y-2 (September 2024)
  const prevYear3Value = targetMonth.year2023; // Y-3 (September 2023)

  const yearOverYearChangePct = Number(
    ((((currentValue - prevYear1Value) / prevYear1Value) * 100)).toFixed(1)
  );

  const threeYearAverage = Math.round(
    (prevYear1Value + prevYear2Value + prevYear3Value) / 3
  );

  const valuesArray = [currentValue, prevYear1Value, prevYear2Value, prevYear3Value];
  const historicalMinimum = Math.min(...valuesArray);
  const historicalMaximum = Math.max(...valuesArray);
  const historicalAverage = Math.round(
    valuesArray.reduce((acc, curr) => acc + curr, 0) / valuesArray.length
  );

  return {
    resource,
    metricLabel: unitMap[resource].label,
    unit: unitMap[resource].unit,
    currentMonthName: targetMonth.month,
    currentYear: 2026,
    currentValue,
    prevYear1Value,
    prevYear2Value,
    prevYear3Value,
    yearOverYearChangePct,
    threeYearAverage,
    historicalMinimum,
    historicalMaximum,
    historicalAverage,
    monthlyTrend,
  };
};

export const getAllResourcesHistoricalSummary = (
  selectedMonthName: string = 'August'
): ResourceHistoricalSummary[] => {
  const resources: ResourceCategory[] = [
    'Electricity',
    'Water',
    'Wi-Fi',
    'Food',
    'Finance',
    'Environment',
  ];
  return resources.map((r) => getResourceHistoricalSummary(r, selectedMonthName));
};
