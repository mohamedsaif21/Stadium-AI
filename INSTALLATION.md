# Installation & Setup Guide - StadiumAI

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Chromium dependencies for Playwright E2E tests

## Install

```bash
npm install
copy .env.example .env.local
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`:

```bash
npm.cmd run dev
```

Open `http://localhost:3000`.

## Environment Modes

### Demo Mode

Leave Supabase and AI keys blank to use deterministic mock users, local incident data, and safe AI fallback responses. This is the recommended hackathon judging mode because every workflow runs without third-party setup.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
GENAI_PROVIDER=openai
```

### Live AI Mode

```env
GENAI_PROVIDER=openai
GENAI_API_KEY=your_api_key
```

or:

```env
GENAI_PROVIDER=gemini
GENAI_API_KEY=your_api_key
```

### Supabase Mode

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Production deployments should replace demo role headers with verified Supabase sessions and row-level security.

## Validation

Run the full judging validation suite before submission:

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run test
npm run test:e2e
```

## Deployment

For Vercel:

- Framework Preset: `Next.js`
- Root Directory: `stadium-ai`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `.next`
