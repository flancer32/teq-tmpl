/**
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Mustache {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('mustache')} mustache
     * @param {Fl32_Tmpl_Back_Logger} logger
     */
    constructor(
        {
            'node:mustache': mustache,
            Fl32_Tmpl_Back_Logger$: logger,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS
        const {default: Mustache} = mustache;

        // MAIN

        /**
         * Result codes for template rendering operations.
         * @return {typeof Fl32_Tmpl_Back_Service_Engine_Mustache.RESULT}
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
                    // Render the template using Mustache
                    content = Mustache.render(template, data, options);
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
 * @memberOf Fl32_Tmpl_Back_Service_Engine_Mustache
 */
const RESULT = {
    SUCCESS: 'SUCCESS',
    TMPL_IS_EMPTY: 'TMPL_IS_EMPTY',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);