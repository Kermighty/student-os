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
