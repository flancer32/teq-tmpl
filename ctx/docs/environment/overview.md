# Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Template Version: `20260605`
- Changed: `20260806`

## Purpose

Describe the runtime and operational environment required by the system.

## Runtime Model

The package is a library running inside a host Node.js application.

Runtime surfaces:

- TeqFW-based applications that resolve the plugin through the TeqFW DI container;
- the package's own test runner executing on the local or CI Node.js runtime.

The package has no independent deployment target or server process.

## External Dependencies

- `@teqfw/di` — runtime composition, a direct dependency resolved from the npm registry.
- `@teqfw/cfg` — shared template-setting configuration reading used by the plugin.
- `@teqfw/cli` — public DI runtime configuration contract providing `applicationRoot`.
- `@teqfw/log` — shared structured logging used by the plugin.
- `mustache` and `nunjucks` — engine providers supplied by consuming applications through the DI `npm:` namespace; `mustache` and `nunjucks` are declared as development dependencies of the package itself.
- Node.js built-in modules `node:fs`, `node:fs/promises`, and `node:path`.
- npm registry for distribution.

## Environment Constraints

- Node.js `>=20` is required for runtime and for CI.
- ECMAScript modules are mandatory; the package ships as `"type": "module"`.
- Template files must be readable on the filesystem at runtime under the CLI-provided application root.
- Package publication is performed by project agents; no publication workflow is part of this repository.
