import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDecisionSupport } from '@/lib/ai';

const requestSchema = z.object({
  query: z.string().min(1, 'Query is required').max(1000, 'Query too long'),
});

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
  }

  try {
    const userRoleHeader = request.headers.get('x-user-role');
    if (!userRoleHeader || userRoleHeader !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid request' }, { status: 400 });
    }

    const result = await getDecisionSupport(parsed.data.query);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
