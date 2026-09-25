# Verification Overview

- Path: `ctx/docs/verification/overview.md`
- Changed: `20260925`

Verification follows the established context: product meaning → architecture boundaries → environment prerequisites → code contracts → evidence. A passing test supports only the behavior its assertions exercise; it does not certify the whole lifecycle.

## Automated Behavioral Evidence

| Claim | Evidence | Limit |
| --- | --- | --- |
| Targets without locale preferences resolve ordinary application files; a missing localized variant can fall back to an unlocalized file. | `test/unit/Back/Act/File/Find.test.js` with the real locale helper; `test/integration/FileResolution.test.mjs` on disk. | The disk test uses a temporary application root. |
| User, application, and package locale variants are ordered and deduplicated; full locales precede short forms. | `test/unit/Back/Helper/Locale.test.js`; file selection in `Find.test.js`, including short-locale fallback. | Helper tests establish candidate order; they do not test every filesystem layout. |
| Application adaptations precede package originals, including when an adaptation is unlocalized and an original is localized. | `Find.test.js` and `FileResolution.test.mjs`. | The package path is simulated under a temporary `node_modules`, not installed by npm. |
| Resolution rejects an existing file outside the application root. | `FileResolution.test.mjs` creates a sibling file and requests it through path traversal. | This covers lexical containment for one traversal shape, not every filesystem or symlink behavior. |
| Raw strings bypass resolution and loading; file targets render through the same engine contract. | `test/unit/Back/Service/Render.test.js`. | Test doubles supply the engine and file actions. |
| A missing path yields `PATH_NOT_FOUND`; an empty readable template yields `TMPL_IS_EMPTY` when rendered and an empty string with `SUCCESS` when loaded; an unreadable resolved file yields `UNKNOWN_ERROR` through both services. | `test/unit/Back/Act/File/Load.test.js`, service unit tests, and `test/integration/FileResolution.test.mjs` with real filesystem reads. | The unreadable case uses a directory at the candidate path to trigger a read failure; other filesystem error modes are not enumerated. |
| `TEQFW_TMPL` initializes without locale keys, projects an explicit `DEFAULT_LOCALE` when present, and takes its root from CLI configuration; ordinary file rendering works without locale settings. | `test/unit/Back/Config.test.js` and `test/integration/Container.test.mjs` using the real cfg loader and filesystem. | The CLI runtime shape and render engine binding are supplied by the test. |
| Nunjucks includes use requested, configured default, then unlocalized templates; the unlocalized fallback works even with both locales configured, and equal requested/default locales do not duplicate lookup. | `test/integration/NunjucksLoaders.test.mjs` renders includes from temporary files for each fallback and equal-locale case; `test/unit/Back/Factory/Nunjucks/Env.test.js` checks loader deduplication; `test/integration/Container.test.mjs` checks cfg and DI wiring. | The integration tests cover file includes, not every Nunjucks include variant. |
| Primary target resolution and Nunjucks include lookup remain separate engine-specific paths. | `test/integration/FileResolution.test.mjs` exercises target resolution; `test/integration/NunjucksLoaders.test.mjs` exercises Nunjucks loaders; `src/Back/Factory/Nunjucks/Env.js` constructs include paths. | The tests establish each path independently; they do not test every template type or include form. |
| The render service depends on the engine contract and uses the host-provided implementation. | `Render.test.js` checks `__deps__`; `Container.test.mjs` resolves and invokes it through the real DI container with a test-mode binding. | This does not exercise a production host's composition policy. |

## Integration Evidence

`test/integration/Container.test.mjs` resolves the package through the real TeqFW DI container. It checks ordinary file rendering and Nunjucks includes with no locale keys, then checks an explicitly configured default for Nunjucks includes through real cfg sources, loaders, and files. The CLI runtime object and generic render engine binding are supplied by the test, so a production host's bootstrap and composition policy still need host-level verification.

`test/integration/FileResolution.test.mjs` uses actual temporary files to check ordinary lookup, unlocalized fallback, adaptation precedence, package-original fallback, root containment, and public results for missing, empty, and unreadable templates. It does not install a package or exercise symbolic links.

`test/integration/NunjucksLoaders.test.mjs` uses real Nunjucks includes and temporary files to check requested, default, and unlocalized selection with and without locale settings. Factory unit tests also check that equal requested and default locales create one localized loader.

## Structural And Package Checks

- `npm run typecheck` checks JavaScript, JSDoc, and `types.d.ts`; it cannot establish dynamic DI wiring or filesystem behavior.
- `npm test` runs unit and integration suites. Unit tests use `test/common.js` to register the package namespace and test doubles before DI resolution.
- `teqfw-esm-validator src --profile base` checks the TeqFW ESM baseline; `teqfw-esm-validator src --profile type-regular` checks regular-component declarations, including local class names, constructor form, JSDoc contracts, and DTO field declarations.
- `npm run lint:md` checks Markdown syntax. `adsm-ctx validate` checks installed context structure, metadata, and links; its installed version knows four standard levels, so the project-specific `verification/` level also needs manual structural review.
- `npm pack --dry-run` checks the publication file list without releasing the package. It cannot prove that a consumer has installed an external engine provider or configured its host correctly.
