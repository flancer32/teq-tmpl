# Architecture State

- Path: `ctx/docs/architecture/state.md`
- Template Version: `20260605`
- Changed: `20260925`

## Purpose

Describe state ownership and sources of truth.

## Sources Of Truth

- Template files on disk under the CLI-provided application root.
- The cfg-backed configuration dataset, the package's typed configuration projection, and the CLI runtime configuration.
- The package source itself (engine implementations, contracts, layout rules).

## State Categories

### Authoritative Durable State

- Template files on disk. They are the durable source of truth for template content.
- The `TEQFW_TMPL` configuration namespace is authoritative for allowed locales,
  default locale, and the configured engine name after the host loads cfg sources.
  The host's DI binding selects the rendering implementation. The CLI runtime
  configuration is authoritative for the application root.

### Temporary State

- The immutable typed configuration projection created from the cfg reader.
- Cached Nunjucks loaders and environments. They are derived caches keyed by locale combination.

### Derived State

- Resolved candidate paths and the final selected template path. Derived from the target and the filesystem.
- Rendered content. Derived from template content, data, and the engine at call time.

## Ownership Boundaries

- The host application owns application templates and adaptations; package
  authors own originals distributed with their packages. The CLI runtime
  configuration owns the application root fact.
- The host/cfg integration owns source loading; the package configuration block
  owns typed values after projection.
- The package owns resolution, loading, and rendering behavior, but no durable application state.
- Cached environments are internal to the Nunjucks environment factory and must not be treated as authoritative.

## Ownership Rules

- The package must not load configuration sources or read `process.env` directly;
  it receives the loaded cfg dataset through `TeqFw_Cfg_Reader$`.
- Template files are changed by their owners, never by the rendering package.
- No architectural block may introduce new persistent state on its own.

## State Authority

- The host application has authority over application templates and adaptations;
  package authors have authority over their originals. The CLI owns the computed
  application root.
- The host has authority over configuration sources, the CLI has authority over
the computed application root, and the package has authority over typed defaults
and required-value validation.
- Rendered content has no durable authority; it is a transient result.
- New persistent state categories require an architecture update and human approval.

## Change Discipline

Agents must not introduce new persistent state owners or categories without updating architecture documents and obtaining human approval.
