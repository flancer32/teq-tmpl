# Product Domain Model

- Path: `ctx/docs/product/domain.md`
- Template Version: `20260605`
- Changed: `20260925`

## Template Lifecycle

A template target identifies a file by type and name, with an optional package identifier and optional locale preferences. Resolution selects at most one file for that target; loading obtains its text. Rendering combines that text with caller data through an engine and returns text plus a result code. A raw template string enters the same rendering stage without resolution or loading.

The package identifier selects the search areas:

- Without a package identifier, it searches application templates.
- With a package identifier, it searches application adaptations first, then the package's original templates. The package never changes either file.

Within each searched location, supplied locale preferences are considered in user, application, then package order, with a full locale before its short form. Duplicate variants are ignored. The unlocalized file is the fallback for that location and is the normal candidate when no locale is supplied. An application adaptation can therefore take precedence over a package original even when their locale variants differ.

## Concepts And Ownership

- **Template target:** file identity for resolution; type and name are needed to find a file. Package and locale information are optional.
- **Template file:** text owned by the application or the originating package. Application adaptations are application-owned files selected ahead of package originals.
- **Render input:** a target or raw template string, together with caller data and engine options.
- **Template engine:** an implementation of the package's rendering contract. Its provider controls rendering semantics; the package delegates to it.
- **Rendered result:** transient output text and a result code. The package stores no rendered content.

Resolution never crosses template types. The package owns the lifecycle behavior, not the content or the choice of engine implementation.
