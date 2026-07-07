import {
  alertCreateSchema,
  chatRequestSchema,
  incidentCreateSchema,
  incidentUpdateSchema,
} from '@/lib/schemas';

describe('API Input Validation', () => {
  it('validates chat request', () => {
    const valid = chatRequestSchema.safeParse({ message: 'Hello', role: 'fan' });
    expect(valid.success).toBe(true);
  });

  it('rejects chat with missing message', () => {
    const result = chatRequestSchema.safeParse({ role: 'fan' });
    expect(result.success).toBe(false);
  });

  it('rejects chat with invalid role', () => {
    const result = chatRequestSchema.safeParse({ message: 'Hello', role: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('validates incident form', () => {
    const valid = incidentCreateSchema.safeParse({
      type: 'medical', title: 'Test', description: 'Test desc', location: 'Gate A', severity: 'high', reportedBy: 'vol-1',
    });
    expect(valid.success).toBe(true);
  });

  it('rejects incident with empty title', () => {
    const result = incidentCreateSchema.safeParse({
      type: 'medical', title: '', description: 'Test', location: 'Gate A', severity: 'low', reportedBy: 'vol-1',
    });
    expect(result.success).toBe(false);
  });

  it('rejects incident with invalid severity', () => {
    const result = incidentCreateSchema.safeParse({
      type: 'medical', title: 'Test', description: 'Test', location: 'Gate A', severity: 'extreme', reportedBy: 'vol-1',
    });
    expect(result.success).toBe(false);
  });

  it('validates incident updates with allowed statuses only', () => {
    expect(incidentUpdateSchema.safeParse({ id: 'inc-1', status: 'resolved' }).success).toBe(true);
    expect(incidentUpdateSchema.safeParse({ id: 'inc-1', status: 'closed' }).success).toBe(false);
  });

  it('validates alert creation payloads', () => {
    expect(alertCreateSchema.safeParse({
      title: 'Gate B Crowding',
      message: 'Redirect fans to Gate A.',
      zone: 'Gate B',
      severity: 'warning',
      createdBy: 'admin-1',
    }).success).toBe(true);
  });
});
