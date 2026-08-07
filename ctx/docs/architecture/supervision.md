# Architecture Supervision

- Path: `ctx/docs/architecture/supervision.md`
- Template Version: `20260702`
- Changed: `20260804`

## Purpose

Describe how one human and many agents supervise architecture-level consistency.

Use this document for durable supervision rules and approval boundaries.

Use `checklists.md` for short recurring human checks.

## Human-Agent Supervision Principle

- Humans own architectural direction and guardrails.
- Agents operate within documented architectural boundaries.
- Architecture documentation is the authoritative medium through which the human direction-setting loop and the agent refinement and execution-support loop coordinate at the architecture level.
- Agents must surface architectural drift instead of silently resolving it.
- Major architectural boundary changes require human approval.

## Human Responsibilities

The human sets the direction for the template package, approves guardrails such as the template layout and the engine contract, and resolves architectural uncertainty about scope and breaking changes.

## Agent Responsibilities

Agents may refine resolution, loading, rendering, and engine implementation behavior autonomously inside existing architecture boundaries.

Agents may add helpers, DTOs, and tests when the change stays inside the documented blocks.

Agents should prefer updating documentation before code when a new architectural concept appears.

## Mandatory Approval Cases

The following changes require human approval:

- a new engine contract or a breaking change to the existing contract;
- a change to the template layout or locale fallback order;
- a new required external integration;
- a new persistent state owner or category;
- a new system boundary.

## Drift Signals

Signals that architecture and implementation are diverging:

- code depends on a contract not recorded in `integration.md`;
- a template path pattern appears outside the documented layout;
- the locale fallback order changes without a decision entry;
- a service bypasses the DI container;
- durable state appears without an entry in `state.md`;
- product scope is expanded through undocumented behavior.

## Pre-Code Check Order

Before code-oriented work, agents must check these documents in order:

```text
product
  -> architecture
  -> environment
  -> code
```
