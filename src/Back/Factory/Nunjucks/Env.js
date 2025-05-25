/**
 * Factory for creating Nunjucks template environments with locale-specific loaders.
 * Manages template loaders for different locales and creates configured Nunjucks environments.
 *
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Fl32_Tmpl_Back_Factory_Nunjucks_Env {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:path')} path
     * @param {typeof import('nunjucks')} nunjucks
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Config} config
     */
    constructor(
        {
            'node:path': path,
            'node:nunjucks': nunjucks,
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Config$: config,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS
        const {join} = path;
        const {Environment, FileSystemLoader} = nunjucks;
        /** @type {Map<string, import('nunjucks').Loader}} */
        const _loaders = new Map();

        // FUNCS
        /**
         * Gets or creates a template loader for the specified locale.
         * @param {string} locale
         * @returns {import('nunjucks').Loader}
         */
        function getLoader(locale) {
            if (!_loaders.has(locale)) {
                const path = join(config.getRootPath(), 'tmpl', 'web', locale);
                const loader = new FileSystemLoader(path, {
                    noCache: true,
                    watch: false,
                });
                _loaders.set(locale, loader);
            }
            return _loaders.get(locale);
        }

        // MAIN

        /**
         * Creates a Nunjucks environment with locale-specific template loaders.
         * @param {object} options
         * @param {string} options.locale - Current locale for templates
         * @param {string} options.defaultLocale - Fallback locale
         * @returns {import('nunjucks').Environment}
         */
        this.create = function ({locale, defaultLocale}) {
            const loaders = [
                getLoader(locale),
                getLoader(defaultLocale),
            ];
            return new Environment(loaders, {
                autoescape: true,
            });
        };
    }
}