/**
 * Creates typed DTOs for template resolution.
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
    ) {        /**
         * Builds template target DTO with validated values.
         * @param {object} [data] - Source object
         * @returns {Fl32_Tmpl_Back_Dto_Target.Dto} - Typed DTO for render target
         */
        this.create = function (data) {
            const res = new Dto();
            res.locales = dtoLocale.create(data?.locales);
            res.name = cast.string(data?.name);
            res.pkg = cast.string(data?.pkg);
            res.type = cast.string(data?.type);
            return res;
        };
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        dtoLocale: 'Fl32_Tmpl_Back_Dto_Locale$',
    }),
});

/**
 * DTO describing the template render target.
 * Used to resolve a file path for rendering context.
 * @memberOf Fl32_Tmpl_Back_Dto_Target
 */
class Dto {
    /**
     * Localization context for resolution.
     * @type {Fl32_Tmpl_Back_Dto_Locale.Dto}
     */
    locales;

    /**
     * Template name as a relative path with extension.
     * @type {string}
     */
    name;

    /**
     * Optional package identifier for overrides.
     * @type {string}
     */
    pkg;

    /**
     * Template usage type.
     * @type {string}
     */
    type;
}