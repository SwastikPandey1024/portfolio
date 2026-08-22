# ANTIGRAVITY MASTER BUILD PROMPT

## ROLE

You are the senior frontend architect, creative technologist, UX engineer, accessibility engineer, performance engineer, and deployment engineer responsible for implementing the **Swastik Pandey AI Engineering Portfolio**.

You are NOT responsible for inventing the product strategy.

The approved product strategy exists in:

```text
docs/PORTFOLIO_CONSTITUTION.md
```

Treat that document as the **single source of truth**.

Read it completely before making implementation decisions.

---

# 1. PRIMARY OBJECTIVE

Build a production-quality personal portfolio website for Swastik Pandey.

The final product must feel like:

**High-end AI Systems Studio × Editorial Engineering Portfolio × Product Laboratory**

The result must be:

* professional
* creative
* innovative
* technically sophisticated
* visually memorable
* recruiter-friendly
* accessible
* responsive
* fast
* maintainable
* reusable
* deployable for zero hosting cost

Do not optimize for visual novelty at the expense of usability.

---

# 2. FIRST ACTION — INSPECT BEFORE CODING

Before writing code:

1. Read `docs/PORTFOLIO_CONSTITUTION.md`.
2. Inspect the entire repository.
3. Inspect available assets.
4. Check whether a package/project already exists.
5. Identify existing configuration.
6. Identify build tooling.
7. Identify missing assets.
8. Create an implementation plan.
9. Do not begin major implementation until the plan is internally coherent.

Do not overwrite or delete existing work without understanding it.

---

# 3. REQUIRED INITIAL OUTPUT

Before implementation, report:

```text
PROJECT AUDIT
DESIGN SYSTEM PLAN
COMPONENT ARCHITECTURE
ROUTING PLAN
ASSET PLAN
MOTION PLAN
THREE.JS PLAN
MELI GUIDE PLAN
ACCESSIBILITY PLAN
PERFORMANCE PLAN
TESTING PLAN
DEPLOYMENT PLAN
IMPLEMENTATION PHASES
```

Then begin Phase 1.

---

# 4. TECHNOLOGY STACK

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lenis
* Lucide React
* Three.js
* MDX
* EmailJS

Development quality tools:

* ESLint
* Prettier
* Vitest
* React Testing Library

Potential E2E tooling:

* Playwright

Do not add unnecessary dependencies.

Every dependency must have a reason.

---

# 5. ARCHITECTURE PRINCIPLES

Use a reusable component architecture.

Prefer:

```text
components/
hooks/
lib/
data/
content/
pages/
assets/
```

over duplicated page-specific implementations.

Build reusable components for:

* navigation
* buttons
* section headers
* metrics
* project cards
* project metadata
* architecture diagrams
* case-study blocks
* drawers
* modals
* tool nodes
* timeline items
* Meli interactions
* footer

Do not create giant monolithic components.

---

# 6. DESIGN SYSTEM IMPLEMENTATION

Create design tokens for:

## Colors

```text
#030712
#0F172A
#1E293B
#F8FAFC
#94A3B8
#38BDF8
#4F46E5
#10B981
#A78BFA
```

## Typography

```text
Space Grotesk
Inter
JetBrains Mono
```

Use a coherent spacing scale based on 8px.

Create reusable typography tokens.

Do not scatter arbitrary colors throughout the codebase.

---

# 7. GLOBAL VISUAL LANGUAGE

Use:

* near-black canvas
* slate surfaces
* thin borders
* strong typography
* subtle gradients
* editorial spacing
* controlled asymmetry
* restrained semantic color

Avoid:

* excessive glassmorphism
* neon overload
* giant gradients
* generic AI graphics
* stock illustrations
* excessive shadows
* decorative noise

---

# 8. NAVIGATION

Build a responsive navigation system.

Desktop:

```text
SWASTIK
WORK
LAB
THINKING
ABOUT
CONTACT
```

Use a floating/shrinking navigation state after scrolling.

Mobile:

* compact header
* accessible menu
* keyboard navigation
* visible focus state

Navigation must remain usable when animations are disabled.

---

