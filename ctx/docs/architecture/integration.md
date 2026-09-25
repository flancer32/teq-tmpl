# Architecture Integration

- Path: `ctx/docs/architecture/integration.md`
- Template Version: `20260605`
- Changed: `20260925`

## Purpose

Describe external integrations and major internal contracts between architectural blocks.

## External Integrations

### TeqFW DI Container

`@teqfw/di` is the runtime composition mechanism.

All plugin services are resolved through the container.

The host application binds the concrete engine to the engine contract via the
container override mechanism. The package does not derive this binding from
`TEQFW_TMPL__ENGINE` and does not install a selection preprocessor; this keeps
provider ownership and template-language choice in the host composition root.

### TeqFW CLI Runtime Configuration

`@teqfw/cli` exposes the computed application root through the public DI
contract `TeqFw_Cli_Config$`. The package consumes `applicationRoot` from this
contract and never models it as a `TEQFW_TMPL` setting. The CLI must initialize
the component before resolving this package.

### TeqFW Configuration

`@teqfw/cfg` owns shared source loading and exposes detached configuration
namespaces through `TeqFw_Cfg_Reader$`. The host must load configuration sources
before resolving template consumers. The package projects its `TEQFW_TMPL`
namespace into typed values and owns defaults and required-value validation.
For `ALLOWED_LOCALES`, the projection preserves array values and normalizes
string values by splitting on commas, trimming items, and removing empty
items.

### TeqFW Logging

`@teqfw/log` provides the source-bound logging contract through
`TeqFw_Log_Provider$`. Runtime components bind their own component address and
log structured error data without selecting a backend.

### Node.js Filesystem

`node:fs` and `node:fs/promises` provide file existence checks and content loading.

The filesystem is the storage surface for templates.

### Template Engines

`mustache` and `nunjucks` are the supported engine providers.

The simple engine is built in and needs no external dependency.

Engine packages are injected through the DI `npm:` namespace in consuming
applications. The host may instead provide a custom implementation of the
engine contract.

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

A file target uses type and name for lookup and may carry a package identifier and locale preferences. When supplied, the preferences may contain user, application, and package locale values.

## Boundary Rules

- New integrations must be explicit here before they appear in implementation.
- Integration descriptions must stay at architectural boundary level, not code or schema level.
- Contradictions with product scope must be surfaced instead of normalized silently.
