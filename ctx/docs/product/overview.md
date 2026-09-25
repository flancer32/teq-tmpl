# Product Overview

- Path: `ctx/docs/product/overview.md`
- Template Version: `20260702`
- Changed: `20260925`

## Product Identity

`@flancer32/teq-tmpl` is a template-management and text-rendering layer for Node.js applications. It turns a template target into output by resolving a file, loading its content, and rendering it with application data through an injected engine. A caller may also render a supplied template string without file resolution.

Applications can use ordinary templates without locale information. Resolution also supports application overrides of package templates and optional locale-aware selection with deterministic fallback. The package provides an engine contract and implementations; no particular template language defines the product.

## Boundary

The package owns file resolution, loading, render orchestration, and the engine contract. Applications and packages own template content; the host supplies render data, configuration, and an engine implementation.

The package does not author or edit templates, manage translations or content meaning, serve web requests, orchestrate SSR, or require a UI, database, or network layer. It does not own deployment or hosting.

See `domain.md` for lifecycle concepts, `use-cases.md` for consumer outcomes, `roles.md` for ownership, and `glossary.md` for terms.
