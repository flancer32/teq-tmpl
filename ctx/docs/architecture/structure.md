# Architecture Structure

- Path: `ctx/docs/architecture/structure.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe the major architectural blocks, runtime areas, and responsibility boundaries.

## Architectural Blocks

### Engine Abstraction

Owns the pluggable rendering contract and the set of supported engines.

Defines how template content and data become rendered output.

Includes the contract itself, the built-in simple engine, and the Mustache and Nunjucks engine implementations.

### Render Orchestration

Owns the public rendering entry points.

Combines a target with data and options, obtains template content, and delegates rendering to the engine.

Provides both a generic render path and a locale-aware web rendering convenience path.

### File Resolution And Loading

Owns the mapping from a template target to a concrete file path and the loading of file content.

Applies locale fallback and override rules against the configured root path.

Does not interpret template content.

### Configuration

Owns the single runtime configuration of the plugin.

Holds allowed locales, the default locale, the active engine, and the application root path.

Is initialized once during application bootstrap.

### Support Layer

Owns the cross-cutting helpers used by the other blocks.

Includes locale variant generation, type casting, error logging, and the Nunjucks environment factory.

## Responsibility Boundaries

- Engine abstraction is the only block that knows engine-specific rendering semantics.
- Render orchestration must not know the template layout; it delegates resolution.
- File resolution is the only block that knows the filesystem template layout and override order.
- Configuration is the single owner of runtime settings; other blocks read, never write, it.
- The support layer must not own product behavior; it provides deterministic utilities.

## Optional Expansion

If the project grows, deeper structure documents may be created under `structure/`.

Do not create those subdocuments unless they are justified by project scale.
