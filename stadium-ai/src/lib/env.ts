export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function isAIConfigured() {
  return Boolean(process.env.GENAI_API_KEY);
}

export function getAIProvider() {
  const provider = process.env.GENAI_PROVIDER;
  return provider === 'gemini' || provider === 'openai' ? provider : 'openai';
}
