import { NextRequest } from 'next/server';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Alert } from '@/lib/types';
import { fail, ok, parseJson, requireRole, validationMessage } from '@/lib/api';
import { alertCreateSchema } from '@/lib/schemas';

const alerts = [...MOCK_ALERTS];

export async function GET() {
  return ok({ alerts });
}

export async function POST(request: NextRequest) {
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
