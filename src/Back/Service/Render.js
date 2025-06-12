/**
 * Renders templates using an abstracted template engine.
 * Handles template loading and delegates rendering to the injected engine.
 */
export default class Fl32_Tmpl_Back_Service_Render {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger - Error logger.
     * @param {Fl32_Tmpl_Back_Api_Engine} engine - Template engine implementation.
     * @param {Fl32_Tmpl_Back_Act_File_Find} actFind - Template file locator.
     * @param {Fl32_Tmpl_Back_Act_File_Load} actLoad - Template file loader.
     *
     */
    constructor(
        {
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Api_Engine$: engine,
            Fl32_Tmpl_Back_Act_File_Find$: actFind,
            Fl32_Tmpl_Back_Act_File_Load$: actLoad,
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
         * Renders template using the injected engine.
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
                        const ext = Object.assign({}, options, {locale: target?.locales?.user});
                        const resCodes = engine.getResultCodes();
                        const {resultCode: renderResult, content} = await engine.perform({
                            template: templateContent,
                            data,
                            options: ext,
                        });
                        resultContent = content;
                        if (renderResult === resCodes.SUCCESS) resultCode = RESULT.SUCCESS;
                        else if (renderResult === resCodes.TMPL_IS_EMPTY) resultCode = RESULT.TMPL_IS_EMPTY;
                        else resultCode = RESULT.UNKNOWN_ERROR;
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
