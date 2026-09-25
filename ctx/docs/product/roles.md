# Product Roles

- Path: `ctx/docs/product/roles.md`
- Template Version: `20260605`
- Changed: `20260925`

These are integration responsibilities, not end-user identities or access-control roles.

- **Application developer / package consumer:** owns application templates and adaptations, supplies render data and optional locale preferences, and selects the engine implementation. The CLI host supplies the computed application root.
- **Package or plugin author:** owns original templates distributed with their package. Application adaptations do not modify those originals.
- **Engine provider:** owns the behavior and configuration of an implementation of the package-defined engine contract. The host application binds that implementation for rendering.

The package owns resolution, loading, render orchestration, and the engine contract. It does not own the files, render data, or engine-specific semantics.
