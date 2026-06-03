# AI Chat Widget Design Document

## 1. Architecture Overview
The AI Chat Widget is designed using a modular approach to ensure separation of concerns, testability, and ease of integration.

### Modules
- **`ChatAPI` (Network Layer)**: Handles all communication with the backend.
    - Implementation of `fetch` with `AbortController`.
    - Strict timeout management (30s).
    - Error handling for network failures and API errors.
- **`ChatStorage` (Data Layer)**: Manages persistence.
    - Wraps `localStorage` for saving and retrieving message history.
    - Handles data serialization.
- **`ChatUI` (View Layer)**: Purely handles DOM manipulation.
    - Renders messages using `textContent` (XSS prevention).
    - Manages CSS classes for themes (Light/Dark).
    - Handles animations and accessibility (ARIA).
- **`ChatWidget` (Controller)**: The main orchestrator.
    - Event listeners (Enter, Shift+Enter, Click).
    - Coordinates flow: User Input $\rightarrow$ API $\rightarrow$ Storage $\rightarrow$ UI.

## 2. File Structure
```text
/assets/ai-chat/
├── css/
│   └── chat-widget.css    # Modern CSS variables, Glassmorphism, Animations
├── js/
│   ├── chat-api.js        # Network logic & AbortController
│   ├── chat-storage.js    # LocalStorage management
│   ├── chat-ui.js         # DOM manipulation & A11y
│   └── chat-widget.js     # Main Entry point and Controller
└── index.html             # Implementation example/template
```

## 3. UX/UI Specification
- **Visual Style**: Modern Minimalist / Glassmorphism.
- **Adaptive**: Fully responsive (Mobile/Desktop).
- **Interactions**: 
    - Floating action button (FAB) to open/close.
    - Typing indicator while waiting for response.
    - Auto-scroll to bottom.
- **Security**: No `innerHTML` for user/AI content.

## 4. API Integration
- **Endpoint**: `POST /api/chat`
- **Request**: `{ "message": "..." }`
- **Response**: `{ "answer": "..." }`
- **Constraints**: 30s timeout, Block button during request, Retry logic.
