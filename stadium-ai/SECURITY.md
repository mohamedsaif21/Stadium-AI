# Security Guide - StadiumAI

StadiumAI is designed to run safely in demo/mock mode while supporting Supabase and AI providers when server-side environment variables are configured.

## Security Measures

- Secrets are not committed. `.env.example` contains placeholders only.
- Server API keys such as `GENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to client code.
- API handlers use shared response helpers in `src/lib/api.ts` so errors are consistent and do not return stack traces.
- API inputs are validated with shared Zod schemas in `src/lib/schemas.ts`.
- Protected write actions enforce role checks for `fan`, `volunteer`, and `admin` using request role headers in demo mode.
- AI calls use role-specific system prompts, prompt-injection refusal checks, provider fallback, and text sanitization before responses reach the UI.
- Chat rendering avoids `dangerouslySetInnerHTML`; React escapes user and AI text by default.
- AI chat and admin decision-support endpoints include in-memory rate limiting for demo deployment.

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GENAI_API_KEY=
GENAI_PROVIDER=openai
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If Supabase or AI keys are missing, StadiumAI stays in mock mode with safe local demo users and deterministic AI fallback responses.

## Demo Auth Model

The current hackathon demo uses client-stored mock users plus server-side route role checks. This is acceptable for a judged prototype, but production should replace request role headers with verified Supabase sessions, server-side claims, and database row-level security.

## Security Checklist

- [x] Removed exposed sample secrets from `.env.example`.
- [x] Added centralized API error responses.
- [x] Added shared Zod schemas for chat, alerts, incidents, navigation, and decision support.
- [x] Added basic rate limiting to AI endpoints.
- [x] Added prompt-injection refusal behavior.
- [x] Sanitized AI provider text responses.
- [x] Preserved safe mock mode when external services are unavailable.
