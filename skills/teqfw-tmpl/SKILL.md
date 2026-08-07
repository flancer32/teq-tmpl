---
name: teqfw-tmpl
description: Use when integrating, configuring, testing, or modifying the @flancer32/teq-tmpl package for localized template resolution and rendering through TeqFW DI.
---

# `@flancer32/teq-tmpl`

Use this package-owned skill for work that directly consumes or changes
`@flancer32/teq-tmpl`. It is package guidance, not platform authority. Verify
current APIs, metadata, source, and tests before relying on a package detail.

## First route

Choose only the reference needed for the task:

- [Integration](references/integration.md) — compose the package in a host,
  register namespaces, select an engine, or mount this skill.
- [Configuration](references/configuration.md) — load and project `TEQFW_TMPL`
  settings through `@teqfw/cfg`.
- [Contracts and components](references/contracts.md) — inspect DI tokens,
  engine contracts, component responsibilities, or result codes.
- [Rendering and lookup](references/rendering.md) — reason about targets,
  locale fallback, template paths, overrides, and filesystem boundaries.
- [Testing and maintenance](references/testing.md) — change implementation,
  update tests, or run package verification.

## Engine ownership

Engine selection belongs to the host application's composition root. The
package owns the `Fl32_Tmpl_Back_Api_Engine` contract and provides reference
implementations, but it does not select an implementation from
`TEQFW_TMPL__ENGINE` and does not install a DI preprocessor for that purpose.

The host chooses the engine library, installs the provider it needs, and maps
or registers `Fl32_Tmpl_Back_Api_Engine$` to the selected implementation.
Custom engines remain valid when they implement the package contract. A
package-local selector would be an architectural change, not an integration
fix.

## Non-negotiable boundaries

- The runtime namespace is `Fl32_Tmpl_` mapped to `./src` with `.js` files.
- Host composition owns the container, namespace registration, configuration
  source loading, and engine selection.
- Components use TeqFW DI contracts; do not create a second container or
  replace DI dependencies with physical imports.
- Configuration comes from `TeqFw_Cfg_Reader$`; logging comes from
  `TeqFw_Log_Provider$`. The package owns neither backend nor source loader.
- The package reads templates and returns documented result codes. It does not
  write template files or own web serving, UI, storage, or translation data.
- This skill is discovered independently from TeqFW runtime metadata. It must
  not add a runtime namespace, postinstall mutation, or automatic host link.

When a task crosses several areas, load the smallest set of directly relevant
references and keep the host project's `AGENTS.md`, context, source, and tests
authoritative for project-specific decisions.
