# Contributing to Student OS

Thank you for contributing to Student OS.

## Development

1. Fork the repository and create a focused branch.
2. Copy `.env.example` to `.env` and configure a local PostgreSQL database.
3. Install dependencies with `npm install`.
4. Apply migrations with `npx prisma migrate dev`.
5. Run `npm run lint` and `npm run build` before opening a pull request.

## Pull Requests

- Keep changes focused and consistent with the existing feature-first architecture.
- Prefer Server Components; use Client Components only for interaction.
- Validate external input with Zod and scope persisted records to the authenticated user.
- Reuse existing UI primitives and preserve responsive dark-mode behavior.
- Do not commit secrets, `.env` files, generated build output, or unrelated formatting changes.
- Explain behavior changes and include manual testing steps.

## Commits

Use concise, descriptive commit messages, for example:

```text
Sprint X: Description
```