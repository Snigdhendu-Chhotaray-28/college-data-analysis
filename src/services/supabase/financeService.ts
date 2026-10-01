import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { FinanceRecord } from '../../types';

export class FinanceService {
  async getMonthlyData(year?: number): Promise<FinanceRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('finance').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const financeService = new FinanceService();