# 9. HERO IMPLEMENTATION

Create a hybrid hero.

Left:

* name
* professional positioning
* manifesto
* primary CTA

Right:

* Swastik portrait
* AI Signal Field

Primary CTA:

**View Systems**

Secondary links:

**GitHub**
**LinkedIn**

Do not put a wall of badges in the hero.

---

# 10. AI SIGNAL FIELD

Implement Three.js as a low-density interactive signal field.

Concept:

**data → connections → intelligence**

Requirements:

* subtle
* visually elegant
* performant
* responsive
* accessible fallback
* lazy loaded where possible
* no generic 3D object
* no spinning globe
* no particle storm

Interaction:

* cursor movement
* selected project state
* scroll-linked transitions

Implement cleanup of:

* geometries
* materials
* textures
* renderers
* animation loops
* event listeners

Respect `prefers-reduced-motion`.

---

# 11. PORTRAIT SYSTEM

Use the provided approved portrait asset.

Do NOT create a cartoon avatar.

Do NOT place the portrait in a generic circular profile card.

Create an editorial composition.

Subtle parallax is allowed.

Keep movement within a small range to avoid motion sickness.

---

# 12. MANIFESTO / IDENTITY

Create an identity section around:

```text
AI × SOFTWARE × DATA × BUSINESS
```

Use an interactive or animated system diagram:

```text
Idea
↓
Understand
↓
Data
↓
Intelligence
↓
Engineering
↓
Deploy
↓
Impact
```

Interactions should progressively reveal supporting capabilities.

---

# 13. SELECTED SYSTEMS

Create four flagship systems.

Order:

1. SalesPulse AI
2. DocuChat
3. Meli AI Companion
4. MedVision AI

Do NOT present them as generic grid cards.

Use distinct editorial compositions while keeping shared design tokens.

---

# 14. SALESPULSE IMPLEMENTATION

Narrative:

**AI → Business Decisions**

Use a horizontal editorial layout.

Emphasize:

* forecasting
* model comparison
* scenario simulation
* analytics
* business metrics

Show actual visuals where available.

Link:

https://github.com/SwastikPandey1024/SalesPulse_AI

Live:

https://salespulseai.streamlit.app

Do not invent metrics.

Use evidence-backed repository information.

---

# 15. DOCUCHAT IMPLEMENTATION

Narrative:

**AI → Knowledge**

Use split architecture / interface layout.

Visual story:

```text
Document
↓
Processing
↓
Embedding
↓
Retrieval
↓
Reasoning
↓
Answer
```

Use terminology:

* LLM
* RAG
* embeddings
* semantic search
* vector database
* document processing

Important:

Never call this project “DocMind”.

---

# 16. MELI IMPLEMENTATION

Narrative:

**AI → Human Interaction**

Use a full-width immersive project presentation.

Show:

* desktop companion
* visual states
* voice
* memory
* RAG
* tools
* permissions
* native desktop shell

The Meli repository is:

https://github.com/SwastikPandey1024/meli-ambient-ai-companion

Meli itself later becomes an optional portfolio guide.

Do not autoplay audio.

Provide:

* mute
* disable
* skip

---

# 17. MEDVISION IMPLEMENTATION

Narrative:

**AI → Visual Intelligence**

Use an editorial / research composition.

Show:

* chest X-ray
* data engineering
* patient-aware split
* model pipeline
* evaluation
* explainability direction

Repository:

https://github.com/SwastikPandey1024/MedVision-AI

Important:

Use an educational / research framing.

Never suggest clinical certification or clinical deployment unless evidence explicitly exists.

---

# 18. CASE STUDY TEMPLATE

All case-study pages must provide:

```text
Context
Problem
Why AI?
Bottleneck
Architecture
Technical Decisions
Trade-offs
Interface
Results
Lessons
GitHub / Demo
```

Make the writing concise but technically meaningful.

Prefer evidence over adjectives.

---

# 19. IMPACT METRICS

Use actual measurable values.

Possible evidence-backed metrics include:

