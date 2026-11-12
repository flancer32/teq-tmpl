# Verification Documentation

- Path: `ctx/docs/verification/AGENTS.md`
- Changed: `20261112`

## Purpose

Cross-cutting verification of product, architecture, environment, and code declarations.

## Level Map

- `overview.md` — verification navigation, project checks, and interpretation.
- `product/` — specifications targeting product behavior.
- `architecture/` — specifications targeting architectural behavior.

## Level Boundary

Relates declarations to bounded observations; it is not a fifth declarative level. Do not redefine upstream behavior or treat structural checks as proof of runtime semantics. Keep durable specifications distinct from observations and operational evidence.
