# Nunjucks Lookup Verification

- Path: `ctx/docs/verification/architecture/nunjucks-lookup.md`
- Changed: `20261112`

Primary target: [Nunjucks lookup behavior](../../architecture/behavior.md); secondary target: [product fallback](../../product/domain.md).

With Nunjucks and temporary readable fixture templates, host includes follow requested, default, and unlocalized fallback. Package targets resolve includes and extends within the selected package and type, apply locale and adaptation precedence, and do not fall back to host templates. Nested references cannot escape their template roots. Raw strings use host lookup.

Run `npm test`; `test/integration/NunjucksLoaders.test.mjs` exercises host fallback, package `extends` and `include`, package and type isolation, same-type package misses despite host matches, traversal, absolute paths, a symlink escape, `./` and cross-package logical names, and raw-string host lookup. `test/unit/Back/Factory/Nunjucks/Env.test.js` checks loader deduplication. Fixtures are not installed production packages.

See [interpretation and follow-up](../overview.md).
