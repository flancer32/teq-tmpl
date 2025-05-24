/**
 * Typed DTOs factory for template localization.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Fl32_Tmpl_Back_Dto_Locale {
    /* eslint-disable jsdoc/require-param-description */
    /**
     * @param {Fl32_Tmpl_Back_Helper_Cast} cast
     */
    constructor(
        {
            Fl32_Tmpl_Back_Helper_Cast$: cast,
        }
    ) {
        /**
         * Builds locale DTO with casted values.
         * @param {*} [data] - Source data
         * @returns {Dto} - Localization data object
         */
        this.create = function (data) {
            const res = new Dto();
            res.app = cast.string(data?.app);
            res.pkg = cast.string(data?.pkg);
            res.user = cast.string(data?.user);
            return res;
        };
    }
}

/**
 * Template locale resolution data object.
 * @memberOf Fl32_Tmpl_Back_Dto_Locale
 */
class Dto {
    /**
     * Application locale.
     * @type {string}
     */
    app;

    /**
     * Plugin locale.
     * @type {string}
     */
    pkg;

    /**
     * User-requested locale.
     * @type {string}
     */
    user;
}