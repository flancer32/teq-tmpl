# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260702`
- Changed: `20260804`

## Purpose

Record non-negotiable architecture restrictions and trust boundaries.

## Core Constraints

- The plugin runs in Node.js `>=20` with ECMAScript modules.
- All plugin services are composed through the TeqFW DI container.
- Rendering always goes through an engine conforming to the engine contract.
- The template layout under the application root path follows the pattern `tmpl/<type>/[<locale>/]<name>` for application templates and `tmpl/adapt/<pkg>/<type>/[<locale>/]<name>` for adapted plugin templates.
- Locale fallback order is user, application, package; full locale before short locale.
- Configuration is loaded by `@teqfw/cfg`; the package consumes the `TEQFW_TMPL`
  namespace through `TeqFw_Cfg_Reader$` and must not read `process.env` directly.
- The plugin is stateless across render calls; it introduces no durable state of its own.

## Boundary Constraints

- The plugin must not modify, write, or delete template files.
- The plugin must not implement its own web serving, routing, or SSR orchestration.
- The plugin must not manage template content meaning or translation sources.
- The plugin must not require a UI, a network layer, or a database.
- The plugin must not redefine the engine contract; that contract is its stable integration surface.

## Change Constraints

The following architecture changes always require human approval:

- a new engine contract or a breaking change to the existing contract;
- a change to the template layout or locale fallback order;
- a new required external integration;
- a new persistent state owner or category;
- a new major system boundary.

## Human Review Use

Questions a human should answer quickly with this document:

- Is this change inside an existing architectural boundary?
- Does the change alter the template layout or the locale order?
- Does the change add a required dependency or a persistent state?
- Does the change break the engine contract?
