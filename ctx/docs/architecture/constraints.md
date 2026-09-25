# Architecture Constraints

- Path: `ctx/docs/architecture/constraints.md`
- Template Version: `20260702`
- Changed: `20260925`

- Application templates use `tmpl/<type>/[<locale>/]<name>` under the CLI application root. Adaptations use `tmpl/adapt/<pkg>/<type>/[<locale>/]<name>`; originals use `node_modules/<pkg>/tmpl/<type>/[<locale>/]<name>`. Resolution stays within that root and never substitutes another type.
- Locale order and adaptation precedence are defined in `behavior.md`. Changing the layout or either order changes the architecture.
- Rendering goes through the injected `Fl32_Tmpl_Back_Api_Engine` contract. Host DI binding is the only engine-selection mechanism; there is no request-level selector or package engine-name setting.
- The host loads cfg sources. The package reads them through `TeqFw_Cfg_Reader$` and must not read `process.env` directly. It does not write, replace, or delete template files or create durable application state.
- The package does not manage translation sources or template meaning and does not provide web serving, routing, SSR orchestration, UI, network, or database facilities.

Human approval is required for a breaking engine-contract change, a change to template layout or locale order, a new required external integration, a new persistent state owner, or a new major system boundary. Changes within these boundaries may refine resolution, loading, rendering, and supporting mechanisms; architectural drift must be surfaced rather than silently normalized.
