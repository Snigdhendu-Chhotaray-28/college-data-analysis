/**
 * ECO PILLARS HUB - AI Advisor & Anomaly Explanation Service
 * AI must only be called from a secure backend / Supabase Edge Function.
 * Never expose AI API keys in frontend code.
 */

import { supabase, isSupabaseConfigured } from '../supabase/supabaseClient';

export interface AIExplanationRequest {
  department: string;
  metric: string;
  currentValue: number;
  expectedBaseline: number;
  variancePercentage: number;
  environmentalContext?: string;
  calendarContext?: string;
}

export interface AIExplanationResponse {
  summary: string;
  rootCauseHypothesis: string;
  recommendedAction: string;
  confidenceScore: number;
}

export class AIService {
  /**
   * Securely invokes Supabase Edge Function for AI explanations
   */
  async requestAnomalyExplanation(
    payload: AIExplanationRequest
  ): Promise<AIExplanationResponse> {
    if (!isSupabaseConfigured()) {
      return {
        summary: `Simulated AI Insight: Observed ${payload.variancePercentage}% variance in ${payload.department} (${payload.metric}).`,
        rootCauseHypothesis: 'Elevated campus activity combined with seasonal environmental temperature increase.',
        recommendedAction: 'Schedule building automation audit and inspect cooling HVAC timers.',
        confidenceScore: 0.92,
      };
    }

    try {
      const { data, error } = await supabase.functions.invoke('ai-explain-anomaly', {
        body: payload,
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('[AIService] Edge function call failed:', err);
      throw err;
    }
  }
}

export const aiService = new AIService();
