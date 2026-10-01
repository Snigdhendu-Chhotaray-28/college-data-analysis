/**
 * ECO PILLARS HUB - ADMIN ALERT SYSTEM (PHASE 9)
 * Consumes the Phase 8 Multi-Signal Anomaly Detection Engine to manage alerts.
 * Provides alert state persistence (Unresolved, Acknowledged, Resolved),
 * count metrics, and detailed context views.
 */

import type { AdminAlert, AlertSeverity, AlertStatus } from '../types';
import { evaluateAllResourceAnomalies } from './anomalyDetectionService';

const STORAGE_KEY = 'eco_pillars_admin_alerts_v1';

export const generateDefaultAlerts = (selectedMonth: string = 'August'): AdminAlert[] => {
  const anomalyRecords = evaluateAllResourceAnomalies(selectedMonth);

  return anomalyRecords.map((rec) => {
    let severity: AlertSeverity = 'NORMAL';
    if (rec.classification === 'CRITICAL') severity = 'CRITICAL';
    else if (rec.classification === 'ANOMALY') severity = 'ANOMALY';
    else if (rec.classification === 'WATCH') severity = 'WARNING';
    else severity = 'INFO';

    // Status initialization
    let status: AlertStatus = 'Unresolved';
    if (severity === 'INFO') {
      status = 'Resolved';
    }

    return {
      id: `alert-${rec.resource.toLowerCase()}-${selectedMonth.toLowerCase()}`,
      resource: rec.resource,
      date: rec.date,
      severity,
      title: `${rec.resource} ${rec.classification === 'CRITICAL' ? 'Critical Load Discrepancy' : rec.classification === 'ANOMALY' ? 'Operational Anomaly Detected' : 'Baseline Shift Notification'}`,
      description: `${rec.resource} telemetry in ${rec.date} registered ${rec.metrics.currentValue.toLocaleString()} ${rec.unit} (${rec.explanation.deviationPercent >= 0 ? `+${rec.explanation.deviationPercent}%` : `${rec.explanation.deviationPercent}%`} YoY).`,
      evidence: rec.explanation.fullEvidenceText,
      status,
      createdAt: `${rec.date} 08:30 AM`,
      currentValue: rec.metrics.currentValue,
      expectedValue: rec.metrics.historicalAverage,
      previousYearValue: rec.metrics.previousYearValue,
      unit: rec.unit,
      historicalComparison: rec.explanation.historicalEvidence,
      threeYearPattern: `3-Year Historical Baseline: ${rec.metrics.historicalAverage.toLocaleString()} ${rec.unit} (Min: ${rec.metrics.historicalMinimum.toLocaleString()}, Max: ${rec.metrics.historicalMaximum.toLocaleString()}, Variation: ±${Math.round(rec.metrics.historicalVariation).toLocaleString()})`,
      studentNormalizedMetric: rec.explanation.studentEvidence,
      calendarContext: rec.explanation.calendarEvidence,
      environmentalContext: rec.explanation.environmentEvidence,
      compositeAnomalyScore: rec.signals.compositeScore,
    };
  });
};

export const getAdminAlerts = (): AdminAlert[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load admin alerts from storage', e);
  }

  const defaultAlerts = generateDefaultAlerts('August');
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAlerts));
  } catch (e) {}
  return defaultAlerts;
};

export const saveAdminAlerts = (alerts: AdminAlert[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch (e) {
    console.error('Failed to save admin alerts', e);
  }
};

export const acknowledgeAdminAlert = (id: string, adminUser: string = 'Admin Administrator'): AdminAlert[] => {
  const current = getAdminAlerts();
  const updated = current.map((a) => {
    if (a.id === id) {
      return {
        ...a,
        status: 'Acknowledged' as AlertStatus,
        acknowledgedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        acknowledgedBy: adminUser,
      };
    }
    return a;
  });
  saveAdminAlerts(updated);
  return updated;
};

export const resolveAdminAlert = (id: string): AdminAlert[] => {
  const current = getAdminAlerts();
  const updated = current.map((a) => {
    if (a.id === id) {
      return {
        ...a,
        status: 'Resolved' as AlertStatus,
        resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
    return a;
  });
  saveAdminAlerts(updated);
  return updated;
};

export const getAlertSummaryMetrics = () => {
  const alerts = getAdminAlerts();

  const criticalAlerts = alerts.filter((a) => a.severity === 'CRITICAL');
  const unresolvedAlerts = alerts.filter((a) => a.status === 'Unresolved');
  const latestAlerts = [...alerts].sort((a, b) => b.compositeAnomalyScore - a.compositeAnomalyScore);

  const alertCountByResource: Record<string, number> = {};
  alerts.forEach((a) => {
    if (a.severity === 'CRITICAL' || a.severity === 'ANOMALY' || a.severity === 'WARNING') {
      alertCountByResource[a.resource] = (alertCountByResource[a.resource] || 0) + 1;
    }
  });

  return {
    totalAlerts: alerts.length,
    criticalCount: criticalAlerts.length,
    unresolvedCount: unresolvedAlerts.length,
    latestAlerts,
    criticalAlerts,
    unresolvedAlerts,
    alertCountByResource,
  };
};
