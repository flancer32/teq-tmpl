/**
 * Creates Nunjucks template environments with locale-specific loaders.
 * Manages template loaders for different locales and creates configured environments.
 */
export default class Fl32_Tmpl_Back_Factory_Nunjucks_Env {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:path')} path
     * @param {typeof import('nunjucks')} nunjucks
     * @param {Fl32_Tmpl_Back_Config} config
     */
    constructor(
        {
            'node:path': path,
            'node:nunjucks': nunjucks,
            Fl32_Tmpl_Back_Config$: config,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS
        const {join} = path;
        const {Environment, FileSystemLoader} = nunjucks;
        /** @type {Map<string, import('nunjucks').Loader}} */
        const _loaders = new Map();
        const _envMap = new Map(); // key = `${locale}|${defaultLocale}`


        // FUNCS
        /**
         * Gets or creates a template loader for the specified locale.
         * @param {string} locale - The locale identifier (e\.g\., 'en', 'ru') for which to get or create the loader.
         * @returns {import('nunjucks').Loader} The Nunjucks loader instance for the specified locale.
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
         * @param {object} args - Options for environment creation.
         * @param {string} args.locale - Current locale for templates.
         * @param {string} args.defaultLocale - Fallback locale if template is missing for the current locale.
         * @returns {import('nunjucks').Environment} Configured Nunjucks environment instance.
         */
        this.create = function ({locale, defaultLocale}) {
            const key = `${locale}|${defaultLocale}`;
            if (!_envMap.has(key)) {
                const loaders = [
                    getLoader(locale),
                    getLoader(defaultLocale),
                ];
                const env = new Environment(loaders, {
                    autoescape: true,
                });
                _envMap.set(key, env);
            }
            return _envMap.get(key);
        };

    }
}