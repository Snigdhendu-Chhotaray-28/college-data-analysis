import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { StudentRecord } from '../../types';

export class StudentService {
  async getMonthlyStudents(year?: number): Promise<StudentRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('students').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const studentService = new StudentService();
