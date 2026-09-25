// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Act_File_Find
 * @description Resolves application or package template paths with override precedence and optional locale fallback.
 */
export default class Fl32_Tmpl_Back_Act_File_Find {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Node_Fs} deps.fs
     * @param {Fl32_Tmpl_Back_Node_Path} deps.path
     * @param {TeqFw_Log_Provider} deps.log
     * @param {Fl32_Tmpl_Back_Config} deps.config
     * @param {Fl32_Tmpl_Back_Helper_Locale} deps.helpLocale
     */
    constructor(
        {
            fs,
            path,
            log,
            config,
            helpLocale,
        }
    ) {
        // VARS
        const logger = log.forSource('Fl32_Tmpl_Back_Act_File_Find');
        const {existsSync} = fs;
        const {isAbsolute, join, normalize, relative, resolve} = path;

        // FUNCS

        // MAIN

        /**
         * Resolves a template path using application overrides and optional locale preferences.
         * @param {object} deps
         * @param {Fl32_Tmpl_Back_Dto_Target__DTO} deps.target - Template render target descriptor
         * @returns {Promise<string | undefined>} - Absolute path to a template file or undefined if not found
         */
        this.run = async function ({target}) {
            /** @type {string | undefined} */
            let path;
            if (target?.name && target.type) {
                const basePaths = [];
                const {type, pkg, name, locales} = target;
                const root = config.getRootPath();
                const uniqueLocales = helpLocale.generateUniqueLocales(locales);
                if (!pkg) {
                    // Searching in the application template directory
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'tmpl', type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'tmpl', type, name))); // Unlocalized fallback
                } else {
                    // Searching in adapted templates (application overrides)
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, name))); // Unlocalized fallback

                    // Searching in the original plugin inside node_modules
                    for (const lang of uniqueLocales) {
                        basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, lang, name)));
                    }
                    basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, name))); // Unlocalized fallback
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
                logger.trace('Template search aborted: target name or type is missing');
            }
            return path;
        };
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        fs: 'node:fs',
        path: 'node:path',
        log: 'TeqFw_Log_Provider$',
        config: 'Fl32_Tmpl_Back_Config$',
        helpLocale: 'Fl32_Tmpl_Back_Helper_Locale$',
    }),
});
