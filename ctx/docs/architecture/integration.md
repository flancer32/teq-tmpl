# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe external integrations and major internal contracts between architectural blocks.

## External Integrations

### TeqFW DI Container

`@teqfw/di` is the runtime composition mechanism.

All plugin services are resolved through the container.

The host application binds the concrete engine to the engine contract via the container override mechanism.

### Node.js Filesystem

`node:fs` and `node:fs/promises` provide file existence checks and content loading.

The filesystem is the storage surface for templates.

### Template Engines

`mustache` and `nunjucks` are the supported engine providers.

The simple engine is built in and needs no external dependency.

Engine packages are injected through the DI `npm:` namespace in consuming applications.

## Internal Contracts

### Engine Contract

The contract between render orchestration and engine abstraction.

It defines a single render operation taking template content, data, and options, and returning rendered content and a result code.

Every engine implementation must conform to this contract.

### Render Service Contract

The contract between the host application and render orchestration.

It accepts a target (or raw template), data, and options, and returns rendered content and a result code.

### Target And Locale Contracts

The contract between render orchestration and file resolution.

A target carries type, name, optional package, and locales; locales carry user, application, and package values.

## Boundary Rules

- New integrations must be explicit here before they appear in implementation.
- Integration descriptions must stay at architectural boundary level, not code or schema level.
- Contradictions with product scope must be surfaced instead of normalized silently.
