// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Helper_Locale
 * @description Locale variants generator.
 */
export default class Locale {
    /**
     * Creates a new instance.
     */
    constructor() {
        /**
         * Unique locale variants from full (`xx-YY`) and short (`xx`) forms.
         * @param {Fl32_Tmpl_Back_Dto_Locale__DTO_Optional} locale - Locale values.
         * @returns {Fl32_Tmpl_String_Array} - Unique ordered variants.
         */
        this.generateUniqueLocales = function (locale) {
            if (!locale) {return [];}
            const variants = new Set();
            // Arrange the locales by priority
            const locales = [locale.user, locale.app, locale.pkg];
            for (const one of locales) {
                if (!one) {continue;}
                variants.add(one);
                if (one.includes('-')) {
                    variants.add(one.split('-')[0]);
                }
            }
            return [...variants];
        };
    }
}
