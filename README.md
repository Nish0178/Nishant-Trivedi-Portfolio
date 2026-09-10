# Nishant Trivedi — Engineering Portfolio & Digital Identity

Full-stack personal portfolio and systems showcase built with **Next.js 15 + React 19 + TypeScript + Tailwind CSS** on the frontend, powered by a production-grade **Java 21 + Spring Boot 3 + PostgreSQL** REST backend in `/backend`.

---

## Architecture Overview

```
Browser
   │
   ▼
Next.js 15 (React 19 + TypeScript + Tailwind CSS)
   │
   │  TypeScript API Client Layer (lib/api/)
   │  [POST /api/contact | GET /api/health | GET /api/projects]
   ▼
Java 21 + Spring Boot 3.3 (/backend)
   │
   ├── ContactController (Jakarta Validation: Name, Email, Subject, Message)
   ├── HealthController  (Service Health Status)
   ├── ProjectController (GitHub Discovery & Rule Filtering)
   ├── ContactService    (Business logic & transactions)
   ├── GlobalExceptionHandler (Standardized JSON error responses)
   └── ContactMessageRepository (Spring Data JPA)
   │
   ▼
PostgreSQL 18 Database (`contact_messages` table)
```

---

## Core Features

- **Cinematic Dark & Warm Light Themes**: Seamless theme toggle with persistent state and WCAG AA contrast compliance across buttons, typography, cards, and borders.
- **Centered Hero Media**: Hardware-accelerated HTML5 `<video>` element (native 9:16 aspect ratio) horizontally and vertically centered in its grid column space.
- **Scroll-Coupled Card Stacking**: Reversible sticky stacking card deck for engineering projects with Framer Motion scroll coupling.
- **Spring Boot 3 Contact API**:
  - `POST /api/contact`: Form input validation with Jakarta annotations (`@NotBlank`, `@Email`, `@Size`), saving client submissions into PostgreSQL.
  - Returns structured status feedback to the frontend terminal.
  - Fallback resilient: If the backend is offline, the frontend provides instant 1-click fallback to the direct email client.
- **Spring Boot 3 Health API**:
  - `GET /api/health`: Provides a structured health status JSON: `{ "status": "UP", "service": "portfolio-api" }`.
- **GitHub Repository Synchronization**:
  - Discovers public repositories for `@Nish0178`, excludes forks and internal template repos, and seamlessly merges with curated flagship projects.

---

## Repository Structure

```
/
├── frontend/             # Next.js 15 App Router, React 19, Tailwind CSS, TypeScript
│   ├── app/              # Layout, pages, and components (Hero, About, SelectedWork, Stack, Experience, Contact, Navigation)
│   ├── lib/              # API abstraction layer (api/contact.ts, api/health.ts, api/projects.ts) and portfolio data
│   ├── public/           # Static images, icons, and native video assets
│   ├── package.json      # Frontend dependencies & Next.js scripts
│   ├── tsconfig.json     # TypeScript configuration
│   └── next.config.mjs   # Next.js configuration
├── backend/              # Spring Boot 3 REST API (Java 21, Spring Data JPA, PostgreSQL)
│   ├── pom.xml           # Maven build specification & dependencies
│   └── src/
│       ├── main/java/com/nishant/portfolio/
│       │   ├── config/       # CORS configuration
│       │   ├── controller/   # ContactController, HealthController, ProjectController
│       │   ├── dto/          # ContactRequest, ContactResponse, HealthResponse, ProjectDto
│       │   ├── entity/       # ContactMessage JPA entity
│       │   ├── exception/    # GlobalExceptionHandler for structured validation errors
│       │   ├── repository/   # ContactMessageRepository Spring Data JPA
│       │   ├── service/      # ContactService, GitHubSyncService
│       │   └── PortfolioApplication.java
│       ├── main/resources/application.yml
│       └── test/             # JUnit 5 & MockMvc test suite (using isolated H2 in-memory DB)
├── package.json          # Root workspace scripts (delegating to frontend and backend)
├── README.md             # Project documentation & setup instructions
└── brain.md              # Persistent project memory and Architectural Decision Records (ADRs)
```

---

## Getting Started

### 1. Prerequisites

- **Node.js**: 18.17+ (Node 20+ recommended)
- **Java**: JDK 21+
- **Maven**: 3.9+
- **PostgreSQL**: 16+ (local service running on port 5432)

### 2. Frontend Setup (Next.js)

```bash
# Run from repository root:
npm run dev

# Or directly within the frontend directory:
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 3. Backend Setup (Spring Boot)

Configure environment variables for database connectivity:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `DB_URL` | PostgreSQL JDBC Connection URL | `jdbc:postgresql://localhost:5432/portfolio_db` |
| `DB_USERNAME` | PostgreSQL User | `postgres` |
| `DB_PASSWORD` | PostgreSQL Password | *(None — must be supplied via environment)* |
| `FRONTEND_URL` | Allowed CORS Frontend Origin | `http://localhost:3000` |

Start the backend:

```bash
cd backend
mvn spring-boot:run
```

The Spring Boot API will start on port `8080`.

---

## Verification & Testing

### Automated Backend Tests
Run the JUnit 5 test suite (runs in complete isolation using the H2 database):

```bash
cd backend
mvn test
```

### Next.js Production Build
```bash
npm run build
```
