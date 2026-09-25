// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Config
 * @description Typed template settings projected from cfg and the CLI runtime configuration.
 */
export default class Config {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast - Type casting helper
     * @param {Fl32_Tmpl_Back_Config_Cli} deps.cliConfig - CLI-owned runtime configuration
     * @param {Fl32_Tmpl_Back_Config_Reader} deps.reader - Shared configuration reader
     */
    constructor({cast, cliConfig, reader}) {
        const raw = reader.get('TEQFW_TMPL');
        const allowedLocalesInput = (typeof raw.ALLOWED_LOCALES === 'string')
            ? raw.ALLOWED_LOCALES.split(',').map(/** @param {string} value */ value => value.trim()).filter(Boolean)
            : raw.ALLOWED_LOCALES;
        const allowedLocales = Object.freeze(cast.array(allowedLocalesInput, cast.string));
        const defaultLocale = cast.string(raw.DEFAULT_LOCALE)?.trim() || undefined;
        /** @type {Fl32_Tmpl_String_List} */
        const _allowedLocales = [...allowedLocales];
        Object.freeze(_allowedLocales);
        const _defaultLocale = defaultLocale;
        /**
         * @returns {Fl32_Tmpl_String_List} Available locales
         */
        this.getAvailableLocales = () => _allowedLocales;

        /**
         * @returns {Fl32_Tmpl_Optional_String} Configured fallback locale, if any
         */
        this.getDefaultLocale = () => _defaultLocale;

        /**
         * @returns {string} Application root directory
         */
        this.getRootPath = () => cliConfig.applicationRoot;
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        cliConfig: 'TeqFw_Cli_Config$',
        reader: 'TeqFw_Cfg_Reader$',
    }),
});
