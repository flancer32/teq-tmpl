# Architecture Decisions

- Path: `ctx/docs/architecture/decisions.md`
- Template Version: `20260605`
- Changed: `20260925`

## Host-Owned Engine Binding

The host application binds one concrete implementation of `Fl32_Tmpl_Back_Api_Engine$` through TeqFW DI. The render service depends directly on that contract. A package engine-name setting, per-request selection, package selector, and extra adapter layer were rejected: each would duplicate or obscure the host's single composition decision and weaken custom-engine support. The removed adapter previously added no behavior beyond the engine contract.

## CLI-Owned Application Root

The package reads `applicationRoot` from `TeqFw_Cli_Config$`. A package root-path setting was rejected because the root is a computed host runtime fact; duplicating it would create conflicting lookup and containment authorities.

## Convenience And Bundled Rendering

The web render service constructs a web target and delegates to the generic renderer, avoiding repeated caller setup without creating a second pipeline. The built-in Simple engine provides basic `{{ variable }}` substitution without an external engine package; Mustache and Nunjucks remain alternative implementations of the same contract.
