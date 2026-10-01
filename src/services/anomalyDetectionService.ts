/**
 * ECO PILLARS HUB - DETERMINISTIC ANOMALY DETECTION ENGINE (PHASE 8)
 * Calculates resource anomaly scores using multi-signal telemetry (YoY deviation,
 * historical Z-score, student-normalized deviation, seasonal deviation, calendar context,
 * and environmental correlation).
 * Classifies items into NORMAL, WATCH, ANOMALY, CRITICAL with structured evidence objects.
 */

import type {
  AnomalyClassification,
  DeterministicAnomalyMetrics,
  AnomalySignalsScore,
  AnomalyExplanation,
  DataQualityState
} from '../types';
import { getResourceHistoricalSummary, type ResourceCategory } from './historicalAnalysisService';
import { generateContextualAnalysis } from './contextualAnalysisService';
import { dataQualityService } from './dataQualityService';

export interface EvaluatedAnomalyRecord {
  id: string;
  resource: ResourceCategory;
  metricLabel: string;
  unit: string;
  date: string;
  metrics: DeterministicAnomalyMetrics;
  signals: AnomalySignalsScore;
  classification: AnomalyClassification;
  explanation: AnomalyExplanation;
  dataQualityState: DataQualityState;
  sufficiencyNote: string;
  canGenerateConfidentAnomaly: boolean;
}

export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length === 0) return 0;
  const mean = values.reduce((acc, curr) => acc + curr, 0) / values.length;
  const variance = values.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
};

