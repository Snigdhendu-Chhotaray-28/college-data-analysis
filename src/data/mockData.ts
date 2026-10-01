/**
 * ECO PILLARS HUB - DEMO MOCK DATASET
 * Multi-department campus resource & operational baseline
 */

import type {
  StudentRecord,
  ElectricityRecord,
  WaterRecord,
  WifiRecord,
  FoodRecord,
  FinanceRecord,
  EnvironmentRecord,
  AcademicCalendarRecord,
  YearlyComparison,
  ResourceAnalysis,
  Anomaly,
  Alert
} from '../types';

export const MOCK_STUDENTS: StudentRecord[] = [
  { id: 'std-2025-01', month: 'January', year: 2025, totalStudents: 4800, hostelResidents: 3200, dayScholarCount: 1600, newAdmissions: 0, facultyCount: 320 },
  { id: 'std-2025-02', month: 'February', year: 2025, totalStudents: 4850, hostelResidents: 3220, dayScholarCount: 1630, newAdmissions: 50, facultyCount: 322 },
  { id: 'std-2025-03', month: 'March', year: 2025, totalStudents: 4850, hostelResidents: 3210, dayScholarCount: 1640, newAdmissions: 0, facultyCount: 325 },
  { id: 'std-2025-04', month: 'April', year: 2025, totalStudents: 4860, hostelResidents: 3215, dayScholarCount: 1645, newAdmissions: 10, facultyCount: 325 },
  { id: 'std-2025-05', month: 'May', year: 2025, totalStudents: 4860, hostelResidents: 3200, dayScholarCount: 1660, newAdmissions: 0, facultyCount: 325 },
  { id: 'std-2025-06', month: 'June', year: 2025, totalStudents: 4700, hostelResidents: 3000, dayScholarCount: 1700, newAdmissions: 0, facultyCount: 325 },
  { id: 'std-2025-07', month: 'July', year: 2025, totalStudents: 4950, hostelResidents: 3300, dayScholarCount: 1650, newAdmissions: 250, facultyCount: 330 },
  { id: 'std-2025-08', month: 'August', year: 2025, totalStudents: 4980, hostelResidents: 3320, dayScholarCount: 1660, newAdmissions: 30, facultyCount: 332 },
  { id: 'std-2025-09', month: 'September', year: 2025, totalStudents: 4980, hostelResidents: 3315, dayScholarCount: 1665, newAdmissions: 0, facultyCount: 332 },
  { id: 'std-2025-10', month: 'October', year: 2025, totalStudents: 4990, hostelResidents: 3325, dayScholarCount: 1665, newAdmissions: 10, facultyCount: 335 },
  { id: 'std-2025-11', month: 'November', year: 2025, totalStudents: 4990, hostelResidents: 3325, dayScholarCount: 1665, newAdmissions: 0, facultyCount: 335 },
  { id: 'std-2025-12', month: 'December', year: 2025, totalStudents: 4990, hostelResidents: 3325, dayScholarCount: 1665, newAdmissions: 0, facultyCount: 335 },
];

