import { z } from 'zod';

export const userRoleSchema = z.enum(['fan', 'volunteer', 'admin']);

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message too long'),
  role: userRoleSchema,
  context: z.record(z.string(), z.unknown()).optional(),
});

export const decisionSupportSchema = z.object({
  query: z.string().trim().min(1, 'Query is required').max(1000, 'Query too long'),
});

export const incidentCreateSchema = z.object({
  type: z.enum(['lost_child', 'medical', 'ticket', 'crowd', 'accessibility', 'other']),
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().min(1, 'Description is required').max(1000),
  location: z.string().trim().min(1, 'Location is required').max(200),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  reportedBy: z.string().trim().min(1, 'Reporter is required').max(120),
});

export const incidentUpdateSchema = z.object({
  id: z.string().trim().min(1, 'Incident ID is required'),
  status: z.enum(['open', 'resolved', 'in_progress']).optional(),
  assignedTo: z.string().trim().max(120).optional(),
});

export const alertCreateSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  message: z.string().trim().min(1, 'Message is required').max(500),
  zone: z.string().trim().min(1, 'Zone is required').max(200),
  severity: z.enum(['info', 'warning', 'critical']),
  createdBy: z.string().trim().min(1, 'Creator is required').max(120),
});

export const navigationQuerySchema = z.object({
  q: z.string().trim().min(1, 'Query is required').max(500, 'Query too long'),
  accessible: z.coerce.boolean().optional(),
});

export const navigationSearchSchema = z.object({
  search: z.string().trim().min(1, 'Search is required').max(500, 'Search query too long'),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
