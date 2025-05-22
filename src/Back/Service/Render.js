/**
 * Renders Mustache templates by finding, loading and processing template files.
 * @see {TeqFw_Core_Shared_Api_Service}
 */
export default class Fl32_Tmpl_Back_Service_Render {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('mustache')} mustache
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Act_File_Find} actFind
     * @param {Fl32_Tmpl_Back_Act_File_Load} actLoad
     */
    constructor(
        {
            'node:mustache': mustache,
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Act_File_Find$: actFind,
            Fl32_Tmpl_Back_Act_File_Load$: actLoad,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS
        const {default: Mustache} = mustache;

        // MAIN

        /**
         * Result codes for template rendering operations.
         * @return {typeof Fl32_Tmpl_Back_Service_Render.RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Finds, loads and renders a Mustache template.
         * @param {object} args - Parameters object.
         * @param {string} [args.pkg] - NPM package name (null for app templates).
         * @param {string} args.type - Template type.
         * @param {string} args.name - Template name without extension.
         * @param {Fl32_Tmpl_Back_Dto_Locale.Dto} [args.locales] - User/app/package locales.
         * @param {object} [args.view] - Mustache template context.
         * @param {object} [args.partials] - Mustache partial templates.
         * @returns {Promise<{resultCode: string, content: string|null}>} - Rendering result.
         */
        this.perform = async function (
            {
                pkg,
                type,
                name,
                locales,
                view = {},
                partials = {}
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                // Find the template file path
                const {path} = await actFind.run({pkg, type, name, locales});
                if (path) {
                    // Load the template file content
                    const {content: templateContent} = await actLoad.run({path});
                    if (templateContent) {
                        // Render the template using Mustache
                        content = Mustache.render(templateContent, view, partials);
                        resultCode = RESULT.SUCCESS;
                    } else {
                        resultCode = RESULT.TMPL_IS_EMPTY;
                    }
                } else {
                    resultCode = RESULT.PATH_NOT_FOUND;
                }
            } catch (error) {
                logger.exception(error);
            }
            return {resultCode, content};
        };
    }
}

/**
 * Result codes for template rendering operations.
 * @memberOf Fl32_Tmpl_Back_Service_Render
 */
const RESULT = {
    PATH_NOT_FOUND: 'PATH_NOT_FOUND',
    SUCCESS: 'SUCCESS',
    TMPL_IS_EMPTY: 'TMPL_IS_EMPTY',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);