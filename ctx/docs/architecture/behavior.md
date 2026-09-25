# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260925`

## Rendering

The generic render service uses a supplied string directly, including when a target is also present. Otherwise it resolves and loads the target's file. It invokes the injected engine with template text, caller data, and options; the target's user locale is passed as the engine's `locale` option. The engine's result code and content become the render result. The package does not select an engine per call.

No target or an empty template string yields `TMPL_IS_EMPTY`; an unresolved target yields `PATH_NOT_FOUND`. A resolved file that cannot be read yields `UNKNOWN_ERROR`, as does an unexpected resolution or rendering exception. Engine-specific failures can also return their own result code.

## File Resolution

Without a package identifier, lookup checks application templates. With one, it checks the whole application adaptation area before package originals in `node_modules`. Within each area, locale candidates follow user, application, then package preference; each full locale precedes its short form, duplicate forms are removed, and the unlocalized file follows. With no locale preferences, lookup checks the unlocalized file directly. The first existing path contained by the application root wins; a miss returns no path and is logged at trace level.

Loading reads UTF-8 text. The loading action logs and rethrows read failures; both public services catch them and return `UNKNOWN_ERROR`. A readable empty file remains valid input: rendering reports `TMPL_IS_EMPTY`, while load-only returns `SUCCESS` with an empty string.

For Nunjucks includes, the environment factory builds loaders under the application's web template area. It tries the requested locale first, then an explicitly configured default locale. Without a default, it falls back to the unlocalized web directory; with neither locale, it uses that directory alone. It caches loaders per locale and environments per locale pair.

## Configuration

After the host loads cfg sources, the package reads `TEQFW_TMPL`. `ALLOWED_LOCALES` accepts an array or a comma-separated string; string items are trimmed and empty items removed. The resulting list is immutable. `DEFAULT_LOCALE` is optional; when supplied, Nunjucks uses it as an include-loader fallback. No locale setting is needed for ordinary non-localized templates. The application root comes from CLI runtime configuration. No package setting chooses the engine.