export const MOCK_ELECTRICITY: ElectricityRecord[] = [
  { id: 'elec-01', month: 'January', year: 2025, totalKwh: 245000, solarKwh: 82000, gridKwh: 163000, costInr: 2082500, peakDemandKw: 185.5 },
  { id: 'elec-02', month: 'February', year: 2025, totalKwh: 268000, solarKwh: 91000, gridKwh: 177000, costInr: 2278000, peakDemandKw: 198.0 },
  { id: 'elec-03', month: 'March', year: 2025, totalKwh: 310000, solarKwh: 105000, gridKwh: 205000, costInr: 2635000, peakDemandKw: 225.0 },
  { id: 'elec-04', month: 'April', year: 2025, totalKwh: 335000, solarKwh: 115000, gridKwh: 220000, costInr: 2847500, peakDemandKw: 240.0 },
  { id: 'elec-05', month: 'May', year: 2025, totalKwh: 360000, solarKwh: 125000, gridKwh: 235000, costInr: 3060000, peakDemandKw: 260.0 },
  { id: 'elec-06', month: 'June', year: 2025, totalKwh: 280000, solarKwh: 95000, gridKwh: 185000, costInr: 2380000, peakDemandKw: 210.0 },
  { id: 'elec-07', month: 'July', year: 2025, totalKwh: 265000, solarKwh: 85000, gridKwh: 180000, costInr: 2252500, peakDemandKw: 195.0 },
  { id: 'elec-08', month: 'August', year: 2025, totalKwh: 295000, solarKwh: 90000, gridKwh: 205000, costInr: 2507500, peakDemandKw: 215.0 },
  { id: 'elec-09', month: 'September', year: 2025, totalKwh: 320000, solarKwh: 100000, gridKwh: 220000, costInr: 2720000, peakDemandKw: 230.0 },
  { id: 'elec-10', month: 'October', year: 2025, totalKwh: 340000, solarKwh: 110000, gridKwh: 230000, costInr: 2890000, peakDemandKw: 245.0 },
  { id: 'elec-11', month: 'November', year: 2025, totalKwh: 315000, solarKwh: 100000, gridKwh: 215000, costInr: 2677500, peakDemandKw: 225.0 },
  { id: 'elec-12', month: 'December', year: 2025, totalKwh: 275000, solarKwh: 88000, gridKwh: 187000, costInr: 2337500, peakDemandKw: 190.0 },
];

export const MOCK_WATER: WaterRecord[] = [
  { id: 'wat-01', month: 'January', year: 2025, totalLiters: 9800000, recycledLiters: 2350000, rainwaterLiters: 120000, costInr: 441000, hostelConsumptionL: 6800000 },
  { id: 'wat-02', month: 'February', year: 2025, totalLiters: 10400000, recycledLiters: 2480000, rainwaterLiters: 80000, costInr: 468000, hostelConsumptionL: 7200000 },
  { id: 'wat-03', month: 'March', year: 2025, totalLiters: 11200000, recycledLiters: 2650000, rainwaterLiters: 40000, costInr: 504000, hostelConsumptionL: 7900000 },
  { id: 'wat-04', month: 'April', year: 2025, totalLiters: 11800000, recycledLiters: 2750000, rainwaterLiters: 20000, costInr: 531000, hostelConsumptionL: 8300000 },
  { id: 'wat-05', month: 'May', year: 2025, totalLiters: 12500000, recycledLiters: 2900000, rainwaterLiters: 10000, costInr: 562500, hostelConsumptionL: 8800000 },
  { id: 'wat-06', month: 'June', year: 2025, totalLiters: 8900000, recycledLiters: 2100000, rainwaterLiters: 150000, costInr: 400500, hostelConsumptionL: 6100000 },
  { id: 'wat-07', month: 'July', year: 2025, totalLiters: 9500000, recycledLiters: 2200000, rainwaterLiters: 350000, costInr: 427500, hostelConsumptionL: 6600000 },
  { id: 'wat-08', month: 'August', year: 2025, totalLiters: 10200000, recycledLiters: 2400000, rainwaterLiters: 420000, costInr: 459000, hostelConsumptionL: 7100000 },
  { id: 'wat-09', month: 'September', year: 2025, totalLiters: 10800000, recycledLiters: 2550000, rainwaterLiters: 280000, costInr: 486000, hostelConsumptionL: 7500000 },
  { id: 'wat-10', month: 'October', year: 2025, totalLiters: 11400000, recycledLiters: 2700000, rainwaterLiters: 90000, costInr: 513000, hostelConsumptionL: 8000000 },
  { id: 'wat-11', month: 'November', year: 2025, totalLiters: 10600000, recycledLiters: 2500000, rainwaterLiters: 40000, costInr: 477000, hostelConsumptionL: 7400000 },
  { id: 'wat-12', month: 'December', year: 2025, totalLiters: 9900000, recycledLiters: 2300000, rainwaterLiters: 80000, costInr: 445500, hostelConsumptionL: 6900000 },
];

