# NISHANT TRIVEDI
## Personal Engineering Portfolio & Digital Identity
## Project Brain / Persistent Agent Memory

---

# 00. AGENT OPERATING PROTOCOL

This document is the **Single Source of Truth (SSOT)** for Nishant Trivedi's personal engineering portfolio. Every future AI agent interacting with this repository MUST strictly follow this operating protocol to maintain design integrity, avoid redundant exploration, and ensure zero data fabrication.

### Before Starting Any Task
1. **Read `brain.md` first**: Check the project memory, architecture mappings, verified data registries, design tokens, and current implementation status.
2. **Targeted Inspection Only**: Inspect only the specific files required for the assigned task. Do NOT perform whole-repository scans or read every component.
3. **No Unjustified Rewrites**: Do NOT rewrite working systems or components without explicit instruction and clear justification.
4. **Preserve Design Language**: Respect the established minimal, cinematic, editorial, and technical aesthetic. Do not deviate into generic templates or cyberpunk neon themes.
5. **Strict No-Fabrication Policy**: Never invent or hallucinate personal info, metrics, latency benchmarks, revenue figures, user counts, companies, internships, awards, certifications, or testimonials. Prefer verified data or explicit `NEEDS VERIFICATION` flags over plausible-looking placeholders.
6. **Preserve Non-Functional Standards**: Maintain accessibility (semantic HTML, keyboard navigation, contrast, `prefers-reduced-motion`), mobile responsiveness across all viewports (375px to 1920px+), and Core Web Vitals performance.

### After Completing Any Task
The agent MUST:
1. Verify the implementation via build tests (`npm run build`) or linting.
2. Record meaningful changes in `brain.md`.
3. Update affected component, architecture, asset, or dependency descriptions.
4. Update known issues and implementation status.
5. Add a concise, structured entry to the Agent Change Log (**Section 30**).

---

# 01. PROJECT IDENTITY

- **Project Name**: Nishant Trivedi — Personal Engineering Portfolio & Digital Identity
- **Repository Root**: `c:\Users\dell\OneDrive\Desktop\Projects\Nishant-Trivedi-Portfolio`
- **Primary Purpose**: A high-end, recruiter-facing personal engineering portfolio and digital identity showcasing production engineering, full-stack systems, algorithmic depth, and multimodal AI work.
- **Primary Positioning**: Software Engineer · Full-Stack Developer · Builder · Problem Solver
- **Primary Audience**: Technical Recruiters, Engineering Managers, Hiring Teams, Technical Collaborators, Developers
- **Primary Objective**: Communicate Nishant's engineering ability, shipped commercial work, algorithmic problem solving, open-source leadership, and architectural precision through a polished, responsive digital experience.

---

# 02. DESIGN NORTH STAR

The visual identity is defined by:
$$\text{Vercel Precision} + \text{Linear Polish} + \text{High-End Editorial Typography} + \text{Engineering Lab IA}$$

- **Identity Feel**: "Nishant's own digital space" — bespoke, authentic, confident, restrained, and deeply technical.
- **What it is NOT**:
  - NOT a generic card template
  - NOT an AI-generated generic portfolio
  - NOT a gaming HUD or cyberpunk dashboard with excessive neon glow
  - NOT an over-engineered WebGL tech demo that sacrifices mobile performance or legibility
- **Design Philosophy**: Minimal · Cinematic · Editorial · Technical · Confident · Precise · Human. All animations and visual treatments must serve narrative clarity and information hierarchy.

---

# 03. VISUAL DESIGN SYSTEM

All tokens documented below are active in `app/globals.css` and the Tailwind CSS configuration:

