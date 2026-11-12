# Template Lifecycle Verification

- Path: `ctx/docs/verification/product/template-lifecycle.md`
- Changed: `20261112`

Primary target: [product lifecycle and fallback](../../product/domain.md); see also [rendering behavior](../../architecture/behavior.md).

With readable fixture files, resolution selects the first applicable location and locale, retains template type, and supports ordinary unlocalized files. Rendering a raw string bypasses file lookup; a file target uses the injected engine. Missing, empty and unreadable inputs produce the declared results.

Run `npm test`. `test/unit/Back/Helper/Locale.test.js` and `test/unit/Back/Act/File/Find.test.js` check candidate ordering; `test/integration/FileResolution.test.mjs` checks disk selection, adaptation precedence, lexical root containment and service results. `test/unit/Back/Service/Render.test.js` checks orchestration; `test/integration/Container.test.mjs` checks cfg and DI integration. Configuration tests cover locale projection.

`test/integration/FileResolution.test.mjs` also checks type isolation, ordered locale selection across user/application/package preferences and full/short forms, and rejection of a symlink to a file outside the application root. The unreadable-file scenario uses a directory at the candidate path. Fixtures use temporary roots and simulated package installations; unit collaborators and the integration test engine are controlled substitutes, not proof of a production host's bootstrap or engine behavior. See [interpretation and follow-up](../overview.md).
