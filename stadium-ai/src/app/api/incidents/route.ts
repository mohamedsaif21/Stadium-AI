import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MOCK_INCIDENTS, MOCK_SOP_RESPONSES } from '@/lib/mock-data';
import { Incident } from '@/lib/types';

const incidents = [...MOCK_INCIDENTS];

const createSchema = z.object({
  type: z.enum(['lost_child', 'medical', 'ticket', 'crowd', 'accessibility', 'other']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(1000),
  location: z.string().min(1, 'Location is required').max(200),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  reportedBy: z.string().min(1),
});

export async function GET() {
  return NextResponse.json({ incidents });
}

export async function POST(request: NextRequest) {
  try {
    const userRoleHeader = request.headers.get('x-user-role');
    if (!userRoleHeader || (userRoleHeader !== 'volunteer' && userRoleHeader !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid incident data' }, { status: 400 });
    }

    const { type, title, description, location, severity, reportedBy } = parsed.data;
    const aiSuggestedResponse = MOCK_SOP_RESPONSES[type] || 'Assess the situation and follow standard procedures.';

    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      type,
      title,
      description,
      location,
      severity,
      status: 'open',
      reportedBy,
      aiSuggestedResponse,
      createdAt: new Date(),
    };

    incidents.unshift(newIncident);
    return NextResponse.json({ incident: newIncident }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userRoleHeader = request.headers.get('x-user-role');
    if (!userRoleHeader || (userRoleHeader !== 'volunteer' && userRoleHeader !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
    }

    const body = await request.json();
    const { id, status, assignedTo } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Incident ID is required' }, { status: 400 });
    }

    const index = incidents.findIndex(i => i.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    if (status) incidents[index].status = status;
    if (assignedTo) incidents[index].assignedTo = assignedTo;
    if (status === 'resolved') incidents[index].resolvedAt = new Date();

    return NextResponse.json({ incident: incidents[index] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
