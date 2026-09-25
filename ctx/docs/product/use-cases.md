# Product Use Cases

- Path: `ctx/docs/product/use-cases.md`
- Template Version: `20260605`
- Changed: `20260925`

## Render A Template

An application developer selects a template by type and name, supplies data, and receives rendered text with a result code. An ordinary application template can be selected without a locale or package identifier. A missing file is reported as a missing-path result; resolution does not switch to another template type.

The consumer may also:

- Supply locale preferences to select a localized variant with deterministic fallback, including an unlocalized file when available.
- Target a package template and provide an application-owned adaptation that takes precedence over the package original without changing it.
- Supply a raw template string for rendering when file lookup is unnecessary.
- Choose a built-in or custom engine implementation through the host application; rendering uses that engine's behavior.

The same rendering goal applies to web, email, and text template types. The web convenience entry point prepares a web target; it does not define a separate product lifecycle.
