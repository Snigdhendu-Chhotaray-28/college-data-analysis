import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { ElectricityRecord } from '../../types';

export class ElectricityService {
  async getMonthlyData(year?: number): Promise<ElectricityRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('electricity').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const electricityService = new ElectricityService();
