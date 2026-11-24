# React + Vitest Practice Repo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Thai-language practice repo of 17 lessons (+1 bonus) where learners write Vitest + React Testing Library tests for React components, mirroring the `DN_JEST_SUPERTEST` format.

**Architecture:** `main` branch holds components plus exercise test files (`test.todo` + 👉 markers). A `solutions` branch (git worktree) holds the same files with every exercise solved. Each lesson is verified by running its solved tests green and breaking the component to see them go red.

**Tech Stack:** Vitest 5.1.1, @testing-library/react 16.3.3 (+ `@testing-library/dom`), @testing-library/user-event 14.6.13, @testing-library/jest-dom 8.0.0, react 19.x, vite 8.x, jsdom, TypeScript, Node >= 20.

**Spec:** `docs/superpowers/specs/2026-11-24-react-vitest-course-design.md`

## Global Constraints
- Explanations in comments and README are in Thai; identifiers and code in English. Commit messages in English.
- Layout `lessons/NN-name/Component.tsx` + `Component.test.tsx`; phases 1-3 = one component per test file.
- Exercise files use explicit `import { describe, test, expect, vi } from "vitest"` (globals OFF).
- `userEvent` (via `userEvent.setup()`) from lesson 08 on; no `fireEvent` in exercises.
- Query by role/accessible name first; `getByTestId` is never used.
- No Server Components; no real Next.js app. Only lesson 17 touches `next/navigation`, via mock.
- Header comment of every test file: lesson title, practised matchers/queries with a one-line meaning each, a tiny worked example. Then 2-3 numbered exercises (hint + `test.todo` + 👉).
- Solutions live only on branch `solutions`; `main` never contains solved tests.
- Pin versions verified 2026-11-24 (see Tech Stack) in `package.json`.

## Review Focus
1. RTL auto-cleanup does not run with globals off, so DOM leaks between tests (`getByText` finds duplicates). Test: setup-check renders the same text in two tests and queries it with `getBy`.
2. `npm install` on a clean clone must succeed and `npm test` must exit 0 with only `todo` tests (peer dependency `@testing-library/dom` present).
3. jest-dom matchers (`toBeInTheDocument`...) must type-check in `.test.tsx` files (`npx tsc --noEmit` clean).
4. A solved test that still passes when its component is broken teaches the wrong thing: every lesson gets a break check.
5. `userEvent` without `setup()` or un-awaited calls cause flaky tests / `act` warnings: solutions must produce no console warnings (`npm test` output has no `act(` or `Warning:` text).

## Lesson procedure (referenced by Tasks 1-6)
For each lesson in a task, in order:
- [ ] **A. Component:** create `lessons/NN-name/<Component>.tsx` on `main` with the signature and behavior given.
- [ ] **B. Exercise file:** create `<Component>.test.tsx` on `main` with the Thai header, exercise titles given, `test.todo` each; run `npx vitest run lessons/NN-name` and expect exit 0 with N todo.
- [ ] **C. Solution:** in worktree `../REACT_VITEST-solutions` (branch `solutions`, run `git merge main` first), replace each `test.todo` with a real test using the matchers listed; run `npx vitest run lessons/NN-name` and expect all PASS and no warnings.
- [ ] **D. Break check:** in the worktree temporarily alter the component (behavior named in each lesson), expect at least one FAIL, then `git checkout` the component.
- [ ] **E. Commit** both branches: `feat(lesson-NN): <name>` on `main`; `solve(lesson-NN): <name>` on `solutions`.

## File Structure
- `package.json`, `vitest.config.ts`, `vitest.setup.ts`, `tsconfig.json`, `.gitignore`, `README.md`
- `setup-check/setup.test.tsx` (installation self-check, solved on both branches)
- `lessons/01-...` to `lessons/17-...`, bonus `lessons/18-browser-mode/`
- Worktree `../REACT_VITEST-solutions` on branch `solutions`

### Task 0: Scaffold and setup-check

**Files:** Create `package.json`, `vitest.config.ts`, `vitest.setup.ts`, `tsconfig.json`, `.gitignore`, `setup-check/setup.test.tsx`

**Interfaces:**
- Produces: `npm test` (= `vitest run`) and `npm run test:watch`; every `.test.tsx` gets jest-dom matchers and automatic `cleanup` after each test, no globals.

