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
TEQFW_TMPL__DEFAULT_LOCALE  required
TEQFW_TMPL__ENGINE          defaults to nunjucks
TEQFW_TMPL__ROOT_PATH       required
```

`ALLOWED_LOCALES` is exposed as the package's available-locale list. Array
values from object Sources are preserved as a list. String values from dotenv
or process-environment Sources are split on commas, trimmed, and filtered for
empty items. The default locale and root path are required. `ENGINE` records
the host's engine choice and defaults to `nunjucks` when omitted. The package
exposes this typed value; host composition still maps the choice to the engine
contract.

## Ownership rules

The package owns casting, the engine default, and required-value validation.
The host owns configuration source selection and loading. Keep these concerns
separate:

- do not read `process.env` directly in package components;
- do not add a package-local configuration loader;
- do not introduce an application-wide configuration schema here;
- do not resolve the package configuration before cfg sources are loaded.
- do not treat `ENGINE` as an automatic DI alias or expect the package to
  install an engine-selection preprocessor.

When configuration behavior changes, update the package unit tests and verify
the real cfg provider in the integration test.
