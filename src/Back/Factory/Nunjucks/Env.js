// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Factory_Nunjucks_Env
 * @description Creates Nunjucks environments for include lookup with optional locale fallback.
 */
export default class Env {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs')} deps.fs
     * @param {Fl32_Tmpl_Back_Helper_Locale} deps.helpLocale
     * @param {typeof import('node:path')} deps.path
     * @param {typeof import('nunjucks')} deps.nunjucks - Nunjucks module
     * @param {Fl32_Tmpl_Back_Config} deps.config
     */
    constructor(
        {
            path,
            fs,
            helpLocale,
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
         * @param {Fl32_Tmpl_Back_Dto_Target__DTO_Optional} [deps.target] - Trusted package target.
         * @returns {Fl32_Tmpl_Nunjucks_Environment} Configured Nunjucks environment instance.
         */
        this.create = function ({locale, defaultLocale, target}) {
            if (target?.pkg) {
                /** @param {unknown} value @returns {value is string} */
                const validPart = (value) => typeof value === 'string' && value.length > 0 &&
                    !path.isAbsolute(value) && !value.includes('\\') &&
                    value.split('/').every(part => part && part !== '.' && part !== '..');
                const locales = helpLocale.generateUniqueLocales(target.locales);
                if (!validPart(target.pkg) || !validPart(target.type) || target.type.includes('/') ||
                    locales.some(one => !validPart(one) || one.includes('/'))) {
                    throw new Error('Invalid package template context');
                }
                const root = path.resolve(config.getRootPath());
                const areas = [join(root, 'tmpl', 'adapt', target.pkg, target.type),
                    join(root, 'node_modules', target.pkg, 'tmpl', target.type)];
                const roots = areas.flatMap(area => [...locales.map(one => join(area, one)), area]);
                const key = JSON.stringify(['package', target.pkg, target.type, locales]);
                if (!_envMap.has(key)) {
                    class SafeLoader extends FileSystemLoader {
                        /** @param {string} rootPath */
                        constructor(rootPath) {
                            super(rootPath, {noCache: true, watch: false});
                            this.rootPath = rootPath;
                        }
                        /** @param {string} name */
                        getSource(name) {
                            if (!validPart(name)) throw new Error('Invalid nested template name');
                            const candidate = path.resolve(this.rootPath, name);
                            if (fs.existsSync(candidate)) {
                                const realRoot = fs.realpathSync(root);
                                const realArea = fs.realpathSync(this.rootPath);
                                const realFile = fs.realpathSync(candidate);
                                /** @param {string} base @param {string} file */
                                const contained = (base, file) => {
                                    const rel = path.relative(base, file);
                                    return rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
                                };
                                if (!contained(realRoot, realArea) || !contained(realArea, realFile)) {
                                    throw new Error('Nested template escapes its root');
                                }
                            }
                            return super.getSource(name);
                        }
                        isRelative() { return false; }
                    }
                    const loaders = roots.map(one => new SafeLoader(one));
                    _envMap.set(key, new Environment(loaders, {autoescape: true}));
                }
                return _envMap.get(key);
            }
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
        fs: 'node:fs',
        helpLocale: 'Fl32_Tmpl_Back_Helper_Locale$',
        nunjucks: 'npm:nunjucks',
        config: 'Fl32_Tmpl_Back_Config$',
    }),
});
