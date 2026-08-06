# Testing Overview

- Path: `ctx/docs/code/testing.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe the test boundary for the project.

## Test Structure

Unit tests live under `test/unit/` and mirror the `src/` tree.

Each source class has a matching `.test.mjs` file.

The shared helper `test/unit/common.js` provides `buildTestContainer()`, which constructs a TeqFW DI container, registers the `Fl32_Tmpl_` namespace root, enables test mode, and supplies a test double for the platform log provider.

Tests are executed with the Node.js built-in test runner. Unit and integration
tests are separate commands, with `npm test` running both:

```bash
npm run test:unit
npm run test:integration
npm test
```

The unit test script discovers all `*.test.mjs` files under `test/unit/`.
Integration tests live under `test/integration/` and verify runtime composition
through the real TeqFW DI container.

## Verification Scope

- DTO factories are tested for value casting.
- Config service is tested for `TEQFW_TMPL` projection, defaults, and required values.
- Helpers (cast and locale) are tested for deterministic utility behavior.
- Platform logging is verified through the real `@teqfw/log` provider in integration tests.
- File resolution and loading actions are tested against fixture filesystems.
- Render services and engine implementations are tested for result codes and rendered content.
- The Nunjucks environment factory is tested for environment creation and caching.
- The package namespace and representative DI components are tested through the
  real container in integration tests.

## Validation Expectations

- `npm test` must pass before any change is considered complete.
- `npm run typecheck` must pass before any change to JavaScript source, JSDoc annotations, `types.d.ts`, or `jsconfig.json` is considered complete. It runs the package's direct `tsc -p jsconfig.json` check.
- `npm run lint:md` must pass for Markdown files under `.agents/skills/`, `ctx/`, and the repository root.
- CI (GitHub Actions) runs `npm ci` and `npm test` on Node.js 20.
