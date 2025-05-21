# @flancer32/teq-tmpl

Plugin for the TeqFW platform that provides server-side rendering (SSR) and localized content generation using
Mustache.  
Supports rendering HTML, JSON, XML, YAML, and other text-based formats with flexible template search and localization
logic.

## Overview

The **@flancer32/teq-tmpl** plugin for the **TeqFW** platform implements a modular system for rendering templates on the
server.  
It supports multilingual applications by automatically selecting localized templates and fallback chains across user,
app, and plugin levels.

### Key Features:

- **Localization-aware template selection**:
    - Template lookup based on user language preferences.
    - Locale fallback chain: user → application → plugin → default.
- **Flexible template search system**:
    - Templates can be defined or overridden at the app or plugin level.
    - Type-based separation (web, email, text).
- **Rendering with Mustache**:
    - Full Mustache support with partials.
    - Unified context generation for consistent rendering across layers.
- **Web integration**:
    - Specialized rendering service (`WebRender`) for use in HTTP request handlers.

## Features

- Template search with priority-based fallback.
- Localized rendering for HTML, JSON, XML, YAML, and more.
- Mustache integration with context and partial support.
- Web-oriented rendering service for HTTP workflows.
- Full async file operations and dependency injection via TeqFW DI.

## Integration

Register the namespace to use this plugin with TeqFW DI:

```js
import Container from '@teqfw/di';

// Create a new instance of the container
const container = new Container();

// Get the resolver from the container
const resolver = container.getResolver();
resolver.addNamespaceRoot('Fl32_Tmpl_', './node_modules/@flancer32/teq-tmpl/src');
````

 
