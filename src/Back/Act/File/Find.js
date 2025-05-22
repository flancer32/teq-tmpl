/**
 * Finds template file paths using localization and override rules.
 */
export default class Fl32_Tmpl_Back_Act_File_Find {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:fs')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Helper_Locale} helpLocale
     */
    constructor(
        {
            'node:fs': fs,
            'node:path': path,
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Helper_Locale$: helpLocale,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */
        // VARS
        const {existsSync} = fs;
        const {join, normalize, resolve} = path;

        /** @type {string} */
        let ROOT_DIR;

        // FUNCS


        // MAIN

        /**
         * Sets template search root directory.
         * @param {object} args
         * @param {string} args.root Absolute base path.
         */
        this.init = function ({root}) {
            if (ROOT_DIR !== undefined) {
                logger.error('ROOT_DIR is already set and cannot be redefined:', ROOT_DIR);
                return;
            }
            ROOT_DIR = resolve(root);
            logger.info('ROOT_DIR initialized:', ROOT_DIR);
        };

        /**
         * Finds a template file path or returns undefined.
         * @param {object} args
         * @param {string} args.type Template type.
         * @param {string} args.name Relative path with extension.
         * @param {string} [args.pkg] Package name.
         * @param {Fl32_Tmpl_Back_Dto_Locale.Dto} [args.locales] Locale list.
         * @returns {Promise<string|null>}
         */
        this.perform = async function ({type, name, pkg, locales}) {
            let path = null;
            const basePaths = [];
            const langs = helpLocale.generateUniqueLocales(locales);
            if (!pkg) {
                // Searching in the application template directory
                for (const lang of langs) {
                    basePaths.push(normalize(join(ROOT_DIR, 'tmpl', type, lang, name)));
                }
                basePaths.push(normalize(join(ROOT_DIR, 'tmpl', type, name))); // No locale fallback
            } else {
                // Searching in adapted templates (application overrides)
                for (const lang of langs) {
                    basePaths.push(normalize(join(ROOT_DIR, 'tmpl', 'adapt', pkg, type, lang, name)));
                }
                basePaths.push(normalize(join(ROOT_DIR, 'tmpl', 'adapt', pkg, type, name))); // No locale fallback

                // Searching in the original plugin inside node_modules
                for (const lang of langs) {
                    basePaths.push(normalize(join(ROOT_DIR, 'node_modules', pkg, 'tmpl', type, lang, name)));
                }
                basePaths.push(normalize(join(ROOT_DIR, 'node_modules', pkg, 'tmpl', type, name))); // No locale fallback
            }
            for (const one of basePaths) {
                const plain = resolve(one);
                if (plain.startsWith(ROOT_DIR) && existsSync(plain)) {
                    path = plain;
                    break;
                }
            }
            if (!path) {
                logger.error(`Template '${name}' not found for type '${type}', pkg '${pkg || 'app'}', locales '${langs.join(', ')}'.`);
            }
            return path;
        };
    }
}