# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

- Template files on disk under the application root path.
- The configuration singleton holding runtime settings.
- The package source itself (engine implementations, contracts, layout rules).

## State Categories

### Authoritative Durable State

- Template files on disk. They are the durable source of truth for template content.
- The runtime configuration. It is authoritative for allowed locales, default locale, engine, and root path.

### Temporary State

- The initialization flag of the configuration singleton. It guards single initialization.
- Cached Nunjucks loaders and environments. They are derived caches keyed by locale combination.

### Derived State

- Resolved candidate paths and the final selected template path. Derived from the target and the filesystem.
- Rendered content. Derived from template content, data, and the engine at call time.

## Ownership Boundaries

- The host application owns the template files and the root path.
- The configuration block owns the runtime configuration values after initialization.
- The package owns resolution, loading, and rendering behavior, but no durable application state.
- Cached environments are internal to the engine adapter and must not be treated as authoritative.

## Ownership Rules

- The configuration singleton may be written only during its one-time initialization.
- Template files are changed by the host application, never by the package.
- No architectural block may introduce new persistent state on its own.

## State Authority

- The host application has authority over template files and root path.
- The configuration block has authority over runtime settings at bootstrap.
- Rendered content has no durable authority; it is a transient result.
- New persistent state categories require an architecture update and human approval.

## Change Discipline

Agents must not introduce new persistent state owners or categories without updating architecture documents and obtaining human approval.
