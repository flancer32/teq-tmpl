/**
 * Template engine configuration service.
 * Must be initialized once during application bootstrap.
 */
export default class Fl32_Tmpl_Back_Config {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {Fl32_Cms_Back_Helper_Cast} cast
     * @param {typeof Fl32_Tmpl_Back_Enum_Engine} ENGINE
     */
    constructor(
        {
            Fl32_Cms_Back_Helper_Cast$: cast,
            Fl32_Tmpl_Back_Enum_Engine$: ENGINE,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */

        // VARS

        /** @type {string} The template engine to use ('mustache' or 'nunjucks'). */
        let _engine = ENGINE.NUNJUCKS;

        /** @type {boolean} Indicates whether the configuration has been initialized. */
        let _isInit = false;

        // MAIN

        /**
         * Initialize the configuration with the selected template engine.
         *
         * @param {object} config - Initialization parameters.
         * @param {string} config.engine - The name of the template engine to use.
         * @throws {Error} If called more than once.
         */
        this.init = function ({engine} = {}) {
            if (_isInit) {
                throw new Error('Fl32_Tmpl_Back_Config has already been initialized.');
            }

            _engine = cast.enum(engine, ENGINE, {lower: true}) ?? ENGINE.NUNJUCKS;

            _isInit = true;
        };

        /**
         * Get the configured template engine.
         *
         * @returns {string} - Name of the configured template engine.
         */
        this.getEngine = () => _engine;
    }
}
