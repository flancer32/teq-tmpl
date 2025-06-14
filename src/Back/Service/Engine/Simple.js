/**
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Simple {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger
     */
    constructor({Fl32_Tmpl_Back_Logger$: logger}) {
        /* eslint-enable jsdoc/check-param-names */
        this.render = async function (
            {template, data = {}, options = {}}
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                if (template) {
                    content = template.replace(/{{\s*([\w]+)\s*}}/g, (m, key) => {
                        const val = data[key];
                        return (typeof val === 'string' || typeof val === 'number')
                            ? String(val)
                            : m;
                    });
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
 * @memberOf Fl32_Tmpl_Back_Service_Engine_Simple
 */
const RESULT = {
    SUCCESS: 'SUCCESS',
    TMPL_IS_EMPTY: 'TMPL_IS_EMPTY',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);