export const MOCK_WIFI: WifiRecord[] = [
  { id: 'wifi-01', month: 'January', year: 2025, totalDataGb: 42000, peakConnectedDevices: 3800, avgBandwidthMbps: 450, downtimeHours: 1.2 },
  { id: 'wifi-02', month: 'February', year: 2025, totalDataGb: 48500, peakConnectedDevices: 4100, avgBandwidthMbps: 480, downtimeHours: 0.8 },
  { id: 'wifi-03', month: 'March', year: 2025, totalDataGb: 54000, peakConnectedDevices: 4450, avgBandwidthMbps: 510, downtimeHours: 2.1 },
  { id: 'wifi-04', month: 'April', year: 2025, totalDataGb: 56000, peakConnectedDevices: 4550, avgBandwidthMbps: 520, downtimeHours: 1.5 },
  { id: 'wifi-05', month: 'May', year: 2025, totalDataGb: 59000, peakConnectedDevices: 4680, avgBandwidthMbps: 540, downtimeHours: 1.1 },
  { id: 'wifi-06', month: 'June', year: 2025, totalDataGb: 35000, peakConnectedDevices: 2800, avgBandwidthMbps: 420, downtimeHours: 0.5 },
  { id: 'wifi-07', month: 'July', year: 2025, totalDataGb: 44000, peakConnectedDevices: 3900, avgBandwidthMbps: 460, downtimeHours: 1.8 },
  { id: 'wifi-08', month: 'August', year: 2025, totalDataGb: 51000, peakConnectedDevices: 4300, avgBandwidthMbps: 495, downtimeHours: 1.0 },
  { id: 'wifi-09', month: 'September', year: 2025, totalDataGb: 57500, peakConnectedDevices: 4600, avgBandwidthMbps: 530, downtimeHours: 1.4 },
  { id: 'wifi-10', month: 'October', year: 2025, totalDataGb: 61000, peakConnectedDevices: 4800, avgBandwidthMbps: 560, downtimeHours: 0.9 },
  { id: 'wifi-11', month: 'November', year: 2025, totalDataGb: 58000, peakConnectedDevices: 4650, avgBandwidthMbps: 535, downtimeHours: 1.2 },
  { id: 'wifi-12', month: 'December', year: 2025, totalDataGb: 46000, peakConnectedDevices: 4000, avgBandwidthMbps: 470, downtimeHours: 0.7 },
];

export const MOCK_FOOD: FoodRecord[] = [
  { id: 'food-01', month: 'January', year: 2025, mealsServed: 135000, rawMaterialCostInr: 2835000, wasteGeneratedKg: 14200, compostYieldKg: 8500 },
  { id: 'food-02', month: 'February', year: 2025, mealsServed: 142000, rawMaterialCostInr: 2982000, wasteGeneratedKg: 15100, compostYieldKg: 9200 },
  { id: 'food-03', month: 'March', year: 2025, mealsServed: 148000, rawMaterialCostInr: 3108000, wasteGeneratedKg: 16400, compostYieldKg: 9900 },
  { id: 'food-04', month: 'April', year: 2025, mealsServed: 151000, rawMaterialCostInr: 3171000, wasteGeneratedKg: 16800, compostYieldKg: 10200 },
  { id: 'food-05', month: 'May', year: 2025, mealsServed: 155000, rawMaterialCostInr: 3255000, wasteGeneratedKg: 17200, compostYieldKg: 10500 },
  { id: 'food-06', month: 'June', year: 2025, mealsServed: 98000, rawMaterialCostInr: 2058000, wasteGeneratedKg: 10500, compostYieldKg: 6400 },
  { id: 'food-07', month: 'July', year: 2025, mealsServed: 132000, rawMaterialCostInr: 2772000, wasteGeneratedKg: 13800, compostYieldKg: 8400 },
  { id: 'food-08', month: 'August', year: 2025, mealsServed: 146000, rawMaterialCostInr: 3066000, wasteGeneratedKg: 15800, compostYieldKg: 9600 },
  { id: 'food-09', month: 'September', year: 2025, mealsServed: 153000, rawMaterialCostInr: 3213000, wasteGeneratedKg: 16900, compostYieldKg: 10300 },
  { id: 'food-10', month: 'October', year: 2025, mealsServed: 158000, rawMaterialCostInr: 3318000, wasteGeneratedKg: 17500, compostYieldKg: 10700 },
  { id: 'food-11', month: 'November', year: 2025, mealsServed: 150000, rawMaterialCostInr: 3150000, wasteGeneratedKg: 16500, compostYieldKg: 10000 },
  { id: 'food-12', month: 'December', year: 2025, mealsServed: 138000, rawMaterialCostInr: 2898000, wasteGeneratedKg: 14600, compostYieldKg: 8900 },
];

