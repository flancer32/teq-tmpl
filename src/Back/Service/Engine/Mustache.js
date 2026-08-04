/**
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Mustache {
    /**
     * @param {object} deps
     * @param {typeof import('mustache')} deps.mustache
     * @param {Fl32_Tmpl_Back_Logger} deps.logger
     */
    constructor(
        {
            mustache,
            logger,
        }
    ) {
        // VARS
        const {default: Mustache} = mustache;

        // MAIN

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

export const __deps__ = Object.freeze({
    default: Object.freeze({
        mustache: 'npm:mustache',
        logger: 'Fl32_Tmpl_Back_Logger$',
    }),
});
