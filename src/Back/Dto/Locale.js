// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Dto_Locale
 * @description Creates optional locale preferences for template resolution.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Locale {
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
         * @param {any} data - Source data
         * @returns {Fl32_Tmpl_Back_Dto_Locale__DTO} - Locale preferences
         */
        this.create = function (data) {
            const res = new DTO();
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
export class DTO {
    /** Creates an empty locale-preference DTO. */
    constructor() {
        /** @type {Fl32_Tmpl_Optional_String} */
        this.app = undefined;

        /** @type {Fl32_Tmpl_Optional_String} */
        this.pkg = undefined;

        /** @type {Fl32_Tmpl_Optional_String} */
        this.user = undefined;
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
    }),
});
