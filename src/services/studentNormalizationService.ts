/**
 * ECO PILLARS HUB - STUDENT NORMALIZATION ENGINE (PHASE 5)
 * Calculates per-student normalized costs, consumption, multi-period growth rates,
 * and objective non-judgmental normalization variance assessments.
 */

import {
  MOCK_STUDENTS,
  MOCK_ELECTRICITY,
  MOCK_WATER,
  MOCK_WIFI,
  MOCK_FOOD,
  MOCK_FINANCE
} from '../data/mockData';

export interface MonthlyNormalizedMetric {
  month: string;
  year: number;
  students: number;
  // Costs
  electricityCost: number;
  waterCost: number;
  wifiCost: number;
  foodCost: number;
  financeCost: number;
  totalResourceCost: number;

  // Per Student Costs (INR)
  electricityCostPerStudent: number;
  waterCostPerStudent: number;
  wifiCostPerStudent: number;
  foodCostPerStudent: number;
  totalResourceCostPerStudent: number;

  // Per Student Consumption (Where data exists)
  electricityKwh: number;
  electricityConsumptionPerStudent: number; // kWh/student
  waterLiters: number;
  waterConsumptionPerStudent: number; // Liters/student
  wifiDataGb: number;
  wifiDataPerStudent: number; // GB/student
  foodWasteKg: number;
  foodConsumptionPerStudent: number; // kg waste/student
}

export type GrowthAssessment = 'Below student growth' | 'Similar to student growth' | 'Above student growth';

export interface NormalizedGrowthComparison {
  metricKey: string;
  metricLabel: string;
  unit: string;
  currentValue: number;
  previousYearValue: number;
  resourceGrowthPercent: number;
  studentGrowthPercent: number;
  normalizedDifferencePctPoints: number; // resourceGrowthPercent - studentGrowthPercent
  assessment: GrowthAssessment;
  category: 'Cost' | 'Consumption';
}

export const getGrowthAssessment = (normalizedDiff: number): GrowthAssessment => {
  if (normalizedDiff < -1.0) {
    return 'Below student growth';
  } else if (normalizedDiff >= -1.0 && normalizedDiff <= 1.0) {
    return 'Similar to student growth';
  } else {
    return 'Above student growth';
  }
};

export const getMonthlyNormalizedData = (): MonthlyNormalizedMetric[] => {
  return MOCK_STUDENTS.map((std, idx) => {
    const elec = MOCK_ELECTRICITY[idx] || MOCK_ELECTRICITY[0];
    const wat = MOCK_WATER[idx] || MOCK_WATER[0];
    const wifi = MOCK_WIFI[idx] || MOCK_WIFI[0];
    const food = MOCK_FOOD[idx] || MOCK_FOOD[0];
    const fin = MOCK_FINANCE[idx] || MOCK_FINANCE[0];

    const students = std.totalStudents || 1;
    const electricityCost = elec.costInr;
    const waterCost = wat.costInr;
    const wifiCost = fin.itWifiSpendInr || 350000;
    const foodCost = food.rawMaterialCostInr;
    const financeCost = fin.totalUtilitySpendInr - (electricityCost + waterCost + wifiCost + foodCost);

    const totalResourceCost = electricityCost + waterCost + wifiCost + foodCost + (financeCost > 0 ? financeCost : 0);

    return {
      month: std.month,
      year: std.year,
      students,
      electricityCost,
      waterCost,
      wifiCost,
      foodCost,
      financeCost: Math.max(0, financeCost),
      totalResourceCost,

      // Per student cost calculations
      electricityCostPerStudent: Number((electricityCost / students).toFixed(2)),
      waterCostPerStudent: Number((waterCost / students).toFixed(2)),
      wifiCostPerStudent: Number((wifiCost / students).toFixed(2)),
      foodCostPerStudent: Number((foodCost / students).toFixed(2)),
      totalResourceCostPerStudent: Number((totalResourceCost / students).toFixed(2)),

      // Per student consumption calculations
      electricityKwh: elec.totalKwh,
      electricityConsumptionPerStudent: Number((elec.totalKwh / students).toFixed(2)),
      waterLiters: wat.totalLiters,
      waterConsumptionPerStudent: Number((wat.totalLiters / students).toFixed(2)),
      wifiDataGb: wifi.totalDataGb,
      wifiDataPerStudent: Number((wifi.totalDataGb / students).toFixed(2)),
      foodWasteKg: food.wasteGeneratedKg,
      foodConsumptionPerStudent: Number((food.wasteGeneratedKg / students).toFixed(2)),
    };
  });
};

