# SmartHire AI - Official Project Structure

This document defines the official folder structure for SmartHire AI and must be followed for all future development work. It is designed for scalability, clean separation of concerns, production readiness, and consistent team collaboration.

---

## Architecture Principles

- Follow Clean Architecture.
- Follow Feature-Based Architecture.
- Keep the frontend independent from the backend.
- Keep the AI module independent from the core application flow.
- Keep business logic separate from UI logic.
- Keep database concerns separate from business logic.
- Keep reusable code centralized.
- Keep configuration, secrets, and environment files isolated from source code.
- Use professional naming conventions and consistent folder boundaries.

---

## 1. Root Project Structure

```text
SmartHire-AI/
├── client/                    # React + Vite frontend
├── server/                    # FastAPI backend
├── ai/                        # AI, NLP, embeddings, RAG, and model orchestration
├── database/                  # SQL, migrations, seed data, and ERD docs
├── docs/                      # Architecture, API, setup, deployment, and user docs
├── uploads/                   # Uploaded resumes, job descriptions, temp files
├── reports/                   # Generated ATS and interview reports
├── tests/                     # Frontend, backend, AI, and integration tests
├── logs/                      # Application and system logs
├── scripts/                   # Automation, setup, seed, maintenance scripts
├── deployment/                # CI/CD and deployment manifests
├── config/                    # Shared configuration, secrets, and global settings
├── .env
├── .env.example
├── .gitignore
├── README.md
├── LICENSE
├── requirements.txt
├── package.json
├── PROJECT_RULES.md
├── NAMING_CONVENTIONS.md
├── API_DOCUMENTATION.md
├── CHANGELOG.md
```

### Purpose
The root directory contains the project boundary, shared configuration, deployment assets, and top-level documentation.

### What belongs here
- Application folders: client, server, ai, database, docs, uploads, reports, tests
- Operational folders: logs, scripts, deployment, config
- Shared project files: README, LICENSE, .env, requirements, package.json

### Best Practices
- Keep the root clean and focused on project-level orchestration.
- Avoid placing business logic directly in the root.
- Keep environment files and secrets outside of source control.

### When to use it
Use the root only for project-level setup, deployment configuration, environment files, and shared documentation.

---

## 2. Frontend (client)

