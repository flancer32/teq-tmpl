/**
 * Template engine configuration service. Must be initialized once during application bootstrap.
 * Manages template engine settings, available locales, and root directory path.
 */
export default class Fl32_Tmpl_Back_Config {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Helper_Cast} cast - Type casting helper
     * @param {typeof Fl32_Tmpl_Back_Enum_Engine} ENGINE - Template engine enum
     */
    constructor(
        {
            Fl32_Tmpl_Back_Helper_Cast$: cast,
            Fl32_Tmpl_Back_Enum_Engine$: ENGINE,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */

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
         * @param {object} config - Configuration object
         * @param {string[]} config.allowedLocales - Allowed locales
         * @param {string} config.defaultLocale - Fallback locale
         * @param {string} config.engine - Template engine name
         * @param {string} config.rootPath - Root directory for templates
         * @throws {Error} If already initialized
         */
        this.init = function ({allowedLocales, defaultLocale, engine, rootPath}) {
            if (_isInit) {
                throw new Error('Fl32_Tmpl_Back_Config has already been initialized.');
            }

            _allowedLocales = cast.array(allowedLocales, cast.string);
            _defaultLocale = cast.string(defaultLocale);
            _engine = cast.enum(engine, ENGINE, {lower: true}) ?? ENGINE.NUNJUCKS;
            _rootPath = cast.string(rootPath);

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