export const getNormalizedGrowthComparisons = (): NormalizedGrowthComparison[] => {
  // Baseline comparing March 2025 vs Previous Year March 2024 Baseline
  // Current Student Population: 4850, Prev Year Student Population: 4600 -> Student Growth = +5.43%
  const studentCurrent = 4850;
  const studentPrevYear = 4600;
  const studentGrowthPercent = Number((((studentCurrent - studentPrevYear) / studentPrevYear) * 100).toFixed(2));

  const metricsConfig = [
    {
      metricKey: 'electricityCost',
      metricLabel: 'Electricity Cost',
      unit: '₹',
      currentValue: 2635000,
      previousYearValue: 2270000,
      category: 'Cost' as const
    },
    {
      metricKey: 'waterCost',
      metricLabel: 'Water Cost',
      unit: '₹',
      currentValue: 504000,
      previousYearValue: 445000,
      category: 'Cost' as const
    },
    {
      metricKey: 'wifiCost',
      metricLabel: 'Wi-Fi / IT Cost',
      unit: '₹',
      currentValue: 360000,
      previousYearValue: 280000,
      category: 'Cost' as const
    },
    {
      metricKey: 'foodCost',
      metricLabel: 'Food & Mess Cost',
      unit: '₹',
      currentValue: 3108000,
      previousYearValue: 2850000,
      category: 'Cost' as const
    },
    {
      metricKey: 'totalResourceCost',
      metricLabel: 'Total Resource Cost',
      unit: '₹',
      currentValue: 6607000,
      previousYearValue: 5845000,
      category: 'Cost' as const
    },
    {
      metricKey: 'electricityConsumption',
      metricLabel: 'Electricity Consumption',
      unit: 'kWh',
      currentValue: 310000,
      previousYearValue: 265000,
      category: 'Consumption' as const
    },
    {
      metricKey: 'waterConsumption',
      metricLabel: 'Water Consumption',
      unit: 'Liters',
      currentValue: 11200000,
      previousYearValue: 9800000,
      category: 'Consumption' as const
    },
    {
      metricKey: 'wifiData',
      metricLabel: 'Wi-Fi Data Usage',
      unit: 'GB',
      currentValue: 54000,
      previousYearValue: 41000,
      category: 'Consumption' as const
    },
    {
      metricKey: 'foodWaste',
      metricLabel: 'Mess Food Waste',
      unit: 'kg',
      currentValue: 16400,
      previousYearValue: 15200,
      category: 'Consumption' as const
    }
  ];

  return metricsConfig.map((item) => {
    const resourceGrowthPercent = Number(
      ((((item.currentValue - item.previousYearValue) / item.previousYearValue) * 100)).toFixed(2)
    );
    const normalizedDifferencePctPoints = Number(
      (resourceGrowthPercent - studentGrowthPercent).toFixed(2)
    );
    const assessment = getGrowthAssessment(normalizedDifferencePctPoints);

    return {
      metricKey: item.metricKey,
      metricLabel: item.metricLabel,
      unit: item.unit,
      currentValue: item.currentValue,
      previousYearValue: item.previousYearValue,
      resourceGrowthPercent,
      studentGrowthPercent,
      normalizedDifferencePctPoints,
      assessment,
      category: item.category
    };
  });
};
