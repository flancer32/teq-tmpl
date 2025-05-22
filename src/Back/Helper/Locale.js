/**
 * Locale variants generator.
 */
export default class Fl32_Tmpl_Back_Helper_Locale {

    /**
     * Unique locale variants from full (`xx-YY`) and short (`xx`) forms.
     * @param {Fl32_Tmpl_Back_Dto_Locale.Dto} locale - Locale values.
     * @returns {string[]} - Unique ordered variants.
     */
    generateUniqueLocales(locale) {
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
    }
}