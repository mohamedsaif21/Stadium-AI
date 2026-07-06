import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAIResponse } from '@/lib/ai';

const requestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(1000, 'Message too long'),
  role: z.enum(['fan', 'volunteer', 'admin']),
  context: z.record(z.string(), z.unknown()).optional(),
});

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 20;
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
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  try {
    const userRoleHeader = request.headers.get('x-user-role');
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid request' }, { status: 400 });
    }

    const { message, role } = parsed.data;

    // Simulated Role Authorization Check
    if (!userRoleHeader || userRoleHeader !== role) {
      return NextResponse.json({ error: 'Unauthorized role request' }, { status: 403 });
    }

    const result = await getAIResponse(message, role);
    
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal server error', mock: true, response: 'I apologize, but I encountered an error. Please try again.' }, { status: 500 });
  }
}
