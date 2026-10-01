import { useState, useEffect } from 'react';
import { dataService } from '../services/api/dataService';
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
  Anomaly,
  Alert
} from '../types';

export function useDashboardData() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [electricity, setElectricity] = useState<ElectricityRecord[]>([]);
  const [water, setWater] = useState<WaterRecord[]>([]);
  const [wifi, setWifi] = useState<WifiRecord[]>([]);
  const [food, setFood] = useState<FoodRecord[]>([]);
  const [finance, setFinance] = useState<FinanceRecord[]>([]);
  const [environment, setEnvironment] = useState<EnvironmentRecord[]>([]);
  const [calendar, setCalendar] = useState<AcademicCalendarRecord[]>([]);
  const [yearlyComparisons, setYearlyComparisons] = useState<YearlyComparison[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const [std, elec, wat, wfi, fd, fin, env, cal, yComp, anom, alt] = await Promise.all([
          dataService.getStudents(),
          dataService.getElectricity(),
          dataService.getWater(),
          dataService.getWifi(),
          dataService.getFood(),
          dataService.getFinance(),
          dataService.getEnvironment(),
          dataService.getCalendar(),
          dataService.getYearlyComparisons(),
          dataService.getAnomalies(),
          dataService.getAlerts(),
        ]);

        if (isMounted) {
          setStudents(std);
          setElectricity(elec);
          setWater(wat);
          setWifi(wfi);
          setFood(fd);
          setFinance(fin);
          setEnvironment(env);
          setCalendar(cal);
          setYearlyComparisons(yComp);
          setAnomalies(anom);
          setAlerts(alt);
        }
      } catch (err) {
        console.error('Failed to load campus dashboard data:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    students,
    electricity,
    water,
    wifi,
    food,
    finance,
    environment,
    calendar,
    yearlyComparisons,
    anomalies,
    alerts,
    isLoading
  };
}
