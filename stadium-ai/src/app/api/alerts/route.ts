import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { Alert } from '@/lib/types';

const alerts = [...MOCK_ALERTS];

const createSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  message: z.string().min(1, 'Message is required').max(500),
  zone: z.string().min(1, 'Zone is required').max(200),
  severity: z.enum(['info', 'warning', 'critical']),
  createdBy: z.string().min(1),
});

export async function GET() {
  return NextResponse.json({ alerts });
}

export async function POST(request: NextRequest) {
  try {
    const userRoleHeader = request.headers.get('x-user-role');
    if (!userRoleHeader || userRoleHeader !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid alert data' }, { status: 400 });
    }

    const { title, message, zone, severity, createdBy } = parsed.data;
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
    return NextResponse.json({ alert: newAlert }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
