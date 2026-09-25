# @flancer32/teq-tmpl

![npms.io](https://img.shields.io/npm/dm/@flancer32/teq-tmpl)

> **Human-governed. Agent-built. Agent-ready.**

`@flancer32/teq-tmpl` resolves, loads, and renders text templates for Node.js applications. It supports application overrides, optional locale fallback, and a host-selected rendering engine. It is part of the Tequila Framework ([TeqFW](https://teqfw.com/)): created and evolved by coding agents under the architectural direction and final responsibility of [Alex Gusev](https://github.com/flancer64), and shipped with a version-matched Agent Skill so other agents can understand, integrate, and use it correctly.

## Why use it

Template files remain owned by the application or plugin that provides them, while the package handles lookup, loading, and rendering through a replaceable engine. Ordinary templates work without locale preferences; localized variants are available when needed.

## Capabilities

- File lookup for ordinary or locale-specific templates, with user, application, and package locale fallback when supplied.
- Application overrides for templates supplied by plugins.
- Rendering through Mustache, Nunjucks, a built-in simple engine, or a custom engine.
- Support for web, email, text, and other file-based template types.
- Read-only filesystem access: the package never changes template files.

## Installation

```sh
npm install @flancer32/teq-tmpl @teqfw/cli
```

The package runs in Node.js `>=20` applications and uses TeqFW dependency injection. Select an engine in the host application's composition root and map `Fl32_Tmpl_Back_Api_Engine$` to it; install its provider separately when needed:

```sh
npm install mustache
# or
npm install nunjucks
```

The built-in simple engine requires no additional template-engine package.

Configuration is loaded through the CLI runtime configuration and `@teqfw/cfg` before resolving the package. The CLI host must initialize `TeqFw_Cli_Config$` before resolving this package. Both template locale settings are optional:

```dotenv
TEQFW_TMPL__ALLOWED_LOCALES=en,es,ru
# Optional Nunjucks include fallback
TEQFW_TMPL__DEFAULT_LOCALE=en
# applicationRoot is supplied by the CLI runtime configuration
# TEQFW_TMPL has no root-path setting
```

`ALLOWED_LOCALES` accepts either an array from an object source or a
comma-separated string from dotenv and process-environment sources. String
items are trimmed and empty items are ignored.

Ordinary non-localized templates work without either setting. When no default
locale is configured, Nunjucks includes can resolve from the unlocalized web
template directory.

## Quick start

Configure the CLI host with an application root and initialize `TeqFw_Cli_Config$` before resolving this package. Select an engine in the host composition root, map `Fl32_Tmpl_Back_Api_Engine$` to it, and then resolve the package's render service through the TeqFW DI container. A file render request identifies the template type and name, with an optional plugin package and optional locale preferences. The service returns rendered content together with a result code.

Templates are conventionally stored below:

```text
tmpl/<type>/[<locale>/]<name>
tmpl/adapt/<package>/<type>/[<locale>/]<name>
```

For a plugin template, an adapted application copy takes precedence over the original template in `node_modules`.

## Best fit

Use this package when a Node.js application or TeqFW plugin needs file-based text output with predictable overrides and engine flexibility. It is not a web server, CMS, translation-management system, or template authoring tool.

## Agent-Driven Development

TeqFW is built through the same development model that it is designed to enable: one human defines the intent, architecture, constraints, and acceptance criteria; coding agents implement and maintain the products; other agents use those products in different combinations to create applications.

`@flancer32/teq-tmpl` is part of TeqFW. The package includes a version-matched Agent Skill in `skills/teqfw-tmpl`. The README provides a human-facing product overview; the skill provides agents with the package concepts, contracts, integration rules, examples, and boundaries.

Mount the skill into a host project:

```sh
mkdir -p .agents/skills
ln -s ../../node_modules/@flancer32/teq-tmpl/skills/teqfw-tmpl \
  .agents/skills/teqfw-tmpl
```

Each TeqFW package is both a practical software component and a working demonstration of human-governed, agent-driven development. This work follows the Agent-Driven Software Management (ADSM) approach: human intent, architectural authority, acceptance, and responsibility remain authoritative; agents act as implementation and reasoning partners.

- [Tequila Framework](https://teqfw.com/?from=github-@flancer32/teq-tmpl)
- [Agent-Driven Software Management: A Practical Guide](http://fly.wiredgeese.com/flancer/leanpub/adsm-en/?from=github-@flancer32/teq-tmpl)
- [Alex Gusev](https://github.com/flancer64)

## License

Apache-2.0 © [Alex Gusev](https://github.com/flancer64)
