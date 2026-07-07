# Live Demo Walkthrough Script — StadiumAI

This script guides the pitch presenter through a flawless click-through demonstration of the StadiumAI application.

---

## 🚀 Demo Setup
1.  Boot the app: `npm run dev` and open `http://localhost:3000`.
2.  Have three tabs open in your browser:
    *   **Tab 1**: Landing/Login page.
    *   **Tab 2**: Volunteer Dashboard (Logged in).
    *   **Tab 3**: Admin Dashboard (Logged in).

---

## ⏱️ Step-by-Step Walkthrough

### Step 1: The Landing Experience & Credentials (0:00 - 0:30)
1.  **Action**: Start on `http://localhost:3000`. Scroll down to show the custom features card grid.
2.  **Verbal**:
    > "Welcome to the StadiumAI home page. We have styled this portal with a premium glassmorphic dark theme, highlighting tournament alignments. 
    > 
    > Let's sign in. We have provided quick demo login presets for the judges so they can inspect all dashboards without manual registration."
3.  **Action**: Click the **Demo Quick Login (Fan)** button.

---

### Step 2: The Fan Experience & Accessibility (0:30 - 1:30)
1.  **Action**: Inside `/fan`, scroll to show the floating accessibility widget.
2.  **Verbal**:
    > "As a fan, my dashboard is optimized for matchday comfort. Let's look at accessibility: clicking our expandable panel lets me toggle High Contrast and Large Text instantly, ensuring WCAG 2.1 compliance."
3.  **Action**: Click **Nearest Restroom** suggest button, then type: *"Where is Gate B? I need wheelchair access."* and click Search.
4.  **Verbal**:
    > "The system computes the instructions, showing wheelchair-compliant route steps and time estimates. At the same time, the conversational chatbot processes the query speaking my language."

---

### Step 3: Admin Scenario Simulation (1:30 - 2:45)
1.  **Action**: Switch to the **Admin Dashboard** tab (`/admin`). Show the live heatmap coordinates and sustainability score meters.
2.  **Verbal**:
    > "Now, let's step into the shoes of the Venue Operations Director. Here, I track gate capacities, thermal sensors, and staffing positions using the live heatmap layers.
    > 
    > Let's simulate a matchday crisis. I'll open our Judge Simulation Deck and trigger a Gate B Crowd Surge."
3.  **Action**: Click the **🚨 Gate B Surge** simulator button. Point to the alerts box.
4.  **Verbal**:
    > "Immediately, a critical alert is injected across the entire system. Volunteers are notified, and our decision support prompt recommends dynamic signage adjustments."

---

### Step 4: Volunteer Dispatch (2:45 - 3:45)
1.  **Action**: Switch to the **Volunteer Dashboard** tab (`/volunteer`). Point to the newly added incident list item.
2.  **Verbal**:
    > "On the volunteer dashboard, the team sees the emergency dispatch in real-time. They can click on SOP quick cards to retrieve AI-suggested responses or update status to in-progress or resolved. 
    > 
    > Everything connects, ensuring crowd safety matches official FIFA tournament rules."
