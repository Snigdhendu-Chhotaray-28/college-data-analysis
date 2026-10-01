/**
 * ECO PILLARS HUB - Type Definitions
 * Tagline: AI-Powered Campus Resource Intelligence & Anomaly Detection Platform
 */

export type Department =
  | 'Admission'
  | 'Electricity'
  | 'Water'
  | 'Finance'
  | 'Wi-Fi'
  | 'Food'
  | 'Environment';

export type DepartmentId =
  | 'admission'
  | 'electricity'
  | 'water'
  | 'finance'
  | 'wifi'
  | 'food'
  | 'environment';

export type StatusLevel = 'optimal' | 'warning' | 'critical' | 'info' | 'normal';
export type SeverityLevel = 'info' | 'warning' | 'critical' | 'normal';

// 1. Student / Admission Record
export interface StudentRecord {
  id: string;
  month: string;
  year: number;
  totalStudents: number;
  hostelResidents: number;
  dayScholarCount: number;
  newAdmissions: number;
  facultyCount: number;
  campusId?: string;
  createdAt?: string;
}

// 2. Electricity Record
export interface ElectricityRecord {
  id: string;
  month: string;
  year: number;
  totalKwh: number;
  solarKwh: number;
  gridKwh: number;
  costInr: number;
  peakDemandKw: number;
  departmentId?: string;
  campusId?: string;
  createdAt?: string;
}

// 3. Water Record
export interface WaterRecord {
  id: string;
  month: string;
  year: number;
  totalLiters: number;
  recycledLiters: number;
  rainwaterLiters: number;
  costInr: number;
  hostelConsumptionL: number;
  campusId?: string;
  createdAt?: string;
}

// 4. Wi-Fi / IT Record
export interface WifiRecord {
  id: string;
  month: string;
  year: number;
  totalDataGb: number;
  peakConnectedDevices: number;
  avgBandwidthMbps: number;
  downtimeHours: number;
  campusId?: string;
  createdAt?: string;
}

// 5. Food / Mess Record
export interface FoodRecord {
  id: string;
  month: string;
  year: number;
  mealsServed: number;
  rawMaterialCostInr: number;
  wasteGeneratedKg: number;
  compostYieldKg: number;
  campusId?: string;
  createdAt?: string;
}

// 6. Finance Record
export interface FinanceRecord {
  id: string;
  month: string;
  year: number;
  totalUtilitySpendInr: number;
  electricitySpendInr: number;
  waterSpendInr: number;
  foodMessSpendInr: number;
  itWifiSpendInr: number;
  budgetVariancePct: number;
  campusId?: string;
  createdAt?: string;
}

// 7. Environment Record
export interface EnvironmentRecord {
  id: string;
  month: string;
  year: number;
  avgAqi: number;
  avgTempCelsius: number;
  totalRainfallMm: number;
  avgHumidityPct: number;
  co2Ppm: number;
  pm25?: number;
  campusId?: string;
  createdAt?: string;
}

export interface EnvironmentalTelemetry {
  id: string;
  month: string;
  year: number;
  avgTempCelsius: number;
  minTempCelsius: number;
  maxTempCelsius: number;
  avgHumidityPct: number;
  minHumidityPct: number;
  maxHumidityPct: number;
  avgAqi: number;
  minAqi: number;
  maxAqi: number;
  avgPm25: number;
  minPm25: number;
  maxPm25: number;
  prevYearAvgTemp: number;
  prevYearAvgHumidity: number;
  prevYearAvgAqi: number;
  prevYearAvgPm25: number;
  historicalAvgTemp: number;
  historicalAvgHumidity: number;
  historicalAvgAqi: number;
  historicalAvgPm25: number;
}

export interface EnvironmentalCorrelationPair {
  month: string;
  temperature: number;
  humidity: number;
  aqi: number;
  pm25: number;
  electricityKwh: number;
  waterLiters: number;
}

export type SeasonType = 'Summer' | 'Monsoon' | 'Winter';

export interface SeasonConfig {
  season: SeasonType;
  startMonth: string;
  endMonth: string;
  startMonthIndex: number;
  endMonthIndex: number;
  avgTempCelsius?: number;
}

