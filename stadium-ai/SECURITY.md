# Security Guide — StadiumAI

This document outlines the security architecture, data validation protocols, and defensive measures implemented in StadiumAI.

---

## 🛡️ Security Architecture Overview

```
[Client App] ──( HTTPS )──> [Role Middleware] ──> [Zod Validation] ──> [AI System Prompts / DB]
```

---

## 🔑 Core Security Measures

### 1. Environment Variable Protection
*   All API secrets and private credentials (e.g. `GENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are loaded on the server and are strictly excluded from git tracking via `.gitignore`.
*   Public environment variables prefix with `NEXT_PUBLIC_` to explicitly declare safe client exposure.

### 2. Strict Input Validation (Zod Schemas)
Every server-side route processes incoming payloads through strict schemas:
```typescript
// Example from src/app/api/ai/chat/route.ts
const chatSchema = zod.object({
  message: zod.string().min(1).max(1000),
  role: zod.enum(['fan', 'volunteer', 'admin']),
});
```
This blocks SQL injections, script payloads, and overflows before they hit our database or AI provider.

### 3. Server-Side Role Middleware
*   Routes check credentials and evaluate active roles (`fan` vs `volunteer` vs `admin`) in the API header requests (`X-User-Role`).
*   Unauthorized attempts to POST alerts or access admin endpoints return an immediate `HTTP 403 Forbidden` response.

### 4. Chatbot XSS Mitigation
*   Chat message elements inside [Chatbot.tsx](file:///d:/Projects/FIFA/stadium-ai/src/components/Chatbot.tsx) do NOT use `dangerouslySetInnerHTML`.
*   We use a custom mapping tokenizer (`renderInlineStyles`) that splits text on inline bold markers (`**`) and translates them to safe React JSX structures (`<strong>`), automatically escaping script tags and brackets.

---

## 📋 Security Checklist

- [x] **Secrets Separation**: Zero secrets in source code files.
- [x] **Strict API Schemas**: Zod validation maps all incoming request parameters.
- [x] **Middleware Authorization**: Checks roles in server request headers.
- [x] **XSS Safe rendering**: Chat elements escape raw HTML output automatically.
- [x] **GenAI Guardrails**: System instructions define conversational boundaries.
