/**
 * Creates typed DTOs for template localization.
 *
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
         * Builds a locale DTO with casted values.
         *
         * @param {*} [data]
         * @returns {Dto}
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
 * Data object for resolving template locale.
 *
 * @memberOf Fl32_Tmpl_Back_Dto_Locale
 */
class Dto {
    /**
     * Locale of the application.
     * @type {string}
     */
    app;

    /**
     * Locale of the plugin.
     * @type {string}
     */
    pkg;

    /**
     * Locale requested by user.
     * @type {string}
     */
    user;
}
