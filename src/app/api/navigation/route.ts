import { NextRequest } from 'next/server';
import { findRoute, searchZones, getZoneStatusMap } from '@/lib/navigation';
import { fail, ok, rateLimit, validationMessage } from '@/lib/api';
import { navigationQuerySchema, navigationSearchSchema } from '@/lib/schemas';

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, 'navigation-read', 90);
  if (limited) return limited;

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'zones') {
      return ok({ zones: getZoneStatusMap() });
    }

    const q = searchParams.get('q');
    if (q) {
      const parsed = navigationQuerySchema.parse({ q, accessible: searchParams.get('accessible') });
      const route = findRoute(parsed.q);
      return ok({ route });
    }

    const search = searchParams.get('search');
    if (search) {
      const parsed = navigationSearchSchema.parse({ search });
      const results = searchZones(parsed.search);
      return ok({ results });
    }

    return fail('Provide q (query), search, or type=zones parameter', 400);
  } catch (error) {
    const message = validationMessage(error, 'Invalid navigation request');
    return fail(message === 'Invalid navigation request' ? 'Internal server error' : message, message === 'Invalid navigation request' ? 500 : 400);
  }
}
