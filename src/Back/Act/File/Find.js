/**
 * Finds template file paths using localization and override rules.
 * Searches in application templates and adapted plugin templates.
 */
export default class Fl32_Tmpl_Back_Act_File_Find {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:fs')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Config} config
     * @param {Fl32_Tmpl_Back_Helper_Locale} helpLocale
     */
    constructor(
        {
            'node:fs': fs,
            'node:path': path,
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Config$: config,
            Fl32_Tmpl_Back_Helper_Locale$: helpLocale,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */
        // VARS
        const {existsSync} = fs;
        const {join, normalize, resolve} = path;

        // FUNCS

        // MAIN

        /**
         * Finds a template file path or returns null.
         * Searches in application templates, adapted overrides and original plugin templates.
         * @param {object} args
         * @param {Fl32_Tmpl_Back_Dto_Target.Dto} [args.target] - Template render target
         * @returns {Promise<string|null>} - Absolute path or null if not found
         */
        this.run = async function ({target}) {
            let path = null;
            if (target?.name) {
                const basePaths = [];
                const {type, pkg, name, locales} = target;
                const root = config.getRootPath();
                const uniqueLocales = helpLocale.generateUniqueLocales(locales);
                if (!pkg) {
                    // Searching in the application template directory
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'tmpl', type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'tmpl', type, name))); // No locale fallback
                } else {
                    // Searching in adapted templates (application overrides)
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, name))); // No locale fallback

                    // Searching in the original plugin inside node_modules
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, name))); // No locale fallback
                }
                for (const one of basePaths) {
                    const plain = resolve(one);
                    if (plain.startsWith(root) && existsSync(plain)) {
                        path = plain;
                        break;
                    }
                }
                if (!path) {
                    logger.error(`Template '${name}' not found for type '${type}', pkg '${pkg || 'app'}', locales '${uniqueLocales.join(', ')}'.`);
                }
            }
            return path;
        };
    }
}