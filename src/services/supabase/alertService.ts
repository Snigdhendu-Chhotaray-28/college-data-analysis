import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { Alert } from '../../types';

export class AlertService {
  async getActiveAlerts(): Promise<Alert[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('acknowledged', false)
      .order('timestamp', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async acknowledgeAlert(alertId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return true;
    }
    const { error } = await supabase
      .from('alerts')
      .update({ acknowledged: true })
      .eq('id', alertId);
    if (error) throw error;
    return true;
  }
}

export const alertService = new AlertService();
