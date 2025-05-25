/**
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Nunjucks {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger
     * @param {Fl32_Tmpl_Back_Config} config
     * @param {Fl32_Tmpl_Back_Factory_Nunjucks_Env} factEnv
     */
    constructor(
        {
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Config$: config,
            Fl32_Tmpl_Back_Factory_Nunjucks_Env$: factEnv,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS

        // MAIN

        /**
         * Result codes for template rendering operations.
         * @return {typeof Fl32_Tmpl_Back_Service_Engine_Nunjucks.RESULT}
         */
        this.getResultCodes = () => RESULT;

        this.perform = async function (
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
