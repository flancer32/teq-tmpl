# Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Template Version: `20260702`
- Changed: `20260925`

## Runtime Responsibilities

`@flancer32/teq-tmpl` is a TeqFW backend library composed through the host's DI container. Four responsibilities realize the product lifecycle:

- **Resolution and loading:** map a target to one readable application or package file and obtain its text. Optional locale preferences and application adaptations affect resolution.
- **Render orchestration:** accept a target or raw string, data, and options; obtain content when needed; invoke the engine; return content and a result code. The web entry point prepares a web target and reuses the generic service.
- **Engine contract:** `Fl32_Tmpl_Back_Api_Engine$` is the render service's dependency. The host binds one implementation for the application; the package supplies Simple, Mustache, and Nunjucks implementations and accepts other conforming providers.
- **Configuration and support:** `TeqFw_Cfg_Reader$` supplies the loaded `TEQFW_TMPL` namespace; `TeqFw_Cli_Config$` supplies the application root; `TeqFw_Log_Provider$` supplies source-bound logging. Locale generation and the Nunjucks environment factory support the main flow.

The resolver owns primary target-file search order and layout. Engine implementations interpret template syntax; the render service joins these boundaries without selecting an engine by name.

## State And Ownership

The application owns its templates and adaptations; package authors own originals. The host owns configuration sources and the DI binding; the CLI owns the computed application root. The package projects locale settings into an immutable runtime view and owns no durable application state. Candidate paths and rendered output are derived per call. Nunjucks loaders and environments are internal caches, not sources of truth.
