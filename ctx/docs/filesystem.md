# Filesystem Structure

- Path: `ctx/docs/filesystem.md`
- Template Version: `20260605`
- Changed: `20260806`

## Purpose

Defines the declarative structure of the project repository at the top level only, listing root-level directories and root-level files and establishing repository boundaries as a navigation model.

## Root Structure

- `src/` — TeqFW plugin source code under the `Fl32_Tmpl_` namespace.
- `skills/` — package-owned consumer/agent skills distributed with the npm package.
- `test/` — unit tests mirroring the source tree.
- `.agents/` — project-local agent skills; `skills/` holds local skills and version-matched symlinks into installed packages.
- `ctx/` — cognitive context containing project documentation, assets, and project-local agent materials.

## Root Files

- `AGENTS.md` — root-level agent instructions.
- `package.json` — package metadata, scripts, and dependency declarations.
- `package-lock.json` — locked dependency tree.
- `README.md` — package documentation distributed to consumers.
- `CHANGELOG.md` — release history.
- `LICENSE` — Apache-2.0 license text.
- `.gitignore` — git ignore rules.

## Scope Rule

This document must describe only top-level directories and root-level files of the repository.

Subdirectories must not be described here.

Lower-level structure must be described only by the corresponding `AGENTS.md` files within those directories.

## Boundary Definition

- `ctx/` defines the system model and governs interpretation of the repository.
- Product implementation directories must be named here only after the project structure is known.
- Generated, dependency, cache, secret, and local tool directories must be omitted unless the project context explicitly governs them.

Omitted by this rule: `node_modules/`, `.idea/`, `tmp/`, and any local environment files.
