# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260702`
- Changed: `20260804`

Keep this document short enough for fast supervision.

## Purpose

Provide a compact entry point to the architecture level.

## Architecture Role

This level translates product intent into stable engineering structure.

It answers briefly:

- what is structurally built: a TeqFW backend plugin for template resolution, loading, and rendering;
- how the system behaves internally: a small render pipeline from target to rendered content;
- where state is owned: the cfg-backed configuration projection and template files on disk;
- what integrations exist: TeqFW DI, cfg, log, and the engine contract;
- what constraints must not be violated: template layout, engine contract, and locale order;
- why key decisions were made: recorded in `decisions.md`;
- how humans and agents supervise consistency: see `supervision.md`.

## Architectural Style

A TeqFW plugin following DI-first modular composition.

All services are resolved through the TeqFW DI container.

The plugin is layered into a public API surface, service orchestration, acts, helpers, factories, DTOs, and enums under the `Fl32_Tmpl_Back_` namespace.

## Major Areas

- Engine abstraction — the pluggable rendering contract and its implementations.
- Render orchestration — the services that turn render arguments into rendered content.
- File resolution and loading — acts that map a target to a template file and load it.
- Configuration — the typed `TEQFW_TMPL` projection over the shared cfg dataset.
- Support layer — locale helpers, casting helpers, platform logging, and the Nunjucks environment factory.

## Documentation Map

- Read `structure.md` when the question is "what are the main architectural areas and boundaries?"
- Read `behavior.md` when the question is "how do those areas work together through major internal flows?"
- Read `checklists.md` when the question is "which fast human checks should I run before concluding that agent work drifted?"
- Read `state.md` when the question is "where is authoritative state owned, persisted, changed, and derived?"
- Read `integration.md` when the question is "which external systems and internal contract boundaries matter?"
- Read `constraints.md` when the question is "which architectural options are forbidden or non-negotiable?"
- Read `decisions.md` when the question is "why was this architecture chosen over other durable alternatives?"
- Read `supervision.md` when the question is "what may agents change, what requires approval, and what signals drift?"

## Product Dependency

Architecture depends on product documentation.

Product documentation defines what the product is.

Architecture documentation defines how that product is realized structurally.

The expected dependency is:

```text
product
  → architecture
  → environment
  → code
```

Architecture must not redefine product meaning, invent missing product behavior, or normalize product contradictions silently.

## Collaboration

One human supervises many agents working on this library package.

The architecture documents are the operational interface for agents: they describe the boundaries within which agents may refine resolution, loading, rendering, or engine behavior.

Agents must update these documents before changing code when a new architectural concept appears.
