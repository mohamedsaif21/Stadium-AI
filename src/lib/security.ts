export function isSameOrigin(headers: Pick<Headers, 'get'>) {
  const origin = headers.get('origin');
  if (!origin) return true;

  const host = headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
