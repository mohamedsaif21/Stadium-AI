import { NextRequest } from 'next/server';
import { getSustainabilityMetrics, getSustainabilityScore, getSustainabilitySuggestions } from '@/lib/sustainability';
import { fail, ok, rateLimit, requireRole } from '@/lib/api';

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, 'sustainability-read', 60);
  if (limited) return limited;
  const forbidden = requireRole(request, ['admin']);
  if (forbidden) return forbidden;

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
