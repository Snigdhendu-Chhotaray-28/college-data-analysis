/**
 * ECO PILLARS HUB - DATA QUALITY DASHBOARD (PHASE 13)
 * Comprehensive Data Quality & Sufficiency Governance Interface
 */

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { dataQualityService } from '../../services/dataQualityService';
import type { DataQualityCheckType, DataQualityState } from '../../types';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Database,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Copy,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const DataQualityDashboard: React.FC = () => {
  const [summary] = useState(() => dataQualityService.getDataQualitySummary());
  const [selectedCheckFilter, setSelectedCheckFilter] = useState<string>('ALL');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('ALL');

  const filteredIssues = summary.issues.filter((issue) => {
    const checkMatch = selectedCheckFilter === 'ALL' || issue.checkType === selectedCheckFilter;
    const deptMatch = selectedDepartmentFilter === 'ALL' || issue.department === selectedDepartmentFilter;
    return checkMatch && deptMatch;
  });

  const getStateBadgeVariant = (state: DataQualityState): 'optimal' | 'warning' | 'critical' | 'info' => {
    switch (state) {
      case 'COMPLETE':
        return 'optimal';
      case 'PARTIAL':
        return 'warning';
      case 'INSUFFICIENT_DATA':
        return 'critical';
      default:
        return 'info';
    }
  };

  const checkTypeLabels: Record<DataQualityCheckType, string> = {
    MISSING_DATE: 'Missing Dates',
    DUPLICATE_ROW: 'Duplicate Rows',
    INVALID_NUMBER: 'Invalid Numbers',
    NEGATIVE_CONSUMPTION: 'Negative Consumption',
    MISSING_STUDENT_COUNT: 'Missing Student Counts',
    MISSING_UNIT: 'Missing Units',
    INVALID_EXCEL_COLUMN: 'Invalid Excel Columns',
    UNEXPECTED_VALUE: 'Unexpected Values',
    DUPLICATE_UPLOAD: 'Duplicate Uploads',
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Global Data Quality Status */}
      <div className="p-5 rounded-2xl bg-[#0B1F3A] border border-[#142B4A] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#16A085] to-[#0D6352] text-white shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">DATA QUALITY GOVERNANCE SYSTEM</h2>
              <Badge variant={getStateBadgeVariant(summary.overallStatus)}>
                STATE: {summary.overallStatus}
              </Badge>
            </div>
            <p className="text-xs text-[#8A9AAB] mt-0.5">
              Continuous validation against 9 mandatory dataset checks & 3-year historical sufficiency enforcement.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-full bg-[#16A085]/10 border border-[#16A085]/30 text-[#16A085] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Acceptance Rate: {((summary.recordsAccepted / summary.recordsProcessed) * 100).toFixed(1)}%</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-[#F0A202]/10 border border-[#F0A202]/30 text-[#F0A202] flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Sufficiency Protection Active</span>
          </div>
        </div>
      </div>

      {/* 5 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="p-4 bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-colors">
          <div className="flex items-center justify-between text-[#8A9AAB] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">RECORDS PROCESSED</span>
            <FileCheck className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-xl font-black text-[#10213A]">{summary.recordsProcessed.toLocaleString()}</div>
          <div className="text-[11px] text-[#536477] mt-1">Across 7 Departments</div>
        </Card>

        <Card className="p-4 bg-white border-[#D6E1DE] hover:border-[#16A085]/40 transition-colors">
          <div className="flex items-center justify-between text-[#8A9AAB] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">RECORDS ACCEPTED</span>
            <CheckCircle2 className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-xl font-black text-[#16A085]">{summary.recordsAccepted.toLocaleString()}</div>
          <div className="text-[11px] text-[#16A085] mt-1 font-semibold">
            {((summary.recordsAccepted / summary.recordsProcessed) * 100).toFixed(1)}% Verified
          </div>
        </Card>

        <Card className="p-4 bg-white border-[#D6E1DE] hover:border-[#D64550]/40 transition-colors">
          <div className="flex items-center justify-between text-[#8A9AAB] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">RECORDS REJECTED</span>
            <XCircle className="w-4 h-4 text-[#D64550]" />
          </div>
          <div className="text-xl font-black text-[#D64550]">{summary.recordsRejected.toLocaleString()}</div>
          <div className="text-[11px] text-[#D64550] mt-1 font-semibold">Flagged & Excluded</div>
        </Card>

        <Card className="p-4 bg-white border-[#D6E1DE] hover:border-[#F0A202]/40 transition-colors">
          <div className="flex items-center justify-between text-[#8A9AAB] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">MISSING VALUES</span>
            <AlertTriangle className="w-4 h-4 text-[#F0A202]" />
          </div>
          <div className="text-xl font-black text-[#F0A202]">{summary.missingValuesCount}</div>
          <div className="text-[11px] text-[#536477] mt-1">Imputed / Flagged</div>
        </Card>

        <Card className="p-4 bg-white border-[#D6E1DE] hover:border-[#3498DB]/40 transition-colors">
          <div className="flex items-center justify-between text-[#8A9AAB] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">DUPLICATE RECORDS</span>
            <Copy className="w-4 h-4 text-[#3498DB]" />
          </div>
          <div className="text-xl font-black text-[#3498DB]">{summary.duplicateRecordsCount}</div>
          <div className="text-[11px] text-[#536477] mt-1">Deduplicated</div>
        </Card>
      </div>

      {/* Section 1: Department Data Quality & Historical Sufficiency Breakdown */}
      <Card>
        <div className="flex items-center justify-between pb-3 border-b border-[#D6E1DE] mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#16A085]" />
            <h3 className="text-sm font-extrabold text-[#10213A] uppercase tracking-wider">
              Department Data Quality & Historical Sufficiency Status
            </h3>
          </div>
          <span className="text-xs text-[#536477]">3-Year Baseline Rule Enforcement</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#10213A]">
            <thead className="bg-[#F4F7F6] text-[#536477] uppercase text-[11px] font-extrabold border-b border-[#D6E1DE]">
              <tr>
                <th className="px-4 py-3">Department Module</th>
                <th className="px-4 py-3">Quality State</th>
                <th className="px-4 py-3">Accepted / Processed</th>
                <th className="px-4 py-3">Rejected</th>
                <th className="px-4 py-3">Historical Baseline</th>
                <th className="px-4 py-3">Data Sufficiency Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F5F1]">
              {summary.departmentReports.map((dept, idx) => (
                <tr key={idx} className="hover:bg-[#F4F7F6]/60 transition-colors">
                  <td className="px-4 py-3 font-bold text-[#10213A] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#16A085]" />
                    {dept.department}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getStateBadgeVariant(dept.status)}>
                      {dept.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className="text-[#16A085] font-bold">{dept.recordsAccepted}</span> / {dept.recordsProcessed}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {dept.recordsRejected > 0 ? (
                      <span className="text-[#D64550] font-bold">{dept.recordsRejected}</span>
                    ) : (
                      <span className="text-[#8A9AAB]">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#536477]" />
                      <span className={dept.hasThreeYearsData ? 'text-[#16A085] font-bold' : 'text-[#D64550] font-bold'}>
                        {dept.yearsAvailableCount} Years
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {!dept.hasThreeYearsData ? (
                      <div className="p-2 rounded-lg bg-[#D64550]/10 border border-[#D64550]/30 text-[#D64550] text-[11px] font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{dept.sufficiencyNote}</span>
                      </div>
                    ) : (
                      <span className="text-[#536477]">{dept.sufficiencyNote}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 2: Metric Quality Status & Anomaly Evaluation Eligibility */}
      <Card>
        <div className="flex items-center justify-between pb-3 border-b border-[#D6E1DE] mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C92F80]" />
            <h3 className="text-sm font-extrabold text-[#10213A] uppercase tracking-wider">
              Metric Quality Status & Anomaly Engine Eligibility
            </h3>
          </div>
          <span className="text-xs text-[#536477]">Prevents Unconfident Anomaly Assertions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.metricStatuses.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                m.canGenerateConfidentAnomaly
                  ? 'bg-white border-[#D6E1DE]'
                  : 'bg-[#FFF9F0] border-[#F0A202]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#10213A]">{m.metricName}</span>
                <Badge variant={getStateBadgeVariant(m.status)}>{m.status}</Badge>
              </div>

              <div className="text-[11px] text-[#536477] mb-3 flex items-center justify-between">
                <span>Resource: <strong className="text-[#10213A]">{m.resource}</strong></span>
                <span>History: <strong className="text-[#16A085]">{m.historicalYearsAvailable} Years</strong></span>
              </div>

              {m.canGenerateConfidentAnomaly ? (
                <div className="p-2 rounded-lg bg-[#16A085]/10 border border-[#16A085]/30 text-[#16A085] text-[11px] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Confident Anomaly Evaluation Active</span>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-[#F0A202]/15 border border-[#F0A202]/40 text-[#B87A00] text-[11px] font-bold flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#F0A202]" />
                  <div>
                    <span className="block uppercase tracking-wider text-[10px] text-[#F0A202]">Anomaly Assertions Suppressed</span>
                    <p className="font-normal text-[11px] mt-0.5">{m.dataSufficiencyNote}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Section 3: Data Quality Issues Audit Log */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D6E1DE] mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#3498DB]" />
            <h3 className="text-sm font-extrabold text-[#10213A] uppercase tracking-wider">
              Data Quality Audit Log ({filteredIssues.length} Detected Issues)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCheckFilter}
              onChange={(e) => setSelectedCheckFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#F4F7F6] border border-[#D6E1DE] rounded-lg text-xs font-semibold text-[#10213A] focus:outline-none focus:ring-2 focus:ring-[#16A085]"
            >
              <option value="ALL">All Check Types (9 Checks)</option>
              {Object.entries(checkTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <select
              value={selectedDepartmentFilter}
              onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#F4F7F6] border border-[#D6E1DE] rounded-lg text-xs font-semibold text-[#10213A] focus:outline-none focus:ring-2 focus:ring-[#16A085]"
            >
              <option value="ALL">All Departments</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Wi-Fi">Wi-Fi & IT</option>
              <option value="Food">Food & Mess</option>
              <option value="Admission">Admission & Students</option>
              <option value="Environment">Environment</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#10213A]">
            <thead className="bg-[#F4F7F6] text-[#536477] uppercase text-[11px] font-extrabold border-b border-[#D6E1DE]">
              <tr>
                <th className="px-4 py-3">Check Type</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">File / Row / Field</th>
                <th className="px-4 py-3">Description & Action</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Detected At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F5F1]">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-[#8A9AAB] font-medium">
                    No data quality issues match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-[#F4F7F6]/60 transition-colors">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-[#10213A] text-white font-mono text-[10px] font-bold">
                        {checkTypeLabels[issue.checkType] || issue.checkType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#10213A]">{issue.department}</td>
                    <td className="px-4 py-3 font-mono text-[11px]">
                      <div className="text-[#10213A] font-bold">{issue.fileName || 'System Dataset'}</div>
                      <div className="text-[#8A9AAB]">Row: {issue.rowNumber || 'N/A'} | Field: {issue.fieldName || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3 leading-relaxed">
                      {issue.description}
                      {issue.invalidValue !== undefined && issue.invalidValue !== null && (
                        <span className="block text-[11px] font-mono text-[#D64550] mt-0.5">
                          Value: '{String(issue.invalidValue)}'
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          issue.severity === 'CRITICAL'
                            ? 'critical'
                            : issue.severity === 'WARNING'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {issue.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#8A9AAB]">{issue.detectedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
