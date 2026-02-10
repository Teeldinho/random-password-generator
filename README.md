# RandPassGen

RandPassGen is a password generator built with Next.js.

You choose the password length and character types (uppercase, lowercase, numbers, symbols), generate a password, see its strength, and copy it to your clipboard.

![RandPassGen Preview](public/Desktop.png)

## Features

- Generate passwords with configurable rules
- Strength indicator (`Too Weak`, `Weak`, `Medium`, `Strong`)
- Copy to clipboard with toast feedback
- Form validation with sensible defaults
- Lightweight, keyboard-friendly UI built on Radix primitives
- Theme-aware styling with Tailwind utility classes

## Tech Stack

- Core:
  - Next.js 14 (patched 14.2.x line)
  - React 18 + TypeScript
  - Tailwind CSS
- UI and state:
  - Radix UI
  - Zustand
  - Sonner (toasts)
  - Lucide React (icons)
- Forms and validation:
  - React Hook Form
  - Zod
- Testing:
  - Vitest
  - Testing Library

## Project Conventions

- `src/lib/constants`: static copy and fixed config values
- `src/lib/helpers`: pure utility functions
- `src/lib/hooks`: orchestration and side effects (store, toast, clipboard)
- `src/components/custom-reusable`: render-focused application components

## Why This Structure Works

These conventions are not just folder preferences. They make the code easier to change safely.

- Reuse: shared copy/config lives in constants, and pure logic in helpers can be reused by multiple hooks/components without duplication.
- Testability: helpers are side-effect free, so tests can assert input/output behavior directly; hook logic is isolated and easier to mock when needed.
- Presentational components: custom-reusable components mostly render UI and bind values/handlers from hooks, which keeps JSX files small and predictable.
- Type safety consistency: strength values are modeled with a const-union (`PASSWORD_STRENGTH` + `PasswordStrength` type), so schemas, store, helpers, and UI all use the same source of truth.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To build and run production mode:

```bash
npm run build
npm run start
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
```

## Usage

1. Set password length with the slider.
2. Choose which character groups to include.
3. Click `Generate`.
4. Click the copy icon to copy the result.

### Strength Scale

- Too Weak: red
- Weak: orange
- Medium: yellow
- Strong: green

![Strengths Preview](public/Strengths.png)

## Testing

Tests are unit-focused and live in `__tests__` folders near the modules they cover.

Examples:

- `src/lib/helpers/__tests__/helpers.test.ts`
- `src/lib/helpers/__tests__/generatorForm.test.ts`

Run tests with:

```bash
npm run test
```

## Security Notes

- Next.js is pinned to a patched 14.x release line for recent RSC-related advisories.
- Transitive lockfile updates were applied for `cross-spawn` and `braces`.
- Some upstream advisories may still appear in `npm audit` and require broader dependency upgrades.

## Notes

Password generation currently uses `Math.random()`. That is fine for demo/general use, but it is not cryptographically secure for high-security production requirements.

## Screenshots

![RandPassGen Preview](public/Desktop.png)

![RandPassGen Empty Preview](public/Desktop-Empty.png)

![RandPassGen Copied Preview](public/Desktop-Copied.png)
