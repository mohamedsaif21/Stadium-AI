import { getSustainabilityMetrics, getSustainabilityScore, getSustainabilitySuggestions } from '@/lib/sustainability';
import { fail, ok } from '@/lib/api';

export async function GET() {
  try {
    const metrics = getSustainabilityMetrics();
    const score = getSustainabilityScore();
    const suggestions = await getSustainabilitySuggestions();
    
    return ok({
      metrics,
      score,
      suggestions,
    });
  } catch {
    return fail('Internal server error', 500, 'INTERNAL_ERROR');
  }
}
