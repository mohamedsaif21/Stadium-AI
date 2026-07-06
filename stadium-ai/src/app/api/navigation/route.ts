import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findRoute, searchZones, getZoneStatusMap } from '@/lib/navigation';

const querySchema = z.object({
  q: z.string().min(1, 'Query is required').max(500, 'Query too long'),
  accessible: z.coerce.boolean().optional(),
});

const searchSchema = z.object({
  search: z.string().min(1).max(500),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'zones') {
      return NextResponse.json({ zones: getZoneStatusMap() });
    }

    const q = searchParams.get('q');
    if (q) {
      const parsed = querySchema.safeParse({ q, accessible: searchParams.get('accessible') });
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid query' }, { status: 400 });
      }
      const route = findRoute(parsed.data.q);
      return NextResponse.json({ route });
    }

    const search = searchParams.get('search');
    if (search) {
      const parsed = searchSchema.safeParse({ search });
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid search' }, { status: 400 });
      }
      const results = searchZones(parsed.data.search);
      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: 'Provide q (query), search, or type=zones parameter' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