### Color Palette (Dark Theme Tokens)
- **Primary Background (`--bg-primary`)**: `#050505` (Deep obsidian black)
- **Surface Background (`--bg-surface`)**: `#0a0a0a`
- **Elevated Background (`--bg-elevated`)**: `#111111`
- **Card Background (`--bg-card`)**: `#0d0d0d`
- **Primary Text (`--text-primary`)**: `#f0ece4` / `#ede9e1` (Warm off-white)
- **Secondary Text (`--text-secondary`)**: `#a8a49c` (Muted silver)
- **Muted Text (`--text-muted`)**: `#6b6862` (Subtle stone)
- **Accent Gold (`--accent-gold`)**: `#c9a84c` (Restrained warm gold)
- **Accent Gold Light (`--accent-gold-light`)**: `#dfc06a`
- **Accent Gold Dim (`--accent-gold-dim`)**: `rgba(201, 168, 76, 0.15)`
- **Border Subtle (`--border-subtle`)**: `rgba(255, 255, 255, 0.06)`
- **Border Hover (`--border-hover`)**: `rgba(255, 255, 255, 0.12)`
- **Border Gold (`--border-gold`)**: `rgba(201, 168, 76, 0.3)`

### Typography System
- **Display / Heading Font**: `"Space Grotesk"`, `"Plus Jakarta Sans"`, sans-serif
- **Editorial / Serif Font**: `"Playfair Display"`, Georgia, serif (used for elegant emphasis in names and headlines)
- **Monospace / Code Font**: `"JetBrains Mono"`, `"Fira Code"`, monospace (used for kickers, telemetry, tags, and stats)
- **Body Font**: `"Plus Jakarta Sans"`, `"Space Grotesk"`, sans-serif

### Surface & Border Treatments
- **Noise / Grain Texture**: CSS SVG noise overlay (`.noise-overlay`)
- **Cards**: High-radius rounded containers (`rounded-2xl` / `rounded-3xl`) with 1px subtle white borders (`border-white/[0.06]`) and dark gradients.
- **Scrollbar**: 5px slim thumb (`#1a1a1a`) transitioning to accent gold on hover.
- **Gradient Dividers**: Thin horizontal separators with linear gradients (`from-transparent via-[#c9a84c]/20 to-transparent`).

---

# 04. BRAND IDENTITY

- **Person**: Nishant Trivedi
- **Authentic Emblem Asset**: `/images/nt-logo-raw.png` (Raw brand emblem / circular mark, used for favicon, footer, and academic card)
- **Authentic Banner Logo Asset**: `/images/nt-banner-logo.png` (Horizontal wordmark / typography banner, used in top navigation header and Open Graph images)
- **Rules**:
  - Always use authentic supplied logo assets.
  - Do not substitute authentic brand marks with generic icons or AI-regenerated logos.
  - Logo references in code must point to existing files in `public/images/`.

---

# 05. HERO SYSTEM

- **Concept**: `01 ME` — Cinematic full-viewport first impression combining authentic video, editorial typography, proof points, and navigation CTAs.
- **Video Asset**: `public/video/hero-walking.mp4` (with fallback `public/video/hero-walking.m4v`)
- **Video Integrity Rules**:
  - Preserve original video aspect ratio and framing.
  - Do NOT crop out head, hands, or feet unnecessarily; maintain a full 9:16 natural composition.
  - Never regenerate, replace, or AI-synthesize Nishant's walking footage.
  - Avoid heavy canvas manipulation or background-removal algorithms if they cause pixelation, fringing, or tearing.
  - Hardware-accelerated native `<video>` playback with `autoPlay`, `muted`, `loop`, `playsInline`, and subtle multi-stop CSS gradient vignetting (`from-[#050505] via-[#050505]/70 to-transparent`).
- **Interactive Layers**:
  - Subtle mouse parallax on hero background container (`useSpring` + `useTransform`).
  - Top kicker tag: `SOFTWARE ENGINEER · FULL-STACK · AI`.
  - Display headline: Bold "Nishant" + Serif Italic "Trivedi".
  - Value proposition paragraph.
  - Proof points: `355+ LEETCODE`, `Top 10 QBX ARENA`, `3+ INTERNSHIPS`.
  - Magnetic CTA buttons: `VIEW WORK` (links to `#work`), `CONTACT` (links to `#contact`).
  - Animated scroll indicator and side social strip.

