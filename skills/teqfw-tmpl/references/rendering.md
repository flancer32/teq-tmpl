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
locales   user, application, and package locale values
```

Locale candidates are ordered by user, application, then package locale. For
each locale, the full form precedes its short form:

```text
ru-RU -> ru
```

Duplicate candidates are removed. A missing template is a normal result, not a
configuration failure.

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

## Failure boundary

Loading and rendering return result codes for expected outcomes. Preserve
`PATH_NOT_FOUND` for an absent candidate and `TMPL_IS_EMPTY` for an empty
template during rendering. Unexpected filesystem and engine failures become
`UNKNOWN_ERROR` after structured logging.
