# Project: FlyRankAI Capstone

AI-powered frontend application for FlyRankAI.

## Tech Stack
- **Framework**: Next.js + React + TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **UI Library**: shadcn/ui
- **Testing**: Vitest for validation schemas
- **Theming**: next-themes

## Development Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run linter
- `npm test` — Run unit tests (required after form/schema changes)

## Code Conventions
- Use functional components with hooks
- TypeScript strict mode
- Component names: PascalCase
- File names: kebab-case for components
- Keep components small and focused
- Write clear, actionable commit messages (Conventional Commits)

## Project Rules (learned from FE-03)
1. **Forms must use React Hook Form + Zod** with `@hookform/resolvers/zod`. Do not hand-roll submit validation.
2. **Every form control needs a visible `<Label htmlFor>`**, plus `aria-invalid` and a `role="alert"` error message when invalid. Prefer `aria-describedby` for help text and errors.
3. **Zod schemas for forms must have unit tests** in `*.test.ts` (valid payload, invalid enum/type, missing required fields). Run `npm test` before considering the form done.
4. **Closed enums for constrained fields** (language, timezone). Do not use open `z.string()` when only a fixed set of values is allowed.
5. **Preference UIs that change appearance or locale must include a live preview** (`aria-live`) so users can verify changes before save.
6. **Dark mode must sync with `next-themes`** (form value ↔ `setTheme`), including Reset restoring the last saved theme—not a hardcoded default.

## AI Assistant Instructions
- Prefer modern React patterns
- Always suggest accessible, responsive designs
- Think step-by-step before making large changes
- Create reusable components when possible
- When asked for a form: implement schema + UI + tests, then run `npm test` and report results