- [ ] **Step 1: Write the failing test** `setup-check/setup.test.tsx` with a local `function Hello()` rendering `<p>hello</p>`. Tests: `"เห็น hello บนหน้า"` (`getByText("hello")` `toBeInTheDocument`); `"test ถัดไป DOM ต้องถูกล้างแล้ว"` renders again and asserts `getAllByText("hello")` `toHaveLength(1)`. Run `npx vitest run` and expect FAIL (no config yet).
- [ ] **Step 2:** Create `package.json` (`"type": "module"`, scripts `test`, `test:watch`, `engines.node >=20`, `private: true`), install dev deps, using exact packages from Tech Stack plus `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `typescript`, `jsdom`.
- [ ] **Step 3:** Create `vitest.config.ts` (`environment: "jsdom"`, `globals: false`, `setupFiles: ["./vitest.setup.ts"]`, react plugin); `vitest.setup.ts` imports `@testing-library/jest-dom/vitest` and registers `afterEach(cleanup)`; `tsconfig.json` with `jsx: react-jsx`, strict, `types: ["vitest/globals"]` omitted and jest-dom types included.
- [ ] **Step 4:** Run `npm test` expect PASS; run `npx tsc --noEmit` expect no errors. Temporarily remove `afterEach(cleanup)` and confirm the cleanup test FAILS, then restore.
- [ ] **Step 5:** Commit on `main`: `chore: scaffold vitest + react testing library`. Create worktree: `git worktree add ../REACT_VITEST-solutions -b solutions`.

### Task 1: Phase 1a, lessons 01-04

**Files:** Create `lessons/{01-first-render,02-get-by-role,03-text-content,04-attributes-classes}/*`

**Interfaces:** Consumes Task 0 setup. Produces component exports (all named exports, default props free):
- 01 `Hello(): JSX` renders `<h1>Hello, React!</h1>`. Practise `render`, `screen.getByText`, `toBeInTheDocument`. Exercises: 1 renders text; 2 `getByText` with regex `/hello/i`; 3 renders an h1 (`getByText("Hello, React!").tagName` `toBe("H1")`). Break: change the text.
- 02 `Greeting({ name }: { name: string })` renders `<h2>สวัสดี {name}</h2>` and `<button>ทักทาย</button>`. Practise `getByRole("heading")`, `getByRole("button", { name })`, props. Exercises: heading shows given name; button exists by role+name; different name rerender via second `render`. Break: ignore `name`.
- 03 `PriceTag({ price, currency = "THB" })` renders `<p>{price} {currency}</p>`. Practise `toHaveTextContent` (string and regex). Exercises: default currency; custom currency; regex `/\d+/`. Break: hardcode currency.
- 04 `Badge({ label, variant = "info", href? })` renders `<a href class="badge badge-{variant}">` if `href`, else `<span>`. Practise `toHaveAttribute`, `toHaveClass` (+ `.not`). Exercises: link has `href`; default class `badge-info`; variant "danger" class and not `badge-info`. Break: drop the variant class.
- [ ] Apply the Lesson procedure to each of 01-04.

### Task 2: Phase 1b, lessons 05-07

**Interfaces:**
- 05 `Alert({ message, visible })` returns `null` when `!visible`, else `<div role="alert">{message}</div>`. Practise `queryByRole`, `.not.toBeInTheDocument`, `getByRole("alert")`. Exercises: shown when visible; hidden when not (query by `queryBy`, explain why not `getBy`); message text. Break: ignore `visible`.
- 06 `FruitList({ items }: { items: string[] })` renders `<ul>` of `<li>`, and `<p>ไม่มีรายการ</p>` when empty. Practise `getAllByRole("listitem")`, `toHaveLength`, `within`-free. Exercises: 3 items → length 3; text of first item; empty shows message and `queryByRole("list")` null. Break: render only first item.
- 07 `SignupFields({ agreed, email })` renders labelled email input with `value={email}` readOnly, checkbox "ยอมรับเงื่อนไข" with `checked={agreed}` readOnly, and submit button disabled unless `agreed`. Practise `getByLabelText`, `toHaveValue`, `toBeChecked`, `toBeDisabled`, `toBeEnabled`. Exercises: email value; checkbox checked state; button disabled when not agreed and enabled when agreed. Break: always enable button.
- [ ] Apply the Lesson procedure to each of 05-07.

### Task 3: Phase 2, lessons 08-10

**Interfaces:**
- 08 `Counter({ initial = 0 })` shows `<p>Count: {n}</p>`, buttons "+1" and "-1" and "รีเซ็ต" (reset to `initial`), using `useState`. Practise `userEvent.setup()`, `await user.click`, `toHaveTextContent`. Exercises: initial 0; click +1 twice → 2; reset returns to `initial` 5. Break: reset to 0.
- 09 `NameForm()` controlled input labelled "ชื่อ" and `<p>สวัสดี {name || "คนแปลกหน้า"}</p>`. Practise `await user.type`, `user.clear`, `toHaveValue`. Exercises: typing updates input value; greeting updates; clear → "คนแปลกหน้า". Break: ignore typed value.
- 10 `ConfirmButton({ label, onConfirm }: { label: string; onConfirm: (label: string) => void })` button calls `onConfirm(label)` on click. Practise `vi.fn()`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled`. Exercises: not called before click; called once after click; called with label. Break: call with no arg.
- [ ] Apply the Lesson procedure to each of 08-10.

### Task 4: Phase 3, lessons 11-13

**Interfaces:**
- 11 `UserCard({ loadUser }: { loadUser: () => Promise<{ name: string }> })` shows "กำลังโหลด..." then `<p>{name}</p>`. Practise `findByText`, `waitFor`, `queryByText` + `.not`. Exercises: loading visible first (`getByText`); data appears (`await findByText`); loading gone (`waitFor`). Break: never resolve render.
- 12 `PostList()` fetches `/api/posts` via global `fetch` on mount and lists titles. Practise `vi.spyOn(globalThis, "fetch")` with `mockResolvedValue`, `toHaveBeenCalledWith("/api/posts")`, `afterEach(vi.restoreAllMocks)`. Exercises: titles shown; fetch called with URL; two posts → 2 `listitem`. Break: wrong URL.
- 13 `SafePostList()` like 12 but shows `<p role="alert">โหลดไม่สำเร็จ</p>` on rejection and "ยังไม่มีโพสต์" on empty array. Practise `mockRejectedValue`, `findByRole("alert")`. Exercises: error path; empty path; success unaffected. Break: swallow error silently.
- [ ] Apply the Lesson procedure to each of 11-13.

### Task 5: Phase 4 Advanced, lessons 14-17

**Files:** each lesson may have several components plus one test file per top-level component.

**Interfaces:**
- 14 `TodoApp()` composed of `TodoInput({ onAdd })`, `TodoList({ todos, onToggle })`, `TodoItem` in separate files; add via typing + "เพิ่ม", toggle by clicking checkbox, footer "เหลือ N รายการ". Tests only on `TodoApp.test.tsx`. Exercises: add item appears; toggle checks it and count drops; empty input cannot be added. Break: count ignores toggled.
- 15 `ThemeContext` + `ThemeProvider({ children, initial })` + `ThemeToggle()` (button shows current theme, toggles "light"/"dark") + `renderWithTheme(ui, initial?)` helper exported from `lessons/15-context-provider/test-utils.tsx`. Practise custom render with `wrapper`. Exercises: renders with provider; toggle flips label; initial "dark". Break: toggle does nothing.
- 16 `LoginForm({ onSubmit }: { onSubmit: (v: { email: string; password: string }) => void })` fields labelled "อีเมล" and "รหัสผ่าน"; on submit shows `role="alert"` errors "กรุณากรอกอีเมลให้ถูกต้อง" or "รหัสผ่านต้องยาวอย่างน้อย 8 ตัว" and does not call `onSubmit` when invalid. Exercises: invalid email shows error and no call; short password error; valid values → `onSubmit` called with object. Break: skip validation.
- 17 `BackButton()` uses `useRouter()` from `next/navigation`, button "ย้อนกลับ" calls `router.back()`; `SaveAndGo()` button "บันทึก" calls `router.push("/done")`. Practise `vi.mock("next/navigation", ...)` with `vi.fn()` router. Exercises: back called once; push with `"/done"`; mock reset in `beforeEach`. Install `next` as devDependency only for types. Break: push wrong path.
- [ ] Apply the Lesson procedure to each of 14-17.

### Task 6: Bonus lesson 18 (optional)

**Interfaces:** `lessons/18-browser-mode/` reusing Counter-like `Clicker`; separate `vitest.browser.config.ts` and script `test:browser` so `npm test` is unaffected. Practise `vitest-browser-react` `render`, `page.getByRole`, `expect.element`.
- [ ] Apply lesson procedure; confirm `npm test` result is unchanged and the README marks the lesson optional. If Browser Mode cannot run without heavy setup, drop the lesson and note it in README.

### Task 7: README and cheat-sheet

**Files:** Create `README.md` (replace stub), `docs/cheatsheet.md`

- [ ] **Step 1:** README in Thai mirroring the Jest repo: purpose, install, how to do exercises, run commands (`npm test`, `npm test lessons/01`, `npm run test:watch`), how to read output (todo vs ✓ vs ✕), per-phase TOC tables from the spec, link to `setup-check`, Server Component note, solutions link `https://github.com/<owner>/<repo>/tree/solutions/lessons`.
- [ ] **Step 2:** `docs/cheatsheet.md`: one table of every query (`getBy/queryBy/findBy/getAllBy`, when to use each) and matcher used in lessons, with lesson number, and the role-first priority guidance.
- [ ] **Step 3:** Verify every command and lesson listed in README exists by running `npm test` on `main` (exit 0, only todo plus setup-check passing). Commit `docs: readme and cheatsheet`.

### Task 8: Final verification

- [ ] **Step 1:** Fresh clone of `main` into a temp dir, `npm install && npm test` → exit 0, only todo (+ setup-check) and no warnings.
- [ ] **Step 2:** In the `solutions` worktree: `git merge main`, `npm test` → all pass, output has no `act(` or `Warning:`; `npx tsc --noEmit` clean on both branches.
- [ ] **Step 3:** Confirm `grep -r "getByTestId\|fireEvent" lessons` returns nothing on both branches.
- [ ] **Step 4:** Report results; do not push or create the GitHub repo unless asked.
