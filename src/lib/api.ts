import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { UserRole } from './types';
import { isSameOrigin } from './security';

type ApiPayload = object;

const rateLimitStore = new Map<string, number[]>();

export function ok<T extends ApiPayload>(payload: T, status = 200) {
  return NextResponse.json({ ok: true, ...payload }, { status });
}

export function fail(message: string, status = 400, code = 'BAD_REQUEST') {
  return NextResponse.json({ ok: false, error: message, code }, { status });
}

export async function parseJson<T>(request: NextRequest, schema: ZodSchema<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new Error('Request body must be valid JSON');
  }
  return schema.parse(body);
}

export function validationMessage(error: unknown, fallback = 'Invalid request') {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || fallback;
  }
  if (error instanceof Error && error.message === 'Request body must be valid JSON') {
    return error.message;
  }
  return fallback;
}

export function requireRole(request: NextRequest, allowed: UserRole[]) {
  const role = request.headers.get('x-user-role');
  if (!role || !allowed.includes(role as UserRole)) {
    return fail('Forbidden', 403, 'FORBIDDEN');
  }
  return null;
}

export function requireSameOrigin(request: NextRequest) {
  return isSameOrigin(request.headers) ? null : fail('Forbidden', 403, 'FORBIDDEN');
}

export function rateLimit(request: NextRequest, scope: string, limit: number, windowMs = 60_000) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || request.headers.get('x-real-ip') || 'unknown';
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (rateLimitStore.get(key) || []).filter(timestamp => now - timestamp < windowMs);

  if (recent.length >= limit) {
    return fail('Rate limit exceeded. Please try again later.', 429, 'RATE_LIMITED');
  }

  recent.push(now);
  rateLimitStore.set(key, recent);
  return null;
}
