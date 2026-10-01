/**
 * ECO PILLARS HUB - Resource Analysis & Historical Trends Service
 * Phase 0: Service abstraction placeholder
 */

import type { YearlyComparison, ResourceAnalysis } from '../../types';

export class AnalysisEngineService {
  calculateYearOverYearChange(current: number, previous: number): number {
    if (previous === 0) return 0;
    return Number((((current - previous) / previous) * 100).toFixed(2));
  }

  getPlaceholderComparisons(): YearlyComparison[] {
    return [
      {
        metricName: 'Electricity Total kWh',
        currentYearValue: 425000,
        prevYear1Value: 395000,
        prevYear2Value: 380000,
        unit: 'kWh',
        changeVsPrevYearPct: 7.59,
        isAnomaly: false,
      },
      {
        metricName: 'Water Consumption Liters',
        currentYearValue: 1250000,
        prevYear1Value: 1100000,
        prevYear2Value: 1050000,
        unit: 'Liters',
        changeVsPrevYearPct: 13.64,
        isAnomaly: true,
      },
    ];
  }

  getPlaceholderResourceAnalyses(): ResourceAnalysis[] {
    return [
      {
        department: 'Electricity',
        metric: 'Campus Grid Demand',
        currentValue: 425000,
        expectedBaseline: 390000,
        variancePct: 8.97,
        status: 'warning',
        primaryCause: 'Heatwave and increased lab operating hours',
        unit: 'kWh',
        historicalTrend: 'increasing',
      },
    ];
  }
}

export const analysisEngineService = new AnalysisEngineService();