export const MOCK_FINANCE: FinanceRecord[] = [
  { id: 'fin-01', month: 'January', year: 2025, totalUtilitySpendInr: 5358500, electricitySpendInr: 2082500, waterSpendInr: 441000, foodMessSpendInr: 2835000, itWifiSpendInr: 345000, budgetVariancePct: 2.1 },
  { id: 'fin-02', month: 'February', year: 2025, totalUtilitySpendInr: 5728000, electricitySpendInr: 2278000, waterSpendInr: 468000, foodMessSpendInr: 2982000, itWifiSpendInr: 350000, budgetVariancePct: 4.8 },
  { id: 'fin-03', month: 'March', year: 2025, totalUtilitySpendInr: 6247000, electricitySpendInr: 2635000, waterSpendInr: 504000, foodMessSpendInr: 3108000, itWifiSpendInr: 360000, budgetVariancePct: 9.2 },
  { id: 'fin-04', month: 'April', year: 2025, totalUtilitySpendInr: 6549500, electricitySpendInr: 2847500, waterSpendInr: 531000, foodMessSpendInr: 3171000, itWifiSpendInr: 370000, budgetVariancePct: 6.4 },
  { id: 'fin-05', month: 'May', year: 2025, totalUtilitySpendInr: 6877500, electricitySpendInr: 3060000, waterSpendInr: 562500, foodMessSpendInr: 3255000, itWifiSpendInr: 380000, budgetVariancePct: 8.1 },
  { id: 'fin-06', month: 'June', year: 2025, totalUtilitySpendInr: 4838500, electricitySpendInr: 2380000, waterSpendInr: 400500, foodMessSpendInr: 2058000, itWifiSpendInr: 310000, budgetVariancePct: -3.2 },
  { id: 'fin-07', month: 'July', year: 2025, totalUtilitySpendInr: 5454500, electricitySpendInr: 2252500, waterSpendInr: 427500, foodMessSpendInr: 2772000, itWifiSpendInr: 330000, budgetVariancePct: 1.5 },
  { id: 'fin-08', month: 'August', year: 2025, totalUtilitySpendInr: 6032500, electricitySpendInr: 2507500, waterSpendInr: 459000, foodMessSpendInr: 3066000, itWifiSpendInr: 360000, budgetVariancePct: 3.8 },
  { id: 'fin-09', month: 'September', year: 2025, totalUtilitySpendInr: 6419000, electricitySpendInr: 2720000, waterSpendInr: 486000, foodMessSpendInr: 3213000, itWifiSpendInr: 380000, budgetVariancePct: 5.7 },
  { id: 'fin-10', month: 'October', year: 2025, totalUtilitySpendInr: 6721000, electricitySpendInr: 2890000, waterSpendInr: 513000, foodMessSpendInr: 3318000, itWifiSpendInr: 400000, budgetVariancePct: 7.3 },
  { id: 'fin-11', month: 'November', year: 2025, totalUtilitySpendInr: 6304500, electricitySpendInr: 2677500, waterSpendInr: 477000, foodMessSpendInr: 3150000, itWifiSpendInr: 380000, budgetVariancePct: 4.5 },
  { id: 'fin-12', month: 'December', year: 2025, totalUtilitySpendInr: 5681000, electricitySpendInr: 2337500, waterSpendInr: 445500, foodMessSpendInr: 2898000, itWifiSpendInr: 350000, budgetVariancePct: 1.8 },
];

