# WORKFLOW.md — FE-03: Vague vs Precise Prompting

## Feature
Settings / user preferences form (validation, accessibility, responsive UI).

## Branches
- `round1-vague` — single vague prompt (“build a settings form with validation”), accepted as-is
- `round-2-precise` — precise prompt (Next.js, RHF, Zod, shadcn/ui, dark mode, live preview, a11y, schema tests)

## Diff summary (code, not vibes)

`git diff --stat round1-vague round-2-precise` shows ~45 files changed (~1400 insertions / ~700 deletions, excluding lockfile noise).

| Area | Round 1 | Round 2 |
|------|---------|---------|
| Stack | Vite + hand-rolled UI | Next.js App Router + shadcn/ui |
| Schema | Profile fields (`displayName`, `username`, `email`, `bio`) + `en/es/fr/de` | Preference fields: `darkMode`, `emailNotifications`, `language` (`en/ar/fr`), `timezone` enum |
| Preview | None | `settings-preview.tsx` with `aria-live`, RTL for Arabic |
| Theme | CSS tokens only | `next-themes` + dark mode switch wired to form |
| Tests | None | `src/lib/settings-schema.test.ts` (9 Vitest cases) + `npm test` |

Round 1’s form (`settings-form.tsx`, ~303 lines) does use labels, `aria-labelledby`, and `aria-live` for save status — so the vague run was not useless. Round 2’s form (~354 lines) adds `aria-describedby` / `aria-invalid` on controls, error `role="alert"`, and a live preview panel.

Concrete schema mismatch: Round 1 validates a profile CRUD shape; Round 2 validates the assignment’s preference shape. Example — Round 1 `language: z.enum(['en','es','fr','de'])` vs Round 2 `['en','ar','fr']` with Arabic preview copy and `dir="rtl"`.

## Correctness
Precise prompting produced the requested feature set (dark mode, email toggle, language/timezone, live preview, tests). Vague prompting invented a reasonable but different product (profile editor) and skipped verification — no `npm test` script, no schema tests. Round 2’s timezone is a closed `z.enum(...)`; Round 1 used `z.string().min(1)`, which accepts any non-empty string (weaker edge-case handling).

## Accessibility
Both rounds labeled inputs. Round 2 is stronger for assistive tech: invalid state is announced via `aria-invalid` + `role="alert"`, descriptions are linked with `aria-describedby`, and the preview uses `aria-live="polite"`. Round 1’s native `<select>` is simpler for a11y than a custom Select, but Round 2’s error wiring is more complete.

## Review effort & AI mistake caught
Vague prompt: fast first draft, longer review — I had to check whether “settings” meant profile vs preferences, and there was nothing to run to prove validation. Precise prompt: longer generation, shorter verification because tests failed/passed as a gate.

**AI mistake caught:** early Round 2 Reset always re-applied `defaultSettingsValues.darkMode` (always light) instead of the last saved defaults after `reset(data)`. Fixed by reading `getValues()` after `reset()` before calling `setTheme`. That bug would have shipped under a vague “looks fine” review.

## Lesson
Vague prompts optimize for speed of code; precise prompts + “write tests and run them” optimize for speed of trust. Diff the branches, don’t trust vibes.

**Word count:** ~460
