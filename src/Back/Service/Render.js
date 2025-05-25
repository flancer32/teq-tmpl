/**
 * Renders templates using a configured engine (Mustache or Nunjucks).
 * Handles template loading and processing pipeline.
 */
export default class Fl32_Tmpl_Back_Service_Render {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger - Error logger.
     * @param {Fl32_Tmpl_Back_Config} config - Engine configuration.
     * @param {Fl32_Tmpl_Back_Act_File_Find} actFind - Template file locator.
     * @param {Fl32_Tmpl_Back_Act_File_Load} actLoad - Template file loader.
     * @param {Fl32_Tmpl_Back_Service_Engine_Mustache} servMustache - Mustache renderer.
     * @param {Fl32_Tmpl_Back_Service_Engine_Nunjucks} servNunjucks - Nunjucks renderer.
     * @param {typeof Fl32_Tmpl_Back_Enum_Engine} ENGINE - Engine types enum.
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
        /* eslint-enable jsdoc/check-param-names */

        // VARS

        // MAIN

        /**
         * Provides result codes for rendering operations.
         * @return {typeof RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Renders template using configured engine.
         * @param {object} args - Rendering parameters.
         * @param {Fl32_Tmpl_Back_Dto_Target.Dto} args.target - Template target.
         * @param {string} [args.template] - Raw template string.
         * @param {object} [args.data] - Template context data.
         * @param {object} [args.options] - Engine-specific options.
         * @returns {Promise<{resultCode: string, content: string|null}>} - Rendering result.
         */
        this.perform = async function (
            {
                target,
                template,
                data = {},
                options = {},
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let resultContent = null;
            let templateContent = null;
            try {
                if (typeof template === 'string') {
                    templateContent = template;
                } else if (target) {
                    // Find the template file path
                    const path = await actFind.run({target});
                    if (path) {
                        // Load the template file content
                        const {content} = await actLoad.run({path});
                        templateContent = content;
                    } else {
                        resultCode = RESULT.PATH_NOT_FOUND;
                    }
                }
                if (resultCode !== RESULT.PATH_NOT_FOUND) {
                    if (templateContent) {
                        if (config.getEngine() === ENGINE.MUSTACHE) {
                            // Render the template using Mustache
                            const {resultCode: renderResult, content} = await servMustache.perform({
                                template: templateContent,
                                data,
                                options,
                            });
                            resultContent = content;
                        } else {
                            // Use Nunjucks by default
                            const ext = Object.assign({}, options, {locale: target?.locales?.user});
                            const {resultCode: renderResult, content} = await servNunjucks.perform({
                                template: templateContent,
                                data,
                                options: ext,
                            });
                            resultContent = content;
                        }
                        resultCode = RESULT.SUCCESS;
                    } else {
                        resultCode = RESULT.TMPL_IS_EMPTY;
                    }
                }
            } catch (error) {
                logger.exception(error);
            }
            return {resultCode, content: resultContent};
        };
    }
}

/**
 * Rendering operation result codes.
 * @memberOf Fl32_Tmpl_Back_Service_Render
 */
const RESULT = {
    PATH_NOT_FOUND: 'PATH_NOT_FOUND',
    SUCCESS: 'SUCCESS',
    TMPL_IS_EMPTY: 'TMPL_IS_EMPTY',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);