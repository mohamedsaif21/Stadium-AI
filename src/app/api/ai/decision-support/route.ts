import { NextRequest } from 'next/server';
import { getDecisionSupport } from '@/lib/ai';
import { fail, ok, parseJson, rateLimit, requireRole, requireSameOrigin, validationMessage } from '@/lib/api';
import { decisionSupportSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'decision-support', 10);
  if (limited) return limited;
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  try {
    const forbidden = requireRole(request, ['admin']);
    if (forbidden) return forbidden;
    const { query } = await parseJson(request, decisionSupportSchema);
    const result = await getDecisionSupport(query);
    return ok(result);
  } catch (error) {
    const message = validationMessage(error);
    return fail(message === 'Invalid request' ? 'Internal server error' : message, message === 'Invalid request' ? 500 : 400);
  }
}
