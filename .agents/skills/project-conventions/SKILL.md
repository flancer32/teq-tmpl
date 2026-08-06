---
name: project-conventions
description: Project-specific conventions. Use for every task in this repository.
---

# Project Conventions

`AGENTS.md` overrides this file.

## Repositories

- The software product and `ctx/` are one repository (`git@github.com:flancer32/teq-tmpl.git`); do not mix status, commits, or pushes between repositories.
- `ctx/` is the authoritative cognitive context.

## Workflow

- Work in the repository's `main` branch. This project rule overrides any GitHub-skill instruction to use a separate branch.
- At the start of work, check upstream in the repository and keep local `main` synchronized by fast-forwarding when safe.
- Before changes, inspect every affected working tree.
- Do not commit or push unless the user requests it.

## Communication

- User: Russian; code, comments, docs, commits, identifiers: English.
- Report changes, verification, and remaining risks.

## Project boundaries

- `@flancer32/teq-tmpl` is a Node.js ESM library package (TeqFW plugin) for multilingual template management and rendering; it must not introduce a web server, UI, database, or network layer.
- The package resolves, loads, and renders templates through an injected engine conforming to `Fl32_Tmpl_Back_Api_Engine`; it must not modify or write template files on disk.
- The template layout under the configured root path (`tmpl/<type>/[<locale>/]<name>` and `tmpl/adapt/<pkg>/<type>/[<locale>/]<name>`) and the locale fallback order (user, application, package; full locale before short locale) are stable constraints.

## Validation

- `npm test` for affected source and tests scope.
- `npm run typecheck` for the reproducible JavaScript type check.
- `npm run lint:md` to check Markdown files (`.agents/skills/`, `ctx/`, root `*.md`) with `markdownlint-cli2`.
- ESLint was removed from the project; do not run or require `npm run eslint`.
- `@teqfw/di` is pinned to the `main` branch of `teqfw/di` on GitHub; the source and tests already use the current DI. Follow the `teqfw-di` skill for the DI API and conventions.

## Shared memory

- `flancer32/ai-memo` is the shared cross-project issue tracker and memory.
- May create issues: source `flancer32/teq-tmpl`; resolver(s) `flancer32/teq-tmpl`.
- Require every issue to name the project or projects expected to resolve it.
- In multiline text sent to GitHub, use actual line breaks; never send literal `\n`, which GitHub displays as text.
- When referring to a commit in another repository, use its full GitHub URL: `https://github.com/vendor/name/commit/<sha>`.
- Notes: `project/flancer32/teq-tmpl/`.
