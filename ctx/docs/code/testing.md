# Testing Overview

- Path: `ctx/docs/code/testing.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe the test boundary for the project.

## Test Structure

Unit tests live under `test/unit/` and mirror the `src/` tree.

Each source class has a matching `.test.mjs` file.

The shared helper `test/unit/common.js` provides `buildTestContainer()`, which constructs a TeqFW DI container, registers the `Fl32_Tmpl_` namespace root, and enables test mode.

Tests are executed with the Node.js built-in test runner:

```bash
npm test
```

The test script discovers all `*.test.mjs` files under `test/unit/`.

## Verification Scope

- DTO factories are tested for value casting.
- Config service is tested for initialization behavior and settings.
- Helpers (cast and locale) are tested for deterministic utility behavior.
- The logger is tested for delegation to the console.
- File resolution and loading actions are tested against fixture filesystems.
- Render services and engine implementations are tested for result codes and rendered content.
- The Nunjucks environment factory is tested for environment creation and caching.

## Validation Expectations

- `npm test` must pass before any change is considered complete.
- CI (GitHub Actions) runs `npm ci` and `npm test` on Node.js 20.
