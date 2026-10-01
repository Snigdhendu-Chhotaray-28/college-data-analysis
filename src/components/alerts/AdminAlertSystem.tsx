import React, { useState } from 'react';
import { Card } from '../ui/Card';
import {
  getAdminAlerts,
  getAlertSummaryMetrics,
  acknowledgeAdminAlert,
  resolveAdminAlert
} from '../../services/alertManagementService';
import type { AdminAlert, AlertSeverity } from '../../types';
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  Eye,
  X,
  Layers,
  Calendar,
  Users,
  Thermometer,
  History,
  Activity,
  FileText
} from 'lucide-react';

export const AdminAlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<AdminAlert[]>(getAdminAlerts());
  const [selectedDetailAlert, setSelectedDetailAlert] = useState<AdminAlert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const handleAcknowledge = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = acknowledgeAdminAlert(id, 'Admin (Principal Registrar)');
    setAlerts(updated);
    if (selectedDetailAlert?.id === id) {
      setSelectedDetailAlert(updated.find((a) => a.id === id) || null);
    }
  };

  const handleResolve = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = resolveAdminAlert(id);
    setAlerts(updated);
    if (selectedDetailAlert?.id === id) {
      setSelectedDetailAlert(updated.find((a) => a.id === id) || null);
    }
  };

  const summaryMetrics = getAlertSummaryMetrics();

  const filteredAlerts = alerts.filter((a) =>
    filterSeverity === 'ALL' ? true : a.severity === filterSeverity
  );

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-[#D64550] text-white animate-pulse shadow-xs">
            CRITICAL
          </span>
        );
      case 'ANOMALY':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFE4E6] text-[#E11D48] border border-[#FDA4AF]">
            ANOMALY
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFF4E5] text-[#D97706] border border-[#FCD34D]">
            WARNING
          </span>
        );
      case 'INFO':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC]">
            INFO
          </span>
        );
      case 'NORMAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF2F1] text-[#16A085] border border-[#16A085]/30">
            NORMAL
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Required Dashboard Alert Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0B1F3A] text-white shadow-md border border-[#142B4A] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8A9AAB] font-bold uppercase tracking-wider">
            <span>Total System Alerts</span>
            <Bell className="w-4 h-4 text-[#16A085]" />
          </div>
          <div className="text-2xl font-black text-white">{summaryMetrics.totalAlerts}</div>
          <div className="text-[11px] text-[#16A085] font-semibold">Active Monitoring Stream</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold uppercase tracking-wider">
            <span>Critical Alerts</span>
            <ShieldAlert className="w-4 h-4 text-[#D64550]" />
          </div>
          <div className="text-2xl font-black text-[#D64550]">{summaryMetrics.criticalCount}</div>
          <div className="text-[11px] text-[#536477]">High Priority Attention Required</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold uppercase tracking-wider">
            <span>Unresolved Alerts</span>
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-2xl font-black text-[#D97706]">{summaryMetrics.unresolvedCount}</div>
          <div className="text-[11px] text-[#536477]">Pending Admin Resolution</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#D6E1DE] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#536477] font-bold uppercase tracking-wider">
            <span>Monitored Resources</span>
            <Layers className="w-4 h-4 text-[#314B80]" />
          </div>
          <div className="text-2xl font-black text-[#0B1F3A]">{Object.keys(summaryMetrics.alertCountByResource).length}</div>
          <div className="text-[11px] text-[#536477]">Departments Flagging Variance</div>
        </div>
      </div>

      {/* Alert Count by Resource Summary Banner */}
      <Card className="bg-[#F4F7F6] border border-[#D6E1DE]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D6E1DE]">
          <span className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#16A085]" />
            Alert Count Breakdown By Campus Resource
          </span>
          <span className="text-[10px] font-mono text-[#8A9AAB]">Phase 9 Engine</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(summaryMetrics.alertCountByResource).map(([res, cnt]) => (
            <div key={res} className="p-2.5 rounded-lg bg-white border border-[#D6E1DE] flex items-center justify-between">
              <span className="text-xs font-bold text-[#10213A]">{res}</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#0B1F3A] text-white">
                {cnt}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Admin Alert Table */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#F4F7F6] gap-3">
          <div>
            <h3 className="text-base font-bold text-[#10213A]">
              Administrator Alert Management Dashboard
            </h3>
            <p className="text-xs text-[#536477]">
              Multi-signal anomaly alerts generated by Phase 8 engine. Admin actions: Acknowledge, Resolve, & View Details.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F4F7F6] p-1 rounded-xl border border-[#D6E1DE]">
            {(['ALL', 'CRITICAL', 'ANOMALY', 'WARNING', 'INFO', 'NORMAL'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterSeverity === sev
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'text-[#536477] hover:text-[#10213A]'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D6E1DE] bg-[#F4F7F6] text-[#536477] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Alert Title & Description</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F7F6]">
              {filteredAlerts.map((alt) => (
                <tr
                  key={alt.id}
                  onClick={() => setSelectedDetailAlert(alt)}
                  className="hover:bg-[#F4F7F6]/60 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">{getSeverityBadge(alt.severity)}</td>
                  <td className="py-3.5 px-4 font-bold text-[#10213A]">{alt.resource}</td>
                  <td className="py-3.5 px-4 space-y-0.5 max-w-xs">
                    <div className="font-bold text-[#10213A] truncate">{alt.title}</div>
                    <div className="text-[#536477] truncate">{alt.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#8A9AAB] font-mono text-[11px] whitespace-nowrap">
                    {alt.createdAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        alt.status === 'Unresolved'
                          ? 'bg-[#FFE4E6] text-[#E11D48]'
                          : alt.status === 'Acknowledged'
                          ? 'bg-[#FFF4E5] text-[#D97706]'
                          : 'bg-[#EAF2F1] text-[#16A085]'
                      }`}
                    >
                      {alt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedDetailAlert(alt)}
                        className="p-1.5 rounded-lg bg-[#F4F7F6] text-[#0B1F3A] hover:bg-[#D6E1DE] transition-colors"
                        title="View Detailed Evidence"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {alt.status === 'Unresolved' && (
                        <button
                          onClick={(e) => handleAcknowledge(alt.id, e)}
                          className="px-2 py-1 rounded-lg bg-[#0B1F3A] text-white text-[11px] font-bold hover:bg-[#142B4A] transition-colors"
                        >
                          Acknowledge
                        </button>
                      )}

                      {alt.status !== 'Resolved' && (
                        <button
                          onClick={(e) => handleResolve(alt.id, e)}
                          className="px-2 py-1 rounded-lg bg-[#16A085] text-white text-[11px] font-bold hover:bg-[#0D6352] transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mandatory Alert Detail Modal / Inspector Drawer */}
      {selectedDetailAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D6E1DE] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#F4F7F6] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getSeverityBadge(selectedDetailAlert.severity)}
                  <span className="text-xs font-bold text-[#8A9AAB]">{selectedDetailAlert.resource}</span>
                </div>
                <h3 className="text-lg font-black text-[#10213A]">{selectedDetailAlert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedDetailAlert(null)}
                className="p-1.5 rounded-lg text-[#8A9AAB] hover:text-[#10213A] hover:bg-[#F4F7F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Required Alert Detail Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">Current Value</span>
                <span className="text-sm font-extrabold text-[#10213A]">
                  {selectedDetailAlert.currentValue.toLocaleString()} {selectedDetailAlert.unit}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">Historical Baseline</span>
                <span className="text-sm font-extrabold text-[#314B80]">
                  {selectedDetailAlert.expectedValue.toLocaleString()} {selectedDetailAlert.unit}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE]">
                <span className="text-[10px] text-[#8A9AAB] font-bold block uppercase">Previous Year (Y-1)</span>
                <span className="text-sm font-extrabold text-[#536477]">
                  {selectedDetailAlert.previousYearValue.toLocaleString()} {selectedDetailAlert.unit}
                </span>
              </div>
            </div>

            {/* Detailed Context Parameters */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#D6E1DE] space-y-1">
                <span className="font-extrabold text-[#0B1F3A] flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#16A085]" />
                  Three-Year Historical Pattern
                </span>
                <p className="text-[#536477]">{selectedDetailAlert.threeYearPattern}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D6E1DE] space-y-1">
                <span className="font-extrabold text-[#16A085] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#16A085]" />
                  Student-Normalized Metric
                </span>
                <p className="text-[#536477]">{selectedDetailAlert.studentNormalizedMetric}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D6E1DE] space-y-1">
                <span className="font-extrabold text-[#314B80] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#314B80]" />
                  Academic Calendar Context
                </span>
                <p className="text-[#536477]">{selectedDetailAlert.calendarContext}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D6E1DE] space-y-1">
                <span className="font-extrabold text-[#D97706] flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
                  Environmental Context
                </span>
                <p className="text-[#536477]">{selectedDetailAlert.environmentalContext}</p>
              </div>

              {/* Verbatim Evidence Block */}
              <div className="p-4 rounded-xl bg-[#0B1F3A] text-white space-y-2 border border-[#142B4A]">
                <span className="text-[10px] text-[#16A085] uppercase font-black tracking-wider block flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Deterministic Evidence Synthesis Paragraph
                </span>
                <p className="text-xs leading-relaxed text-[#EAF2F1]">
                  "{selectedDetailAlert.evidence}"
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-[#F4F7F6] pt-4">
              <div className="text-[11px] text-[#8A9AAB] font-mono">
                Status: <span className="font-bold text-[#10213A]">{selectedDetailAlert.status}</span>
                {selectedDetailAlert.acknowledgedBy && ` (Ack by ${selectedDetailAlert.acknowledgedBy})`}
              </div>

              <div className="flex items-center gap-2">
                {selectedDetailAlert.status === 'Unresolved' && (
                  <button
                    onClick={() => handleAcknowledge(selectedDetailAlert.id)}
                    className="px-4 py-2 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#142B4A] transition-colors"
                  >
                    Acknowledge Alert
                  </button>
                )}

                {selectedDetailAlert.status !== 'Resolved' && (
                  <button
                    onClick={() => handleResolve(selectedDetailAlert.id)}
                    className="px-4 py-2 rounded-xl bg-[#16A085] text-white text-xs font-bold hover:bg-[#0D6352] transition-colors"
                  >
                    Resolve Alert
                  </button>
                )}

                <button
                  onClick={() => setSelectedDetailAlert(null)}
                  className="px-4 py-2 rounded-xl bg-[#F4F7F6] text-[#536477] text-xs font-bold hover:bg-[#D6E1DE] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