* 108K+ tweets
* 9,994 sales records
* 2.57M cybersecurity rows
* 26,684 MedVision images/patients
* 60/60 GridCast tests
* 80/80 Meli frontend tests
* 52/52 Meli backend tests

Before displaying any metric, verify its source in the project documentation.

Never invent impact claims.

---

# 20. HOW I BUILD

Build an interactive engineering workflow:

```text
IDEA
↓
RESEARCH
↓
VISUALISE
↓
ARCHITECT
↓
IMPLEMENT
↓
DEBUG
↓
TEST
↓
DEPLOY
```

Map AI tools conceptually:

ChatGPT → strategy / architecture
Perplexity → research
Gemini → visual exploration
Antigravity → implementation
Claude → debugging / review
Cursor → testing / refinement
Hugging Face → AI demo/model ecosystem

The narrative is:

> AI accelerates the workflow. Engineering judgment owns the result.

Do not represent AI tools as autonomous replacements for engineering.

---

# 21. MELI PORTFOLIO GUIDE

Meli is an optional interactive guide.

Implement:

```text
Guide On
Guide Off
Skip
Mute
```

Meli may provide concise contextual commentary.

She may never block content or navigation.

Never require interaction with Meli to understand the portfolio.

Use progressive enhancement.

---

# 22. MOTION ENGINEERING

Use Framer Motion.

Motion timing:

```text
micro:      150–250ms
component:  300–500ms
section:    500–900ms
ambient:    3–10s
```

Use:

* opacity
* translation
* scale
* spring
* clip reveal
* subtle parallax

Avoid animation overload.

Respect reduced motion.

---

# 23. LENIS

Use Lenis conservatively.

Do not override normal browser behavior unnecessarily.

Do not create dramatic inertia.

Smooth scrolling must never interfere with accessibility or anchor navigation.

---

# 24. ICON SYSTEM

Use Lucide React.

Use icon components instead of:

* emoji as UI controls
* manually drawn SVG when unnecessary
* inconsistent icon libraries

Emoji may remain in editorial content.

---

# 25. ENGINEERING LAB

Create a compact archive for:

* GridCast AI
* AI CyberShield
* TriviaPay
* F1 Race Replay
* AgenticOS

Use filters such as:

```text
ALL
ML
GENAI
SECURITY
FINTECH
OPEN SOURCE
AGENTIC AI
```

Do not let Lab visually overpower the four flagship systems.

---

# 26. ABOUT

About should communicate:

* engineering philosophy
* product thinking
* business awareness
* curiosity
* leadership
* learning
* interests

Do not copy the entire resume.

---

# 27. EXPERIENCE

Show a clean timeline.

Relevant experiences include:

* CBSL Group — Software Intern AI/ML
* Indian Railways — Summer Intern
* TechSphere — Head of Finance
* Brand Scalar — Freelance Consultant
* Cognizance IIT Roorkee — Campus Ambassador
* Smart India Hackathon — Team Lead

Keep descriptions concise.

Link out to detailed resume/LinkedIn where appropriate.

---

# 28. CONTACT

Use EmailJS.

Build:

* validation
* loading state
* success state
* failure state
* keyboard accessibility

Never expose secrets in client code.

Use environment variables where required.

---

# 29. ACCESSIBILITY

Implement:

* semantic HTML
* keyboard navigation
* focus states
* alt text
* ARIA labels
* sufficient contrast
* reduced motion
* touch-safe controls
* WebGL fallback
* Meli disable option

Run accessibility checks during QA.

---

# 30. RESPONSIVENESS

Design intentionally for:

* mobile
* tablet
* laptop
* desktop

Do not merely stack desktop components.

Test at:

```text
390px
768px
1024px
1440px
1920px
```

---

# 31. PERFORMANCE

Target:

```text
LCP < 2.5s
CLS < 0.10
INP < 200ms
```

Use:

* AVIF/WebP
* responsive images
* lazy loading
* code splitting
* lazy WebGL
* cleanup of effects
* minimum unnecessary JavaScript

No blocking hero animation.

---

# 32. SEO

Implement:

* title
* description
* canonical
* Open Graph
* social image
* sitemap
* robots
* semantic headings
* structured metadata where useful

