/**
 * Service to load template source code and path.
 * Implements TeqFw_Core_Shared_Api_Service interface.
 */
export default class Fl32_Tmpl_Back_Service_Load {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Logger} logger - Logger for exceptions
     * @param {Fl32_Tmpl_Back_Act_File_Find} actFind - Action to find files
     * @param {Fl32_Tmpl_Back_Act_File_Load} actLoad - Action to load files
     */
    constructor(
        {
            Fl32_Tmpl_Back_Logger$: logger,
            Fl32_Tmpl_Back_Act_File_Find$: actFind,
            Fl32_Tmpl_Back_Act_File_Load$: actLoad,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */
        /**
         * Get result codes for template loading operations.
         * @returns {typeof RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Find and load template file.
         * @param {object} args - Parameters
         * @param {Fl32_Tmpl_Back_Dto_Target.Dto} [args.target] - Template target metadata
         * @returns {Promise<{resultCode: string, template: string, path: string}>} - Loading result
         */
        this.perform = async function ({target}) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let template;
            let path;
            try {
                path = await actFind.run({target});
                if (path) {
                    const {content} = await actLoad.run({path});
                    template = content;
                    resultCode = RESULT.SUCCESS;
                } else {
                    resultCode = RESULT.PATH_NOT_FOUND;
                }
            } catch (error) {
                logger.exception(error);
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