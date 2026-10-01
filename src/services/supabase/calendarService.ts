import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { AcademicCalendarRecord } from '../../types';

export class CalendarService {
  async getAcademicCalendar(year?: number): Promise<AcademicCalendarRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    let query = supabase.from('academic_calendar').select('*');
    if (year) {
      query = query.eq('year', year);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
}

export const calendarService = new CalendarService();
