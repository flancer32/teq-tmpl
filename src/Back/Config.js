/**
 * Template engine configuration service. Initialize once during bootstrap.
 */
export default class Fl32_Tmpl_Back_Config {
    /* jsdoc/check-param-names */
    /**
     * @param {object} deps - Dependencies
     * @param {Fl32_Cms_Back_Helper_Cast} deps.Fl32_Cms_Back_Helper_Cast$ - Type casting helper
     * @param {typeof Fl32_Tmpl_Back_Enum_Engine} deps.Fl32_Tmpl_Back_Enum_Engine$ - Template engine enum
     */
    constructor(
        {
            Fl32_Cms_Back_Helper_Cast$: cast,
            Fl32_Tmpl_Back_Enum_Engine$: ENGINE,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */

        // VARS

        /**
         * Active template engine name.
         * @type {string}
         */
        let _engine = ENGINE.NUNJUCKS;

        /**
         * Application root directory path.
         * @type {string}
         */
        let _rootPath;

        /**
         * Initialization state flag.
         * @type {boolean}
         */
        let _isInit = false;

        // MAIN

        /**
         * Configure template engine and root path. Throws if called more than once.
         * @param {object} config - Configuration parameters
         * @param {string} config.engine - Template engine name
         * @param {string} config.rootPath - Application root directory path
         */
        this.init = function ({engine, rootPath}) {
            if (_isInit) {
                throw new Error('Fl32_Tmpl_Back_Config has already been initialized.');
            }

            _engine = cast.enum(engine, ENGINE, {lower: true}) ?? ENGINE.NUNJUCKS;
            _rootPath = cast.string(rootPath);

            _isInit = true;
        };

        /**
         * Get current template engine name.
         * @returns {string}
         */
        this.getEngine = () => _engine;

        /**
         * Get an application root directory path.
         * @returns {string}
         */
        this.getRootPath = () => _rootPath;
    }
}