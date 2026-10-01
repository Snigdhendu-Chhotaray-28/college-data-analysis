/**
 * ECO PILLARS HUB - Upload Ingestion & Validation Service
 * Phase 0: Service abstraction placeholder
 */

import type { UploadRecord } from '../../types';

export class UploadProcessingService {
  getRecentUploads(): UploadRecord[] {
    return [
      {
        id: 'UPL-2026-001',
        department: 'Electricity',
        fileName: 'Campus_Electricity_Oct2026.xlsx',
        fileSizeKb: 142,
        academicYear: '2026-2027',
        month: 'October',
        uploadedBy: 'Admin (Estates Dept)',
        uploadedAt: '2026-10-01 06:30',
        totalRows: 120,
        validRows: 120,
        invalidRows: 0,
        status: 'Completed',
      },
      {
        id: 'UPL-2026-002',
        department: 'Water',
        fileName: 'Water_Facility_Log_Oct2026.xlsx',
        fileSizeKb: 98,
        academicYear: '2026-2027',
        month: 'October',
        uploadedBy: 'Analyst (Green Campus)',
        uploadedAt: '2026-10-01 06:45',
        totalRows: 85,
        validRows: 83,
        invalidRows: 2,
        status: 'Completed with Warnings',
      },
    ];
  }

  validateFileExtension(fileName: string): boolean {
    return /\.(xlsx|xls|csv)$/i.test(fileName);
  }
}

export const uploadProcessingService = new UploadProcessingService();
