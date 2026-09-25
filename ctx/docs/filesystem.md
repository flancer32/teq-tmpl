# Filesystem Structure

- Path: `ctx/docs/filesystem.md`
- Template Version: `20260605`
- Changed: `20260925`

This map covers the repository root; local `AGENTS.md` files govern deeper documentation.

- `src/` — package runtime modules in the `Fl32_Tmpl_` namespace.
- `test/` — unit and integration tests.
- `skills/` — package-owned consumer guidance included in the npm archive.
- `.agents/` — repository-local agent skills and installed-package links.
- `ctx/` — authoritative cognitive context, versioned with the product.
- `AGENTS.md` — protected root working rules.
- `package.json`, `package-lock.json` — package metadata and locked dependencies.
- `README.md`, `CHANGELOG.md`, `LICENSE` — consumer documentation, history, and license.
- `jsconfig.json`, `types.d.ts` — JavaScript type-check settings and shared declarations.
- `.gitignore` — local and generated-file exclusions.
