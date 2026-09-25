// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Dto_Target
 * @description Creates typed DTOs for template resolution.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Fl32_Tmpl_Back_Dto_Target {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast - Type casting helper
     * @param {Fl32_Tmpl_Back_Dto_Locale} deps.dtoLocale - Locale DTO factory
     */
    constructor(
        {
            cast,
            dtoLocale,
        }
    ) {
        /**
         * Builds template target DTO with validated values.
         * @param {*} data - Source object
         * @returns {Fl32_Tmpl_Back_Dto_Target__DTO} - Typed DTO for render target
         */
        this.create = function (data) {
            const res = new Fl32_Tmpl_Back_Dto_Target__DTO();
            res.locales = dtoLocale.create(data?.locales);
            res.name = cast.string(data?.name);
            res.pkg = cast.string(data?.pkg);
            res.type = cast.string(data?.type);
            return res;
        };
    }
}

/**
 * Template target used for file resolution.
 */
export class Fl32_Tmpl_Back_Dto_Target__DTO {
    /**
     * Optional locale preferences for resolution.
     * @type {Fl32_Tmpl_Back_Dto_Locale__DTO | undefined}
     */
    locales;

    /**
     * Template name as a relative path with extension.
     * @type {string | undefined}
     */
    name;

    /**
     * Optional package identifier for overrides.
     * @type {string | undefined}
     */
    pkg;

    /**
     * Template usage type.
     * @type {string | undefined}
     */
    type;
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        dtoLocale: 'Fl32_Tmpl_Back_Dto_Locale$',
    }),
});
