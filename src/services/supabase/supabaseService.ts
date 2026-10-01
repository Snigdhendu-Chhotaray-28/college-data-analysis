import { supabase } from '../../utils/supabase/client';

export class SupabaseService {
  /**
   * Fetch generic records from any Supabase table
   */
  async getTableData<T = any>(tableName: string) {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      throw error;
    }
    return data as T[];
  }

  /**
   * Fetch Todos example
   */
  async getTodos() {
    return this.getTableData('todos');
  }

  /**
   * Fetch Building data
   */
  async getBuildings() {
    return this.getTableData('Dim_Building');
  }
}

export const supabaseService = new SupabaseService();
