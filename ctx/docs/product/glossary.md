# Product Glossary

- Path: `ctx/docs/product/glossary.md`
- Template Version: `20260605`
- Changed: `20260804`

## Purpose

Define stable product terminology.

This document defines product-language semantics only: what terms mean inside the product, which terms are preferred, which terms are prohibited or deprecated, and how terms relate to product domain, roles, and use cases.

## Level Boundary

Defines:

- stable product terms;
- preferred names for product concepts;
- prohibited, deprecated, or ambiguous terms;
- synonym and naming rules;
- relations between terms;
- terminology-level invariants.

Does NOT define:

- database table names, column names, DTO names, or persistence naming rules;
- API route names, request fields, response fields, or transport naming rules;
- UI labels, button texts, menu names, or copywriting;
- source code identifiers, class names, service names, or module names;
- implementation-specific naming conventions.

## Term Groups

Small project: terminology is kept in a compact core list rather than split into groups.

## Core Terms

- Template Target — a request to render a template, carrying type, name, optional package, and locales.
  Preferred over "render request" when the object is the resolution descriptor.
  Context of use: resolution and rendering.
- Template Name — a relative path with extension identifying a template within a type.
  Context of use: targets and file lookup.
- Template Type — a category of output (`web`, `email`, `text`).
  Context of use: directory layout and rendering entry points.
- Template File — a text file under the template directory layout.
  Context of use: resolution and loading.
- Template Engine — a renderer conforming to the engine contract.
  Context of use: rendering and engine injection.
- Locale — a language identifier in full (`xx-YY`) or short (`xx`) form.
  Context of use: selection and fallback.
- User Locale / Application Locale / Package Locale — the three ordered locale sources.
  User locale has the highest priority, package locale the lowest.
- Locale Fallback — deterministic selection across locales and their short forms.
  Context of use: resolution.
- Override (Adapted Template) — an application-level template that replaces a plugin template.
  Preferred over "override template" when the file lives in the adapted area.
  Context of use: overrides.
- Render Request — the pairing of a target (or raw template) with data and options.
  Preferred over "render job".
  Context of use: rendering.
- Rendered Content — the text output produced by rendering.
  Context of use: render results.
- Result Code — a status value describing the render outcome.
  Context of use: render results.
- Root Path — the application root directory under which the template layout lives.
  Context of use: configuration and resolution.

## Naming Principles

Product terms are selected to match the package's existing public vocabulary and the TeqFW ecosystem.

A term becomes stable when it appears in the public interface or durable documentation and is not contradicted by later usage.

Ambiguous terms are resolved toward the definitions in this document.

Deprecated terms must be listed here before they are removed from documentation.

## Terminology Relations

- `Template Target` is broader than `Render Request`; a target may be used without an explicit render request.
- `Override` is broader than `Adapted Template`; the adapted template is the physical instance.
- `Locale` is broader than any single locale source (user, application, package).
- `Template Type` and `Locale` both constrain `Template File` lookup.

## Terminology Invariants

- `Override` must never mean a modification of the original plugin template.
- `Locale Fallback` must always describe deterministic priority, never arbitrary ordering.
- `Template Name` always refers to a path with extension, never to arbitrary content.

## Glossary Documentation Map

No detailed glossary documents exist yet.
