# Student OS

Student OS is a premium full-stack productivity web application for college students. It combines an authenticated student dashboard with course management, academic planning surfaces, and a responsive application shell.

## Project Vision

Student OS is designed as a premium full-stack productivity web application for college students. Its product direction is inspired by the clarity and polish of Apple, Linear, Notion, and Arc.

The application is intended to give students one focused place to manage their academic life, beginning with a dashboard and course foundation and expanding into assignments, notes, scheduling, expenses, analytics, and deployment polish.

## Tech Stack

- **Next.js** with the App Router
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **PostgreSQL**
- **Auth.js / NextAuth** for authentication and sessions
- **React Hook Form** for form state and submission handling
- **Zod** for input validation
- **next-themes** for light and dark theme support
- **Lucide React** for icons
- **React**

The installed Next.js version is defined in `package.json`. The repository README describes the project as using Next.js 15, while the current package metadata specifies Next.js 16.3.4.

## Design Language

Student OS follows a premium minimal visual language:

- Premium minimal interfaces
- 16px rounded cards and controls where appropriate
- Soft shadows
- Spacious layouts
- Mobile-first responsive behavior
- Carefully designed dark mode
- Primary color: `#2563EB`

The current UI includes a responsive sidebar, sticky top navigation, reusable cards and form controls, light/dark themes, blue primary actions, and course color swatches.

## Architecture

The repository uses a feature-first structure:

- `app/` — Next.js App Router routes, layouts, pages, and API route handlers.
- `components/` — Shared UI, authentication components, layout pieces, and providers.
- `features/` — Domain-specific modules. The implemented modules currently include dashboard, courses, assignments, notes, schedule, and expenses.
- `lib/` — Shared infrastructure and utilities, including the Prisma client.
- `prisma/` — Prisma schema and database migrations.
- `hooks/` — Reusable client-side hooks, including mobile navigation behavior.
- `types/` — Shared TypeScript definitions and future type organization.

Pages should compose these layers rather than becoming the home for reusable business logic.

## Database

The database uses Prisma with PostgreSQL. The implemented schema contains the following models:

### User

`User` stores authenticated user identity and profile data, including name, email, password, optional image, timestamps, accounts, sessions, and owned courses.

### Course

`Course` stores a user's course information:

- Course code
- Title
- Instructor
- Room
- Semester
- Color
- Credits
- Creation and update timestamps

Each `Course` belongs to exactly one `User` through `userId`. A `User` can own many courses. The relationship is enforced by a foreign key with cascade deletion, and courses are indexed by `userId`.

### Assignment

`Assignment` stores authenticated-user work linked to an existing course:

- Title and description
- Due date
- Priority: `LOW`, `MEDIUM`, or `HIGH`
- Status: `TODO`, `IN_PROGRESS`, or `COMPLETED`
- Creation and update timestamps

Each `Assignment` belongs to exactly one `User` and one `Course`. Users can own many assignments, and courses can contain many assignments. Both relationships use cascade deletion, and assignment queries are indexed by user, course, and due date.

### Note

`Note` stores a student's personal or course-specific writing:

- Title and content
- Optional course link
- Pinned state
- Creation and update timestamps

Each `Note` belongs to exactly one `User`. A note may optionally belong to one `Course`; deleting a linked course clears the note's course link rather than deleting the note. Notes are indexed by user, course, and update time.

### ScheduleEvent

`ScheduleEvent` stores recurring weekly classes, study sessions, exams, and personal events:

- Optional course link
- Event title and type: `CLASS`, `STUDY`, `EXAM`, or `PERSONAL`
- Monday-to-Sunday day number
- Start and end times
- Optional location and event color
- Creation and update timestamps

Each `ScheduleEvent` belongs to exactly one `User` and may optionally belong to one `Course`. Deleting a linked course clears the course link. Schedule events are indexed by user, course, day, and start time.

### Expense and ExpenseCategory

`ExpenseCategory` stores user-owned built-in and custom categories with a name, color, and creation timestamp. Each category can contain many expenses.

`Expense` stores personal finance transactions with:

- Title and precise `Decimal(10,2)` amount
- `EXPENSE` or `INCOME` transaction type
- Required user-owned category
- Transaction date, payment method, notes, and timestamps

Every expense belongs to exactly one `User` and one `ExpenseCategory`. Category deletion is restricted while transactions use it. User, category, and transaction-date indexes support finance queries.

The authentication models `Account`, `Session`, and `VerificationToken` are also present for Auth.js persistence and session support.

### Planned Models

The following models are **planned** and are not implemented in the current database schema:

- **Analytics** — planned as a future product area; current expense summaries are implemented within the Expenses feature.

## Completed Sprints

### Sprint 01 — Foundation

- Created the Next.js App Router project structure.
- Added TypeScript and Tailwind CSS configuration.
- Established the feature-first folder organization.
- Added the shared application shell with responsive sidebar and top navigation.
- Added reusable UI primitives for buttons, cards, inputs, badges, and page headers.
- Added light/dark mode support with `next-themes`.
- Added the initial Prisma and PostgreSQL configuration.

### Sprint 02 — Authentication

