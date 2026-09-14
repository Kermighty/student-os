# Student OS

**Student OS** is a modern productivity platform for college students. It brings courses, coursework, notes, schedules, and personal finances into one workspace, so you spend less time switching between tools and more time on actual work.

It started as a way to practice building a complete full-stack app — authentication, database design, and a real UI — and grew into something I use for my own semester.

**Live Demo:** https://your-app.vercel.app

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- **Landing page** with an overview of the product, feature list, FAQ, and sign-up entry points
- **Authentication** with email and password, plus optional Google Sign In
- **Courses** for tracking course codes, instructors, rooms, semesters, and credits
- **Assignments** with priorities, statuses, due dates, filters, and completion tracking
- **Notes** with pinning, course links, and instant search
- **Schedule** with a Monday-to-Sunday timetable and overlapping-event detection
- **Expenses** with income and expense categories, monthly summaries, and breakdowns
- **Analytics** covering academic progress, productivity, and monthly finance
- **Reports** as a printable summary with JSON and CSV export
- **Search** across courses, assignments, notes, schedule events, and expenses
- **Themes** using system, light, and dark modes that persist between visits
- **Currency** support for PHP, USD, EUR, and JPY, applied across every money display

## Screenshots

The login screen below is a real capture. The rest are placeholders I will fill in as the public demo goes up.

### Landing Page

<img width="1103" height="673" alt="image" src="https://github.com/user-attachments/assets/266935fe-d1f9-4728-916b-8674203e0800" />

### Login

<img width="1058" height="660" alt="image" src="https://github.com/user-attachments/assets/41a2a4cf-15b5-423e-b7f3-8e6582fe7aba" />


### Dashboard

<img width="1905" height="942" alt="image" src="https://github.com/user-attachments/assets/dc922c29-f464-42ca-a35f-695135190e33" />


### Courses

<img width="1909" height="809" alt="image" src="https://github.com/user-attachments/assets/708349c7-871e-4898-9133-212934dbe119" />


### Assignments

<img width="1919" height="789" alt="image" src="https://github.com/user-attachments/assets/adc44695-d0b4-40ce-90a1-cc2d5e5389a8" />


### Notes

<img width="1917" height="786" alt="image" src="https://github.com/user-attachments/assets/b7a92136-0ae5-4399-ae68-ff9b9e685cee" />


### Schedule

<img width="1919" height="849" alt="image" src="https://github.com/user-attachments/assets/00fe9f30-29e7-4774-a30e-101da26bd0f4" />


### Expenses

<img width="1919" height="810" alt="image" src="https://github.com/user-attachments/assets/61e44a9c-af9d-4b37-8035-39b8ccf39498" />


### Analytics

<img width="1918" height="805" alt="image" src="https://github.com/user-attachments/assets/842616f3-ac75-487e-9dee-43f39e687688" />


### Reports

<img width="1919" height="854" alt="image" src="https://github.com/user-attachments/assets/587313b5-f450-4cb6-8458-edeaf5175e8c" />


## Tech Stack

- **Next.js** (App Router) with React and TypeScript
- **Tailwind CSS** for styling
- **Prisma ORM** with **PostgreSQL**
- **Auth.js / NextAuth** for sessions, backed by the Prisma adapter
- **React Hook Form** and **Zod** for forms and validation
- **next-themes** for theme handling
- **Lucide React** for icons

## Project Structure

```text
app/           Routes, layouts, and API handlers
  api/         Auth, and one handler group per module
components/    Shared UI, layout, brand, providers, and auth components
  auth/        Login, register, and Google sign-in components
  brand/       Reusable logo and monogram
  layout/      App shell, sidebar, top navigation, theme toggle
  providers/   Session, theme, and currency context
  ui/          Button, card, input, badge, password input
features/      Domain modules, one folder per product area
  landing/     Public landing page
  dashboard/   Overview page and its widgets
  courses/  assignments/  notes/  schedule/  expenses/
  analytics/  reports/  search/  settings/
lib/           Prisma client, currency formatting, server data helpers
prisma/        Schema and migration history
hooks/         Client-side hooks (mobile nav, focus trap, currency)
types/         Shared TypeScript types
```

Server Components are the default. Client Components are used only where interaction is required, such as forms, filters, search, theme controls, and dialogs. Business logic lives in `features/` and `lib/` rather than inside page files.

## Installation

You need Node.js, npm, and either a local PostgreSQL server or a hosted one such as Neon.

```bash
git clone https://github.com/Kermighty/student-os.git
cd student-os
npm install
```

Copy `.env.example` to `.env`, fill in the values described below, then run the migration and start the dev server:

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Signed-out visitors see the landing page; signed-in users are taken to `/dashboard`.

Other commands:

```bash
npm run lint        # ESLint
npm run build       # production build
npm run db:generate # regenerate the Prisma client
npm run db:deploy   # apply migrations without prompts
npx prisma studio   # browse the database
```

## Environment

`.env.example` lists every variable the app reads.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, for local Postgres or Neon |
| `AUTH_SECRET` | Random secret used to sign Auth.js sessions |
| `NEXTAUTH_URL` | Public URL of the app, such as `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Alias kept for deployments that still expect the NextAuth name |
| `GOOGLE_CLIENT_ID` | OAuth client ID, only needed if you want Google Sign In |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret that pairs with the client ID |

Google Sign In is optional. If `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are missing, the Google button is hidden and email/password sign-in continues to work normally.

When creating the Google OAuth client, add this authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

Never commit `.env`, `.env.local`, database credentials, or any secret. `.env*` is already ignored except `.env.example`.

## Deployment

### Database (Neon)

1. Create a free project and PostgreSQL database on [Neon](https://neon.tech).
2. Copy the pooled connection string — that is the one to use with serverless hosting.
3. Keep the Prisma migration history in the repository so deploys can apply it.

### Vercel

1. Import the GitHub repository into Vercel and keep the Next.js framework preset.
2. Add `DATABASE_URL`, `AUTH_SECRET`, and `NEXTAUTH_URL` under **Project Settings → Environment Variables**.
3. Set `NEXTAUTH_URL` to your deployed Vercel URL, and add the matching Google redirect URI if you enabled Google Sign In.
4. Use the repository's `vercel-build` script, which runs `prisma generate`, `prisma migrate deploy`, and `next build`.

Everything here runs on free tiers. No paid services are required.

## Versions

| Version | Scope |
|---|---|
| **v1.0** | Core platform — courses, assignments, notes, schedule, expenses, analytics, search, and settings |
| **v1.1** | Google authentication and multi-currency support (PHP, USD, EUR, JPY) |
| **v1.2** | Public landing page, with the dashboard moved to `/dashboard` |
| **v1.2.1** | Branding and UI polish — reusable monogram, favicon, and a theme toggle on the landing page |

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and workflow notes, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

## License

Released under the [MIT License](LICENSE).

MIT © Kermighty
