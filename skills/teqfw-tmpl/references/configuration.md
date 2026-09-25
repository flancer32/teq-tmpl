# Package Configuration

`@flancer32/teq-tmpl` reads configuration through the shared `@teqfw/cfg`
reader. The host must load configuration sources before resolving
`Fl32_Tmpl_Back_Config$`.

## Dependency and namespace

The injected dependency is:

```text
TeqFw_Cfg_Reader$
```

The package reads the `TEQFW_TMPL` namespace and projects it into typed values.
The supported keys are:

```text
TEQFW_TMPL__ALLOWED_LOCALES
TEQFW_TMPL__DEFAULT_LOCALE  optional
```

Both settings are optional. `ALLOWED_LOCALES` is exposed as the package's
available-locale list; it does not restrict locale values supplied in a target.
Array values from object Sources are preserved as a list. String values from
dotenv or process-environment Sources are split on commas, trimmed, and
filtered for empty items. No locale setting is required for ordinary
non-localized templates. When configured, `DEFAULT_LOCALE` supplies a fallback
for Nunjucks includes after the requested locale and before the unlocalized web
template directory. It does not affect primary file-target lookup.
The application root is supplied
by `TeqFw_Cli_Config$.applicationRoot`; it is not a template setting. The host
binds the engine contract through DI.

## Ownership rules

The package owns locale casting and the optional settings projection.
The CLI host owns runtime configuration initialization, while `@teqfw/cfg` owns template-setting source loading. Keep these concerns
separate:

- do not read `process.env` directly in package components;
- do not add a package-local configuration loader;
- do not introduce an application-wide configuration schema here;
- do not resolve the package configuration before cfg sources are loaded;
- do not define package-local root-path settings;
- bind the engine contract in the host composition root.

The host selects the engine implementation by binding
`Fl32_Tmpl_Back_Api_Engine$` through TeqFW DI; package configuration does not
select it.

When configuration behavior changes, update the package unit tests and verify
the real cfg provider in the integration test.