export const MOCK_ENVIRONMENT: EnvironmentRecord[] = [
  { id: 'env-01', month: 'January', year: 2025, avgAqi: 48, avgTempCelsius: 18.5, totalRainfallMm: 12.4, avgHumidityPct: 52, co2Ppm: 980 },
  { id: 'env-02', month: 'February', year: 2025, avgAqi: 42, avgTempCelsius: 22.1, totalRainfallMm: 8.0, avgHumidityPct: 48, co2Ppm: 1020 },
  { id: 'env-03', month: 'March', year: 2025, avgAqi: 38, avgTempCelsius: 28.4, totalRainfallMm: 2.5, avgHumidityPct: 41, co2Ppm: 1080 },
  { id: 'env-04', month: 'April', year: 2025, avgAqi: 45, avgTempCelsius: 34.2, totalRainfallMm: 5.0, avgHumidityPct: 38, co2Ppm: 1120 },
  { id: 'env-05', month: 'May', year: 2025, avgAqi: 52, avgTempCelsius: 38.6, totalRainfallMm: 15.0, avgHumidityPct: 44, co2Ppm: 1150 },
  { id: 'env-06', month: 'June', year: 2025, avgAqi: 35, avgTempCelsius: 33.5, totalRainfallMm: 180.0, avgHumidityPct: 75, co2Ppm: 940 },
  { id: 'env-07', month: 'July', year: 2025, avgAqi: 28, avgTempCelsius: 30.2, totalRainfallMm: 310.0, avgHumidityPct: 84, co2Ppm: 910 },
  { id: 'env-08', month: 'August', year: 2025, avgAqi: 30, avgTempCelsius: 29.8, totalRainfallMm: 290.0, avgHumidityPct: 82, co2Ppm: 920 },
  { id: 'env-09', month: 'September', year: 2025, avgAqi: 34, avgTempCelsius: 31.0, totalRainfallMm: 160.0, avgHumidityPct: 78, co2Ppm: 960 },
  { id: 'env-10', month: 'October', year: 2025, avgAqi: 44, avgTempCelsius: 28.5, totalRainfallMm: 45.0, avgHumidityPct: 62, co2Ppm: 1010 },
  { id: 'env-11', month: 'November', year: 2025, avgAqi: 55, avgTempCelsius: 23.0, totalRainfallMm: 10.0, avgHumidityPct: 56, co2Ppm: 1050 },
  { id: 'env-12', month: 'December', year: 2025, avgAqi: 62, avgTempCelsius: 19.2, totalRainfallMm: 4.0, avgHumidityPct: 54, co2Ppm: 1090 },
];

export const MOCK_CALENDAR: AcademicCalendarRecord[] = [
  { id: 'cal-01', month: 'January', year: 2025, eventTitle: 'Spring Semester Commencement', eventType: 'Regular Class', activeDays: 22, expectedCampusPopulationPct: 95, isHoliday: false, isExamDay: false, isWorkingDay: true, semester: 'Even Semester', academicEvent: 'Spring Semester Commencement' },
  { id: 'cal-02', month: 'February', year: 2025, eventTitle: 'Annual Cultural & Tech Fest', eventType: 'Fest', activeDays: 4, expectedCampusPopulationPct: 120, isHoliday: false, isExamDay: false, isWorkingDay: true, semester: 'Even Semester', academicEvent: 'Annual Cultural & Tech Fest' },
  { id: 'cal-03', month: 'March', year: 2025, eventTitle: 'Mid-Semester Examinations', eventType: 'Exam', activeDays: 7, expectedCampusPopulationPct: 100, isHoliday: false, isExamDay: true, isWorkingDay: true, semester: 'Even Semester', academicEvent: 'Mid-Semester Examinations' },
];

