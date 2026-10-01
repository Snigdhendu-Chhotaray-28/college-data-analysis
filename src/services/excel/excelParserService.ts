import * as XLSX from 'xlsx';
import type {
  DepartmentId,
  ColumnMappingConfig,
  ExcelValidationResult,
  ValidationErrorItem,
  ImportHistoryRecord
} from '../../types';

// Standard Department Schemas
export const DEPARTMENT_SCHEMAS: Record<DepartmentId, { label: string; fields: Omit<ColumnMappingConfig, 'excelColumn'>[] }> = {
  admission: {
    label: 'Admission',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'studentId', label: 'Student ID / Student Count', required: true, type: 'string' },
      { targetField: 'program', label: 'Program', required: true, type: 'string' },
      { targetField: 'year', label: 'Year', required: true, type: 'number' },
      { targetField: 'status', label: 'Status', required: true, type: 'string' },
    ],
  },
  electricity: {
    label: 'Electricity',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'meterId', label: 'Meter ID', required: true, type: 'string' },
      { targetField: 'consumption', label: 'Consumption', required: true, type: 'number' },
      { targetField: 'unit', label: 'Unit (kWh/MWh)', required: true, type: 'string' },
      { targetField: 'cost', label: 'Cost (INR)', required: true, type: 'number' },
    ],
  },
  water: {
    label: 'Water',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'meterId', label: 'Meter ID', required: true, type: 'string' },
      { targetField: 'consumption', label: 'Consumption', required: true, type: 'number' },
      { targetField: 'unit', label: 'Unit (L/KL)', required: true, type: 'string' },
      { targetField: 'cost', label: 'Cost (INR)', required: true, type: 'number' },
    ],
  },
  finance: {
    label: 'Finance',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'category', label: 'Category', required: true, type: 'string' },
      { targetField: 'description', label: 'Description', required: true, type: 'string' },
      { targetField: 'cost', label: 'Cost (INR)', required: true, type: 'number' },
    ],
  },
  wifi: {
    label: 'Wi-Fi / IT',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'dataUsage', label: 'Data Usage', required: true, type: 'number' },
      { targetField: 'unit', label: 'Unit (GB/TB)', required: true, type: 'string' },
      { targetField: 'cost', label: 'Cost (INR)', required: true, type: 'number' },
    ],
  },
  food: {
    label: 'Food / Mess',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'mealCount', label: 'Meal Count', required: true, type: 'number' },
      { targetField: 'foodConsumption', label: 'Food Consumption (kg)', required: true, type: 'number' },
      { targetField: 'cost', label: 'Cost (INR)', required: true, type: 'number' },
    ],
  },
  environment: {
    label: 'Environment',
    fields: [
      { targetField: 'date', label: 'Date', required: true, type: 'date' },
      { targetField: 'temperature', label: 'Temperature (°C)', required: true, type: 'number' },
      { targetField: 'humidity', label: 'Humidity (%)', required: true, type: 'number' },
      { targetField: 'aqi', label: 'AQI', required: true, type: 'number' },
      { targetField: 'pm25', label: 'PM 2.5', required: true, type: 'number' },
    ],
  },
};

// Initial Mock Import History
const MOCK_IMPORT_HISTORY: ImportHistoryRecord[] = [
  {
    importId: 'IMP-20250315-ELEC-01',
    department: 'electricity',
    fileName: 'March_2025_Electricity_MeterLogs.xlsx',
    fileSizeKb: 142,
    academicYear: '2024-2025',
    month: 'March 2025',
    uploadedBy: 'admin@ecopillars.edu',
    uploadTime: '2025-03-15 10:24 AM',
    totalRows: 310,
    validRows: 310,
    invalidRows: 0,
    status: 'Completed',
    deterministicHash: 'hash-elec-20250315'
  },
  {
    importId: 'IMP-20250314-WAT-02',
    department: 'water',
    fileName: 'Water_Intake_February_Final.xlsx',
    fileSizeKb: 98,
    academicYear: '2024-2025',
    month: 'February 2025',
    uploadedBy: 'admin@ecopillars.edu',
    uploadTime: '2025-03-14 04:15 PM',
    totalRows: 280,
    validRows: 278,
    invalidRows: 2,
    status: 'Completed with Warnings',
    deterministicHash: 'hash-wat-202502'
  }
];

export class ExcelParserService {
  private history: ImportHistoryRecord[] = [...MOCK_IMPORT_HISTORY];

