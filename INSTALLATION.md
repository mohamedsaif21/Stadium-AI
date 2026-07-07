# Installation & Setup Guide — StadiumAI

Follow this step-by-step guide to run the StadiumAI development environment locally or deploy to production.

---

## 📋 Prerequisites
Ensure you have the following software installed:
*   **Node.js**: `v18.x` or higher
*   **npm**: `v9.x` or higher

---

## 🛠️ Step 1: Install Dependencies
Clone the repository, navigate into the project folder, and run npm installation:
```bash
npm install
```

---

## ⚙️ Step 2: Configure Environment Variables
Create an `.env.local` file by copying the template file:
```bash
cp .env.example .env.local
```

### Setup Options:

#### Option A: Zero-Configuration Demo Mode (Recommended)
Leave the Supabase and AI keys blank or configured with mock credentials inside `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
StadiumAI will automatically detect the absence of keys and fall back to robust local/localStorage mock engines. **All dashboards, navigation searching, incident dispatches, and simulations run with 100% fidelity in this mode without any API subscriptions.**

#### Option B: Live GenAI Integration
Specify your Google AI key to connect to real Gemini API endpoints:
```env
GENAI_PROVIDER=gemini
GENAI_API_KEY=your_gemini_api_key_here
```

---

## 🚀 Step 3: Run the App
Launch the development web server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🧪 Step 4: Verification Checklists
Before deploying, execute the validation command suite to verify compliance:
```bash
# 1. Typecheck
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Jest Unit Tests
npm run test

# 4. Playwright E2E Tests
npm run test:e2e

# 5. Production Optimization Build
npm run build
```
