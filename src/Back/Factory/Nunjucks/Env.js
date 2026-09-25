// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Factory_Nunjucks_Env
 * @description Creates Nunjucks template environments with locale-specific loaders. Manages template loaders for different locales and creates configured environments.
 */
export default class Fl32_Tmpl_Back_Factory_Nunjucks_Env {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Node_Path} deps.path
     * @param {Fl32_Tmpl_Back_Nunjucks} deps.nunjucks
     * @param {Fl32_Tmpl_Back_Config} deps.config
     */
    constructor(
        {
            path,
            nunjucks,
            config,
        }
    ) {
        // VARS
        const {join} = path;
        const {Environment, FileSystemLoader} = nunjucks;
        /** @type {Map<string, Fl32_Tmpl_Back_Nunjucks_Loader>} */
        const _loaders = new Map();
        const _envMap = new Map();


        // FUNCS
        /**
         * Gets or creates a template loader for the specified locale.
         * @param {string | undefined} locale - Locale identifier, or undefined for unlocalized templates.
         * @returns {Fl32_Tmpl_Back_Nunjucks_Loader} The Nunjucks loader instance for the specified locale.
         */
        function getLoader(locale) {
            const key = locale || '';
            if (!_loaders.has(key)) {
                const path = locale
                    ? join(config.getRootPath(), 'tmpl', 'web', locale)
                    : join(config.getRootPath(), 'tmpl', 'web');
                const loader = new FileSystemLoader(path, {
                    noCache: true,
                    watch: false,
                });
                _loaders.set(key, loader);
            }
            return _loaders.get(key);
        }

        // MAIN

        /**
         * Creates a Nunjucks environment with locale-specific template loaders.
         * @param {object} deps - Options for environment creation.
         * @param {string | undefined} deps.locale - Current locale for templates.
         * @param {string | undefined} deps.defaultLocale - Optional fallback locale.
         * @returns {Fl32_Tmpl_Back_Nunjucks_Environment} Configured Nunjucks environment instance.
         */
        this.create = function ({locale, defaultLocale}) {
            const currentLocale = locale?.trim() || undefined;
            const fallbackLocale = defaultLocale?.trim() || undefined;
            const key = JSON.stringify([currentLocale, fallbackLocale]);
            if (!_envMap.has(key)) {
                /** @type {(string | undefined)[]} */
                const locales = [];
                if (currentLocale) locales.push(currentLocale);
                if (fallbackLocale && fallbackLocale !== currentLocale) locales.push(fallbackLocale);
                if (!fallbackLocale) locales.push(undefined);
                const loaders = locales.map(getLoader);
                const env = new Environment(loaders, {
                    autoescape: true,
                });
                _envMap.set(key, env);
            }
            return _envMap.get(key);
        };

    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        path: 'node:path',
        nunjucks: 'npm:nunjucks',
        config: 'Fl32_Tmpl_Back_Config$',
    }),
});
