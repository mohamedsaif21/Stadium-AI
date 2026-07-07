import { User, UserRole } from './types';
import { MOCK_USERS, MOCK_PASSWORD } from './mock-data';
import { isSupabaseConfigured } from './env';

const MOCK_MODE = !isSupabaseConfigured();

interface AuthResult {
  user: User | null;
  error: string | null;
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  if (MOCK_MODE) {
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) return { user: null, error: 'Invalid email or password' };
    if (password !== MOCK_PASSWORD) return { user: null, error: 'Invalid email or password' };
    return { user, error: null };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    const profile = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    return { user: { id: data.user.id, email: email, name: profile.data?.name || email, role: profile.data?.role || 'fan' }, error: null };
  } catch {
    return { user: null, error: 'Authentication failed' };
  }
}

export async function registerUser(email: string, password: string, name: string, role: UserRole): Promise<AuthResult> {
  if (MOCK_MODE) {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) return { user: null, error: 'Email already registered' };
    const newUser: User = { id: `user-${Date.now()}`, email, name, role };
    MOCK_USERS.push(newUser);
    return { user: newUser, error: null };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { user: null, error: error.message };
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, email, name, role });
    }
    return { user: { id: data.user?.id || '', email, name, role }, error: null };
  } catch {
    return { user: null, error: 'Registration failed' };
  }
}

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'fan':
      return '/fan';
    case 'volunteer':
      return '/volunteer';
    case 'admin':
      return '/admin';
  }
}

export function isMockMode(): boolean {
  return MOCK_MODE;
}
