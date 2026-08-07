// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Config
 * @description Typed template configuration projected from the TeqFW cfg reader.
 */
export default class Fl32_Tmpl_Back_Config {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Helper_Cast} deps.cast - Type casting helper
     * @param {Fl32_Tmpl_Back_Enum_Engine} deps.ENGINE - Template engine enum
     * @param {TeqFw_Cfg_Reader} deps.reader - Shared configuration reader
     */
    constructor({cast, ENGINE, reader}) {
        const raw = reader.get('TEQFW_TMPL');
        const allowedLocalesInput = (typeof raw.ALLOWED_LOCALES === 'string')
            ? raw.ALLOWED_LOCALES.split(',').map(value => value.trim()).filter(Boolean)
            : raw.ALLOWED_LOCALES;
        const allowedLocales = Object.freeze(cast.array(allowedLocalesInput, cast.string));
        const defaultLocale = cast.string(raw.DEFAULT_LOCALE);
        const rootPath = cast.string(raw.ROOT_PATH);

        if (!defaultLocale) throw new Error('TEQFW_TMPL__DEFAULT_LOCALE is required.');
        if (!rootPath) throw new Error('TEQFW_TMPL__ROOT_PATH is required.');

        /** @type {ReadonlyArray<string>} */
        const _allowedLocales = allowedLocales;
        /** @type {string} */
        const _defaultLocale = defaultLocale;
        /** @type {string} */
        const _engine = cast.enum(raw.ENGINE, ENGINE, {lower: true}) ?? ENGINE.NUNJUCKS;
        /** @type {string} */
        const _rootPath = rootPath;

        /**
         * @returns {ReadonlyArray<string>} Available locales
         */
        this.getAvailableLocales = () => _allowedLocales;

        /**
         * @returns {string} Default locale
         */
        this.getDefaultLocale = () => _defaultLocale;

        /**
         * @returns {string} Active template engine
         */
        this.getEngine = () => _engine;

        /**
         * @returns {string} Application root directory
         */
        this.getRootPath = () => _rootPath;
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        cast: 'Fl32_Tmpl_Back_Helper_Cast$',
        ENGINE: 'Fl32_Tmpl_Back_Enum_Engine__default',
        reader: 'TeqFw_Cfg_Reader$',
    }),
});
