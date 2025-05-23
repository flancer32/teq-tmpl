/**
 * Renders Mustache templates by finding, loading and processing template files.
 * @see {TeqFw_Core_Shared_Api_Service}
 */
export default class Fl32_Tmpl_Back_Service_Render {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Config} config
     * @param {Fl32_Tmpl_Back_Act_File_Find} actFind
     * @param {Fl32_Tmpl_Back_Act_File_Load} actLoad
     * @param {Fl32_Tmpl_Back_Service_Engine_Mustache} servMustache
     * @param {Fl32_Tmpl_Back_Service_Engine_Nunjucks} servNunjucks
     * @param {typeof Fl32_Tmpl_Back_Enum_Engine} ENGINE
     */
    constructor(
        {
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Config$: config,
            Fl32_Tmpl_Back_Act_File_Find$: actFind,
            Fl32_Tmpl_Back_Act_File_Load$: actLoad,
            Fl32_Tmpl_Back_Service_Engine_Mustache$: servMustache,
            Fl32_Tmpl_Back_Service_Engine_Nunjucks$: servNunjucks,
            Fl32_Tmpl_Back_Enum_Engine$: ENGINE,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS

        // MAIN

        /**
         * Result codes for template rendering operations.
         * @return {typeof Fl32_Tmpl_Back_Service_Render.RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Render the selected template using the configured template engine.
         *
         * @param {object} args - Parameters object.
         * @param {string} [args.pkg] - NPM package name (null for app templates).
         * @param {string} args.type - Template type (e.g., 'web', 'email').
         * @param {string} args.name - Template name with or without extension.
         * @param {Fl32_Tmpl_Back_Dto_Locale.Dto} [args.locales] - Locales for fallback resolution.
         * @param {object} [args.data] - Template-specific data (context), format depends on engine.
         * @param {object} [args.options] - Optional render options, engine-specific (e.g., partials for Mustache).
         * @returns {Promise<{resultCode: string, content: string|null}>} - Rendering result with result code.
         */
        this.perform = async function (
            {
                pkg,
                type,
                name,
                locales,
                data = {},
                options = {},
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                // Find the template file path
                const path = await actFind.run({pkg, type, name, locales});
                if (path) {
                    // Load the template file content
                    const {content: templateContent} = await actLoad.run({path});
                    if (templateContent) {
                        if (config.getEngine() === ENGINE.MUSTACHE) {
                            // Render the template using Mustache
                            const {resultCode: renderResult, content: renderedContent} = await servMustache.perform({
                                template: templateContent,
                                data,
                                options,
                            });
                            content = renderedContent;
                        } else {
                            // Use Nunjucks by default
                            const {resultCode: renderResult, content: renderedContent} = await servNunjucks.perform({
                                template: templateContent,
                                data,
                                options,
                            });
                            content = renderedContent;
                        }
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