---

# 06. PAGE INFORMATION ARCHITECTURE

The single-page portfolio follows a disciplined 9-part narrative flow:

| Step | Section ID | Title / Concept | Component | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `#hero` | **ME** | `Hero` & `HeroVideo` | Cinematic first impression & core value proposition |
| **02** | *Manifesto* | **HOW I THINK** | `Manifesto` | Engineering philosophy & architecture principles |
| **03** | `#work` | **WHAT I BUILD** | `SelectedWork` & `TodoProWork` | In-depth case studies (LaunchPilot AI & TodoPro) |
| **04** | `#products` | **WHAT I HAVE SHIPPED** | `DeliveredProducts` | Commercial platform engineering (Astrospacious) |
| **05** | `#experience`| **WHERE I HAVE WORKED**| `ExperienceTimeline` | Timeline of internships & open source leadership |
| **06** | `#stack` | **WHAT I USE** | `TechStackMatrix` | Categorized tech matrix with interactive search & filter |
| **07** | `#dsa` | **HOW I SOLVE** | `ProblemSolving` | LeetCode metrics, live animated counters, topic breakdown |
| **08** | `#about` | **WHO I AM & HONORS** | `AboutStory` & `Achievements` | Academic background, hackathons, and certifications |
| **09** | `#contact` | **LET'S BUILD** | `ContactSection` | Direct contact details, quick-copy email, and inquiry form |

---

# 07. COMPONENT ARCHITECTURE

All components reside in `app/components/`:

### 1. Navigation & Global Shell
- **`app/components/navigation/Header.tsx`**: Fixed top navbar with authentic banner logo, scroll-aware show/hide, active section highlight, desktop status badge ("AVAILABLE"), and mobile drawer menu.
- **`app/components/navigation/CustomCursor.tsx`**: Custom trailing cursor with spring physics and blend mode difference (desktop only).
- **`app/components/3d/AmbientBackdrop.tsx`**: Subtle ambient radial glows positioned in the background.

### 2. Hero & Intro
- **`app/components/hero/Hero.tsx`**: Full-viewport hero with mouse parallax, editorial typography, stats, and CTAs.
- **`app/components/hero/HeroVideo.tsx`**: Native video component with multi-layer gradient vignette and load-fade transition.
- **`app/components/intro/Manifesto.tsx`**: Section highlighting engineering values, architectural clarity, and tech stack tags.

### 3. Work & Products
- **`app/components/work/SelectedWork.tsx`**: Case Study 01 (LaunchPilot AI) featuring interactive tabs for Architecture, Capabilities, and Code Implementation.
- **`app/components/work/TodoProWork.tsx`**: Case Study 02 (TodoPro) featuring feature matrix and simulated interactive dashboard metrics.
- **`app/components/delivered/DeliveredProducts.tsx`**: Commercial experience case study (Astrospacious) highlighting performance, responsive design, and agile deliverables.

### 4. Experience & Skills
- **`app/components/experience/ExperienceTimeline.tsx`**: Interactive experience timeline with filtering (`all`, `internships`, `opensource`) and detailed responsibility drawers.
- **`app/components/stack/TechStackMatrix.tsx`**: Grid of categorized technologies with live text search and group filters.

### 5. Algorithmic Rigor & Background
- **`app/components/dsa/ProblemSolving.tsx`**: DSA dashboard with animated count-up numbers and topic proficiency breakdown.
- **`app/components/about/AboutStory.tsx`**: Narrative biography, academic background at AKTU, and core CS coursework.
- **`app/components/achievements/Achievements.tsx`**: Hackathon honors, open-source milestones, and verified industry certifications.

### 6. Contact & Footer
- **`app/components/contact/ContactSection.tsx`**: Functional contact interface, copy-to-clipboard email interaction, direct links, and footer mark.

---

# 08. PROJECTS REGISTRY

