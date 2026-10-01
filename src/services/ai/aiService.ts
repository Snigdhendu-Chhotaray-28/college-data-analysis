import { aiAdvisorEngine } from './aiAdvisorEngine';

export class AIService {
  public async askEcoAdvisor(query: string, selectedMonth: string = 'August'): Promise<string> {
    return aiAdvisorEngine.processQuery(query, selectedMonth);
  }
}

export const aiService = new AIService();
