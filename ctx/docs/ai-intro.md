# AI Introduction

- Path: `ctx/docs/ai-intro.md`
- Template Version: `20260623`
- Changed: `20260804`

## Purpose

This document gives AI agents a compact first orientation to the project.

It should classify the project, identify its problem space, name its primary audience, and prevent common misclassification before the agent reads deeper documentation.

## Project Type

A Node.js ESM library package distributed on npm as `@flancer32/teq-tmpl`.

It is a TeqFW plugin implementing the `Fl32_Tmpl_` namespace and integrating through the TeqFW DI container.

## Problem Space

Multilingual text-template management and rendering in Node.js applications.

The package solves localized template resolution and rendering with locale fallback and application-level overrides of plugin templates, without locking the host application to a specific template engine.

## Product Role

A backend rendering library for TeqFW-based applications.

Host applications choose and inject a template engine (Mustache, Nunjucks, or
custom) through the TeqFW DI container and use the render services to produce
localized web, email, or text content. The package does not select the engine
implementation from configuration.

It can also be used as a standalone Node.js module.

## Primary Audience

Developers building multilingual web applications and mailing services.

Teams working with plugins and modular architectures.

Maintainers of the package itself.

## Technology Base

- Node.js `>=20` runtime.
- ECMAScript modules (`"type": "module"`).
- TeqFW DI container (`@teqfw/di`) for dependency injection.
- Template engines `mustache` and `nunjucks` (available through the DI `npm:` namespace in consuming applications).
- Built-in test runner `node --test`.

## Methodological Base

The package is developed following the TeqFW philosophy: clear separation of concerns, modularity, and extensibility.

Documentation follows the 3DP methodology used across the TeqFW ecosystem.

## Distinguishing Characteristics

- Engine abstraction through `Fl32_Tmpl_Back_Api_Engine` with pluggable implementations.
- Locale-aware template resolution with fallback logic across user, application, and package locales.
- Application-level override system for plugin templates without modifying original code.
- File-based template layout under an application root path.
- Support for web, email, and text template types.

## What This Project Is Not

- Not a content management system.
- Not a web framework or an SSR framework.
- Not a static-site generator.
- Not a template authoring tool or an IDE extension.
- Not a server or a deployment platform.
- Not a translation/l10n management service.

## Reading Angle

Start with `product/overview.md` for product identity and boundaries.

Then read `architecture/overview.md` for the structural model.

Then read `code/overview.md` and `code/testing.md` for implementation mapping and verification.

## Boundary

This document is an orientation entry point.

It does not define product requirements, architecture contracts, environment constraints, code rules, or operational workflow semantics.