### Project 1: LaunchPilot AI (Case Study 01)
- **Status**: Featured / Completed
- **Type**: AI Startup Validation & Simulation Engine
- **Recognition**: Top 10 Runner-Up · QBX Arena Hackathon 2026
- **Stack**: Next.js, TypeScript, Node.js, Express.js, Prisma, SQLite, Google Gemini API
- **Architecture**:
  1. *Idea Intake & Constraint Matrix*: Structured schema capturing domain, monetization, and target personas.
  2. *Multi-Pass Gemini Pipeline*: Hierarchical prompt chaining for market viability, SWOT, and competitor analysis.
  3. *Co-Founder Simulation*: Persona-driven synthetic digital twin questioning unit economics and GTM strategy.
  4. *Persistence*: Relational data persistence for investor readiness dossiers and pitch decks.
- **Evidence Status**: VERIFIED

### Project 2: TodoPro (Case Study 02)
- **Status**: Completed / Deployed
- **Type**: Productivity & Task Management Engine
- **Stack**: Node.js, Express.js, MongoDB, JWT Authentication, Chart.js, Vanilla JS, Render Cloud
- **Architecture & Highlights**:
  - Stateless JWT token authentication with bcrypt password hashing.
  - Indexed MongoDB schemas for low-latency CRUD operations.
  - Real-time productivity telemetry and weekly velocity charts using Chart.js.
  - Continuous deployment on Render Cloud.
- **Evidence Status**: VERIFIED

### Project 3: Astrospacious (Commercial Platform)
- **Status**: Delivered / Team Production (Nov 2025 – Aug 2026)
- **Type**: Commercial Web Platform
- **Role**: Web Development Intern
- **Stack**: HTML5, CSS3, JavaScript, Node.js, REST APIs, Agile Sprints
- **Contributions**: Responsive cross-device UI modules, REST API integrations, DOM performance optimization, and agile team sprint reviews.
- **Evidence Status**: VERIFIED

---

# 09. EXPERIENCE REGISTRY

All entries below are verified from active codebase records:

1. **Techdock Labs** (July 2026 – Present)
   - *Role*: AI Video Editor Intern
   - *Type*: AI & Multimodal Production
   - *Stack / Tools*: ChatGPT, Claude AI, Google Veo, Google Flow, Prompt Engineering, Google Cloud Platform
   - *Responsibilities*: Generative AI video synthesis pipelines, prompt engineering frameworks across Claude and ChatGPT, managing project video assets on GCP infrastructure.

2. **StaxTech** (Jan 2026 – Apr 2026)
   - *Role*: Full-Stack Developer Intern
   - *Type*: Full-Stack Engineering (MERN)
   - *Stack*: MongoDB, Express.js, React, Node.js, JavaScript, JWT Auth, REST APIs
   - *Responsibilities*: Architected MERN backend services, implemented JWT auth and authorization middleware, third-party API integration, database indexing, and peer code reviews.

3. **Astrospacious** (Nov 2025 – Aug 2026)
   - *Role*: Web Development Intern
   - *Type*: Web Engineering
   - *Stack*: HTML5, CSS3, JavaScript, Node.js, REST APIs, Agile
   - *Responsibilities*: Built responsive commercial web modules, connected backend REST APIs, improved client-side rendering speed, and participated in sprint workflows.

4. **Open Source Connect Global** (2026)
   - *Role*: Campus Lead & Official Contributor
   - *Type*: Leadership, Community & Engineering
   - *Highlights*: Spearheaded campus open-source initiatives, onboarded and mentored 50+ students on Git workflows, pull requests, and contributed code patches to production repositories.

5. **Elite Coders / Winter of Code** (Winter 2026)
   - *Role*: Winter of Code 2026 Contributor
   - *Type*: Open Source Program
   - *Stack*: JavaScript, Python, Data Structures
   - *Responsibilities*: Authored algorithm implementations, bug fixes, and documentation improvements.

---

# 10. TECHNICAL STACK REGISTRY

