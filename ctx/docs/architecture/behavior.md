# Architecture Behavior

- Path: `ctx/docs/architecture/behavior.md`
- Template Version: `20260605`
- Changed: `20260925`

## Purpose

Describe major internal architectural flows and processing behavior.

This document explains how the system works internally, not which product outcomes users want.

## Major Flows

### Render Pipeline

The central flow from render arguments to rendered content.

Starts when a render service is called with a target (or a raw template), data, and options.

Steps:

1. If a raw template string is provided, it is used directly.
2. Otherwise, the file resolution block maps the target to an absolute file path.
3. The loading block reads the file content from disk.
4. The engine abstraction renders the content with the data and options.
5. The service returns the rendered content and a result code.

The flow ends by returning a defined result code for each outcome: success, missing path, empty template, or unknown error.

### Configuration Projection

The configuration block reads the detached `TEQFW_TMPL` namespace after the
host has loaded cfg sources. It projects `ALLOWED_LOCALES` into an immutable
list: array input remains list input, while a comma-separated string is split,
trimmed, and filtered for empty items. Required values are validated and
engine defaults are applied during the same projection.

### Locale Fallback Selection

A sub-flow of resolution that builds an ordered list of candidate paths.

When the target supplies locale preferences, the locale helper builds an ordered list of variants.

The locale helper orders variants by user, then application, then package locale, and for each locale prefers the full form (`xx-YY`) before the short form (`xx`).

Duplicate variants are collapsed.

The resolution block checks these variants, then the unlocalized file, and selects the first existing path. Without locale preferences, it checks the unlocalized path directly.

### Override Resolution

A sub-flow of resolution applied when the target carries a package identifier.

The block first searches the application adapted area, then the original plugin templates inside the plugin package.

Locale fallback applies within each area.

The adapted area is searched to completion, including its unlocalized file, before the original package area. An adaptation can therefore take precedence over an original with a different locale variant.

### Engine Invocation

The flow that turns template content and data into output.

Starts when a render service calls the injected engine.

The engine renders using its own semantics.

For Nunjucks, the environment factory provides a locale-aware environment with a fallback loader.

For Mustache and the simple engine, rendering is a direct substitution over the content.

## Flow Boundaries

- The render pipeline starts at a render service and ends at the return of rendered content and a result code.
- Resolution participates only when no raw template is provided.
- Engine invocation participates only when template content is present.
- No flow commits durable change; the plugin is stateless across calls except for
  the immutable cfg-backed configuration projection and cached environments.

## Failure And Recovery

- Missing template path is a normal outcome reported as a result code, not an exception.
- Empty template content yields a distinct result code.
- Read failures and engine exceptions are caught and logged through source-bound
  `@teqfw/log` providers, returning an error result code.
- Nunjucks environments and loaders are cached per locale combination to avoid rebuilding.

## Product Dependency

Behavior realizes product intent.

If product behavior is missing or contradictory, expose the gap instead of inventing architectural behavior silently.
