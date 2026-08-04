# Code Overview

- Path: `ctx/docs/code/overview.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe the implementation boundary of the product at code level.

## Code Structure

All product code lives under `src/` in the `Fl32_Tmpl_Back_` namespace.

Major source branches:

- `Api/` — the engine contract interface (`Fl32_Tmpl_Back_Api_Engine`).
- `Act/` — actions: template file resolution and file loading.
- `Config.js` — the single runtime configuration service.
- `Dto/` — DTO factories for template targets and locales.
- `Enum/` — enums for engine names and template types.
- `Factory/` — the Nunjucks environment factory.
- `Helper/` — casting and locale helpers.
- `Logger.js` — a simple console-backed logger.
- `Service/` — render services and engine implementations (Mustache, Nunjucks, Simple).

## Engineering Constraints

- ECMAScript modules only (`"type": "module"`).
- Services receive dependencies through TeqFW DI constructor injection.
- The engine contract must be satisfied by every engine implementation.
- Public classes follow the `Fl32_Tmpl_Back_*` naming convention and carry JSDoc.
- No new comments are added unless they document public behavior (JSDoc).

## Test Boundary

Implementation verification lives under `test/`.

Unit tests use the Node.js built-in runner (`node --test`) and a TeqFW DI test container helper.

See `testing.md` for details.
