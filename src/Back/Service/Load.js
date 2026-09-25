// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Service_Load
 * @description Resolves and loads template text and its path without rendering.
 */
export default class Load {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Log_Provider} deps.log - Shared logging provider
     * @param {Fl32_Tmpl_Back_Act_File_Find} deps.actFind - Action to find files
     * @param {Fl32_Tmpl_Back_Act_File_Load} deps.actLoad - Action to load files
     */
    constructor(
        {
            log,
            actFind,
            actLoad,
        }
    ) {
        const logger = log.forSource('Fl32_Tmpl_Back_Service_Load');
        /**
         * Get result codes for template loading operations.
         * @returns {Fl32_Tmpl_Back_Service_Load_Result_Codes}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Find and load template file.
         * @param {object} deps - Parameters
         * @param {Fl32_Tmpl_Back_Dto_Target__DTO} deps.target - Template target metadata
         * @returns {Promise<Fl32_Tmpl_Back_Service_Load_Result>} - Loading result
         */
        this.perform = async function ({target}) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            /** @type {string | null | undefined} */
            let template;
            /** @type {string | null | undefined} */
            let path;
            try {
                path = await actFind.run({target});
                if (path) {
                    const {content} = await actLoad.run({path});
                    if (content === null || content === undefined) {
                        throw new Error(`Template file returned no content: ${path}`);
                    }
                    template = content;
                    resultCode = RESULT.SUCCESS;
                } else {
                    resultCode = RESULT.PATH_NOT_FOUND;
                }
            } catch (error) {
                logger.error('Failed to load template.', {err: error});
            }
            return {resultCode, template, path};
        };
    }
}

/**
 * Result codes for template loading operations.
 * @memberOf Fl32_Tmpl_Back_Service_Load
 */
const RESULT = {
    PATH_NOT_FOUND: 'PATH_NOT_FOUND',
    SUCCESS: 'SUCCESS',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);

export const __deps__ = Object.freeze({
    default: Object.freeze({
        log: 'TeqFw_Log_Provider$',
        actFind: 'Fl32_Tmpl_Back_Act_File_Find$',
        actLoad: 'Fl32_Tmpl_Back_Act_File_Load$',
    }),
});