### Languages
- **Java**: Primary OOP, Backend Architecture
- **JavaScript (ES6+)**: Modern Web, Async Programming
- **TypeScript**: Type-Safe Systems & Interfaces
- **C++**: Systems, Algorithmic Problem Solving
- **C**: Low-Level Foundations
- **Python**: Scripting, Automation & AI Workflows
- **SQL**: Relational Database Queries & Schema Design

### Frontend & UI
- **React 19 & Next.js 15**: Modern App Router, Server/Client Components, SSR/SSG
- **Tailwind CSS v4**: Utility-First Layouts & Custom Design Tokens
- **Motion (`motion/react`)**: Spring Physics, Staggered Reveals, Scroll Choreography
- **Chart.js**: Data Visualization & Telemetry Charts
- **HTML5 & CSS3**: Semantic Structure, CSS Custom Properties, Responsive Design

### Backend, Databases & ORM
- **Node.js & Express.js**: REST API Services, Middleware Pipelines
- **MongoDB**: Document-Oriented NoSQL & Aggregations
- **PostgreSQL & MySQL**: Relational Schemas & Indexing
- **SQLite**: Embedded Local Storage
- **Prisma**: Type-Safe ORM & Migrations
- **JWT**: Stateless Token-Based Authentication

### Tools, Cloud & AI Ecosystem
- **Git & GitHub**: Version Control, Branching, PRs, Code Reviews
- **Render**: Automated Cloud Deployments
- **Google Cloud Platform (GCP)**: Asset Management & Cloud Infrastructure
- **Postman**: API Debugging & Integration Testing
- **AI Tooling**: Google Gemini, Claude, OpenAI GPT, Cursor, GitHub Copilot, Antigravity, n8n, Power BI

---

# 11. DSA / PROBLEM SOLVING REGISTRY

All metrics are verified from Nishant's competitive programming profiles:

- **LeetCode Problems Solved**: `355+`
- **Contest Rating**: `1415`
- **Max Coding Streak**: `73 Days`
- **Core Topic Breakdown**:
  - *Arrays & Hashing*: 90+ problems (Sliding window, prefix sums, frequency hashing)
  - *Trees & BSTs*: 65+ problems (DFS/BFS traversals, LCA, recursive construction)
  - *Dynamic Programming*: 50+ problems (1D/2D memoization, knapsack, state transitions)
  - *Two Pointers & Sliding Window*: 45+ problems (Monotonic queues, pointer convergence)
  - *Graphs & BFS/DFS*: 40+ problems (Cycle detection, topological sort, Dijkstra)
  - *Binary Search & Math*: 40+ problems (Search space reduction, bitwise tricks)
  - *Linked Lists & Stacks*: 25+ problems (Monotonic stacks, LRU caching)

---

# 12. EDUCATION

- **Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering
- **Institution**: Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, India
- **Duration**: July 2024 – September 2028 (Expected)
- **Core Coursework**: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems, Operating Systems, Computer Networks

---

# 13. ACHIEVEMENTS & HONORS

1. **QBX Arena Hackathon 2026**: Top 10 Runner-Up for engineering *LaunchPilot AI*.
2. **Open Source Connect Global**: Appointed Campus Lead; onboarded and mentored 50+ engineering students.
3. **Elite Coders Winter of Code 2026**: Official Contributor to open-source software repositories.
4. **LeetCode Milestones**: 355+ problems solved with 73-day daily consistency streak.

---

# 14. CERTIFICATIONS & CREDENTIALS

All certifications listed below are verified in the codebase:
- **Oracle Cloud Infrastructure AI Foundations Associate** (Oracle)
- **Java (Basic)** (HackerRank)
- **Software Engineer Intern** (HackerRank)
- **Data Analysis / Business Intelligence** (Microsoft / LinkedIn)
- **Web Development (HTML/CSS/JS)** (Simplilearn)
- **Front-End Development** (DevTown)
- **Google Developers Community Member** (Google)
- **Microsoft Student Chapter Member** (Microsoft)

---

# 15. SOCIAL LINKS & CONTACT REGISTRY

