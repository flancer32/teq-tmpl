# Issue 14 implementation report

Issue: <https://github.com/flancer32/teq-tmpl/issues/14>

## Plan and checklist

- [x] Preserve package layout and locale order; document package-scoped nested lookup in the architecture and code context.
- [x] Pass the trusted file target to Nunjucks without changing raw-string lookup or engine selection.
- [x] Resolve package includes and extends in adaptation-first, locale order, with isolated environments and safe nested paths.
- [x] Test package layouts, overrides, locale fallback, context isolation, escaping, missing files, traversal, and a symlink escape using a temporary host and fixture dependencies.
- [x] Update consumer documentation, packaged skill, type declarations, changelog, and package version to 0.6.1.
- [x] Run unit and integration tests, type checking, Markdown lint, platform topology validation, and a package dry run.
- [ ] Publish a release: no tag, GitHub release, or npm publication was made. Publication credentials were not tested.
- [ ] ADSM context validation: the installed validator reports 16 pre-existing schema/navigation errors, including metadata version 0.1.0 versus its 0.7 target. A separate context evolution is required; this change does not migrate metadata.

## Boundaries

Host and raw-string Nunjucks lookup retain requested/default/unlocalized behavior. Package targets use the target's locale preferences, not the configured host default. Cross-package and relative nested names are unsupported. Identically named self-extension is recursive. The integration fixtures do not replace verification in a production host. Existing primary file resolution only checks lexical application-root containment; the additional real-path check applies to nested package lookup.
