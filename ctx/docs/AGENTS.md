# Project Documentation

- Path: `ctx/docs/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260925`

Read in dependency order: `product/` defines intended behavior; `architecture/` defines runtime boundaries; `environment/` states host prerequisites; `code/` maps those boundaries to implementation; `verification/` connects their claims to observable evidence. Lower levels refine upstream meaning and must surface contradictions rather than redefine it.

`filesystem.md` maps the repository root. Ordinary Markdown files are agent-facing context; any paired `*.skin.<lang>.md` file controls the human-facing semantic frame and must be read before editing its agent document. Keep assets under `ctx/assets/`. The installed `adsm-ctx` skill owns generic context methodology and validation rules.
