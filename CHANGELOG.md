# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.6.0] - 2026-09-25

### Changed

* Clarified that unlocalized templates are first-class and locale settings are optional.
* Documented deterministic file fallback and Nunjucks include order: requested locale, configured default, then unlocalized.
* Documented application adaptations ahead of package templates, raw template rendering, and host-owned DI engine selection.

### Fixed

* File read failures now return `UNKNOWN_ERROR`; readable empty files remain successful loads and render as `TMPL_IS_EMPTY`.

### Documentation

* Updated the README and packaged consumer skill to match the current rendering and configuration contracts.

## [0.5.0] - 2026-08-07

* Updated TeqFW package dependency ranges to use current npm releases.
* Replaced development GitHub dependency references with published npm version ranges.

## [0.4.0] - 2026-08-06

* Switched configuration and structured logging to the platform `@teqfw/cfg` and `@teqfw/log` plugins.
* Added canonical unit and integration test commands with real TeqFW DI composition coverage.
* Added a version-matched package Agent Skill with integration, configuration, contract, rendering, and testing references.
* Restricted the npm archive to the runtime source, declarations, README, changelog, license, JavaScript configuration, and Agent Skill.

## [0.3.0] - 2025-06-24

* Added the locale-based web template rendering service `Fl32_Tmpl_Back_Service_Render_Web`.

## [0.2.1] - 2025-06-15

* Removed `Fl32_Tmpl_Back_Api_Adapter` and `Fl32_Tmpl_Back_Di_Adapter` as redundant abstraction.
* Made `Fl32_Tmpl_Back_Service_Render` depend directly on `Fl32_Tmpl_Back_Api_Engine`.

## [0.2.0] - 2025-06-14

* Added a new adapter `Fl32_Tmpl_Back_Di_Adapter` implementing `Fl32_Tmpl_Back_Api_Adapter`.
* Added a simple built-in rendering engine `Fl32_Tmpl_Back_Service_Engine_Simple` with inline variable substitution.
* Added DI-based engine injection for consistent integration into the TeqFW container.
* Added basic test coverage for the new simple engine.

## [0.1.0] - 2025-06-12

* Initial public release of `@flancer32/teq-tmpl`.
* Multilingual template rendering with locale fallback logic.
* Support for pluggable engines (Mustache, Nunjucks, etc.).
* File-based override system for application-level template customization.
* Hierarchical template search covering user, app, and package locales.
* Rendering support for web, email, and generic text templates.
* Transparent integration with TeqFW-based and standalone Node.js projects.
* Engine abstraction for consistent render interface across engines.
