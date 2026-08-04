# Product Domain Model

- Path: `ctx/docs/product/domain.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe the product world at the overview level.

This document defines product-world semantics only: what exists in the product world, why it matters, who owns it, and how major concepts relate to each other.

## Level Boundary

Defines:

- major domain areas;
- core domain entities;
- ownership principles for domain objects;
- semantic relations between domain areas and entities;
- domain-level invariants.

Does NOT define:

- database tables, DTO fields, indexes, migrations, or persistence structure;
- API routes, request and response contracts, or transport protocols;
- UI screens, widgets, components, or user interaction mechanics;
- source code structure, modules, services, classes, or implementation algorithms;
- detailed role permissions and authority rules.

## Domain Areas

### Template Resolution

The area that turns a template target into a concrete filesystem path.

It owns the meaning of a template target, the template directory layout, and the override search order.

Its primary entity is the template target.

It relates to localization and overrides by consuming their values during path building.

### Localization

The area that defines which locale variants are considered for a template.

It owns the user, application, and package locale values and their priority.

Its primary entity is the locale set.

It feeds template resolution and rendering.

### Overrides

The area that lets an application replace plugin templates without modifying the plugin.

It owns the adapted-template area and the fallback to original plugin templates.

Its primary entity is the adapted template.

It relates to template resolution through the package identifier.

### Rendering

The area that produces the final text output from template content and data.

It owns the render entry points and the engine invocation.

Its primary entities are the render request and the rendered content.

It relates to the engine abstraction by delegating actual substitution to an engine.

### Engine Abstraction

The area that defines the pluggable contract for template engines.

It owns the engine contract and the set of supported engines.

Its primary entity is the template engine.

It serves the rendering area.

## Core Domain Entities

- Template Target — a request to render a template, carrying type, name, optional package, and locales.
- Template File — a text file under the template directory layout, resolvable from a target.
- Locale — a language identifier (full or short form) used for selection.
- Template Type — a category of output: web, email, or text.
- Template Engine — a renderer conforming to the engine contract.
- Rendered Content — the output text produced for a target and data.

## Ownership Principles

Template files are owned by their defining party: the application owns its own templates and adapted templates, and each plugin owns its original templates.

The package owns the resolution, loading, and rendering behavior, not the template content.

Template engines are owned by their providers; the package owns only the contract.

## Semantic Relations

- A template target selects a template file according to locale and override rules.
- A template file has a type and belongs to an owner (application or plugin).
- A locale set orders locale variants by priority.
- An adapted template shadows a plugin template for the same type, name, and locale.
- A render request pairs a target with data and produces rendered content.
- A template engine consumes template content and data and produces rendered content.

## Domain Invariants

- An adapted template never changes the original plugin template.
- A template target always resolves to at most one template file.
- Rendering never falls back to a different type; the type is part of the target.
- Locale fallback is deterministic: user, then application, then package; full locale before short locale.

## Domain Documentation Map

No detailed domain-area documents exist yet.

This overview document is the single product-domain source.