- **Primary Email**: `trivedinishant880@gmail.com` (Verified)
- **LinkedIn**: `https://www.linkedin.com/in/nishant-trivedi-363ba3249` (Verified)
- **GitHub**: `https://github.com/Nish0178` (Verified)
- **Portfolio Domain**: `https://nishanttrivedi.dev` (Configured `metadataBase`)
- **Resume**: Link available in portfolio contact flow
- **Location**: Lucknow, Uttar Pradesh, India

---

# 16. INTERACTION & MOTION SYSTEM

- **Library**: `motion` (`motion/react` v12)
- **Motion Philosophy**: Motion must be purposeful, subtle, and responsive. Avoid continuous distracting animations or intrusive scroll-hijacking.
- **Key Patterns**:
  - *Hero Parallax*: Smooth mouse-driven micro-parallax via `useSpring` and `useTransform`.
  - *Scroll Progress Bar*: Top 2px gold indicator tracking document scroll.
  - *Staggered Entrance*: `whileInView` with `viewport: { once: true }` and `0.05s-0.1s` delays.
  - *Navbar Scroll Choreography*: Auto-hides when scrolling down past 200px; smoothly reveals when scrolling up.
  - *Tab Transitions*: Animated indicator pill using `layoutId`.
  - *Accessibility*: Respect `prefers-reduced-motion` across all motion components.

---

# 17. 3D / WEBGL RULES

- **Installed Libraries**: `@react-three/fiber` (v9.3.0), `three` (v0.180.0)
- **Core Principle**: 3D and WebGL elements are secondary atmospheric accents, NEVER the core layout blocker.
- **Current State**: `AmbientBackdrop.tsx` currently provides lightweight CSS radial gradients. If 3D canvases are introduced:
  - Must remain low-poly and lightweight.
  - Must pause rendering when scrolled out of view.
  - Must not degrade mobile FPS or block critical rendering path.
  - Must have clean 2D CSS fallbacks.

---

# 18. RESPONSIVE DESIGN

The portfolio is engineered and verified across standard breakpoints:
- **Mobile Small (375px - 430px)**: Single-column cards, full-width buttons, collapsible mobile drawer navigation, stacked stat blocks, responsive fluid display typography (`clamp(3rem, 10vw, 8rem)`).
- **Tablet (768px - 1024px)**: 2-column grids for feature matrices and achievements, compact proof-points bar.
- **Desktop (1280px - 1920px+)**: Multi-column layouts, side social strip, fixed floating desktop header with section spy, interactive custom cursor.

---

# 19. ACCESSIBILITY (A11Y)

- **Semantic Elements**: Proper `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, and heading hierarchy (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3`).
- **Interactive Controls**: All buttons and anchor links include accessible labels (`aria-label`), visible focus outlines, and keyboard navigability.
- **Color Contrast**: Compliant with WCAG AA/AAA guidelines for light gold and muted text against deep `#050505` backgrounds.
- **No Hover-Only Content**: All essential information is accessible without requiring hover states.

---

# 20. PERFORMANCE & CORE WEB VITALS

- **Image Optimization**: Utilizing `next/image` with explicit `width`, `height`, `priority` on above-the-fold logos, and `sizes` attributes.
- **Video Strategy**: Native HTML5 `<video>` with `preload="auto"`, `playsInline`, `muted`, and modern MP4/M4V formats.
- **Bundle Optimization**: Tree-shaken icons from `lucide-react`, zero heavy external CSS frameworks (using modern Tailwind CSS v4).
- **Build Performance**: Verified Next.js production build output with 0 type errors or bundle bloat.

---

# 21. SEO & METADATA

Configured in `app/layout.tsx`:
- **Title**: `Nishant Trivedi — Software Engineer & Builder`
- **Description**: Personal engineering portfolio and digital identity of Nishant Trivedi — Full-Stack Developer, AI Engineer, Open Source Contributor, and Problem Solver.
- **Open Graph & Twitter Cards**: Configured with `summary_large_image` pointing to `/images/nt-banner-logo.png`.
- **Favicons**: `/images/nt-logo-raw.png` linked for standard and apple touch icons.
- **Keywords**: Nishant Trivedi, Software Engineer, Full-Stack Developer, LaunchPilot AI, MERN Stack, Next.js, TypeScript, Java, Google Gemini, LeetCode, AKTU Lucknow.