- Added credentials-based login.
- Added user registration with password hashing.
- Added protected routes that redirect unauthenticated users to `/login`.
- Added Auth.js sessions backed by the Prisma adapter.
- Added logout behavior through the authenticated top navigation.
- Added user identity to the session so records can be scoped to the authenticated user.

### Sprint 03 — Premium Dashboard

- Built the premium student productivity dashboard UI.
- Added dashboard header and greeting.
- Added statistics cards, assignments preview, schedule timeline, recent notes, mini calendar, study progress, motivation card, and quick-action-oriented surfaces.
- The dashboard used mock/static data during this sprint; the current source remains represented by dashboard data in `features/dashboard/data.ts` rather than database-backed assignment, note, or schedule models.

### Sprint 04 — Courses

- Added PostgreSQL persistence through Prisma.
- Added the Prisma migration for users, Auth.js persistence models, and courses.
- Added Course CRUD operations.
- Added the courses list page and empty state.
- Added the course creation page and validated course form.
- Added the course detail page.
- Added course editing.
- Added course deletion.
- Added secure API routes that require authentication and verify course ownership for reads, updates, and deletes.
- Added course validation with Zod and reusable course UI components.

### Sprint 05 — Assignments Management System

- Added PostgreSQL persistence for assignments through Prisma.
- Added secure Assignment CRUD API routes with authenticated ownership checks.
- Added course-linked assignment creation, detail, editing, and permanent deletion.
- Added Zod validation, React Hook Form, inline errors, loading states, success feedback, and unsaved-change protection.
- Added immediate search, course/status/priority filters, and due-date/priority/recent sorting.
- Added assignment cards with course color strips, priority badges, status pills, due dates, and completion controls.
- Replaced the dashboard's mock assignment feed and assignment statistics with live PostgreSQL data.

### Sprint 06 — Notes Management System

- Fixed the two shared `Card` and `Input` empty-interface lint errors without changing their public APIs or styling.
- Added PostgreSQL persistence for personal and course-specific notes through Prisma.
- Added secure Note CRUD API routes with authenticated ownership checks and optional course validation.
- Added Notes dashboard, instant title/content search, course filtering, pinned filtering, and pinned-first recent ordering.
- Added distraction-free note creation and editing with React Hook Form, Zod validation, pinning, save feedback, and unsaved-change protection.
- Added note detail reading view and accessible permanent-delete confirmation.
- Replaced the dashboard's mock Recent Notes widget with four live, pinned-first PostgreSQL notes.

### Sprint 07 — Schedule Management System

- Added PostgreSQL persistence for weekly schedule events through Prisma.
- Added secure ScheduleEvent CRUD APIs with authenticated ownership and optional course ownership validation.
- Added Monday-to-Sunday desktop timetable with positioned event blocks from 6:00 AM to 10:00 PM.
- Added mobile day selector and touch-friendly vertical event timeline.
- Added event creation, detail, editing, deletion, color labels, and event type labels.
- Added server-side conflict detection that blocks overlapping events on the same day.
- Replaced the dashboard's mock Today’s Schedule widget with live events for the authenticated user's current weekday.

### Sprint 08 — Expense & Budget Management System

- Added PostgreSQL persistence for precise income and expense transactions.
- Added user-owned built-in and custom expense categories with category colors.
- Added secure Expense and ExpenseCategory CRUD APIs with ownership validation.
- Added monthly finance dashboard with balance, income, expenses, filters, search, and sorting.
- Added pure CSS category breakdown bars and spending summary calculations from PostgreSQL data.
- Added transaction create, detail, edit, delete, currency formatting, validation, and success feedback.
- Replaced dashboard mock finance values with live monthly statistics and three recent transactions.

## Current State

Sprint 08 is complete.

The next development milestone is **Sprint 09 — Analytics**. Analytics remain planned work; Sprint 08's finance summaries are limited to the Expenses feature.

## Roadmap

| Sprint | Status |
|---|---|
| 01 Foundation | Complete |
| 02 Authentication | Complete |
| 03 Dashboard | Complete |
| 04 Courses | Complete |
| 05 Assignments | Complete |
| 06 Notes | Complete |
| 07 Schedule | Complete |
| 08 Expenses | Complete |
| 09 Analytics | Next |
| 10 Polish & Deployment | Planned |

## Engineering Standards

- Never regenerate the project.
- Continue from the existing codebase.
- Preserve the existing architecture.
- Prefer Server Components first.
- Use Client Components only when necessary.
- Validate external and form input with Zod.
- Every persisted record belongs to the authenticated user and must be scoped accordingly.
- Reuse existing UI components.
- Keep business logic outside pages.
- Clearly distinguish implemented features from planned work.

## Git Workflow

```bash
git add .
git commit -m "Sprint X: Description"
git push
```

Repository owner: **Kermighty**

## Instructions for Future AI Sessions

- Read `PROJECT_CONTEXT.md` before making changes.
- Inspect the workspace before assuming features exist.
- Continue development incrementally from the existing codebase.
- Preserve the premium Apple + Linear design language.
- Do not rebuild completed architecture.
- Never mark planned features as implemented.
- Keep new functionality consistent with the feature-first structure.
- Protect user-owned data through authenticated ownership checks.
- Validate changes with the repository's available lint, build, and database tooling when practical.
