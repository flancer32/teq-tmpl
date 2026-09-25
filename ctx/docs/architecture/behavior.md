# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260925`

## Rendering

The generic render service uses a supplied string directly, including when a target is also present. Otherwise it resolves and loads the target's file. It invokes the injected engine with template text, caller data, and options; the target's user locale is passed as the engine's `locale` option. The engine's result code and content become the render result. The package does not select an engine per call.

No target or content yields `TMPL_IS_EMPTY`; an unresolved target yields `PATH_NOT_FOUND`. An exception escaping resolution, loading, or engine invocation is logged and yields `UNKNOWN_ERROR`. An empty string reaches the engine, whose empty-template semantics then apply. Engine-specific failures can also return their own result code.

## File Resolution

Without a package identifier, lookup checks application templates. With one, it checks the whole application adaptation area before package originals in `node_modules`. Within each area, locale candidates follow user, application, then package preference; each full locale precedes its short form, duplicate forms are removed, and the unlocalized file follows. With no locale preferences, lookup checks the unlocalized file directly. The first existing path contained by the application root wins; a miss returns no path and is logged at trace level.

Loading reads UTF-8 text. File read failures are logged and returned as null content by the loading action; see verification documentation for the resulting service-level behavior and its unresolved semantic question.

For Nunjucks includes, a separate environment factory builds loaders for the requested user locale and configured default locale under the application's web template area. It caches loaders per locale and environments per locale pair.

## Configuration

After the host loads cfg sources, the package reads `TEQFW_TMPL`. `ALLOWED_LOCALES` accepts an array or a comma-separated string; string items are trimmed and empty items removed. The resulting list is immutable. `DEFAULT_LOCALE` is required for the current configuration projection and used by Nunjucks as a fallback loader locale, even when a particular template target has no locale preferences. The application root comes from CLI runtime configuration. No package setting chooses the engine.