  // Auto-guess column mappings from raw headers based on fuzzy matching
  public autoGuessMappings(department: DepartmentId, rawHeaders: string[]): ColumnMappingConfig[] {
    const schema = DEPARTMENT_SCHEMAS[department];
    if (!schema) return [];

    return schema.fields.map((field) => {
      const match = rawHeaders.find((header) => {
        const h = header.toLowerCase().replace(/[^a-z0-9]/g, '');
        const f = field.targetField.toLowerCase();
        const l = field.label.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (h === f || h === l) return true;
        if (f === 'consumption' && (h.includes('units') || h.includes('kwh') || h.includes('liters') || h.includes('usage') || h.includes('consumption'))) return true;
        if ((f === 'studentcount' || f === 'studentid') && (h.includes('student') || h.includes('count') || h.includes('id'))) return true;
        if (f === 'datausage' && (h.includes('data') || h.includes('gb') || h.includes('tb'))) return true;
        if (f === 'mealcount' && (h.includes('meal') || h.includes('served'))) return true;
        if (f === 'foodconsumption' && (h.includes('food') || h.includes('waste') || h.includes('kg'))) return true;
        if (f === 'pm25' && (h.includes('pm2') || h.includes('pm25'))) return true;
        return false;
      });

      return {
        ...field,
        excelColumn: match || '',
      };
    });
  }

  // Parse raw Excel file into headers and raw json rows
  public async parseExcelFile(file: File): Promise<{ headers: string[]; rawRows: Record<string, any>[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          const json = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
          if (!json || json.length === 0) {
            resolve({ headers: [], rawRows: [] });
            return;
          }

          const headers = Object.keys(json[0]);
          resolve({ headers, rawRows: json });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  // Validate and normalize raw rows based on current column mapping
  public validateAndNormalize(
    _department: DepartmentId,
    rawRows: Record<string, any>[],
    mappings: ColumnMappingConfig[]
  ): ExcelValidationResult {
    const errors: ValidationErrorItem[] = [];
    const normalizedData: Record<string, any>[] = [];
    const seenHashes = new Set<string>();
    let duplicateCount = 0;

    rawRows.forEach((row, rowIndex) => {
      const rowNum = rowIndex + 2; // Excel row index 1 is header
      const normalizedRow: Record<string, any> = {};
      let hasError = false;

      // Check each mapped field
      mappings.forEach((map) => {
        const rawVal = map.excelColumn ? row[map.excelColumn] : undefined;

        // 1. Missing required field check
        if (map.required && (rawVal === undefined || rawVal === null || String(rawVal).trim() === '')) {
          errors.push({
            row: rowNum,
            field: map.targetField,
            value: rawVal,
            message: `Required field '${map.label}' is missing or empty.`,
          });
          hasError = true;
          return;
        }

        if (rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== '') {
          // 2. Type validations
          if (map.type === 'number') {
            const num = Number(rawVal);
            if (isNaN(num)) {
              errors.push({
                row: rowNum,
                field: map.targetField,
                value: rawVal,
                message: `'${map.label}' must be a valid number.`,
              });
              hasError = true;
            } else if (num < 0) {
              errors.push({
                row: rowNum,
                field: map.targetField,
                value: rawVal,
                message: `'${map.label}' cannot be a negative value (${num}).`,
              });
              hasError = true;
            } else {
              normalizedRow[map.targetField] = num;
            }
          } else if (map.type === 'date') {
            const dateStr = String(rawVal).trim();
            const parsedDate = new Date(dateStr);
            if (isNaN(parsedDate.getTime()) && !/^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
              errors.push({
                row: rowNum,
                field: map.targetField,
                value: rawVal,
                message: `'${map.label}' is an invalid date string.`,
              });
              hasError = true;
            } else {
              normalizedRow[map.targetField] = dateStr;
            }
          } else {
            normalizedRow[map.targetField] = String(rawVal).trim();
          }
        }
      });

      // 3. Duplicate row hash detection
      const rowHash = JSON.stringify(normalizedRow);
      if (seenHashes.has(rowHash)) {
        duplicateCount++;
        errors.push({
          row: rowNum,
          field: 'RowDuplicate',
          value: 'Duplicate',
          message: `Duplicate record detected in row ${rowNum}.`,
        });
        hasError = true;
      } else {
        seenHashes.add(rowHash);
      }

      if (!hasError) {
        normalizedData.push(normalizedRow);
      }
    });

    const totalRows = rawRows.length;
    const invalidRowsCount = errors.length > 0 ? new Set(errors.map(e => e.row)).size : 0;
    const validRowsCount = totalRows - invalidRowsCount;

    return {
      totalRows,
      validRowsCount,
      invalidRowsCount,
      errors,
      duplicateCount,
      normalizedData,
      rawHeaders: Object.keys(rawRows[0] || {}),
    };
  }

  // Generate deterministic hash for file & parameters to prevent duplicate imports
  public generateDeterministicHash(fileName: string, fileSize: number, department: string, month: string): string {
    const raw = `${fileName}-${fileSize}-${department}-${month}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `hash-${Math.abs(hash).toString(16)}`;
  }

  // Check if hash already imported
  public isDuplicateImport(deterministicHash: string): boolean {
    return this.history.some((item) => item.deterministicHash === deterministicHash);
  }

  // Save new import record to history
  public addImportHistory(record: ImportHistoryRecord): void {
    this.history.unshift(record);
  }

  // Get current import history
  public getImportHistory(): ImportHistoryRecord[] {
    return [...this.history];
  }
}

export const excelParserService = new ExcelParserService();
