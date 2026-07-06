# Pitch Presentation Script — StadiumAI

**Presentation Title**: StadiumAI: GenAI-Enabled Operations for the FIFA World Cup 2026  
**Target Duration**: 5 Minutes (Time-blocked)

---

## ⏱️ Slide-by-Slide Script

### Slide 1: Title & Vision (0:00 - 0:30)
*   **Visual**: A dark, glowing render of a stadium. The words: "StadiumAI: Intelligent Tournament Operations Hub".
*   **Presenter Script**:
    > "Good morning, judges. The FIFA World Cup 2026 will be the largest in history: 48 teams, 104 matches, and stadiums packed with 70,000+ fans. But managing tournaments of this scale triggers massive challenges in crowd safety, accessibility, and emergency support.
    > 
    > Today, we present **StadiumAI** — an enterprise-grade Matchday Operations SaaS powered by Google Gemini 1.5 Flash. It bridges the gap between administrators, volunteers, and fans to ensure a safe, sustainable, and inclusive matchday experience."

---

### Slide 2: The Problem Scope (0:30 - 1:15)
*   **Visual**: Three warning icons: "Crowd Congestion", "Accessibility Barriers", "Information Silos".
*   **Presenter Script**:
    > "During matchday, venue directors are swamped with telemetry data, yet lack action-oriented tools. Volunteers struggle to navigate thick binder manuals for emergency procedures. And international fans face language barriers and routing struggles. 
    >
    > Traditional solutions are static. They do not react to surges. StadiumAI, however, dynamically integrates AI, live maps, and accessibility profiles to solve these challenges in real-time."

---

### Slide 3: The Architecture & GenAI Integration (1:15 - 2:00)
*   **Visual**: Architectural layout map showing Next.js App Router, Zod validation filters, and the Google Gemini 1.5 Flash API connector.
*   **Presenter Script**:
    > "Architecturally, StadiumAI is built on Next.js 16 and strict TypeScript. We use Google Gemini 1.5 Flash's fast token inference speeds for multilingual assistance. 
    >
    > Every input is sanitized via server-side Zod schemas, checking user roles and rate limits to block XSS and prompt injection. When external services are offline, our client-side fallback engines maintain complete local operation."

---

### Slide 4: Dashboard Highlights & Live Demo (2:00 - 4:15)
*   **Visual**: Live screenshot highlights of the Admin heatmaps, Volunteer SOP dispatches, and Fan navigation tools.
*   **Presenter Script**:
    > "Let's look at the operational panels.
    > 
    > First, our **Admin Dashboard** displays live telemetry over our stadium zone heatmap, letting operators run crisis simulator triggers. 
    > 
    > Second, our **Volunteer Dashboard** links incoming safety incidents directly to AI SOP suggestions. 
    > 
    > Finally, our **Fan Dashboard** maps gates and restrooms, giving multilingual support and wheelchair paths at the click of a button."
    > 
    > *(Proceed to trigger a live demo click-through)*

---

### Slide 5: Future Roadmap & Q&A (4:15 - 5:00)
*   **Visual**: A grid showing: "1. WebSocket Egress Updates", "2. IoT Smart Counting", "3. AR Camera Wayfinding".
*   **Presenter Script**:
    > "Our roadmap focuses on live WebSocket notifications, smart gate counting IoT sensors, and AR-guided seat-finding cameras.
    > 
    > StadiumAI proves how GenAI can make major sporting tournaments safer, inclusive, and operational. We are now open for Q&A. Thank you."