Use:

**Swastik Pandey — AI/ML Engineer & Generative AI Builder**

---

# 33. TESTING

Create unit tests for important reusable components.

Test:

* navigation
* project filtering
* Meli controls
* contact states
* metric rendering
* reduced-motion behavior
* major interactions

Run:

```bash
npm run lint
npm run test
npm run build
```

before considering a phase complete.

---

# 34. QUALITY ASSURANCE

After implementation:

## Functional

Verify:

* navigation
* routes
* links
* contact form
* Meli controls
* Three.js fallback

## Responsive

Verify:

* mobile
* tablet
* desktop

## Accessibility

Verify:

* keyboard
* focus
* reduced motion
* contrast

## Performance

Verify:

* Lighthouse
* image loading
* WebGL performance
* layout shift

## Content

Verify:

* no placeholders
* no unsupported metrics
* correct project names
* no broken links

---

# 35. DEPLOYMENT

Deployment target:

**Cloudflare Pages**

Pipeline:

```text
GitHub
↓
GitHub Actions
↓
Test
↓
Build
↓
Deploy
```

Deployment must be reproducible.

No manual production-only configuration.

---

# 36. IMPLEMENTATION PHASES

## Phase 0

Audit repository and constitution.

## Phase 1

Foundation:

* Vite
* React
* TypeScript
* Tailwind
* fonts
* tokens
* routing
* linting
* testing

## Phase 2

Global layout:

* navbar
* footer
* sections
* responsive shell

## Phase 3

Hero:

* portrait
* AI Signal Field
* CTA
* responsive behavior

## Phase 4

Identity / Manifesto

## Phase 5

SalesPulse

## Phase 6

DocuChat

## Phase 7

Meli

## Phase 8

MedVision

## Phase 9

Meli portfolio guide

## Phase 10

Engineering Lab

## Phase 11

Experience / About / Contact

## Phase 12

Three.js optimization and visual polish

## Phase 13

Accessibility / performance / QA

## Phase 14

CI + Cloudflare deployment

---

# 37. IMPLEMENTATION RULES

Do NOT:

* rewrite the constitution
* invent strategy
* invent project claims
* invent metrics
* create placeholder testimonials
* add unnecessary dependencies
* add a generic AI chatbot
* add fake “live system” statuses
* add autoplay audio
* add intrusive cursor effects
* create arbitrary 3D objects

When uncertain:

1. Inspect existing evidence.
2. Prefer the constitution.
3. Prefer reusable implementation.
4. Ask for clarification only when a decision cannot be resolved from the approved strategy.

---

# 38. DOCUMENTATION REQUIREMENT

Every major implementation phase must update:

```text
docs/
```

with relevant technical notes where useful.

Maintain a lightweight engineering changelog.

Document significant technical decisions.

---

# 39. FINAL DELIVERY REQUIREMENTS

Before declaring the portfolio complete, provide:

```text
1. Architecture summary
2. Component inventory
3. Routes
4. Dependencies
5. Test results
6. Lighthouse results
7. Accessibility status
8. WebGL fallback status
9. Build result
10. Deployment URL
11. Known limitations
12. Recommended future improvements
```

---

# 40. SUCCESS CRITERIA

The final portfolio succeeds when:

### Visual

It looks distinctive without looking gimmicky.

### UX

A recruiter can understand the profile quickly.

### Engineering

The architecture is maintainable and reusable.

### Evidence

The portfolio demonstrates real technical work.

### Storytelling

Each project explains decisions, not just technologies.

### Performance

Animation does not compromise usability.

### Accessibility

The website remains usable without animation or WebGL.

### Deployment

The website is reliably deployed at zero hosting cost.

### Brand

A visitor should remember:

> **Swastik builds AI systems that become useful products.**

---

# FINAL INSTRUCTION

Treat this file and:

```text
docs/PORTFOLIO_CONSTITUTION.md
```

as the authoritative product specification.

Do not optimize for speed of code generation.

Optimize for:

**clarity → architecture → quality → evidence → polish → performance.**

Build the portfolio like a real product.

Do not merely build a portfolio website.
