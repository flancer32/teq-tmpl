/**
 * Dependency injection adapter that exposes a template engine instance.
 *
 * @implements {Fl32_Tmpl_Back_Api_Adapter}
 */
export default class Fl32_Tmpl_Back_Di_Adapter {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Api_Engine} Fl32_Tmpl_Back_Service_Engine_Simple$
     */
    constructor({Fl32_Tmpl_Back_Service_Engine_Simple$: engine}) {
        /* eslint-enable jsdoc/check-param-names */
        /**
         * Returns injected template engine.
         * @returns {Fl32_Tmpl_Back_Api_Engine}
         */
        this.getEngine = function () {
            return engine;
        };
    }
}
