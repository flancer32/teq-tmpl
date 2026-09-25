// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Factory_Nunjucks_Env
 * @description Creates Nunjucks environments for include lookup with optional locale fallback.
 */
export default class Env {
    /**
     * @param {object} deps
     * @param {typeof import('node:path')} deps.path
     * @param {typeof import('nunjucks')} deps.nunjucks - Nunjucks module
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
        const _loaders = new Map();
        const _envMap = new Map();


        // FUNCS
        /**
         * Gets or creates a template loader for the specified locale.
         * @param {Fl32_Tmpl_Optional_String} locale - Locale identifier, or undefined for unlocalized templates.
         * @returns {Fl32_Tmpl_Nunjucks_Loader} The Nunjucks loader instance for the specified locale.
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
         * Creates a Nunjucks environment with requested, default, then unlocalized include lookup.
         * @param {object} deps - Options for environment creation.
         * @param {Fl32_Tmpl_Optional_String} deps.locale - Current locale for templates.
         * @param {Fl32_Tmpl_Optional_String} deps.defaultLocale - Optional fallback locale.
         * @returns {Fl32_Tmpl_Nunjucks_Environment} Configured Nunjucks environment instance.
         */
        this.create = function ({locale, defaultLocale}) {
            const currentLocale = locale?.trim() || undefined;
            const fallbackLocale = defaultLocale?.trim() || undefined;
            const key = JSON.stringify([currentLocale, fallbackLocale]);
            if (!_envMap.has(key)) {
                /** @type {(Fl32_Tmpl_Optional_String)[]} */
                const locales = [];
                if (currentLocale) locales.push(currentLocale);
                if (fallbackLocale && fallbackLocale !== currentLocale) locales.push(fallbackLocale);
                locales.push(undefined);
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
