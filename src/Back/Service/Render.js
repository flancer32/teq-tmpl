// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Service_Render
 * @description Renders templates using an injected template engine. Handles template loading and delegates rendering to the engine.
 */
export default class Fl32_Tmpl_Back_Service_Render {
    /**
     * @param {object} deps
     * @param {TeqFw_Log_Provider} deps.log - Shared logging provider.
     * @param {Fl32_Tmpl_Back_Api_Engine} deps.engine - Template engine instance.
     * @param {Fl32_Tmpl_Back_Act_File_Find} deps.actFind - Template file locator.
     * @param {Fl32_Tmpl_Back_Act_File_Load} deps.actLoad - Template file loader.
     *
     */
    constructor(
        {
            log,
            engine,
            actFind,
            actLoad,
        }
    ) {

        const logger = log.forSource('Fl32_Tmpl_Back_Service_Render');

        // VARS

        // MAIN

        /**
         * Provides result codes for this service.
         * @return {typeof RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Renders template using the injected engine.
         * @param {object} deps - Rendering parameters.
         * @param {Fl32_Tmpl_Back_Dto_Target__DTO | undefined} deps.target - Template target.
         * @param {string | undefined} deps.template - Raw template string.
         * @param {object} deps.data - Template context data.
         * @param {object} deps.options - Engine-specific options.
         * @returns {Promise<Fl32_Tmpl_Back_Service_Render_Result>} - Rendering result.
         */
        this.perform = async function (
            {
                target,
                template = undefined,
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
                    if (templateContent !== undefined && templateContent !== null) {
                        const ext = Object.assign({}, options, {locale: target?.locales?.user});
                        ({resultCode, content: resultContent} = await engine.render({
                            template: templateContent,
                            data,
                            options: ext,
                        }));
                    } else {
                        resultCode = RESULT.TMPL_IS_EMPTY;
                    }
                }
            } catch (error) {
                logger.error('Failed to render template.', {err: error});
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

export const __deps__ = Object.freeze({
    default: Object.freeze({
        log: 'TeqFw_Log_Provider$',
        engine: 'Fl32_Tmpl_Back_Api_Engine$',
        actFind: 'Fl32_Tmpl_Back_Act_File_Find$',
        actLoad: 'Fl32_Tmpl_Back_Act_File_Load$',
    }),
});
