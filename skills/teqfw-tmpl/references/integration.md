# Package Integration

This reference describes host composition for `@flancer32/teq-tmpl` version
0.4.x. Confirm exact installed versions and public APIs before changing code.

## Runtime identity

The package is a TeqFW DI plugin with this namespace mapping:

```text
Fl32_Tmpl_  -> ./src  (.js)
```

Build the host namespace registry from the package graph and register all
namespace roots before the first container resolution. The host owns the
composition root and should use the documented public `@teqfw/di` API.

Do not create a second container inside a package component. Do not use
physical imports as a replacement for DI contracts. The package's runtime
namespace is unrelated to the agent skill path.

## Composition sequence

1. Install `@flancer32/teq-tmpl` and `@teqfw/cli`.
2. Register `Fl32_Tmpl_` and the namespaces of the platform packages used by
   the host.
3. Let the CLI initialize `TeqFw_Cli_Config$` before resolving template components; its `applicationRoot` is the template root.
4. Load template configuration sources through `@teqfw/cfg`.
5. Bind `Fl32_Tmpl_Back_Api_Engine$` to the host's selected provider.
6. Resolve `Fl32_Tmpl_Back_Service_Render$` or
   `Fl32_Tmpl_Back_Service_Render_Web$`.
7. Supply a target, render data, and engine options at call time.
8. Handle the returned result code and inspect structured logs for unexpected
   failures.

### Engine selection boundary

The host composition binds one provider to the engine contract. The host
decides which engine library and template language are supported, and may
provide a custom implementation. The package has no engine-name setting or
per-request engine selection.

Do not add a package-local selector or preprocessor to avoid the host mapping.
That would move provider ownership into the package and change the stable
engine-agnostic architecture.

### Composition stages

Namespace registration, configuration loading, DI resolution, and engine
selection are separate steps. Do not assume one performs another.

## Host responsibilities

The host provides the container, CLI runtime configuration (including the application root), configuration source selection,
template files, render data, and engine mapping. The package provides the
contract and reference implementations; it does not own the final engine
choice. The host also decides how to discover this package-owned skill.

For a root-level `.agents/skills/` catalog, a host may mount the installed copy
with a relative link:

```bash
mkdir -p .agents/skills
ln -s ../../node_modules/@flancer32/teq-tmpl/skills/teqfw-tmpl .agents/skills/teqfw-tmpl
```

Installation must not create this link or modify host agent configuration.
