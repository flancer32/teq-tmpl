# @flancer32/teq-tmpl

Plugin for the TeqFW platform that provides server-side rendering (SSR) and localized content generation using
**Mustache** and **Nunjucks** engines. Supports rendering HTML, JSON, XML, YAML, and other text-based formats with
flexible template search logic, localization fallback chains, and modular engine integration.

---

## Overview

The **@flancer32/teq-tmpl** plugin implements a modular and extensible template rendering system for **TeqFW**
applications. It allows applications to render content dynamically using localized templates defined at the application
or plugin level. Templates are selected based on type (e.g., `web`, `email`, `text`), locale preference, and override
hierarchy.

---

## Key Features

### 🧩 Engine Abstraction

- Supports **Mustache** and **Nunjucks** engines via unified `Fl32_Tmpl_Back_Api_Engine` interface.
- Configurable via `Fl32_Tmpl_Back_Config` (`engine = mustache | nunjucks`).

### 🌐 Localization and Template Fallback

- Locale fallback chain: **user → app → plugin → base**.
- Variant resolution logic: e.g., `fr-CA → fr → en-US → en`.

### 📁 Template Resolution Hierarchy

Search path priority for templates:

1. `tmpl/{type}/{locale}/{name}`
2. `tmpl/{type}/{name}`
3. `tmpl/adapt/{pkg}/{type}/{locale}/{name}`
4. `tmpl/adapt/{pkg}/{type}/{name}`
5. `node_modules/{pkg}/tmpl/{type}/{locale}/{name}`
6. `node_modules/{pkg}/tmpl/{type}/{name}`

### ⚙️ Services

- `Fl32_Tmpl_Back_Service_Render`: orchestrates lookup, loading, and rendering.
- `Fl32_Tmpl_Back_Service_Load`: loads template content by resolving path and reading file.
- `Fl32_Tmpl_Back_Act_File_Find`: resolves the template path using locale fallback logic.
- `Fl32_Tmpl_Back_Act_File_Load`: reads file content from disk.

### 🧠 DTOs and Enums

- `Fl32_Tmpl_Back_Dto_Target`: describes the rendering target (type, name, locale, pkg).
- `Fl32_Tmpl_Back_Dto_Locale`: holds structured locale data.
- `Fl32_Tmpl_Back_Enum_Engine`: available engines (`mustache`, `nunjucks`).
- `Fl32_Tmpl_Back_Enum_Type`: template types (`web`, `email`, `text`).

---

## Supported Formats

You can use this plugin to render content in any text-based format:

- ✅ HTML (server-side pages)
- ✅ JSON (API responses)
- ✅ XML / RSS
- ✅ YAML
- ✅ Text / Email / Logs

---

## Rendering Flow

1. Target DTO is created with `name`, `type`, `pkg`, and `locales`.
2. Template file is resolved using `Fl32_Tmpl_Back_Act_File_Find`.
3. File is loaded via `Fl32_Tmpl_Back_Act_File_Load`.
4. Template is rendered by the configured engine (`Mustache` or `Nunjucks`).
5. Result returned as `{resultCode, content}`.

---

## Integration

To register the plugin in your TeqFW container:

```js
import Container from '@teqfw/di';

const container = new Container();
const resolver = container.getResolver();
resolver.addNamespaceRoot('Fl32_Tmpl_', './node_modules/@flancer32/teq-tmpl/src');
````

---

## Engine Configuration

```js
const config = await container.get('Fl32_Tmpl_Back_Config$');
config.init({
    allowedLocales: ['en', 'fr', 'ru'],
    defaultLocale: 'en',
    engine: 'nunjucks', // or 'mustache'
    rootPath: '/path/to/app/root',
});
```

---

## Dependency Injection

This plugin is fully DI-driven. You can override any component by registering your own implementation under the same DI
ID.

---

## License

Apache-2.0 © [Alex Gusev](https://github.com/flancer64)