# Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Template Version: `20260605`
- Changed: `20260925`

`@flancer32/teq-tmpl` runs as an ECMAScript-module library inside a Node.js `>=20` host. It has no standalone server or deployment process.

The host must make template files readable under its computed application root and initialize `TeqFw_Cli_Config$` before resolving package components. It must load cfg sources before the package reads `TEQFW_TMPL`. Runtime composition and logging require `@teqfw/di`, `@teqfw/cfg`, `@teqfw/log`, and the CLI peer dependency. File access uses Node's built-in filesystem and path modules.

Ordinary non-localized templates require no `TEQFW_TMPL` locale settings. A configured `DEFAULT_LOCALE` supplies an optional Nunjucks include fallback before the unlocalized directory.

The host must supply an implementation of the engine contract. The bundled Simple engine needs no external template package; Mustache and Nunjucks providers need their respective packages available to the host. The package declares those providers as development dependencies, not required runtime dependencies for every consumer.
