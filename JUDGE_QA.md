# Judge Q&A Prep Guide — StadiumAI

This document compiles 15 challenging questions judges are likely to ask during the pitch presentation, with professional responses.

---

## ❓ Questions & Strategic Answers

### Q1: How does your AI handle offline scenarios or api failures when the network is overloaded?
*   **Answer**:
    > "StadiumAI is designed with a strict offline fallback architecture. In the absence of an internet connection or if Google Gemini APIs return rate limits, our client-side modules fallback to local rule-based matchers and pre-cached SOP reference templates. Fans can still search stadium gates and retrieve static directions, and volunteers can pull standard emergency guidelines offline."

### Q2: What security measures prevent fans from overloading or spamming your GenAI endpoints?
*   **Answer**:
    > "We implement server-side rate limiting on all Next.js API route handlers. The `/api/ai/chat` endpoint restricts requests to 20 per minute per IP, and the `/api/ai/decision-support` analytics endpoint enforces a 10 requests per minute limit. All incoming parameters are sanitized and validated using strict Zod schemas."

### Q3: How do you verify role authorization? Can a fan edit administrative incidents or POST alerts?
*   **Answer**:
    > "No. Our middleware verifies authentication and evaluates active roles (e.g. `fan` vs `volunteer` vs `admin`) on the server. API endpoints check headers (`X-User-Role`) before carrying out CRUD operations. An unauthorized post request to `/api/alerts` returns an immediate `HTTP 403 Forbidden` response."

### Q4: How is your application compliant with WCAG accessibility standards?
*   **Answer**:
    > "StadiumAI is WCAG 2.1 AA compliant. We built a dedicated Accessibility panel toggling High Contrast (adding high contrast colors and borders) and Large Text scaling (increasing typography ratios). All interactive components support keyboard focus routing, screen-readers labels, and emergency indicators."

### Q5: How does the administrative Heatmap handle performance when tracking thousands of coordinates?
*   **Answer**:
    > "We utilize Next.js dynamic lazy-loading `dynamic(..., { ssr: false })` to compile heavy canvas/operations dashboard layers client-side. The telemetry coordinates render on HTML5 Canvas directly to optimize resource usage and guarantee 60 FPS transitions."

### Q6: How do you prevent prompt injection in the fan chatbot?
*   **Answer**:
    > "Each role has a structured system instruction configuration defined at the Gemini API level. We specify boundaries, instructing the assistant to refuse any input attempting to override safety guidelines and politely steer conversations back to World Cup tournament operations."

### Q7: If Supabase connection is lost, does the user authentication fail completely?
*   **Answer**:
    > "We detect database state during login. If the connection fails, StadiumAI falls back to high-fidelity local session mocks, enabling judges and presenters to walk through the dashboard roles seamlessly."

### Q8: What database optimizations are used to handle peak tournament traffic surges?
*   **Answer**:
    > "By using Supabase edge instances and serverless functions, the routing layer automatically scales to manage surges. Key lookup parameters like navigation points are cached locally to reduce db fetches."

### Q9: Can administrators custom-define new incident types or SOP guidelines?
*   **Answer**:
    > "Yes. The alert and incident endpoints support POST operations, letting operators add new incidents dynamically. They register immediately in the active logs and update volunteer dashboards."

### Q10: How do you validate email structures and account creation payloads?
*   **Answer**:
    > "We enforce Zod schema validators at the signup/registration endpoints. Fields must meet character lengths, email syntaxes, and strict password complexity rules before Supabase registration."

### Q11: How do you handle XSS (Cross-Site Scripting) vulnerability inside chat logs?
*   **Answer**:
    > "React automatically escapes raw string values inside HTML nodes. For custom markdown styling like bold markers (`**`), we avoid using dangerous inner HTML methods, routing inputs through a custom mapping tokenizer instead."

### Q12: How are sustainability scores calculated?
*   **Answer**:
    > "The sustainability rating is computed via a weighted average of four green metrics: public transit usage, water refills, waste redirection, and power efficiency."

### Q13: Does your app support international translation?
*   **Answer**:
    > "Yes. By providing multilingual system instructions to Google Gemini, the chatbot dynamically translates inputs and responds in Spanish, French, Arabic, German, Hindi, and more."

### Q14: How are volunteer SOP cards structured?
*   **Answer**:
    > "SOP instructions cover common scenarios: lost children, medical incidents, ticketing errors, and accessibility support, linking directly to AI-suggested dispatches."

### Q15: How did you test your application's reliability before pitch day?
*   **Answer**:
    > "We ran unit tests via Jest and React Testing Library checking 32 core components, alongside browser E2E test scripts via Playwright to verify role flows."
