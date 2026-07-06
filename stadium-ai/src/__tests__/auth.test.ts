import { loginUser, getRedirectPath, isMockMode } from '@/lib/auth';

describe('Auth Module', () => {
  it('logs in fan user', async () => {
    const result = await loginUser('fan@stadiumai.demo', 'password123');
    expect(result.user).toBeTruthy();
    expect(result.user?.email).toBe('fan@stadiumai.demo');
    expect(result.user?.role).toBe('fan');
  });

  it('logs in volunteer user', async () => {
    const result = await loginUser('volunteer@stadiumai.demo', 'password123');
    expect(result.user).toBeTruthy();
    expect(result.user?.role).toBe('volunteer');
  });

  it('logs in admin user', async () => {
    const result = await loginUser('admin@stadiumai.demo', 'password123');
    expect(result.user).toBeTruthy();
    expect(result.user?.role).toBe('admin');
  });

  it('rejects invalid credentials', async () => {
    const result = await loginUser('wrong@email.com', 'wrongpass');
    expect(result.user).toBeNull();
    expect(result.error).toBeTruthy();
  });

  it('returns correct redirect paths', () => {
    expect(getRedirectPath('fan')).toBe('/fan');
    expect(getRedirectPath('volunteer')).toBe('/volunteer');
    expect(getRedirectPath('admin')).toBe('/admin');
  });

  it('is in mock mode when no Supabase URL', () => {
    const original = process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(isMockMode()).toBe(true);
    process.env.NEXT_PUBLIC_SUPABASE_URL = original;
  });
});
