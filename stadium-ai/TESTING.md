# Testing Guide - StadiumAI

## Commands

```bash
npm run lint
npm run build
npm run test
npm run test:e2e
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run test
npm.cmd run test:e2e
```

## Coverage Areas

- Landing page rendering and primary navigation.
- Login and mock auth redirects.
- Role-specific dashboard access.
- API validation schemas for chat, incidents, alerts, and updates.
- Navigation search behavior.
- Incident submission and status handling.
- Admin dashboard rendering.
- Accessibility controls.
- AI safety fallback for prompt-injection attempts.
- Playwright flows for fan, volunteer, admin, and landing pages.

## Latest Verification

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed. Next emitted a native Windows SWC warning and used its fallback path.
- `npm.cmd run test -- --runInBand`: passed, 9 suites and 35 tests.
- `npm.cmd run test:e2e`: passed, 11 Playwright tests.

The Playwright config starts the dev server automatically.