export const MOCK_YEARLY_COMPARISONS: YearlyComparison[] = [
  { metricName: 'Electricity Consumption', currentYearValue: 310000, prevYear1Value: 265000, prevYear2Value: 240000, prevYear3Value: 225000, unit: 'kWh', changeVsPrevYearPct: 16.9, isAnomaly: true },
  { metricName: 'Water Consumption', currentYearValue: 11200000, prevYear1Value: 9800000, prevYear2Value: 9200000, prevYear3Value: 8800000, unit: 'L', changeVsPrevYearPct: 14.2, isAnomaly: true },
  { metricName: 'Wi-Fi Data Traffic', currentYearValue: 54000, prevYear1Value: 41000, prevYear2Value: 32000, prevYear3Value: 24000, unit: 'GB', changeVsPrevYearPct: 31.7, isAnomaly: false },
  { metricName: 'Mess Food Waste', currentYearValue: 16400, prevYear1Value: 15200, prevYear2Value: 14800, prevYear3Value: 14000, unit: 'kg', changeVsPrevYearPct: 7.8, isAnomaly: false },
];

export const MOCK_ANALYSIS: ResourceAnalysis[] = [
  { department: 'Electricity', metric: 'Peak Load Variance', currentValue: 310000, expectedBaseline: 265000, variancePct: 16.9, status: 'warning', primaryCause: 'Engineering Labs HVAC running continuously during Tech Fest weekend.' },
  { department: 'Water', metric: 'Hostel Flow Discrepancy', currentValue: 11200000, expectedBaseline: 9800000, variancePct: 14.2, status: 'critical', primaryCause: 'Sub-surface pipe leak in Boys Hostel B05 main supply line.' },
  { department: 'Wi-Fi', metric: 'Bandwidth Spike', currentValue: 54000, expectedBaseline: 41000, variancePct: 31.7, status: 'optimal', primaryCause: 'Increase in online examination submission and project streaming.' },
];

export const MOCK_ANOMALIES: Anomaly[] = [
  {
    id: 'anom-01',
    department: 'Electricity',
    title: 'Engineering Labs 45% Overnight Load Surge',
    description: 'Chiller unit A014 operated continuously overnight during low occupancy.',
    severity: 'critical',
    detectedDate: 'March 14, 2025',
    variancePercentage: 45.0,
    explainedByAI: true,
    explanationSummary: 'Overnight lab equipment operation coincided with Tech Fest setup without automated setback.',
    status: 'Open'
  },
  {
    id: 'anom-02',
    department: 'Water',
    title: 'Boys Hostel 60% Flow Rate Variance',
    description: 'Daily water intake surged by 60% for 4 consecutive days.',
    severity: 'critical',
    detectedDate: 'March 18, 2025',
    variancePercentage: 60.0,
    explainedByAI: true,
    explanationSummary: 'High probability of sub-surface main supply pipe crack in Sector South.',
    status: 'Under Investigation'
  },
  {
    id: 'anom-03',
    department: 'Finance',
    title: 'March Utility Budget 9.2% Overrun',
    description: 'Total utility expenditure reached ₹62.47 Lakhs against ₹57.20 Lakhs baseline.',
    severity: 'warning',
    detectedDate: 'March 31, 2025',
    variancePercentage: 9.2,
    explainedByAI: true,
    explanationSummary: 'Driven by electricity tariff peak and unplanned water tanker imports during repair.',
    status: 'Open'
  }
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'alt-01', department: 'Electricity', title: 'HVAC Chiller Load Warning', message: 'Engineering Labs chiller consuming 45% above expected baseline.', severity: 'critical', timestamp: '12 mins ago', acknowledged: false },
  { id: 'alt-02', department: 'Water', title: 'Boys Hostel Supply Pipe Leak', message: 'Water flow meter WM-05 registered continuous non-zero overnight flow.', severity: 'critical', timestamp: '45 mins ago', acknowledged: true },
  { id: 'alt-03', department: 'Finance', title: 'Utility Expenditure Alert', message: 'March utility spend exceeded allocated monthly budget by 9.2%.', severity: 'warning', timestamp: '2 hours ago', acknowledged: false },
];
