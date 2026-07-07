import { MOCK_SUSTAINABILITY_METRICS } from './mock-data';
import { SustainabilityMetric } from './types';

export function getSustainabilityMetrics(): SustainabilityMetric[] {
  return MOCK_SUSTAINABILITY_METRICS;
}

export function getSustainabilityScore(): number {
  const metrics = MOCK_SUSTAINABILITY_METRICS;
  const weights: Record<string, number> = {
    'Public Transport Usage': 0.3,
    'Waste Collection': 0.25,
    'Water Refill Station Usage': 0.2,
    'Energy Usage': 0.25,
  };
  
  let score = 0;
  metrics.forEach(m => {
    const weight = weights[m.label] || 0.25;
    const normalized = m.status === 'good' ? 100 : m.status === 'warning' ? 50 : 20;
    score += normalized * weight;
  });
  
  return Math.round(score);
}

export async function getSustainabilitySuggestions(): Promise<string[]> {
  const metrics = MOCK_SUSTAINABILITY_METRICS;
  const suggestions: string[] = [];

  const waterMetric = metrics.find(m => m.label === 'Water Refill Station Usage');
  if (waterMetric && waterMetric.value < 60) {
    suggestions.push('Promote water refill stations via PA announcements and digital signage to reduce plastic waste');
    suggestions.push('Redirect fans from plastic bottle vendors to free water refill stations');
  }

  const transportMetric = metrics.find(m => m.label === 'Public Transport Usage');
  if (transportMetric && transportMetric.value < 80) {
    suggestions.push('Encourage public transport use with real-time departure boards');
    suggestions.push('Display eco-friendly travel options on stadium screens');
  }

  suggestions.push('Recognize and reward fans using sustainable transport options');
  suggestions.push('Monitor waste segregation at all food courts and improve signage');
  
  return suggestions;
}
