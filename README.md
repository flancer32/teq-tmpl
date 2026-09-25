# @flancer32/teq-tmpl

![npms.io](https://img.shields.io/npm/dm/@flancer32/teq-tmpl)

> **Human-governed. Agent-built. Agent-ready.**

`@flancer32/teq-tmpl` is a template-management and text-rendering layer for
Node.js/TeqFW applications. It resolves and loads files, supports application
overrides of package templates, and renders through an engine selected by the
host application. Locale-aware lookup is optional; ordinary unlocalized
templates work without locale configuration.

## What it does

- Resolves files under the application template root and, for package targets,
  checks application adaptations before package templates.
- Supports optional locale preferences and deterministic fallback. Unlocalized
  templates are first-class candidates.
- Renders files or raw template strings through a host-selected engine. The
  package provides Simple, Mustache, and Nunjucks implementations and accepts
  other engines that implement its contract.
- Works with web, email, text, and other file-based template types. It reads
  template files and does not modify them.

The lifecycle is:

```text
template target → resolution → loading → rendering → output
```

A raw template string starts at rendering and skips resolution and loading.

## Installation and setup

```sh
npm install @flancer32/teq-tmpl @teqfw/cli
```

The package requires Node.js `>=20` and uses TeqFW dependency injection. The
host initializes `TeqFw_Cli_Config$` and cfg sources before resolving template
services. It selects one engine in its DI composition root by mapping
`Fl32_Tmpl_Back_Api_Engine$` to an implementation, for example
`Fl32_Tmpl_Back_Service_Engine_Simple$`. The host installs the provider package
for its chosen implementation when needed:

```sh
npm install mustache
# or
npm install nunjucks
```

The built-in Simple engine needs no additional template-engine package. Engine
selection is host-owned; `teq-tmpl` has no engine configuration setting.

Locale configuration is optional. `ALLOWED_LOCALES` is an optional locale list
exposed by the package. `DEFAULT_LOCALE` is an optional fallback for Nunjucks
includes; it does not affect primary file-target lookup. Nunjucks includes use
the requested locale, then the configured default locale, then the unlocalized
web template directory. An application using only unlocalized templates needs
no locale settings:

```dotenv
# Optional; available to the application through the package configuration.
TEQFW_TMPL__ALLOWED_LOCALES=en,es,ru
# Optional; used by Nunjucks includes only.
TEQFW_TMPL__DEFAULT_LOCALE=en
```

The CLI runtime supplies the application root. Engine selection belongs to the
host's TeqFW DI composition.

## Template files and examples

Templates are stored below the application root:

```text
tmpl/<type>/[<locale>/]<name>
tmpl/adapt/<package>/<type>/[<locale>/]<name>
```

Resolve and render an ordinary unlocalized template without locale preferences:

```js
const render = await container.get('Fl32_Tmpl_Back_Service_Render$');
const result = await render.perform({
  target: {type: 'email', name: 'welcome.txt'},
  data: {name: 'Ada'},
});
```

For an application template, the resolver checks locale preferences in user,
application, then package order. Within each preference, a full locale such as
`fr-CA` precedes its short form `fr`; duplicate candidates are removed, and
the unlocalized file is last. For example:

```js
const result = await render.perform({
  target: {
    type: 'web',
    name: 'greeting.html',
    locales: {user: 'fr-CA', app: 'en', pkg: 'de'},
  },
  data: {name: 'Ada'},
});
```

This tries `tmpl/web/fr-CA/greeting.html`, `tmpl/web/fr/greeting.html`,
`tmpl/web/en/greeting.html`, `tmpl/web/de/greeting.html`, then
`tmpl/web/greeting.html`.

To render a package template, include its npm package name as `pkg`. The
application adaptation wins over the package original, including when the
adaptation is unlocalized:

```js
const result = await render.perform({
  target: {
    type: 'web',
    name: 'account/reset.html',
    pkg: '@acme/accounts',
  },
  data: {resetUrl: '/reset/…'},
});
```

The resolver checks `tmpl/adapt/@acme/accounts/web/account/reset.html` before
`node_modules/@acme/accounts/tmpl/web/account/reset.html` (and their locale
variants, when requested).

To render a supplied template string directly, omit the target:

```js
const result = await render.perform({
  template: 'Hello, {{ name }}!',
  data: {name: 'Ada'},
});
```

The syntax depends on the engine bound by the host. The example above uses the
built-in Simple engine syntax.

## Results

Render results contain `resultCode` and `content`. Common result codes are
`SUCCESS`, `PATH_NOT_FOUND`, `TMPL_IS_EMPTY`, and `UNKNOWN_ERROR`. A missing
file, an empty template, and a file read error have distinct outcomes.

## Agent skill

The package includes version-matched consumer guidance in
`skills/teqfw-tmpl/`. Mount it in a host repository with:

```sh
mkdir -p .agents/skills
ln -s ../../node_modules/@flancer32/teq-tmpl/skills/teqfw-tmpl \
  .agents/skills/teqfw-tmpl
```

## License

Apache-2.0 © [Alex Gusev](https://github.com/flancer64)
