/**
 * Creates typed DTOs for template resolution.
 * @see TeqFw_Core_Shared_Api_Factory
 */
export default class Fl32_Tmpl_Back_Dto_Target {
    /**
     * @param {object} deps - Dependencies
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.Fl32_Tmpl_Back_Helper_Cast$ - Type casting helper
     * @param {Fl32_Tmpl_Back_Dto_Locale} deps.Fl32_Tmpl_Back_Dto_Locale$ - Locale DTO factory
     */
    constructor(
        {
            Fl32_Tmpl_Back_Helper_Cast$: cast,
            Fl32_Tmpl_Back_Dto_Locale$: dtoLocale,
        }
    ) {
        /**
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

/**
 * Template render target data object.
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