import { z } from 'zod';

describe('API Input Validation', () => {
  const chatSchema = z.object({
    message: z.string().min(1, 'Message is required').max(1000),
    role: z.enum(['fan', 'volunteer', 'admin']),
  });

  const incidentSchema = z.object({
    type: z.enum(['lost_child', 'medical', 'ticket', 'crowd', 'accessibility', 'other']),
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().min(1, 'Description is required').max(1000),
    location: z.string().min(1, 'Location is required').max(200),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
  });

  it('validates chat request', () => {
    const valid = chatSchema.safeParse({ message: 'Hello', role: 'fan' });
    expect(valid.success).toBe(true);
  });

  it('rejects chat with missing message', () => {
    const result = chatSchema.safeParse({ role: 'fan' });
    expect(result.success).toBe(false);
  });

  it('rejects chat with invalid role', () => {
    const result = chatSchema.safeParse({ message: 'Hello', role: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('validates incident form', () => {
    const valid = incidentSchema.safeParse({
      type: 'medical', title: 'Test', description: 'Test desc', location: 'Gate A', severity: 'high',
    });
    expect(valid.success).toBe(true);
  });

  it('rejects incident with empty title', () => {
    const result = incidentSchema.safeParse({
      type: 'medical', title: '', description: 'Test', location: 'Gate A', severity: 'low',
    });
    expect(result.success).toBe(false);
  });

  it('rejects incident with invalid severity', () => {
    const result = incidentSchema.safeParse({
      type: 'medical', title: 'Test', description: 'Test', location: 'Gate A', severity: 'extreme',
    });
    expect(result.success).toBe(false);
  });
});
