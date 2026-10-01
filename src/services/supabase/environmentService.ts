import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { EnvironmentRecord } from '../../types';

export class EnvironmentService {
  async getMonthlyData(year?: number): Promise<EnvironmentRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('environment').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const environmentService = new EnvironmentService();
