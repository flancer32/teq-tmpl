// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Service_Engine_Simple
 * @description Simple template rendering engine.
 * @implements {Fl32_Tmpl_Back_Api_Engine}
 */
export default class Fl32_Tmpl_Back_Service_Engine_Simple {
    /**
     * @param {object} deps
     * @param {TeqFw_Log_Provider} deps.log
     */
    constructor({log}) {
        const logger = log.forSource('Fl32_Tmpl_Back_Service_Engine_Simple');
        /**
         * Renders a template using the Simple engine.
         * @param {object} deps - Rendering input.
         * @param {string} deps.template - Raw template content.
         * @param {Object<string, *>} deps.data - Template context data.
         * @param {Object<string, *>} deps.options - Engine-specific options.
         * @returns {Promise<Fl32_Tmpl_Back_Service_Render_Result>} - Rendering result.
         */
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
                logger.error('Failed to render simple template.', {err: error});
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

export const __deps__ = Object.freeze({
    default: Object.freeze({
        log: 'TeqFw_Log_Provider$',
    }),
});
