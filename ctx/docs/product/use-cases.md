# Product Use Cases

- Path: `ctx/docs/product/use-cases.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe product use cases at the overview level.

This document defines product-goal semantics only: what users need to achieve, why those goals matter, what product result is expected, and which product boundaries apply.

## Level Boundary

Defines:

- major user goals;
- product-level expected outcomes;
- use-case groups;
- lifecycle position of use cases;
- role participation at the product level;
- use-case-level invariants.

Does NOT define:

- UI screens, forms, widgets, buttons, or interaction mechanics;
- API routes, requests, responses, or transport protocols;
- source code actions, services, handlers, or implementation algorithms;
- database records, DTO fields, persistence workflows, or storage structure;
- test cases or acceptance-test procedures;
- detailed role permissions beyond product-level participation.

## Use Case Groups

### Localized Rendering

The consumer renders a template with a specific locale and receives the best available localized content.

Participating roles: package consumer.

Expected outcome: rendered text for the requested type and locale.

Related domain areas: localization, resolution, rendering.

### Overriding Plugin Templates

The consumer replaces a plugin template for their application without touching the plugin package.

Participating roles: package consumer, plugin author.

Expected outcome: the adapted template is used where it exists, with fallback to the original.

Related domain areas: overrides, resolution.

### Engine Selection

The consumer chooses or supplies a rendering engine and has all rendering go through it.

Participating roles: package consumer, engine provider.

Expected outcome: rendering behavior of the chosen engine, uniformly applied.

Related domain areas: engine abstraction, rendering.

### Raw Template Rendering

The consumer renders a provided template string directly, without filesystem resolution.

Participating roles: package consumer.

Expected outcome: rendered text from the raw template with the given data.

Related domain areas: rendering.

## Core Use Cases

- Render a localized web template.
- Render a localized email or text template.
- Override a plugin template at the application level.
- Plug a custom engine through the DI container.
- Render a raw template string with data.

## Use Case Format

Use cases are kept at product level: goal, primary role, expected outcome, related domain concepts.

No UI, API, database, or implementation steps are described.

## Lifecycle Model

Localized rendering is the central, recurring lifecycle step of the product.

Overriding and engine selection are setup-time activities that shape later rendering.

Raw template rendering is an auxiliary path used when no filesystem resolution is needed.

## Outcome Principles

- A useful product result is rendered content matching the requested type and locale.
- Override produces a durable outcome: the adapted template persists in the application template area.
- Engine selection is durable at application configuration time.
- Rendering of a raw template is transient; it has no durable product state.

## Use Case Invariants

- Overriding never alters the original plugin template.
- Locale fallback is deterministic and ordered.
- All rendering goes through the selected engine.
- A missing template yields a defined result code, never silent fallback to another type.

## Use Case Documentation Map

No detailed use-case documents exist yet.
