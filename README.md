# Student OS

**Student OS** is a premium student productivity platform for college students. It brings academic planning and personal finance into one calm workspace inspired by Apple, Linear, Notion, and Arc.

**Live Demo:** _Coming soon_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- Credentials authentication with protected routes and sessions
- Course management with PostgreSQL persistence
- Assignment CRUD, filters, priorities, completion states, and dashboard integration
- Personal and course-specific notes with pinning and search
- Weekly Monday-to-Sunday schedule with conflict detection
- Income, expense, category, and monthly budget management
- Analytics across academic progress, productivity, and finance
- Unified search across every implemented module
- Profile, password, theme, export, and account controls
- Responsive mobile-first layout with carefully designed dark mode

## Screenshots

Screenshots can be added as the project is prepared for its public demo.

### Login

<img width="1049" height="739" alt="image" src="https://github.com/user-attachments/assets/cdf2e04a-2790-4a68-b109-f60465c5fcc8" />

### Dashboard

_Screenshot placeholder_

### Courses

_Screenshot placeholder_

### Assignments

_Screenshot placeholder_

### Notes

_Screenshot placeholder_

### Schedule

_Screenshot placeholder_

### Expenses

_Screenshot placeholder_

### Analytics

_Screenshot placeholder_

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth credentials authentication
- React Hook Form and Zod
- next-themes
- Lucide React

## Architecture

The project uses a feature-first structure:

```text
app/          Routes, layouts, pages, and API handlers
components/   Shared UI, layout, providers, and auth components
features/     Domain modules: courses, assignments, notes, schedule, expenses
lib/          Prisma client and reusable server data helpers
prisma/       Schema and migrations
hooks/        Reusable client-side behavior
types/        Shared TypeScript organization
```

Server Components are the default. Client Components are used for interaction-heavy surfaces such as forms, filters, search, theme controls, and dialogs.

## Installation

Requirements: Node.js, npm, and PostgreSQL locally, or a Neon PostgreSQL database.

```bash
git clone https://github.com/Kermighty/student-os.git
cd student-os
npm install
```

Copy `.env.example` to `.env`, add valid values, then run:

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
npm run db:generate
npm run db:deploy
npx prisma studio
```

## Environment

`.env.example` documents the required deployment variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string for local PostgreSQL or Neon |
| `AUTH_SECRET` | Long random secret used by Auth.js sessions |
| `NEXTAUTH_URL` | Public application URL, such as `http://localhost:3000` or the Vercel URL |
| `NEXTAUTH_SECRET` | Compatibility alias for deployments that still expect the NextAuth name |

Never commit `.env`, `.env.local`, database credentials, or secrets.

## Deployment

### Neon

1. Create a free Neon project and PostgreSQL database.
2. Copy the pooled connection string into Vercel as `DATABASE_URL`.
3. Keep the Prisma migration history in the repository.

### Vercel Hobby

1. Import the GitHub repository into Vercel.
2. Select the Next.js framework preset.
3. Add `DATABASE_URL`, `AUTH_SECRET`, and `NEXTAUTH_URL` under Project Settings → Environment Variables.
4. Set `NEXTAUTH_URL` to the deployed Vercel URL.
5. Use the repository's `vercel-build` command, which runs `prisma generate`, `prisma migrate deploy`, and `next build`.
6. Deploy without committing secrets or changing Prisma migration history.

The project uses only free/open-source runtime dependencies and does not require paid services.

## Open Source

Student OS is released under the [MIT License](LICENSE). Contributions should follow [CONTRIBUTING.md](CONTRIBUTING.md) and the project's [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT © Kermighty
# Student OS

Student OS is a premium student productivity dashboard built with Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Auth.js.

## Milestone 1: foundation

The project currently includes the required foundation for the first milestone:

- Next.js 15 App Router setup
- TypeScript and Tailwind CSS configuration
- Prisma schema and PostgreSQL environment variables
- Auth.js credentials authentication configuration
- Responsive app shell with sidebar, sticky top navigation, and mobile behavior
- Light/dark mode support with `next-themes`
- Reusable UI primitives for buttons, cards, inputs, badges, and page headers

## Project structure

- `app/` — route entry points, Auth.js routes, and global layout
- `components/` — reusable UI primitives and layout pieces
- `features/` — future domain modules for courses, assignments, notes, schedule, and expenses
- `lib/` — shared infrastructure and Prisma utilities
- `prisma/` — Prisma schema and database configuration
- `hooks/` — client-side hooks for behavior like mobile nav state
- `types/` — shared TypeScript definitions for future growth

## Local environment

1. Copy `.env.example` to `.env`.
2. Replace the placeholder values with your local PostgreSQL and auth settings.
3. Create or start a PostgreSQL database.
4. Run `npx prisma generate`.
5. Run `npm run dev`.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npx prisma generate`
- `npx prisma studio`

## Environment variables

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `AUTH_SECRET`
