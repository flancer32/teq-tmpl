# Changelog

All notable changes to this project will be documented in this file.  
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.2.0] - 2025-06-14

### Added

- New adapter `Fl32_Tmpl_Back_Di_Adapter` implementing `Fl32_Tmpl_Back_Api_Adapter`.
- Simple built-in rendering engine `Fl32_Tmpl_Back_Service_Engine_Simple` with inline variable substitution.
- DI-based engine injection for consistent integration into TeqFW container.
- Basic test coverage for the new simple engine.

## [0.1.0] - 2025-06-12

### Added

- Initial public release of `@flancer32/teq-tmpl`.
- Multilingual template rendering with locale fallback logic.
- Support for pluggable engines (Mustache, Nunjucks, etc.).
- File-based override system for application-level template customization.
- Hierarchical template search covering user, app, and package locales.
- Rendering support for web, email, and generic text templates.
- Transparent integration with TeqFW-based and standalone Node.js projects.
- Engine abstraction for consistent render interface across engines.
