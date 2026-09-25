# Code Overview

- Path: `ctx/docs/code/overview.md`
- Template Version: `20260605`
- Changed: `20260925`

Runtime modules use native ESM and the `Fl32_Tmpl_Back_` namespace. Services receive dependencies through `__deps__` and constructor injection; they do not import runtime dependencies statically. The host binds `Fl32_Tmpl_Back_Api_Engine$` to a built-in or custom implementation before resolving the render service. No engine selector lives in the package configuration or render request.

`Back/Act/File/Find.js` owns candidate paths, precedence, and root containment. `Back/Act/File/Load.js` reads UTF-8 content and rethrows logged read failures for service-level error mapping. `Back/Service/Render.js` chooses raw content or the find/load path and calls the engine; `Back/Service/Load.js` exposes file content and path without rendering. `Back/Config.js` projects optional cfg locale settings and reads the CLI root. `Back/Factory/Nunjucks/Env.js` caches Nunjucks loaders and environments by locale combination, with an unlocalized loader last. Keep engine implementations behind `Back/Api/Engine.js`.

Routine lookup misses and incomplete targets are logged at trace level; caught file and rendering errors are logged at error level through `TeqFw_Log_Provider$`. The host controls log visibility. Mustache and Nunjucks implementations inject their provider packages through DI `npm:` addresses. Public classes follow the `Fl32_Tmpl_Back_*` naming convention and carry JSDoc; add new comments only as JSDoc for public behavior and keep `types.d.ts` aliases aligned with exported modules.

`package.json#files` publishes runtime source, types, JavaScript configuration, README, license, changelog, and the package-owned consumer skill. Context and tests remain repository-only.
