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
- `Config.js` — the typed `TEQFW_TMPL` configuration projection over `@teqfw/cfg`.
- `Dto/` — DTO factories for template targets and locales.
- `Enum/` — enums for engine names and template types.
- `Factory/` — the Nunjucks environment factory.
- `Helper/` — casting and locale helpers.
- `Service/` — render services and engine implementations (Mustache, Nunjucks, Simple).

Runtime components consume the platform plugins through DI: `TeqFw_Cfg_Reader$`
provides the shared configuration dataset, and `TeqFw_Log_Provider$` provides
source-bound structured loggers. The package does not own a logger backend or a
configuration source loader.

The package-owned consumer skill is published under `skills/teqfw-tmpl/`. It is
agent guidance only and remains separate from the TeqFW runtime namespace and
DI discovery metadata.

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
