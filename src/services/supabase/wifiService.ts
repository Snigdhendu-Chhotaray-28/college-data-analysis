import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { WifiRecord } from '../../types';

export class WifiService {
  async getMonthlyData(year?: number): Promise<WifiRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('wifi').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const wifiService = new WifiService();
