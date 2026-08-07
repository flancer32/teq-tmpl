# Product Role Model

- Path: `ctx/docs/product/roles.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Describe product participants and their authority at the overview level.

This document defines product-role semantics only: who participates in the product world, why each role exists, what each role may control, and where responsibility boundaries are placed.

## Level Boundary

Defines:

- role categories;
- role authority principles;
- ownership and responsibility boundaries;
- role visibility principles;
- role participation rules;
- role-level invariants.

Does NOT define:

- authentication mechanisms, sessions, tokens, passwords, or identity storage;
- API authorization middleware, route guards, or endpoint permissions;
- UI screens, buttons, menus, or interaction mechanics;
- source code roles, classes, services, policies, or implementation algorithms;
- database tables, access-control records, or persistence structure;
- detailed domain entity structure.

## Role Categories

The product is a library, so its participants are integration roles rather than end-user roles.

### Package Consumer

An application developer integrating `@flancer32/teq-tmpl` into a Node.js or TeqFW application.

They own the application templates and the choice of engine; the CLI host supplies the application root runtime fact.

### Engine Provider

A developer supplying a template engine implementation that conforms to the engine contract.

They own the engine behavior and its configuration.

### Plugin Author

A developer of a TeqFW plugin that ships templates for the package to render.

They own the original plugin templates under the plugin package.

## Core Roles

- Package Consumer — the primary participant; composes configuration, templates, and engine into a working render pipeline.
- Engine Provider — supplies a pluggable engine and registers it in the application DI container.
- Plugin Author — distributes templates that consumers may override.

## Authority Principles

- The package consumer decides which templates exist and which engine is used; the CLI host determines the application root.
- The package consumer may override any plugin template through the adapted area.
- The engine provider decides how the engine renders, but must honor the engine contract.
- The plugin author may not change how a consumer overrides their templates.

## Ownership Boundaries

- Package Consumer: owns application templates, adapted templates, and engine selection; the CLI owns the computed application root.
- Engine Provider: owns engine implementation and behavior.
- Plugin Author: owns original plugin templates.
- Package: owns resolution, loading, rendering, and the engine contract.

## Participation Relations

- Provider and Consumer: the engine provider supplies the engine consumed by the package consumer.
- Author and Consumer: the plugin author publishes templates that the consumer can override.
- Provider of contract: the package defines the engine contract; the engine provider implements it.

## Role Invariants

- No role may modify the original plugin templates through the package.
- The engine contract is owned by the package, not by any engine provider.
- The consumer always retains the final choice of templates and engine.

## Role Documentation Map

No detailed role documents exist yet.
