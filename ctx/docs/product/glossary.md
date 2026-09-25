# Product Glossary

- Path: `ctx/docs/product/glossary.md`
- Template Version: `20260605`
- Changed: `20260925`

- **Template target:** descriptor used for file lookup. Type and name identify the requested template; a package identifier and locale preferences may be supplied. It is not the complete render request.
- **Template name:** relative path with extension within a template type.
- **Template type:** the requested template category (`web`, `email`, or `text`); resolution does not substitute another type.
- **Application adaptation:** an application-owned replacement for a package template, stored in the adapted template area. “Override” names its precedence, never a change to the package original.
- **Locale preferences:** optional user, application, and package locale values that inform file resolution. Their fallback order is defined in `domain.md`.
- **Application root:** host directory supplied by the CLI runtime configuration, under which application templates and installed packages are found. It is not a template setting.
