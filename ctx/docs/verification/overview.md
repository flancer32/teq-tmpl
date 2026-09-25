# Verification Overview

- Path: `ctx/docs/verification/overview.md`
- Changed: `20260925`

Verification follows the established context: product meaning → architecture boundaries → environment prerequisites → code contracts → evidence. A passing test supports only the behavior its assertions exercise; it does not certify the whole lifecycle.

## Automated Behavioral Evidence

| Claim | Evidence | Limit |
| --- | --- | --- |
| Targets without locale preferences resolve ordinary application files; a missing localized variant can fall back to an unlocalized file. | `test/unit/Back/Act/File/Find.test.js` with the real locale helper; `test/integration/FileResolution.test.mjs` on disk. | The disk test uses a temporary application root. |
| User, application, and package locale variants are ordered and deduplicated. | `test/unit/Back/Helper/Locale.test.js`; file selection in `Find.test.js`. | Helper tests establish candidate order; they do not test every filesystem layout. |
| Application adaptations precede package originals, including when an adaptation is unlocalized and an original is localized. | `Find.test.js` and `FileResolution.test.mjs`. | The package path is simulated under a temporary `node_modules`, not installed by npm. |
| Resolution rejects an existing file outside the application root. | `FileResolution.test.mjs` creates a sibling file and requests it through path traversal. | This covers lexical containment for one traversal shape, not every filesystem or symlink behavior. |
| Raw strings bypass resolution and loading; file targets render through the same engine contract. | `test/unit/Back/Service/Render.test.js`. | Test doubles supply the engine and file actions. |
| Missing paths, empty content, engine results, and escaping exceptions produce the documented render codes. | `test/unit/Back/Service/Render.test.js` and engine unit tests. | File read failures are caught inside the loading action and follow a different path; see open question below. |
| `TEQFW_TMPL` projects locale settings, requires `DEFAULT_LOCALE`, and takes its root from CLI configuration. | `test/unit/Back/Config.test.js` and `test/integration/Container.test.mjs`. | The CLI runtime shape is supplied by a test double. |
| The render service depends on the engine contract and uses the host-provided implementation. | `Render.test.js` checks `__deps__`; `Container.test.mjs` resolves and invokes it through the real DI container with a test-mode binding. | This does not exercise a production host's composition policy. |

## Integration Evidence

`test/integration/Container.test.mjs` resolves the package through the real TeqFW DI container, loads `TEQFW_TMPL` through a real cfg source and loader, obtains a real log provider, and invokes the render service with a test-mode engine binding. It verifies package composition with those components. The CLI runtime object and engine binding are supplied by the test, so a production host's bootstrap and composition policy still need host-level verification.

`test/integration/FileResolution.test.mjs` uses actual temporary files to check ordinary lookup, unlocalized fallback, adaptation precedence, package-original fallback, and root containment. It does not install a package or exercise symbolic links.

## Structural And Package Checks

- `npm run typecheck` checks JavaScript, JSDoc, and `types.d.ts`; it cannot establish dynamic DI wiring or filesystem behavior.
- `npm test` runs unit and integration suites. Unit tests use `test/common.js` to register the package namespace and test doubles before DI resolution.
- `npm run lint:md` checks Markdown syntax. `adsm-ctx validate` checks installed context structure, metadata, and links; its installed version knows four standard levels, so the new `verification/` level also needs manual structural review.
- `npm pack --dry-run` checks the publication file list without releasing the package. It cannot prove that a consumer has installed an external engine provider or configured its host correctly.

## Human Review

Review the current diff against the product lifecycle and the architecture constraints, especially first-match resolution order, CLI root ownership, host engine binding, and excluded responsibilities. Compare README, package metadata, code, and consumer guidance with the context. Search for stale configuration names and links after document or module deletion.

One result-semantic question remains: `Back/Act/File/Load.js` logs a read error and returns null content. `Back/Service/Render.js` then returns `TMPL_IS_EMPTY`, while `Back/Service/Load.js` can return `SUCCESS` with null content. The previous architecture required an error result. Human review must decide which public result is intended before implementation changes.

The package-owned consumer skill must agree with the context on optional localization, host engine binding, and observed read-error behavior; review it when those contracts change.

The Nunjucks environment factory builds web loader paths independently of target-file resolution. Earlier architecture assigned all layout knowledge to the resolver. Human review should decide whether this engine-specific path construction is an accepted boundary or future consolidation work.

The protected root `AGENTS.md` and repository-local project conventions still call the package multilingual. The product documents define localization as optional. Aligning those instruction sources requires separate authorization and is not silently inferred from this documentation pass.
