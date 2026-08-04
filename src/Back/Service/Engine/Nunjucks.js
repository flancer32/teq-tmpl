// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Service_Engine_Nunjucks
 * @description Nunjucks template rendering engine.
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Nunjucks {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Logger} deps.logger
     * @param {Fl32_Tmpl_Back_Config} deps.config
     * @param {Fl32_Tmpl_Back_Factory_Nunjucks_Env} deps.factEnv
     */
    constructor(
        {
            logger,
            config,
            factEnv,
        }
    ) {        // VARS

        // MAIN

        /**
         * Renders a template using the Nunjucks engine.
         * @param {object} deps - Rendering input.
         * @param {string} deps.template - Raw template content.
         * @param {object} deps.data - Template context data.
         * @param deps.options - Engine-specific options.
         * @returns {Promise<Fl32_Tmpl_Back_Service_Render_Result>} - Rendering result.
         */
        this.render = async function (
            {
                template,
                data = {},
                options = {},
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                if (template) {
                    const locale = options.locale;
                    const env = factEnv.create({locale, defaultLocale: config.getDefaultLocale()});
                    // Render the template using Nunjucks
                    content = env.renderString(template, data);
                    resultCode = RESULT.SUCCESS;
                } else {
                    resultCode = RESULT.TMPL_IS_EMPTY;
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
 * @memberOf Fl32_Tmpl_Back_Service_Engine_Nunjucks
 */
const RESULT = {
    SUCCESS: 'SUCCESS',
    TMPL_IS_EMPTY: 'TMPL_IS_EMPTY',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);

export const __deps__ = Object.freeze({
    default: Object.freeze({
        logger: 'Fl32_Tmpl_Back_Logger$',
        config: 'Fl32_Tmpl_Back_Config$',
        factEnv: 'Fl32_Tmpl_Back_Factory_Nunjucks_Env$',
    }),
});

