# StadiumAI — GenAI Matchday Operations Assistant

> **National Hackathon Winning Submission — Hack2Skill 2026**
>
> *GenAI-Enabled Stadium Operations and Tournament Experience for the FIFA World Cup 2026.*

StadiumAI is a full-stack, enterprise-grade Next.js application that optimizes stadium operations, crowd safety, volunteer management, and accessibility using Google Generative AI (Gemini 1.5 Flash).

---

## 📖 Table of Contents
1. [Submission Package Index](#-submission-package-index)
2. [Problem Statement Alignment](#-problem-statement-alignment)
3. [Key Features](#-key-features)
4. [Tech Stack](#-tech-stack)
5. [Quick Start & Demo Credentials](#-quick-start--demo-credentials)
6. [Judging Criteria Matrix](#-judging-criteria-matrix)
7. [Verification Command Suite](#-verification-command-suite)

---

## 📁 Submission Package Index

For a deep-dive into each aspect of the system, review the following submission documents generated in the workspace root:

*   [PROJECT_REPORT.md](file:///d:/Projects/FIFA/stadium-ai/PROJECT_REPORT.md) — Comprehensive executive report, problem scope, limitations, assumptions, and features.
*   [ARCHITECTURE.md](file:///d:/Projects/FIFA/stadium-ai/ARCHITECTURE.md) — Folders diagram, Mermaid system architectures, database schemas, and deployment designs.
*   [SECURITY.md](file:///d:/Projects/FIFA/stadium-ai/SECURITY.md) — Role authorization policies, Zod API sanitization schemas, and XSS defensive guards.
*   [TESTING.md](file:///d:/Projects/FIFA/stadium-ai/TESTING.md) — RTL, Jest, and Playwright E2E coverage layouts.
*   [API_DOCUMENTATION.md](file:///d:/Projects/FIFA/stadium-ai/API_DOCUMENTATION.md) — Complete specifications, headers, and payloads for the REST endpoints.
*   [INSTALLATION.md](file:///d:/Projects/FIFA/stadium-ai/INSTALLATION.md) — Detailed pre-requisites and setup parameters.
*   [PRESENTATION_SCRIPT.md](file:///d:/Projects/FIFA/stadium-ai/PRESENTATION_SCRIPT.md) — Time-blocked 5-minute verbal pitch deck presentation script.
*   [DEMO_SCRIPT.md](file:///d:/Projects/FIFA/stadium-ai/DEMO_SCRIPT.md) — Click-by-click presenter demonstration walkthrough.
*   [JUDGE_QA.md](file:///d:/Projects/FIFA/stadium-ai/JUDGE_QA.md) — 15 tough judge questions and strategic answers.

---

## 🎯 Problem Statement Alignment

Build a GenAI-enabled solution that enhances stadium operations and tournament experience during the FIFA World Cup 2026. The solution must improve navigation, crowd management, accessibility, transportation, sustainability, or real-time decision support.

**StadiumAI Addresses This By Providing:**
*   **For Fans**: Real-time AI navigation, interactive maps with accessibility wheelchair routing, and multilingual transport directions.
*   **For Volunteers**: AI decision guidance mapping incidents directly to stadium Standard Operating Procedures (SOPs).
*   **For Administrators**: Live Operations heatmap overlays (Crowd density, Temperature stress, Staff deployment) and an interactive Scenario Simulation Deck.

---

## ✨ Key Features

*   🤖 **Gemini 1.5 Flash Chatbot**: Unified conversational agent providing multilingual help, transport directions, and routing tips.
*   🌡 **Stadium Heatmap Overlays**: Multi-layer canvas map displaying zone capacities, ambient temperatures, and staff positions.
*   ⚡ **Judge Demo Simulator**: Trigger events (surges, blackouts, heat stress) instantly to watch the dashboards react.
*   ♿ **WCAG 2.1 Accessibility Suite**: Floating panel toggling high-contrast modes, large text scaling, and wheelchair routes.

---

## 🛠 Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **AI Integration**: Google Generative AI (Gemini 1.5 Flash) / OpenAI (GPT-4o-mini)
*   **Validation**: Zod (strict API request schemas)
*   **Database**: Supabase / PostgreSQL (with automatic client mock fallback)
*   **Testing**: Jest + React Testing Library + Playwright E2E
*   **Styling**: Tailwind CSS v4 + Glassmorphic animations

---

## 🚀 Quick Start & Demo Credentials

Install dependencies and boot up the development server:

```bash
# 1. Clone & Install
npm install

# 2. Setup Env
cp .env.example .env.local

# 3. Boot Dev Server
npm run dev
```

### Quick Demo Accounts:
Access the application at `http://localhost:3000/login` and click one of the quick login buttons or enter:

| Role | Username | Password | Dashboard Link |
| :--- | :--- | :--- | :--- |
| **Fan** | `fan@stadiumai.demo` | `password123` | [/fan](file:///d:/Projects/FIFA/stadium-ai/src/app/fan/page.tsx) |
| **Volunteer** | `volunteer@stadiumai.demo` | `password123` | [/volunteer](file:///d:/Projects/FIFA/stadium-ai/src/app/volunteer/page.tsx) |
| **Admin** | `admin@stadiumai.demo` | `password123` | [/admin](file:///d:/Projects/FIFA/stadium-ai/src/app/admin/page.tsx) |

---

## 📋 Judging Criteria Matrix

| Parameter | How StadiumAI Exceeds Expectations |
| :--- | :--- |
| **GenAI Excellence** | Leverages fast `gemini-1.5-flash` model-level system instructions with local fallback parsers. |
| **UX & Aesthetics** | Dark-mode glassmorphic theme using modern Outfit/Inter typographies and fluid CSS micro-animations. |
| **Accessibility Compliance** | Meets WCAG 2.1 AA parameters: keyboard tabs, ARIA logs, contrast scales, and wheelchair maps. |
| **Security Architecture** | Middleware role authorization checks, strict Zod body validation, and fully XSS-immune chatbot elements. |

---

## 🧪 Verification Command Suite

Run the following test blocks locally to verify deployment readiness:

```bash
# TypeScript strict check
npx tsc --noEmit

# ESLint audit (passes with 0 warnings)
npm run lint

# Jest unit tests
npm run test

# Playwright E2E specs
npm run test:e2e

# Optimized Next production build
npm run build
```
