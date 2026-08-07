# Product Overview

- Path: `ctx/docs/product/overview.md`
- Template Version: `20260702`
- Changed: `20260806`

Keep this document short enough for fast orientation.

## Product Identity

`@flancer32/teq-tmpl` is a universal Node.js package for managing and rendering text templates.

It provides multilingual template resolution and rendering for web pages, email campaigns, and other text formats.

The product serves application developers who need localized, overridable template output without committing to a specific template engine.

## Product Mission

The package exists to let any Node.js application produce localized, engine-agnostic template output.

The stable product intention is: keep template location, locale selection, and rendering behind a small, replaceable interface so that applications own their templates without engine lock-in.

## Product Scope

The product is responsible for:

- resolving template files by type, name, package, and locale;
- loading template content from the filesystem;
- rendering loaded content through an injected engine;
- supporting application-level overrides of plugin templates;
- exposing a small engine interface for pluggable engines;
- covering web, email, and text template types.

The product does not manage the meaning of template content, translation sources, or rendering data.

## Product Areas

- Template resolution — how a template target becomes a concrete file path.
- Localization — how user, application, and package locales drive selection and fallback.
- Overrides — how application templates replace plugin templates.
- Rendering — how engines consume template content and data.
- Engine abstraction — the pluggable contract for rendering engines.

Detail lives in `domain.md`, `roles.md`, `use-cases.md`, and `glossary.md`.

## Core Lifecycle

1. The host application defines a template target: type, name, optional package, and locales.
2. The package resolves the best available template file using locale priority and override rules.
3. The package loads the template content from disk.
4. The injected engine renders the content with the provided data.
5. The package returns rendered content and a result code.

## Product Boundaries

### In Scope

- File-based template search under the configured CLI-provided application root.
- Locale fallback across user, application, and package locales.
- Application-level overrides of plugin templates.
- Engine abstraction with Mustache, Nunjucks, and a built-in simple engine.
- Web, email, and text template types.
- Standalone use outside a TeqFW application.

### Out of Scope

- Template authoring, editing, or content management UI.
- Translation management or localization tooling.
- Web serving, routing, or SSR orchestration.
- Static-site generation or build pipelines.
- Deployment, hosting, or scaling.
- Authentication, authorization, or user management.

## MVP Boundary

The current committed version is `0.4.0`.

All three template types (web, email, text) are in scope and are rendered through the generic render service.

A locale-aware web rendering service (`Render_Web`) is available as a convenience entry point for web templates.

The simple engine provides inline `{{ variable }}` substitution without external dependencies.

## Product Invariants

- Template resolution never modifies the source templates of plugins.
- Locale priority is user, then application, then package; full locale (`xx-YY`) is preferred over its short form (`xx`).
- Rendering always goes through an engine conforming to the engine interface.
- The package adds no required UI, storage, or network layer to a host application.

## Documentation Map

- Read `domain.md` to understand the product world, domain areas, business entities, ownership, and semantic relations.
- Read `roles.md` to understand product participants, authority, permissions, ownership boundaries, and responsibility boundaries.
- Read `use-cases.md` to understand user goals, expected outcomes, and product-level usage scenarios.
- Read `glossary.md` to understand stable product terminology.
