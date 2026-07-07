# API Specification — StadiumAI

This document defines the REST API endpoints, payload models, and validation logic configured in StadiumAI.

---

## 🏗️ API Flow Diagram

```text
[Client Fetch] ──> [Authorization Check Header] ──> [Zod Payload validation] ──> [Success Handler]
```

---

## 📡 Endpoint Directory

### 1. Conversational Chat Assistant
*   **Path**: `/api/ai/chat`
*   **Method**: `POST`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `X-User-Role: fan | volunteer | admin` (Required)
*   **Request Schema (Zod)**:
    ```typescript
    const chatSchema = zod.object({
      message: zod.string().min(1).max(1000),
      role: zod.enum(['fan', 'volunteer', 'admin']),
    });
    ```
*   **Response (200 OK)**:
    ```json
    {
      "response": "Hello! I am your AI assistant...",
      "mock": false
    }
    ```

---

### 2. Operations Decision Support (Admin Analytics)
*   **Path**: `/api/ai/decision-support`
*   **Method**: `POST`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `X-User-Role: admin` (Required)
*   **Request Schema**:
    ```typescript
    const decisionSchema = zod.object({
      query: zod.string().min(1).max(1000),
    });
    ```
*   **Response (200 OK)**:
    ```json
    {
      "response": "Based on crowd surge data in Gate B: Activate dynamic signs...",
      "mock": false
    }
    ```

---

### 3. Active Incident Reporting
*   **Path**: `/api/incidents`
*   **Methods**: `GET` | `POST` | `PATCH`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `X-User-Role: volunteer | admin`
*   **Post Request Schema**:
    ```typescript
    const incidentSchema = zod.object({
      title: zod.string().min(3),
      description: zod.string().min(5),
      location: zod.string(),
      type: zod.enum(['medical', 'security', 'crowd', 'other']),
      severity: zod.enum(['low', 'medium', 'high', 'critical']),
    });
    ```
*   **Response (201 Created)**:
    ```json
    {
      "id": "inc-17833501",
      "title": "Heat Exhaustion",
      "status": "open"
    }
    ```

---

### 4. Venue Alerts
*   **Path**: `/api/alerts`
*   **Methods**: `GET` | `POST`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `X-User-Role: admin` (Required for POST)
*   **Post Request Schema**:
    ```typescript
    const alertSchema = zod.object({
      title: zod.string().min(3),
      message: zod.string().min(5),
      zone: zod.string(),
      severity: zod.enum(['info', 'warning', 'critical']),
    });
    ```
*   **Response (201 Created)**:
    ```json
    {
      "id": "alert-178335",
      "title": "Gate B Congestion",
      "severity": "critical"
    }
    ```

---

### 5. Sustainability Metrics
*   **Path**: `/api/sustainability`
*   **Method**: `GET`
*   **Response (200 OK)**:
    ```json
    {
      "score": 82,
      "metrics": [
        { "label": "Public Transit", "value": "78", "unit": "%", "status": "good" },
        { "label": "Waste Diverted", "value": "92", "unit": "%", "status": "good" }
      ],
      "suggestions": [
        "Encourage water station refills to reduce bottle waste."
      ]
    }
    ```
