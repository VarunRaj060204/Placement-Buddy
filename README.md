# 🎯 Placement Buddy

> AI-powered mock interview platform for placement-ready engineering students.

A **Final Year Project** built with React + Claude AI that conducts structured mock interviews across three modes — DSA, HR, and System Design.

---

## 📁 Project Structure

```
placement-buddy/
├── public/
│   └── index.html               # HTML shell
├── src/
│   ├── index.js                 # React entry point
│   ├── index.css                # Global styles & CSS variables
│   ├── App.js                   # Router + layout
│   ├── config/
│   │   └── prompts.js           # All AI prompts & mode configs
│   ├── components/
│   │   ├── Navbar.jsx / .css    # Navigation bar
│   │   └── Footer.jsx / .css    # Footer
│   └── pages/
│       ├── Home.jsx / .css      # Landing page
│       ├── Features.jsx / .css  # Features & comparison
│       ├── About.jsx / .css     # About / project info
│       └── Chat.jsx / .css      # Main interview chatbot
└── package.json
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js v16+ installed
- An Anthropic API key

### Steps

```bash
# 1. Navigate into the project
cd placement-buddy

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000**

> ⚠️ **API Key Setup**: The app calls `https://api.anthropic.com/v1/messages` directly from the browser. For production/demo, you need a CORS-enabled proxy or use it via the Claude.ai artifact environment (which injects auth automatically).
>
> For local dev, set up a simple Express proxy:
> ```bash
> npm install express http-proxy-middleware
> ```
> Or use the **standalone HTML version** (`placement_buddy_standalone.html`) which works out-of-the-box in the Claude artifact environment.

---

## 🎨 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, mode cards, how-it-works, CTA |
| Features | `/features` | Feature grid + comparison table |
| About | `/about` | Project goals, timeline, tech stack |
| Chat | `/chat` | Full interview chatbot with sidebar |

---

## 🤖 Interview Modes

| Mode | Key | Focus |
|------|-----|-------|
| DSA Interview | `DSA` | Arrays, Trees, Graphs, Complexity |
| HR Interview | `HR` | Behavioral, Communication, Confidence |
| System Design | `SD` | Scalability, Architecture, APIs |

---

## 🧠 Prompt Engineering

All prompts live in `src/config/prompts.js`:

- **`SYSTEM_PROMPT`** — Master interviewer persona & rules
- **`DSA_MODE_PROMPT`** — DSA-specific focus areas
- **`HR_MODE_PROMPT`** — HR behavioral guidelines
- **`SYSTEM_DESIGN_MODE_PROMPT`** — System design instructions
- **`START_PROMPT`** — Kicks off the interview
- **`buildSystemPrompt(mode)`** — Combines prompts per mode

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| React Router v6 | Client-side routing |
| Claude Sonnet API | AI interview engine |
| CSS Custom Properties | Design system / theming |
| Google Fonts (Syne + DM Mono) | Typography |

---

## 📦 Build for Production

```bash
npm run build
```

Outputs to `/build` — deploy to Vercel, Netlify, or GitHub Pages.

---

## 👨‍💻 Built as Helping Project

Placement Buddy was designed to bridge the gap between students who know the theory and students who can actually perform in placement interviews. The AI interviewer enforces a strict one-question-at-a-time format, gives structured feedback, and adapts difficulty progressively.

---