// 8. Academic Calendar Record
export interface AcademicCalendarRecord {
  id: string;
  date?: string;
  month: string;
  year: number;
  eventType: 'Exam' | 'Vacation' | 'Fest' | 'Regular Class' | 'Admission Drive' | 'Holiday';
  semester?: 'Odd Semester' | 'Even Semester' | 'Summer Term';
  academicEvent?: string;
  eventTitle?: string;
  activeDays: number;
  expectedCampusPopulationPct: number;
  isHoliday?: boolean;
  isExamDay?: boolean;
  isWorkingDay?: boolean;
  campusId?: string;
}

export interface ContextualAnalysisCandidate {
  id: string;
  department: string;
  metric: string;
  unit: string;
  currentMonth: string;
  currentYear: number;
  currentValue: number;
  prevYear1Value: number;
  prevYear2Value: number;
  prevYear3Value: number;
  percentChangeVsPrevYear: number;
  studentPopCurrent: number;
  studentPopPrevYear: number;
  studentPopChangePct: number;
  avgTempCelsius: number;
  prevYearTempCelsius: number;
  tempChangeCelsius: number;
  humidityPct: number;
  season: SeasonType;
  academicContext: {
    isHoliday: boolean;
    isExamDay: boolean;
    isWorkingDay: boolean;
    eventType: string;
    semester: string;
    academicEvent: string;
    workingDays: number;
  };
  similarHistoricalIncreaseInPrevYears: boolean;
  evidenceBulletPoints: string[];
  contextualConclusion: string;
  isAutomaticallyClassifiedAsAnomaly: boolean;
}

// 9. Monthly Metric
export interface MonthlyMetric {
  month: string;
  year: number;
  currentValue: number;
  previousYearValue: number;
  studentNormalizedValue?: number;
  variancePercentage: number;
  status: StatusLevel;
}

// 10. Yearly Comparison
export interface YearlyComparison {
  metricName: string;
  currentYearValue: number;
  prevYear1Value: number;
  prevYear2Value?: number;
  prevYear3Value?: number;
  unit: string;
  changeVsPrevYearPct: number;
  isAnomaly: boolean;
}

// 11. Resource Analysis
export interface ResourceAnalysis {
  department: Department;
  metric: string;
  currentValue: number;
  expectedBaseline: number;
  variancePct: number;
  status: StatusLevel;
  primaryCause: string;
  unit?: string;
  historicalTrend?: 'increasing' | 'decreasing' | 'stable';
}

// 12. Anomaly
export type AnomalyClassification = 'NORMAL' | 'WATCH' | 'ANOMALY' | 'CRITICAL';

export interface DeterministicAnomalyMetrics {
  currentValue: number;
  historicalAverage: number;
  historicalMinimum: number;
  historicalMaximum: number;
  historicalVariation: number;
  previousYearValue: number;
  studentNormalizedValue: number;
}

export interface AnomalySignalsScore {
  yoyDeviationScore: number;
  historicalDeviationScore: number;
  studentNormalizedScore: number;
  seasonalDeviationScore: number;
  calendarContextScore: number;
  environmentCorrelationScore: number;
  compositeScore: number;
}

export interface AnomalyExplanation {
  anomalyType: string;
  severity: AnomalyClassification;
  resource: string;
  date: string;
  currentValue: number;
  expectedValue: number;
  deviationPercent: number;
  unit: string;
  historicalEvidence: string;
  studentEvidence: string;
  calendarEvidence: string;
  environmentEvidence: string;
  recommendation: string;
  fullEvidenceText: string;
}

export interface Anomaly {
  id: string;
  department: Department;
  title: string;
  description: string;
  severity: SeverityLevel;
  detectedDate: string;
  variancePercentage: number;
  explainedByAI: boolean;
  explanationSummary?: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  explanationObject?: AnomalyExplanation;
}

// 13. Alert
export type AlertSeverity = 'NORMAL' | 'INFO' | 'WARNING' | 'ANOMALY' | 'CRITICAL';
export type AlertStatus = 'Unresolved' | 'Acknowledged' | 'Resolved';

