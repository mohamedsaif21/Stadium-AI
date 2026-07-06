import { NextResponse } from 'next/server';
import { getSustainabilityMetrics, getSustainabilityScore, getSustainabilitySuggestions } from '@/lib/sustainability';

export async function GET() {
  try {
    const metrics = getSustainabilityMetrics();
    const score = getSustainabilityScore();
    const suggestions = await getSustainabilitySuggestions();
    
    return NextResponse.json({
      metrics,
      score,
      suggestions,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
