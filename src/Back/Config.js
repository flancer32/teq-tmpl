// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Config
 * @description Typed template settings projected from cfg and the CLI runtime configuration.
 */
export default class Fl32_Tmpl_Back_Config {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast - Type casting helper
     * @param {TeqFw_Cli_Config} deps.cliConfig - CLI-owned runtime configuration
     * @param {TeqFw_Cfg_Reader} deps.reader - Shared configuration reader
     */
    constructor({cast, cliConfig, reader}) {
        const raw = reader.get('TEQFW_TMPL');
        const allowedLocalesInput = (typeof raw.ALLOWED_LOCALES === 'string')
            ? raw.ALLOWED_LOCALES.split(',').map(value => value.trim()).filter(Boolean)
            : raw.ALLOWED_LOCALES;
        const allowedLocales = Object.freeze(cast.array(allowedLocalesInput, cast.string));
        const defaultLocale = cast.string(raw.DEFAULT_LOCALE);
        if (!defaultLocale) throw new Error('TEQFW_TMPL__DEFAULT_LOCALE is required.');
        /** @type {ReadonlyArray<string>} */
        const _allowedLocales = allowedLocales;
        const _defaultLocale = defaultLocale;
        /**
         * @returns {ReadonlyArray<string>} Available locales
         */
        this.getAvailableLocales = () => _allowedLocales;

        /**
         * @returns {string} Default locale
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