export const evaluateResourceAnomaly = (
  resource: ResourceCategory,
  selectedMonth: string = 'August'
): EvaluatedAnomalyRecord => {
  const historical = getResourceHistoricalSummary(resource, selectedMonth);
  const contextual = generateContextualAnalysis(selectedMonth).find(
    (c) => c.department.toLowerCase().includes(resource.toLowerCase())
  ) || generateContextualAnalysis(selectedMonth)[0];

  const currentValue = historical.currentValue;
  const previousYearValue = historical.prevYear1Value;
  const historicalAverage = historical.historicalAverage;
  const historicalMinimum = historical.historicalMinimum;
  const historicalMaximum = historical.historicalMaximum;

  const historicalVariation = calculateStandardDeviation([historical.prevYear1Value, historical.prevYear2Value, historical.prevYear3Value]);

  const students = contextual.studentPopCurrent || 4850;
  const studentNormalizedValue = Number((currentValue / students).toFixed(2));

  // Signal 1: Year-Over-Year Deviation Score (0 - 100)
  const yoyPct = Math.abs(historical.yearOverYearChangePct);
  const yoyDeviationScore = Math.min(100, Math.round(yoyPct * 2.5));

  // Signal 2: Historical Deviation (Z-score based, 0 - 100)
  const zScore = historicalVariation > 0 ? (currentValue - historicalAverage) / historicalVariation : 0;
  const historicalDeviationScore = Math.min(100, Math.round(Math.max(0, zScore) * 30));

  // Signal 3: Student-Normalized Deviation (Usage Growth % minus Student Growth %)
  const normalizedDiff = Math.max(0, historical.yearOverYearChangePct - contextual.studentPopChangePct);
  const studentNormalizedScore = Math.min(100, Math.round(normalizedDiff * 3.0));

  // Signal 4: Seasonal Deviation Score
  // Higher deviation during off-season or outside typical seasonal range increases score
  const isHighEnergyMonth = selectedMonth === 'May' || selectedMonth === 'June';
  const seasonalDeviationScore = resource === 'Electricity' && isHighEnergyMonth ? Math.max(0, yoyDeviationScore - 20) : yoyDeviationScore;

  // Signal 5: Calendar Context Score
  // High usage on normal working days (without exams or fests) boosts anomaly suspicion
  const isExamOrFest = contextual.academicContext.isExamDay || contextual.academicContext.eventType === 'Fest';
  const calendarContextScore = isExamOrFest ? Math.max(10, yoyDeviationScore - 30) : Math.min(100, yoyDeviationScore + 15);

  // Signal 6: Environmental Correlation Score
  // High temperature increase explains electricity HVAC, whereas high usage without temp rise increases anomaly score
  const tempRise = contextual.tempChangeCelsius;
  const environmentCorrelationScore = (resource === 'Electricity' || resource === 'Water') && tempRise > 2.0
    ? Math.max(10, yoyDeviationScore - 25)
    : Math.min(100, yoyDeviationScore + 10);

  // Multi-Signal Composite Anomaly Score (Weighted Calculation)
  const compositeScore = Math.round(
    yoyDeviationScore * 0.25 +
    historicalDeviationScore * 0.25 +
    studentNormalizedScore * 0.20 +
    seasonalDeviationScore * 0.10 +
    calendarContextScore * 0.10 +
    environmentCorrelationScore * 0.10
  );

  // Deterministic Classification Mapping
  let classification: AnomalyClassification = 'NORMAL';
  if (compositeScore >= 75) {
    classification = 'CRITICAL';
  } else if (compositeScore >= 50) {
    classification = 'ANOMALY';
  } else if (compositeScore >= 25) {
    classification = 'WATCH';
  } else {
    classification = 'NORMAL';
  }

  // Construct Evidence-Based Explanations (Strictly no invented causes)
  const usageGrowthApprox = Math.round(historical.yearOverYearChangePct);
  const studentGrowthApprox = Math.round(contextual.studentPopChangePct);
  const expectedValue = historicalAverage;
  const deviationPercent = usageGrowthApprox;

  const historicalEvidence = `${resource} consumption in ${selectedMonth} ${historical.currentYear} reached ${currentValue.toLocaleString()} ${historical.unit}, which is ${usageGrowthApprox >= 0 ? `+${usageGrowthApprox}%` : `${usageGrowthApprox}%`} compared to ${previousYearValue.toLocaleString()} ${historical.unit} in ${selectedMonth} ${historical.currentYear - 1}. 3-year historical average baseline is ${historicalAverage.toLocaleString()} ${historical.unit}.`;

  const studentEvidence = `Student population grew ${studentGrowthApprox}% (from ${contextual.studentPopPrevYear.toLocaleString()} to ${contextual.studentPopCurrent.toLocaleString()} students). Per-student consumption is ${studentNormalizedValue} ${historical.unit}/student.`;

  const calendarEvidence = isExamOrFest
    ? `Calendar event active: ${contextual.academicContext.academicEvent} (${contextual.academicContext.eventType}) with 100% expected campus density.`
    : `Academic Calendar indicates a normal working day (${contextual.academicContext.workingDays} active days) with no examination or major fest scheduled.`;

  const environmentEvidence = `Average temperature was ${contextual.avgTempCelsius}°C (${contextual.tempChangeCelsius >= 0 ? `+${contextual.tempChangeCelsius}°C` : `${contextual.tempChangeCelsius}°C`} vs prior year) during ${contextual.season} season.`;

  // Actionable Evidence-Based Recommendation
  let recommendation = 'No action required. Telemetry remains within expected operational parameters.';
  if (classification === 'CRITICAL' || classification === 'ANOMALY') {
    recommendation = `Investigate unusual ${resource.toLowerCase()} activity or physical line infrastructure. ${usageGrowthApprox}% usage increase is substantially above student growth (${studentGrowthApprox}%) and baseline ${selectedMonth} patterns.`;
  } else if (classification === 'WATCH') {
    recommendation = `Monitor ${resource.toLowerCase()} consumption trends closely. Usage growth (${usageGrowthApprox}%) slightly exceeds student population growth (${studentGrowthApprox}%).`;
  }

  // Phase 13 Data Quality & Historical Baseline Sufficiency Evaluation
  const yearsAvailable = resource === 'Environment' ? 2 : 4; // Environment has only 2 years available in baseline
  const qualityEval = dataQualityService.evaluateMetricSufficiency(resource, yearsAvailable);

  const finalClassification = qualityEval.canGenerateConfidentAnomaly ? classification : 'WATCH';
  const sufficiencyNote = qualityEval.sufficiencyNote;

  // Verbatim Evidence Paragraph matching exact user prompt style
  const fullEvidenceText = qualityEval.canGenerateConfidentAnomaly
    ? `${resource} consumption increased approximately ${usageGrowthApprox}% while student population increased approximately ${studentGrowthApprox}%. The usage is ${compositeScore >= 50 ? 'substantially above' : 'aligned with'} historical ${selectedMonth} baselines and is ${isExamOrFest ? 'associated with an active campus event' : 'not associated with an examination period'}. ${recommendation}`
    : `${resource} historical comparison limited because three years of data are not available. ${recommendation}`;

  return {
    id: `anom-det-${resource.toLowerCase()}-${selectedMonth.toLowerCase()}`,
    resource,
    metricLabel: historical.metricLabel,
    unit: historical.unit,
    date: `${selectedMonth} ${historical.currentYear}`,
    metrics: {
      currentValue,
      historicalAverage,
      historicalMinimum,
      historicalMaximum,
      historicalVariation,
      previousYearValue,
      studentNormalizedValue,
    },
    signals: {
      yoyDeviationScore,
      historicalDeviationScore,
      studentNormalizedScore,
      seasonalDeviationScore,
      calendarContextScore,
      environmentCorrelationScore,
      compositeScore,
    },
    classification: finalClassification,
    dataQualityState: qualityEval.status,
    sufficiencyNote,
    canGenerateConfidentAnomaly: qualityEval.canGenerateConfidentAnomaly,
    explanation: {
      anomalyType: `${resource} Operational Discrepancy`,
      severity: finalClassification,
      resource,
      date: `${selectedMonth} ${historical.currentYear}`,
      currentValue,
      expectedValue,
      deviationPercent,
      unit: historical.unit,
      historicalEvidence: qualityEval.canGenerateConfidentAnomaly ? historicalEvidence : `Historical comparison limited because three years of data are not available.`,
      studentEvidence,
      calendarEvidence,
      environmentEvidence,
      recommendation,
      fullEvidenceText,
    }
  };
};

export const evaluateAllResourceAnomalies = (
  selectedMonth: string = 'August'
): EvaluatedAnomalyRecord[] => {
  const resources: ResourceCategory[] = [
    'Wi-Fi',
    'Water',
    'Electricity',
    'Food',
    'Finance',
    'Environment'
  ];
  return resources.map((r) => evaluateResourceAnomaly(r, selectedMonth));
};
