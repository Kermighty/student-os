# App Router structure

This directory contains the Next.js App Router entry points used by the Student OS foundation.

- `app/page.tsx` is the default dashboard shell.
- `app/login/page.tsx` configures the credentials sign-in experience.
- `app/api/auth/[...nextauth]/route.ts` exposes Auth.js routes.
- `app/layout.tsx` defines the global app shell and theme provider.
