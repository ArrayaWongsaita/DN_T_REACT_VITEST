# Design: React + Vitest unit-testing practice repo

## Intent and why
The author teaches testing with `DN_JEST_SUPERTEST` (17 lessons, each with a small function plus a `.test.ts` full of `test.todo` exercises). This repo is the Frontend sibling: same teaching format, but for testing React components with Vitest.

Learners already know React and Next.js but have never written a unit test for Frontend code. They have done the Jest repo, so `test/expect/describe/beforeEach/mock` are familiar. The course must build confidence step by step, explain every matcher/query it uses, and stay easy.

## Goals
- ~17 core lessons (+1 bonus) that take a learner from "first `render`" to testing several composed components.
- Phases 1-3: one component, one test file per lesson. Phase 4 (Advanced): several components together.
- Each lesson teaches few new things and says explicitly which matcher/query/API it practises and why.
- Learner experience identical to the Jest repo: read component, open `.test.tsx`, replace `test.todo` under each 👉, run, read output.
- Teach the current recommended practice: query by role/accessible name, `userEvent`, `findBy`/`waitFor` for async.

## Non-goals
- Not teaching React or Next.js themselves.
- No E2E, no snapshot testing, no coverage tooling, no CI setup.
- No real Next.js app: only the `next/navigation` mock pattern is taught.
- Server Components (async components) are not tested; stated openly in the README.

## Anti-goals (failure even if tests pass)
- Components that are toys with no resemblance to real UI in later phases.
- A lesson that introduces many new matchers at once.
- Setup friction (peer-dependency errors, missing jest-dom types) before the first green test.
- Teaching `getByTestId` first or implementation-detail assertions (state, internals).

## Constraints
- Same layout/voice as the Jest repo: Thai explanations in comments and README; code identifiers in English; `lessons/NN-name/`; exercise files contain `test.todo` + 👉 markers; solutions on a `solutions` branch.
- Stack (verified on npm 2026-11-24): vitest 5.1.1, @testing-library/react 16.3.3 (+ `@testing-library/dom` peer), @testing-library/user-event 14.6.13, @testing-library/jest-dom 8.0.0, react 19.x, vite 8.x, jsdom, TypeScript. Node >= 20.
- `.tsx` components + `.test.tsx` files, one component per lesson file in phases 1-3.

## Approaches considered
- **A. Matcher-driven** (one new matcher per lesson, tiny components): clearest, closest to the Jest repo, but components feel like toys.
- **B. Component-driven** (realistic component per lesson): realistic, but beginners meet many matchers at once.
- **C. Hybrid (chosen by the author):** Phase 1 matcher-driven with tiny components to build confidence; Phase 2-3 add interaction/async with components that look like real UI; Phase 4 composes components.
- Environment: jsdom + RTL chosen over Browser Mode (simpler setup, what most teams use today). Browser Mode kept as an optional bonus lesson.

## Curriculum (the author chose C; exact component names are the builder's call)
| Phase | Lesson | Practise |
|---|---|---|
| 1 Render & Query | 01 first-render | `render`, `screen.getByText`, `toBeInTheDocument` |
| | 02 get-by-role | `getByRole` (+ `name`), props |
| | 03 text-content | `toHaveTextContent` |
| | 04 attributes-classes | `toHaveAttribute`, `toHaveClass` |
| | 05 conditional-render | `queryBy*`, `.not.toBeInTheDocument` |
| | 06 lists | `getAllByRole`, `toHaveLength` |
| | 07 form-state | `toBeDisabled`, `toBeEnabled`, `toBeChecked`, `toHaveValue` |
| 2 Interaction | 08 click-counter | `userEvent.setup()`, `click` (Counter with `useState`) |
| | 09 typing | `userEvent.type`, controlled input |
| | 10 callback-props | `vi.fn`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes` |
| 3 Async | 11 loading-then-data | `findBy*`, `waitFor` |
| | 12 mock-fetch | `vi.mock` / `vi.spyOn(global, "fetch")` |
| | 13 error-empty-states | testing failure and empty paths |
| 4 Advanced (multi-component) | 14 todo-app | parent + children together |
| | 15 context-provider | custom `render` with wrapper |
| | 16 form-validation | whole form: type, submit, error messages |
| | 17 next-navigation | mocking `next/navigation` (`useRouter`) |
| Bonus | 18 browser-mode | `vitest-browser-react` (optional, README says skip if unsure) |

Lesson file anatomy (mirrors the Jest repo): header comment (lesson title, matchers practised, what each does, a tiny worked example), then numbered exercises with hint + `test.todo` + 👉. Each lesson has 2-3 exercises; Phase 4 may have more.

## Repo layout
`lessons/NN-name/Component.tsx` + `Component.test.tsx`; `vitest.config.ts` (jsdom, globals or explicit imports, setup file importing `@testing-library/jest-dom/vitest`); `package.json` scripts `test`; README in Thai (install, how to do exercises, how to read results, TOC tables per phase, solutions link), plus a matcher/query cheat-sheet section.

## Decided by the author
- Hybrid curriculum (C); learners know React + Next.js; Vitest + React Testing Library; format same as the Jest repo.

## My calls (author to check)
- jsdom + RTL, not Browser Mode (bonus only).
- Explicit `import { describe, test, expect, vi } from "vitest"` in exercise files so learners see where things come from (globals off). Easy to flip.
- Use `userEvent` (not `fireEvent`) from lesson 08; `fireEvent` only mentioned in a note.
- Solutions on `solutions` branch, same as Jest repo; exercise branch is `main`.
- Vitest "todo" tests do not fail the run, matching the Jest repo's behavior; README explains.
- Typecheck matcher types via a `vitest.d.ts`/setup import so editors show jest-dom matchers.

## Left to the builder
Exact component designs and exercise wording, the cheat-sheet content, per-lesson hints, verifying every solution actually passes on the pinned versions, and the `.gitignore`/tsconfig details.