```text
client/
├── public/                    # Static assets served directly
├── src/
│   ├── assets/                # Images, fonts, icons, illustrations
│   ├── components/            # Shared reusable UI components
│   ├── reusable-ui/           # Design system primitives (buttons, cards, inputs)
│   ├── layouts/               # Page layouts and shell wrappers
│   ├── pages/                 # Route-level page components
│   ├── features/              # Feature-based modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── ats/
│   │   ├── interview/
│   │   └── profile/
│   ├── services/              # API integration layer
│   ├── hooks/                 # Shared reusable hooks
│   ├── context/               # Global context providers
│   ├── routes/                # Application routing definitions
│   ├── utils/                 # Frontend utility functions
│   ├── constants/             # App-wide constants and enums
│   ├── types/                 # Shared TypeScript-style types/interfaces
│   ├── styles/                # Global styles, Tailwind config, theme files
│   └── main.jsx               # App entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Purpose
The frontend contains the complete React application for user interaction, form flows, dashboards, and visual experiences.

### What belongs inside
- Pages, layouts, reusable UI, feature modules, API services, hooks, routes, styles, and shared types.

### Best Practices
- Keep UI logic separate from business logic.
- Organize by feature rather than dumping everything into components.
- Keep pages thin and push logic into hooks or feature modules.
- Use shared UI primitives for consistency.

### When to use it
Use this area for all user-facing interfaces and client-side workflows.

---

## 3. Backend (server)

```text
server/
├── app/
│   ├── api/                   # Route definitions and endpoint grouping
│   ├── controllers/           # Request handlers and orchestration
│   ├── services/              # Core business logic
│   ├── repositories/          # Persistence access layer
│   ├── models/                # Database/domain models
│   ├── schemas/               # Request/response validation schemas
│   ├── middleware/            # Auth, error handling, logging, request context
│   ├── database/              # DB connection, session management, migrations hooks
│   ├── config/                # App configuration and env loading
│   ├── utils/                 # Shared backend helper functions
│   ├── core/                  # Shared infrastructure primitives
│   ├── authentication/        # Firebase/auth-related logic and guards
│   └── main.py                # FastAPI application entry point
├── tests/
├── requirements.txt
└── Dockerfile
```

### Purpose
The backend exposes APIs, enforces business rules, coordinates data access, and integrates with AI services and third-party providers.

### What belongs inside
- API routes, controllers, services, repositories, domain models, schemas, middleware, auth logic, and DB configuration.

### Best Practices
- Keep route handlers thin and delegate to services.
- Keep repositories focused on persistence only.
- Keep schemas explicit and validation-driven.
- Keep authentication and middleware concerns separate from domain logic.

### When to use it
Use this area for all server-side business logic, API contracts, and platform integrations.

---

## 4. AI Module (ai)

```text
ai/
├── ats/                       # ATS analysis workflow
├── resume_parsing/            # PDF/DOCX/ocr parsing logic
├── resume_scoring/            # Scoring and ranking logic
├── keyword_matching/          # Keyword and semantic matching
├── skill_extraction/          # Skill detection and extraction
├── resume_suggestions/        # Resume improvement suggestions
├── job_matching/              # Job-resume matching logic
├── interview/                 # Interview preparation and evaluation
├── rag/                       # Retrieval-Augmented Generation pipeline
├── embeddings/                # Embedding generation and embedding utilities
├── vector_store/              # ChromaDB/vector storage integration
├── prompt_templates/          # AI prompts by feature and task
├── models/                    # Groq, LangChain, spaCy, transformer wrappers
├── utilities/                 # Shared AI helpers and preprocessing tools
├── config/                    # AI model and pipeline configuration
└── pipelines/                 # Orchestrated AI workflows if needed
```

### Purpose
The AI module contains all AI-driven logic, data processing, LLM orchestration, embeddings, retrieval, and model integration.

### What belongs inside
- Parsing pipelines, ATS scoring, matching logic, interview generation, prompts, embeddings, Chroma integration, and AI models.

### Best Practices
- Keep AI logic isolated from the API layer.
- Keep prompts centralized and versioned.
- Keep inference and retrieval logic modular.
- Keep model configuration separate from business logic.

### When to use it
Use this area for all AI-related features and model orchestration.

---

## 5. Database (database)

```text
database/
├── sql/                       # SQL schema and query files
├── migrations/                # Versioned migration scripts
├── seed/                      # Seed data for development and testing
├── erd/                       # ERD files and database design docs
└── backups/                   # Optional database backup scripts or snapshots
```

### Purpose
The database folder stores all persistence-related assets including schemas, migrations, seed data, and design documentation.

### What belongs inside
- SQL files, migration scripts, seed datasets, ERD files, and backup utilities.

### Best Practices
- Use versioned migrations.
- Keep schema changes explicit and reviewable.
- Keep production data operations safe and scripted.

### When to use it
Use this area whenever changing schema, seeding data, or documenting persistence design.

---

## 6. Documentation (docs)

```text
docs/
├── api/                       # API documentation
├── architecture/              # Architecture diagrams and design docs
├── setup/                     # Installation and local setup guides
├── deployment/                # Deployment and environment guides
├── user-guide/                # End-user manuals and feature guides
├── project/                   # Internal project process notes and standards
└── CHANGELOG.md               # Optional copy of changelog
```

### Purpose
The documentation folder stores all official product, technical, and operational documentation.

### What belongs inside
- API docs, architecture notes, setup guides, deployment steps, user manuals, and team conventions.

### Best Practices
- Keep docs updated when architecture changes.
- Use clear structure and concise language.
- Store diagrams, screenshots, and references alongside the text.

### When to use it
Use this area for onboarding, implementation notes, architecture references, and support docs.

---

## 7. Testing (tests)

```text
tests/
├── frontend/                  # React component and page tests
├── backend/                   # FastAPI unit and integration tests
├── ai/                        # AI module and inference tests
├── integration/               # Cross-service and end-to-end workflows
└── fixtures/                  # Shared test data and sample inputs
```

### Purpose
The testing folder holds all automated tests for the product and its integrations.

### What belongs inside
- Unit tests, integration tests, API tests, AI tests, and test fixtures.

### Best Practices
- Test behavior, not internals.
- Keep tests organized by layer and feature.
- Use realistic sample data and avoid fragile mocks.

### When to use it
Use this area for all automated validation before release or deployment.

---

## 8. Configuration (config)

```text
config/
├── env/                       # Environment file templates and defaults
├── secrets/                   # Secret configuration templates and local examples
├── global/                    # Shared application config values
└── providers/                 # Third-party provider config references
```

### Purpose
The configuration folder stores shared config, environment defaults, and secrets guidance.

### What belongs inside
- Global settings, provider config, environment templates, and secret placeholders.

### Best Practices
- Never store real secrets in source control.
- Keep configuration explicit and documented.
- Separate development, staging, and production settings.

### When to use it
Use this area when adding new runtime configuration or provider integrations.

---

## 9. Deployment (deployment)

```text
deployment/
├── ci-cd/                     # GitHub Actions or other deployment pipelines
├── nginx/                     # Optional reverse proxy configuration
└── scripts/                   # Deployment helper scripts
```

### Purpose
The deployment folder contains deployment assets and environment-specific orchestration files.

### What belongs inside
- CI/CD pipelines, deployment scripts, and infrastructure definitions.

### Best Practices
- Keep deployment logic separate from application code.
- Make deployments repeatable and environment-aware.
- Document environment variables required for each deploy target.

### When to use it
Use this area when setting up CI/CD, Render, Vercel, or any environment automation.

---

## 10. Scripts (scripts)

```text
scripts/
├── setup/                     # Project bootstrap scripts
├── seed/                      # Seed data scripts
├── maintenance/               # Cleanup, backup, and maintenance scripts
├── dev/                       # Local development helper scripts
└── deploy/                    # Deployment helper scripts
```

### Purpose
The scripts folder stores automation for setup, maintenance, and operational tasks.

### What belongs inside
- Install scripts, seed scripts, database reset scripts, backup scripts, and deployment helpers.

### Best Practices
- Use scripts for repeatable tasks only.
- Keep them documented and version-controlled.
- Avoid duplicating business logic in scripts.

### When to use it
Use this area for any tasks that need to be automated across the project lifecycle.

---

## 11. Uploaded Files (uploads)

```text
uploads/
├── resumes/                   # Uploaded resume files
├── job_descriptions/         # Uploaded job description files
├── temp/                      # Temporary upload staging files
└── processed/                 # Optional processed or archived uploads
```

### Purpose
The uploads folder stores files submitted by users before processing.

### What belongs inside
- Resume PDFs, DOCX files, images, job descriptions, and temporary input files.

### Best Practices
- Validate file type, size, and content before processing.
- Keep this directory outside of the application source tree.
- Avoid storing raw uploads inside the repository code.

### When to use it
Use this area whenever a user uploads files for ATS analysis or interview preparation.

---

## 12. Generated Reports (reports)

```text
reports/
├── ats/                       # ATS analysis report outputs
├── history/                   # Historical reports and versions
├── pdf/                       # PDF exports
└── interview/                 # Interview reports and feedback outputs
```

### Purpose
The reports folder stores generated output artifacts for download or review.

### What belongs inside
- ATS reports, PDF exports, interview results, and historical report archives.

### Best Practices
- Keep generated files separate from source data.
- Use consistent naming and versioning.
- Avoid mixing temporary output with permanent report assets.

### When to use it
Use this area when generating report files for users or admins.

---

## 13. Logs (logs)

```text
logs/
├── app/                       # Application runtime logs
├── errors/                    # Error and exception logs
├── ai/                        # AI pipeline and inference logs
└── access/                    # Request/access logs
```

### Purpose
The logs folder stores runtime, operational, and debugging logs.

### What belongs inside
- Application logs, AI processing logs, access logs, and error traces.

### Best Practices
- Rotate logs and avoid unbounded growth.
- Keep log format consistent and machine-readable where possible.
- Never log secrets or sensitive user data.

### When to use it
Use this area to support debugging, monitoring, and support operations.

---

## 14. Environment Files

```text
.env
.env.example
.env.local
.env.development
.env.production
.env.test
```

### Purpose
Environment files store configuration values required by the application at runtime.

### What belongs inside
- Database URLs, API keys, Firebase credentials, storage paths, and service endpoints.

### Best Practices
- Keep real secrets out of source control.
- Maintain an example file with safe placeholders.
- Separate environment files by deployment target.

### When to use it
Use these files whenever configuring local development, CI/CD, staging, or production environments.

---

## Root Project Files

These files must exist at the project root:

- README.md
- LICENSE
- .gitignore
- .env
- .env.example
- requirements.txt
- package.json
- PROJECT_RULES.md
- NAMING_CONVENTIONS.md
- API_DOCUMENTATION.md
- CHANGELOG.md

### Purpose
These files define the entry point, documentation, dependencies, environment setup, deployment instructions, and project standards.

### Best Practices
- Keep them minimal, clear, and maintainable.
- Ensure the documentation is updated whenever the project evolves.
- Keep dependency declarations accurate and versioned.

---

## Naming Conventions

### Folder Naming
- Use lowercase names.
- Prefer snake_case for multi-word folders when needed.
- Use short, descriptive names.
- Avoid ambiguous or overly generic folder names.

### File Naming
- Use lowercase snake_case for Python files.
- Use PascalCase for React components.
- Use kebab-case for static asset files when appropriate.
- Use descriptive names that reflect purpose.

### API Naming
- Use lowercase, resource-based endpoint names.
- Prefer plural nouns such as /resumes, /jobs, /interviews.
- Keep actions explicit and consistent.

### Best Practices
- Keep folders focused and limited in scope.
- Avoid mixing unrelated modules in one place.
- Keep imports explicit and readable.
- Refactor when a module becomes too large or unclear.
