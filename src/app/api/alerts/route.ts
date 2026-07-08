import { NextRequest } from 'next/server';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Alert } from '@/lib/types';
import { fail, ok, parseJson, rateLimit, requireRole, requireSameOrigin, validationMessage } from '@/lib/api';
import { alertCreateSchema } from '@/lib/schemas';

const alerts = [...MOCK_ALERTS];

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, 'alerts-read', 60);
  if (limited) return limited;
  const forbidden = requireRole(request, ['admin']);
  if (forbidden) return forbidden;
  return ok({ alerts });
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'alerts-write', 20);
  if (limited) return limited;
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  try {
    const forbidden = requireRole(request, ['admin']);
    if (forbidden) return forbidden;
    const { title, message, zone, severity, createdBy } = await parseJson(request, alertCreateSchema);
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      title,
      message,
      zone,
      severity,
      createdAt: new Date(),
      createdBy,
    };

    alerts.unshift(newAlert);
    return ok({ alert: newAlert }, 201);
  } catch (error) {
    const message = validationMessage(error, 'Invalid alert data');
    return fail(message === 'Invalid alert data' ? 'Internal server error' : message, message === 'Invalid alert data' ? 500 : 400);
  }
}
