# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

- Template files on disk under the application root path.
- The cfg-backed configuration dataset and the package's typed configuration projection.
- The package source itself (engine implementations, contracts, layout rules).

## State Categories

### Authoritative Durable State

- Template files on disk. They are the durable source of truth for template content.
- The `TEQFW_TMPL` configuration namespace is authoritative for allowed locales,
  default locale, engine, and root path after the host loads cfg sources.

### Temporary State

- The immutable typed configuration projection created from the cfg reader.
- Cached Nunjucks loaders and environments. They are derived caches keyed by locale combination.

### Derived State

- Resolved candidate paths and the final selected template path. Derived from the target and the filesystem.
- Rendered content. Derived from template content, data, and the engine at call time.

## Ownership Boundaries

- The host application owns the template files and the root path.
- The host/cfg integration owns source loading; the package configuration block
  owns typed values after projection.
- The package owns resolution, loading, and rendering behavior, but no durable application state.
- Cached environments are internal to the engine adapter and must not be treated as authoritative.

## Ownership Rules

- The package must not load configuration sources or read `process.env` directly;
  it receives the loaded cfg dataset through `TeqFw_Cfg_Reader$`.
- Template files are changed by the host application, never by the package.
- No architectural block may introduce new persistent state on its own.

## State Authority

- The host application has authority over template files and root path.
- The host has authority over configuration sources, while the package has
  authority over typed defaults and required-value validation.
- Rendered content has no durable authority; it is a transient result.
- New persistent state categories require an architecture update and human approval.

## Change Discipline

Agents must not introduce new persistent state owners or categories without updating architecture documents and obtaining human approval.
