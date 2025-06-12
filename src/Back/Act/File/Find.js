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
        const {isAbsolute, join, normalize, relative, resolve} = path;

        // FUNCS

        // MAIN

        /**
         * Finds a template file path according to localization and override rules.
         * @param {object} args
         * @param {Fl32_Tmpl_Back_Dto_Target.Dto} [args.target] - Template render target descriptor
         * @returns {Promise<string>} - Absolute path to a template file or undefined if not found
         */
        this.run = async function ({target}) {
            let path = undefined;
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
                    const pathAbs = resolve(one);
                    const pathRel = relative(root, pathAbs);
                    if (!pathRel.startsWith('..') && !isAbsolute(pathRel) && existsSync(pathAbs)) {
                        path = pathAbs;
                        break;
                    }
                }
                if (!path) {
                    // this is a normal situation
                    logger.trace(`Template '${name}' not found for type '${type}', pkg '${pkg || 'app'}', locales '${uniqueLocales.join(', ')}'.`);
                }
            } else {
                logger.warn('Template search aborted: target name is missing');
            }
            return path;
        };
    }
}