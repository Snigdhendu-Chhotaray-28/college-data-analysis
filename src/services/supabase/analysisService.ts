import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { YearlyComparison, ResourceAnalysis } from '../../types';

export class AnalysisService {
  async getYearlyComparison(department?: string): Promise<YearlyComparison[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('yearly_comparisons').select('*');
    if (department) {
      query = query.eq('department', department);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getResourceAnalysis(): Promise<ResourceAnalysis[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    const { data, error } = await supabase.from('resource_analyses').select('*');
    if (error) throw error;
    return data || [];
  }
}

export const analysisService = new AnalysisService();
