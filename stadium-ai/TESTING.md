# Testing Guide — StadiumAI

StadiumAI utilizes a robust multi-tiered testing suite to guarantee layout integrity, operational correctness, accessibility support, and api validations.

---

## 📁 Testing Folder Structure
*   `src/__tests__/` — Jest and React Testing Library unit tests.
*   `e2e/` — Playwright integration and browser flow test specs.

---

## 🧪 Automated Testing Breakdown

### 1. Unit Tests (Jest + React Testing Library)
Run `npm run test` to verify our 32 core test assertions:

| Test Suite | File Path | Focus Area |
| :--- | :--- | :--- |
| **Landing UI** | `landing.test.tsx` | Hero grids, CTA redirections, and login cards. |
| **Login UI** | `login.test.tsx` | Standard input forms and Demo Quick Login buttons. |
| **Navigation Rules** | `navigation.test.ts` | Path computations, time estimations, accessibility routes. |
| **Incident Validators** | `incidents.test.ts` | Local storage state tracking, SOP lookup tables. |
| **API Validators** | `api-validation.test.ts` | Zod schema checks for chat inputs and alert structures. |
| **Admin Controls** | `admin-dashboard.test.tsx` | StatCard layouts and interactive heatmap rendering. |
| **Accessibility Toggles** | `accessibility.test.tsx` | High contrast overlays and scaling properties. |
| **Auth Logic** | `auth.test.ts` | Login validations and mock-mode state routing. |

---

### 2. Integration / E2E Tests (Playwright)
Run `npm run test:e2e` to trigger browser automation across Chromium:

*   `landing.spec.ts` — Verifies user journey landing to sign-in navigation.
*   `fan.spec.ts` — Tests dashboard navigation routing, emergency triggers, and chat loads.
*   `volunteer.spec.ts` — Evaluates interactive SOP cards, task updates, and incident forms.
*   `admin.spec.ts` — Verifies live alerts creation, simulator triggers, and heatmap.

---

## 📋 Manual Pitch Day Verification Checklist

- [x] **Redirection**: Quick Login accounts direct to role-specific layouts correctly.
- [x] **Accessibility**: Toggle controls increase font sizes and highlight buttons instantly.
- [x] **Simulation**: Admin simulator triggers inject incidents and immediately update lists.
- [x] **Emergency**: Emergency assistance buttons show red alerts and trigger notifications.
