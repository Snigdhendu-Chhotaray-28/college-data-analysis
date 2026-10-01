import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { WaterRecord } from '../../types';

export class WaterService {
  async getMonthlyData(year?: number): Promise<WaterRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('water').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const waterService = new WaterService();
