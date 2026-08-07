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

1. Install `@flancer32/teq-tmpl` and its runtime dependencies.
2. Register `Fl32_Tmpl_` and the namespaces of the platform packages used by
   the host.
3. Load configuration sources through `@teqfw/cfg`.
4. Let the host composition read its engine choice and register or map
   `Fl32_Tmpl_Back_Api_Engine$` to the selected provider.
5. Resolve `Fl32_Tmpl_Back_Service_Render$` or
   `Fl32_Tmpl_Back_Service_Render_Web$`.
6. Supply a target, render data, and engine options at call time.
7. Handle the returned result code and inspect structured logs for unexpected
   failures.

### Engine selection boundary

`TEQFW_TMPL__ENGINE` is a typed configuration value exposed by the package,
but it is not a DI alias and does not cause automatic implementation
selection. The host composition owns the mapping from that choice to a
provider. This is intentional: the host decides which engine library and
template language are supported, and may provide a custom implementation.

Do not add a package-local selector or preprocessor to avoid the host mapping.
That would move provider ownership into the package and change the stable
engine-agnostic architecture.

### Composition stages

Namespace registration, configuration loading, DI resolution, and engine
selection are separate steps. Do not assume one performs another.

## Host responsibilities

The host provides the container, configuration source selection, template root,
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
