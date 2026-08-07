# Contracts and Components

This reference describes the stable package-facing DI contracts. Verify exact
signatures against the installed source and declarations before changing them.

## Engine contract

The primary extension point is:

```text
Fl32_Tmpl_Back_Api_Engine$
```

An engine implements:

```js
async render({template, data, options})
// -> {resultCode: string, content: string|null}
```

Built-in implementations are:

```text
Fl32_Tmpl_Back_Service_Engine_Mustache$
Fl32_Tmpl_Back_Service_Engine_Nunjucks$
Fl32_Tmpl_Back_Service_Engine_Simple$
```

These are reference implementations, not an exhaustive list of providers.
The host selects an engine by mapping or registering the engine contract. The
generic render service depends on `Fl32_Tmpl_Back_Api_Engine$`, not on a
concrete implementation. A custom host engine is valid when it satisfies the
same contract.

## Orchestration components

```text
Fl32_Tmpl_Back_Service_Render$
Fl32_Tmpl_Back_Service_Render_Web$
Fl32_Tmpl_Back_Service_Load$
Fl32_Tmpl_Back_Dto_Target$
Fl32_Tmpl_Back_Dto_Locale$
```

`Render_Web$` builds a web target and delegates to the generic render service.
`Service_Load$` resolves and loads a template without rendering it. Target and
locale DTOs normalize the inputs used by lookup and rendering.

## Platform services

The CLI host provides `TeqFw_Cli_Config$`; its `applicationRoot` is consumed by the package. `Fl32_Tmpl_Back_Config$.getRootPath()` remains the compatibility accessor for that value.

Components receive:

```text
TeqFw_Cfg_Reader$
TeqFw_Log_Provider$
```

Bind a source-specific logger once per component:

```js
const logger = log.forSource('Fl32_Tmpl_Back_Service_Render');
logger.error('Failed to render template.', {err: error});
```

Use structured data for context and caught errors. Do not add a package-local
console logger or choose a logging backend.

## Result codes

Render results use:

```text
SUCCESS
PATH_NOT_FOUND
TMPL_IS_EMPTY
UNKNOWN_ERROR
```

Load results use:

```text
SUCCESS
PATH_NOT_FOUND
UNKNOWN_ERROR
```

Missing paths and empty templates are expected outcomes with result codes.
Caught filesystem and engine failures are logged and returned as
`UNKNOWN_ERROR`.
