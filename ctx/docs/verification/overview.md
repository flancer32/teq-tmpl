# Verification Overview

- Path: `ctx/docs/verification/overview.md`
- Changed: `20261112`

Specifications relate accepted declarations to bounded observations. Results and their provenance are separate from these durable specifications; a passing check establishes only what its assertions exercise.

## Specifications

- [Template resolution and rendering](product/template-lifecycle.md) targets the product lifecycle.
- [Nunjucks nested lookup](architecture/nunjucks-lookup.md) targets engine-specific lookup boundaries.

## Project Checks

`npm test` runs unit and integration tests; `npm run typecheck` checks JavaScript and types; `npm run lint:md` checks Markdown; `adsm-ctx validate` checks context structure and links. `teqfw-esm-validator src --profile base` and `--profile type-regular` check module conventions. `npm pack --dry-run` checks the package file list. None establishes complete product correctness or production host composition.

## Interpreting Results

Follow the [verification supervision policy](../architecture/constraints.md). Record applicable conditions with the revision, commands and outcomes in the report for significant changes. An unexpected result is a deviation or an ambiguity, not proof of its cause. Investigate using focused checks and report unresolved uncertainty; after a correction, repeat the applicable original check. A passing check with unmet prerequisites does not establish the expectation.
