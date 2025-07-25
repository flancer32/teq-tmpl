# @flancer32/teq-tmpl

A universal package for managing and rendering text templates in Node.js applications with support for multilingualism and flexible overrides. Enables easy creation of localized content for web pages, email campaigns, and any other text-based formats.

---

## Key Features

* **Multilingual Support**  
  Automatic template selection considering user, application, and plugin locales with fallback logic.

* **Flexible Override System**  
  Allows overriding plugin templates at the application level without modifying the original code.

* **Template Engine Abstraction**  
  Supports various engines (Mustache, Nunjucks, etc.) through a unified interface, with an easily extensible architecture.

* **Versatility**  
  Suitable for generating HTML, JSON, XML, YAML, email, and other text formats.

* **Easy Integration**  
  Easily integrates with any Node.js application and can be used as a standalone module.

---

## How It Works (Briefly)

1. Defines the target template considering type (web, email, text), name, package, and locales.
2. Searches the template file in a strict order based on locales and overrides.
3. Loads the found template from disk.
4. Renders the template with data via the configured engine.
5. Returns the ready localized content.

---

## Integration Requirements

Applications must provide a template engine implementation that fulfills the `Fl32_Tmpl_Back_Api_Engine` interface. Use the DI container's `replace.add()` method to map `Fl32_Tmpl_Back_Api_Engine$` to the desired engine service:

```javascript
replace.add('Fl32_Tmpl_Back_Api_Engine$', 'Fl32_Tmpl_Back_Service_Engine_Mustache$');
```

Available engine implementations include:

- `Fl32_Tmpl_Back_Service_Engine_Mustache`
- `Fl32_Tmpl_Back_Service_Engine_Nunjucks`
- `Fl32_Tmpl_Back_Service_Engine_Simple`

Custom engines can also be supplied as long as they conform to `Fl32_Tmpl_Back_Api_Engine`.

---

## Who Benefits

* Developers building multilingual web applications and mailing services.
* Teams working with plugins and complex modular architectures.
* Projects needing a flexible and extensible template system without lock-in to a specific templating engine.

## Testing

Run unit tests with Node.js built-in runner:

```bash
npm test
```

---

## Status and Documentation

The package is actively developed and successfully used in projects with modular architecture. It is created following the **TeqFW philosophy**, ensuring clear separation of concerns, modularity, and extensibility. Documentation follows the **3DP methodology**, providing clear structure and separation between code, documentation, and iterations.

---

## License

Apache-2.0 © [Alex Gusev](https://github.com/flancer64)
