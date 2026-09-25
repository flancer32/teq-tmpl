# Rendering and Template Lookup

`@flancer32/teq-tmpl` resolves and renders text templates. It does not own
template meaning, translation sources, render data, web serving, UI, storage,
or template-file writes.

## Target and locale model

A target contains:

```text
type      template type, such as web, email, or text
name      template file name or relative template path
pkg       optional package name for plugin template lookup
locales   optional user, application, and package locale values
```

Locale candidates are ordered by user, application, then package locale. For
each locale, the full form precedes its short form:

```text
ru-RU -> ru
```

Duplicate candidates are removed. Templates without locale preferences resolve
through the unlocalized candidate. A missing template is a normal result, not
a configuration failure.

## Candidate paths

For an application template (`pkg` absent), candidates are:

```text
<root>/tmpl/<type>/<locale>/<name>
<root>/tmpl/<type>/<name>
```

For a package template (`pkg` present), application adaptations precede the
original package:

```text
<root>/tmpl/adapt/<pkg>/<type>/<locale>/<name>
<root>/tmpl/adapt/<pkg>/<type>/<name>
<root>/node_modules/<pkg>/tmpl/<type>/<locale>/<name>
<root>/node_modules/<pkg>/tmpl/<type>/<name>
```

The first existing candidate is loaded. The package may read files but must
never create, modify, or delete template files. Keep template content and
translation ownership in the host or the owning plugin.

Locale preferences are optional. A target with only `type` and `name` resolves
an ordinary unlocalized template without any locale configuration:

```js
const result = await render.perform({
  target: {type: 'email', name: 'welcome.txt'},
  data: {name: 'Ada'},
});
```

For a package target, add its package name as `pkg`. The complete application
adaptation area is searched before the original package template, so an
unlocalized adaptation can override a localized package file. Construct the
target through the render service's `target` argument; `Render_Web$` constructs
a `web` target from `name`, optional `pkg`, and optional `locales`.

The generic render service can also render raw template text without a target
or file access:

```js
const result = await render.perform({
  template: 'Hello, {{ name }}!',
  data: {name: 'Ada'},
});
```

The syntax is defined by the host-bound engine. For Nunjucks includes, lookup
tries the requested locale, then configured `DEFAULT_LOCALE` when present, and
then the unlocalized web template directory. The unlocalized directory remains
the final fallback whether or not either locale is configured.

## Failure boundary

Loading and rendering return result codes for expected outcomes. Preserve
`PATH_NOT_FOUND` for an absent candidate and `TMPL_IS_EMPTY` for an empty
template during rendering. A readable empty file loads successfully with an
empty string. File read failures are logged and yield `UNKNOWN_ERROR` through
both public services. Escaping engine failures also become `UNKNOWN_ERROR`.

Nunjucks include lookup uses its own environment loaders, separate from
primary target resolution. Without a configured default locale, include
lookup falls back to the unlocalized web template directory; an explicit
default remains the fallback after a requested locale.
