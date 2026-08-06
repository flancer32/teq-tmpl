// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Config
 * @description Template engine configuration service. Must be initialized once during application bootstrap. Manages template engine settings, available locales, and root directory path.
 */
export default class Fl32_Tmpl_Back_Config {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast - Type casting helper
     * @param {Fl32_Tmpl_Back_Enum_Engine} deps.ENGINE - Template engine enum
     */
    constructor(
        {
            cast,
            ENGINE,
        }
    ) {

        // VARS

        /**
         * List of available locales for template rendering.
         * @type {string[]}
         */
        let _allowedLocales;

        /**
         * Fallback locale when requested locale is not available.
         * @type {string}
         */
        let _defaultLocale;

        /**
         * Active template engine name.
         * @type {string}
         */
        let _engine = ENGINE.NUNJUCKS;

        /**
         * Initialization state flag.
         * @type {boolean}
         */
        let _isInit = false;

        /**
         * Application root directory path for template resolution.
         * @type {string}
         */
        let _rootPath;

        // MAIN

        /**
         * Configures template engine and localization settings.
         * @param {object} deps - Configuration object
         * @param {string[]} deps.allowedLocales - Allowed locales
         * @param {string} deps.defaultLocale - Fallback locale
         * @param {string} deps.engine - Template engine name
         * @param {string} deps.rootPath - Root directory for templates
         * @throws {Error} If already initialized
         */
        this.init = function ({allowedLocales, defaultLocale, engine, rootPath}) {
            if (_isInit) {
                throw new Error('Fl32_Tmpl_Back_Config has already been initialized.');
            }

            _allowedLocales = cast.array(allowedLocales, cast.string);
            _defaultLocale = /** @type {string} */ (cast.string(defaultLocale));
            _engine = cast.enum(engine, ENGINE, {lower: true}) ?? ENGINE.NUNJUCKS;
            _rootPath = /** @type {string} */ (cast.string(rootPath));

            _isInit = true;
        };

        /**
         * @returns {string[]} Available locales
         */
        this.getAvailableLocales = () => _allowedLocales;

        /**
         * @returns {string} Default locale
         */
        this.getDefaultLocale = () => _defaultLocale;

        /**
         * @returns {string} Active template engine
         */
        this.getEngine = () => _engine;

        /**
         * @returns {string} Application root directory
         */
        this.getRootPath = () => _rootPath;
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        ENGINE: 'Fl32_Tmpl_Back_Enum_Engine__default',
    }),
});