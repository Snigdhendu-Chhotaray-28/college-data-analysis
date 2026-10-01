import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { UploadRecord } from '../../types';

export class UploadService {
  async getUploadHistory(): Promise<UploadRecord[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .order('uploaded_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}

export const uploadService = new UploadService();
