# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Record durable architecture decisions in a short ADR-like form.

## Decision Format

Each entry contains:

- the decision;
- rejected alternatives;
- reasoning.

Only durable architecture decisions belong here.

This document is not a changelog or backlog.

## Decision Entries

### DI-Based Engine Injection

Decision: the render service depends on the engine contract and receives the concrete engine through the TeqFW DI container.

Rejected alternatives: a dedicated adapter class routing to engines by name.

Reasoning: DI injection gives host applications a single, explicit override point (`replace.add` mapping) and keeps the render service free of engine-routing logic.

### Removal Of The Template Adapter Layer

Decision: the adapter abstraction between render and engine was removed.

Rejected alternatives: keeping a dedicated adapter API.

Reasoning: the abstraction duplicated the engine contract without adding value; direct dependency on the engine contract is simpler.

### Locale-Aware Web Render Service

Decision: a convenience render entry point dedicated to web templates was added.

Rejected alternatives: forcing callers to build targets manually.

Reasoning: web rendering is the dominant consumer path; the convenience service reduces caller boilerplate while reusing the generic pipeline.

### Built-In Simple Engine

Decision: a dependency-free simple engine performing inline `{{ variable }}` substitution was included.

Rejected alternatives: requiring an external engine for minimal use cases.

Reasoning: the simple engine covers basic rendering with zero external dependencies and serves as a reference implementation of the engine contract.
