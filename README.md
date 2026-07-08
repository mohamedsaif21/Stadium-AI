# StadiumAI - GenAI Matchday Operations Assistant

StadiumAI is a Next.js dashboard for FIFA World Cup 2026 matchday operations. It helps fans navigate, volunteers respond to incidents, and administrators monitor crowd, alert, and sustainability signals.

No official FIFA logos or copyrighted assets are used.

## Features

- Fan dashboard with stadium navigation search and AI matchday assistant.
- Volunteer dashboard with SOP cards, incident reporting, and AI support.
- Admin dashboard with alerts, incident telemetry, sustainability metrics, scenario simulation, and crowd heatmap.
- Accessibility controls for high contrast and large text.
- Safe mock/demo mode when Supabase on work or AI provider keys are missing.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Zod validation
- Jest and React Testing Library
- Playwright E2E
- Optional OpenAI or Gemini provider
- Optional Supabase auth/profile backend

## Quick Start

```bash
npm install
copy .env.example .env.local
npm run dev
```

PowerShell may block `npm.ps1`; use `npm.cmd` if needed:

```bash
npm.cmd run dev
```

Open `http://localhost:3000`.

## Vercel Deployment

This repository stores the Next.js app in the `stadium-ai` folder. In Vercel, set:

- Framework Preset: `Next.js`
- Root Directory: `stadium-ai`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `.next`

If Vercel is pointed at the repository root instead of `stadium-ai`, the deployment can show `404: NOT_FOUND` because Vercel is not building the Next app folder.

## Demo Credentials

| Role | Email | Password | Route |
| --- | --- | --- | --- |
| Fan | `fan@stadiumai.demo` | `password123` | `/fan` |
| Volunteer | `volunteer@stadiumai.demo` | `password123` | `/volunteer` |
| Admin | `admin@stadiumai.demo` | `password123` | `/admin` |

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GENAI_API_KEY=
GENAI_PROVIDER=openai
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Leave Supabase and AI keys blank for local demo/mock mode. Never commit real keys.

## Security Improvements

- Centralized API response and error helpers.
- Zod validation for chat, alerts, incidents, incident updates, navigation, and decision support.
- Role checks on protected API actions.
- Basic in-memory rate limiting for AI endpoints.
- Prompt-injection refusal checks and AI text sanitization.
- Safe React rendering without `dangerouslySetInnerHTML`.

## Code Quality Improvements

- Shared schemas in `src/lib/schemas.ts`.
- Shared API helpers in `src/lib/api.ts`.
- Environment helpers in `src/lib/env.ts`.
- Reusable UI primitives in `src/components/ui.tsx`.
- Existing API routes preserved with more consistent responses.

## Verification

```bash
npm run lint
npm run build
npm run test
npm run test:e2e
```

Latest local verification:

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed with a native Windows SWC warning and fallback.
- `npm.cmd run test -- --runInBand`: passed, 9 suites and 35 tests.
- `npm.cmd run test:e2e`: passed, 11 Playwright tests.
