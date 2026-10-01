/**
 * ECO PILLARS HUB - Data Service Abstraction Layer (Phase 0)
 * Prepares UI for future Firebase Firestore integration.
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
} from '../../types';

import {
  MOCK_STUDENTS,
  MOCK_ELECTRICITY,
  MOCK_WATER,
  MOCK_WIFI,
  MOCK_FOOD,
  MOCK_FINANCE,
  MOCK_ENVIRONMENT,
  MOCK_CALENDAR,
  MOCK_YEARLY_COMPARISONS,
  MOCK_ANALYSIS,
  MOCK_ANOMALIES,
  MOCK_ALERTS
} from '../../data/mockData';

export class DataService {
  public async getStudents(): Promise<StudentRecord[]> {
    return this.asyncSim(MOCK_STUDENTS);
  }

  public async getElectricity(): Promise<ElectricityRecord[]> {
    return this.asyncSim(MOCK_ELECTRICITY);
  }

  public async getWater(): Promise<WaterRecord[]> {
    return this.asyncSim(MOCK_WATER);
  }

  public async getWifi(): Promise<WifiRecord[]> {
    return this.asyncSim(MOCK_WIFI);
  }

  public async getFood(): Promise<FoodRecord[]> {
    return this.asyncSim(MOCK_FOOD);
  }

  public async getFinance(): Promise<FinanceRecord[]> {
    return this.asyncSim(MOCK_FINANCE);
  }

  public async getEnvironment(): Promise<EnvironmentRecord[]> {
    return this.asyncSim(MOCK_ENVIRONMENT);
  }

  public async getCalendar(): Promise<AcademicCalendarRecord[]> {
    return this.asyncSim(MOCK_CALENDAR);
  }

  public async getYearlyComparisons(): Promise<YearlyComparison[]> {
    return this.asyncSim(MOCK_YEARLY_COMPARISONS);
  }

  public async getAnalysis(): Promise<ResourceAnalysis[]> {
    return this.asyncSim(MOCK_ANALYSIS);
  }

  public async getAnomalies(): Promise<Anomaly[]> {
    return this.asyncSim(MOCK_ANOMALIES);
  }

  public async getAlerts(): Promise<Alert[]> {
    return this.asyncSim(MOCK_ALERTS);
  }

  private asyncSim<T>(data: T, ms: number = 50): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }
}

export const dataService = new DataService();
