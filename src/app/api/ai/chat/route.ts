import { NextRequest } from 'next/server';
import { getAIResponse } from '@/lib/ai';
import { fail, ok, parseJson, rateLimit, requireSameOrigin, validationMessage } from '@/lib/api';
import { chatRequestSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'ai-chat', 20);
  if (limited) return limited;
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  try {
    const userRoleHeader = request.headers.get('x-user-role');
    const { message, role } = await parseJson(request, chatRequestSchema);

    if (!userRoleHeader || userRoleHeader !== role) {
      return fail('Forbidden', 403, 'FORBIDDEN');
    }

    const result = await getAIResponse(message, role);
    return ok(result);
  } catch (error) {
    const message = validationMessage(error);
    if (message !== 'Invalid request') {
      return fail(message, 400);
    }
    return fail('Internal server error', 500, 'INTERNAL_ERROR');
  }
}
