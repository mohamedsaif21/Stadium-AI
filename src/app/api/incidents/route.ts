import { NextRequest } from 'next/server';
import { MOCK_INCIDENTS, MOCK_SOP_RESPONSES } from '@/lib/mock-data';
import { Incident } from '@/lib/types';
import { fail, ok, parseJson, rateLimit, requireRole, requireSameOrigin, validationMessage } from '@/lib/api';
import { incidentCreateSchema, incidentUpdateSchema } from '@/lib/schemas';

const incidents = [...MOCK_INCIDENTS];

export async function GET(request: NextRequest) {
  const limited = rateLimit(request, 'incidents-read', 60);
  if (limited) return limited;
  const forbidden = requireRole(request, ['volunteer', 'admin']);
  if (forbidden) return forbidden;
  return ok({ incidents });
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'incidents-write', 20);
  if (limited) return limited;
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  try {
    const forbidden = requireRole(request, ['volunteer', 'admin']);
    if (forbidden) return forbidden;
    const { type, title, description, location, severity, reportedBy } = await parseJson(request, incidentCreateSchema);
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
    return ok({ incident: newIncident }, 201);
  } catch (error) {
    const message = validationMessage(error, 'Invalid incident data');
    return fail(message === 'Invalid incident data' ? 'Internal server error' : message, message === 'Invalid incident data' ? 500 : 400);
  }
}

export async function PATCH(request: NextRequest) {
  const limited = rateLimit(request, 'incidents-update', 30);
  if (limited) return limited;
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  try {
    const forbidden = requireRole(request, ['volunteer', 'admin']);
    if (forbidden) return forbidden;
    const { id, status, assignedTo } = await parseJson(request, incidentUpdateSchema);

    const index = incidents.findIndex(i => i.id === id);
    if (index === -1) {
      return fail('Incident not found', 404, 'NOT_FOUND');
    }

    if (status) incidents[index].status = status;
    if (assignedTo) incidents[index].assignedTo = assignedTo;
    if (status === 'resolved') incidents[index].resolvedAt = new Date();

    return ok({ incident: incidents[index] });
  } catch (error) {
    const message = validationMessage(error, 'Invalid incident data');
    return fail(message === 'Invalid incident data' ? 'Internal server error' : message, message === 'Invalid incident data' ? 500 : 400);
  }
}
