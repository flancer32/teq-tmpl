# Nunjucks Lookup Verification

- Path: `ctx/docs/verification/architecture/nunjucks-lookup.md`
- Changed: `20261112`

Primary target: [Nunjucks lookup behavior](../../architecture/behavior.md); secondary target: [product fallback](../../product/domain.md).

With Nunjucks and temporary readable fixture templates, host includes follow requested, default, and unlocalized fallback. Package targets resolve includes and extends within the selected package and type, apply locale and adaptation precedence, and do not fall back to host templates. Nested references cannot escape their template roots. Raw strings use host lookup.

Run `npm test`; `test/integration/NunjucksLoaders.test.mjs` exercises host fallback, package `extends` and `include`, package and type isolation, missing files, traversal, absolute paths, a symlink escape, and raw-string host lookup. `test/unit/Back/Factory/Nunjucks/Env.test.js` checks loader deduplication. Fixtures are not installed production packages. The test checks a missing template for a different type while a host template of that name exists; it does not separately exercise every package-miss and host-fallback combination. It checks `../` traversal but does not independently enumerate cross-package logical names or relative-reference forms; do not infer exhaustive coverage from its path checks.

See [interpretation and follow-up](../overview.md).
