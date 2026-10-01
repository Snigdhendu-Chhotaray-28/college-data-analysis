import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { FoodRecord } from '../../types';

export class FoodService {
  async getMonthlyData(year?: number): Promise<FoodRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('food').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const foodService = new FoodService();
