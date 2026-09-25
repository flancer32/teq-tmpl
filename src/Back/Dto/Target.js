// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Dto_Target
 * @description Creates typed DTOs for template resolution.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Target {
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
         * @param {any} data - Source object
         * @returns {Fl32_Tmpl_Back_Dto_Target__DTO} - Typed DTO for render target
         */
        this.create = function (data) {
            const res = new DTO();
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
export class DTO {
    /** Creates an empty template-target DTO. */
    constructor() {
        /** @type {Fl32_Tmpl_Back_Dto_Locale__DTO_Optional} */
        this.locales = undefined;

        /** @type {Fl32_Tmpl_Optional_String} */
        this.name = undefined;

        /** @type {Fl32_Tmpl_Optional_String} */
        this.pkg = undefined;

        /** @type {Fl32_Tmpl_Optional_String} */
        this.type = undefined;
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        dtoLocale: 'Fl32_Tmpl_Back_Dto_Locale$',
    }),
});