---

# 22. CONTACT ENGINE

- **Component**: `app/components/contact/ContactSection.tsx`
- **Features**:
  - Direct email copy-to-clipboard action with visual copied state indicator.
  - Interactive contact form with input validation (Name, Email, Subject, Message).
  - Status state management (`idle`, `loading`, `success`, `error`).
  - Fallback direct email mailto links.
- **Status**: UI Form Ready · Backend API Integration Optional (Form is connected to client validation with direct email fallbacks).

---

# 23. ASSET REGISTRY

| Asset File | Path | Type | Purpose | Source / Notes | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`nt-logo-raw.png`** | `/images/nt-logo-raw.png` | Image (PNG) | Primary NT emblem, Favicon, Academic profile, Footer mark | Authentic user asset | **VERIFIED** |
| **`nt-banner-logo.png`** | `/images/nt-banner-logo.png` | Image (PNG) | Horizontal brand wordmark in Navbar & OG Image | Authentic user asset | **VERIFIED** |
| **`hero-walking.mp4`** | `/video/hero-walking.mp4` | Video (MP4) | Primary cinematic Hero background walking video | Authentic user asset | **VERIFIED** |
| **`hero-walking.m4v`** | `/video/hero-walking.m4v` | Video (M4V) | Fallback video source | Authentic user asset | **VERIFIED** |

---

# 24. DEPENDENCY REGISTRY

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| **`next`** | `^15.5.0` | React Framework (App Router, SSR, SSG, Turbopack) |
| **`react` & `react-dom`** | `^19.1.0` | Core UI library |
| **`motion`** | `^12.23.12` | Motion & interaction library (`motion/react`) |
| **`lucide-react`** | `^0.468.0` | Minimal modern icon set |
| **`tailwindcss` & `@tailwindcss/postcss`** | `^4.1.12` | Utility-first styling engine |
| **`three` & `@react-three/fiber`** | `^0.180.0` / `^9.3.0` | WebGL & 3D rendering support |
| **`typescript`** | `5.9.3` | Type safety and developer experience |

---

# 25. CURRENT IMPLEMENTATION STATE

- **Foundation & Layout**: `COMPLETE` (Tailwind v4, fonts, metadata, dark theme tokens)
- **Navigation (`Header`)**: `COMPLETE` (Authentic banner logo, scroll spy, mobile drawer)
- **Custom Cursor**: `COMPLETE` (Spring physics, blend mode, desktop only)
- **Hero (`Hero` & `HeroVideo`)**: `COMPLETE` (Authentic walking video, mouse parallax, stats, CTAs)
- **Manifesto**: `COMPLETE` (Philosophy and architectural principles)
- **Case Studies (`SelectedWork` & `TodoProWork`)**: `COMPLETE` (Interactive tabs, architecture breakdowns, dashboard previews)
- **Delivered Products (`DeliveredProducts`)**: `COMPLETE` (Astrospacious commercial work)
- **Experience (`ExperienceTimeline`)**: `COMPLETE` (Internships & open source timeline with category filter)
- **Tech Stack (`TechStackMatrix`)**: `COMPLETE` (Categorized matrix with real-time search & group filter)
- **DSA / Algorithmic (`ProblemSolving`)**: `COMPLETE` (Live animated count-up counters and topic breakdown)
- **About & Education (`AboutStory`)**: `COMPLETE` (Narrative story and AKTU degree card)
- **Achievements & Certifications (`Achievements`)**: `COMPLETE` (Hackathons & verified credential cards)
- **Contact & Footer (`ContactSection`)**: `COMPLETE` (One-click email copy, validated form, footer)
- **Build Verification**: `PASSING` (`npm run build` succeeds with zero errors)

---

# 26. KNOWN ISSUES & TECHNICAL DEBT

