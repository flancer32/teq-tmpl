// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Dto_Locale
 * @description Typed DTOs factory for template localization.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Fl32_Tmpl_Back_Dto_Locale {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast
     */
    constructor(
        {
            cast,
        }
    ) {
        /**
         * Builds locale DTO with casted values.
         * @param {*} data - Source data
         * @returns {Fl32_Tmpl_Back_Dto_Locale__DTO} - Localization data object
         */
        this.create = function (data) {
            const res = new Fl32_Tmpl_Back_Dto_Locale__DTO();
            res.app = cast.string(data?.app);
            res.pkg = cast.string(data?.pkg);
            res.user = cast.string(data?.user);
            return res;
        };
    }
}

/**
 * Template locale resolution data object.
 */
export class Fl32_Tmpl_Back_Dto_Locale__DTO {
    /**
     * Application locale.
     * @type {string | undefined}
     */
    app;

    /**
     * Plugin locale.
     * @type {string | undefined}
     */
    pkg;

    /**
     * User-requested locale.
     * @type {string | undefined}
     */
    user;
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
    }),
});