export interface AdminAlert {
  id: string;
  resource: string;
  date: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  evidence: string;
  status: AlertStatus;
  createdAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  currentValue: number;
  expectedValue: number;
  previousYearValue: number;
  unit: string;
  historicalComparison: string;
  threeYearPattern: string;
  studentNormalizedMetric: string;
  calendarContext: string;
  environmentalContext: string;
  compositeAnomalyScore: number;
}

export interface Alert {
  id: string;
  department: Department;
  title: string;
  message: string;
  severity: SeverityLevel;
  timestamp: string;
  acknowledged: boolean;
  variancePercentage?: number;
  resourceType?: string;
  adminAlertRef?: AdminAlert;
}

// 14. Upload Record
export interface UploadRecord {
  id: string;
  department: Department;
  fileName: string;
  fileSizeKb: number;
  academicYear: string;
  month: string;
  uploadedBy: string;
  uploadedAt: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  status: 'Completed' | 'Completed with Warnings' | 'Failed';
  storagePath?: string;
}

export interface ColumnMappingConfig {
  targetField: string;
  label: string;
  required: boolean;
  type: 'string' | 'number' | 'date';
  excelColumn: string;
}

export interface ValidationErrorItem {
  row: number;
  field: string;
  value: any;
  message: string;
}

export interface ExcelValidationResult {
  totalRows: number;
  validRowsCount: number;
  invalidRowsCount: number;
  errors: ValidationErrorItem[];
  duplicateCount: number;
  normalizedData: Record<string, any>[];
  rawHeaders: string[];
}

export interface ImportHistoryRecord {
  importId: string;
  department: DepartmentId;
  fileName: string;
  fileSizeKb: number;
  academicYear: string;
  month: string;
  uploadedBy: string;
  uploadTime: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  status: 'Completed' | 'Completed with Warnings' | 'Failed';
  storagePath?: string;
  deterministicHash: string;
}

// 15. Data Quality Types
export type DataQualityState = 'COMPLETE' | 'PARTIAL' | 'INSUFFICIENT_DATA';

export type DataQualityCheckType =
  | 'MISSING_DATE'
  | 'DUPLICATE_ROW'
  | 'INVALID_NUMBER'
  | 'NEGATIVE_CONSUMPTION'
  | 'MISSING_STUDENT_COUNT'
  | 'MISSING_UNIT'
  | 'INVALID_EXCEL_COLUMN'
  | 'UNEXPECTED_VALUE'
  | 'DUPLICATE_UPLOAD';

export interface DataQualityIssue {
  id: string;
  checkType: DataQualityCheckType;
  department: string;
  fileName?: string;
  rowNumber?: number;
  fieldName?: string;
  invalidValue?: any;
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  detectedAt: string;
}

export interface MetricQualityStatus {
  metricName: string;
  resource: string;
  status: DataQualityState;
  dataSufficiencyNote?: string;
  canGenerateConfidentAnomaly: boolean;
  historicalYearsAvailable: number;
}

export interface DepartmentDataQualityReport {
  department: string;
  status: DataQualityState;
  recordsProcessed: number;
  recordsAccepted: number;
  recordsRejected: number;
  missingValuesCount: number;
  duplicateRecordsCount: number;
  yearsAvailableCount: number;
  hasThreeYearsData: boolean;
  sufficiencyNote: string;
  issues: DataQualityIssue[];
}

export interface DataQualitySummary {
  recordsProcessed: number;
  recordsAccepted: number;
  recordsRejected: number;
  missingValuesCount: number;
  duplicateRecordsCount: number;
  overallStatus: DataQualityState;
  departmentReports: DepartmentDataQualityReport[];
  metricStatuses: MetricQualityStatus[];
  issues: DataQualityIssue[];
}

// 16. User and Security Types
export type UserRole = 'ADMIN' | 'ANALYST' | 'VIEWER';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  campusId: string;
}

export interface SecurityAuditResult {
  ruleName: string;
  role: UserRole;
  action: 'READ' | 'WRITE' | 'DELETE' | 'ACKNOWLEDGE_ALERT' | 'UPLOAD';
  resource: string;
  allowed: boolean;
  reason: string;
}