- **Issue 1: Contact Form Backend Integration**
  - *Severity*: Low (Enhancement)
  - *Affected Area*: `app/components/contact/ContactSection.tsx`
  - *Status*: UI validation and direct email copy working; optionally connect a serverless email service (e.g. Resend / Web3Forms) if automated inbox delivery is desired.
  - *Recommended Next Action*: Wire up a Next.js API route (`/api/contact`) when user provides preferred email provider API key.

---

# 27. DO NOT BREAK LIST

1. **Do NOT crop or distort the hero walking video**: Maintain proper aspect ratio and natural 9:16 framing.
2. **Do NOT replace authentic branding**: Keep `nt-banner-logo.png` in header/OG and `nt-logo-raw.png` in favicon/emblems.
3. **Do NOT fabricate personal metrics or projects**: All numbers (355+ LeetCode, 1415 contest rating, QBX Arena Top 10, etc.) are verified.
4. **Do NOT introduce heavy cyberpunk/neon clutter**: Keep design restrained, editorial, and gold-accented.
5. **Do NOT break mobile viewports**: All cards, tables, and typography must seamlessly scale down to 375px.
6. **Do NOT remove accessibility or reduced-motion considerations**.

---

# 28. ARCHITECTURAL DECISION RECORD (ADR)

- **ADR-001 (2026-09-04) — Native Video Element for Hero Background**
  - *Decision*: Use hardware-accelerated HTML5 `<video>` with CSS multi-stop gradient overlays instead of canvas-based video frame slicing.
  - *Reason*: Canvas frame-by-frame background extraction created visual tearing and frame drops. Native video with CSS vignettes guarantees 60fps playback and pristine video fidelity.
  - *Impact*: Zero rendering artifacts, smooth mobile playback, reduced CPU usage.

- **ADR-002 (2026-09-04) — Authentic Brand Logo Integration**
  - *Decision*: Utilize `public/images/nt-banner-logo.png` for header navigation and `public/images/nt-logo-raw.png` for circular emblem/favicon.
  - *Reason*: Preserves authentic identity and replaces placeholder text/SVG badges.
  - *Impact*: High-end, professional branding across all viewports and OG link previews.

- **ADR-003 (2026-09-04) — Creation of `brain.md` Single Source of Truth**
  - *Decision*: Establish root-level `/brain.md` as the persistent agent memory system.
  - *Reason*: Prevents repetitive whole-codebase scans and ensures consistent architectural decisions across AI sessions.
  - *Impact*: Eliminates context waste and preserves codebase consistency.

---

# 29. ROADMAP

### P0 — Core Stability (Completed)
- [x] Integrate authentic hero walking video and verify full-viewport playback.
- [x] Configure authentic banner logo in header and emblem in layout metadata/favicon.
- [x] Build comprehensive editorial case studies (LaunchPilot AI, TodoPro, Astrospacious).
- [x] Verify zero build errors on Next.js 15 App Router.

### P1 — Production Polish
- [ ] Connect optional transactional email API (e.g. Resend) for contact form submissions.
- [ ] Add direct download/view link for updated PDF resume.
- [ ] Run Lighthouse audit to ensure 95+ scores across Performance, Accessibility, Best Practices, and SEO.

### P2 — Interactive Enhancements
- [ ] Add subtle interactive 3D particle dust or audio waveform visualization in 3D canvas (if requested).
- [ ] Add project filter or deep-dive interactive modal for additional side projects.

---

# 30. AGENT CHANGE LOG

## 2026-09-04 — Agent / Master Memory System Creation
- **Changed**: Created `/brain.md` documenting comprehensive project identity, architecture, design system tokens, verified personal registries, asset paths, ADRs, and protocols.
- **Reason**: Establish persistent project memory to eliminate redundant repo scanning and uphold the no-fabrication policy.
- **Files**:
  - `brain.md` (NEW)
- **Verification**: Verified all component paths, data registries, and asset references against the live repository.
- **Brain Updated**: YES (Initial creation)
