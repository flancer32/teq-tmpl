// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Act_File_Load
 * @description Reads template text from disk.
 */
export default class Load {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs/promises')} deps.fsPromises
     * @param {Fl32_Tmpl_Back_Log_Provider} deps.log
     */
    constructor(
        {
            fsPromises,
            log,
        }
    ) {
        // VARS
        const logger = log.forSource('Fl32_Tmpl_Back_Act_File_Load');
        const {readFile} = fsPromises;

        // MAIN

        /**
         * Load template file content.
         * @param {object} deps - Parameters object.
         * @param {string} deps.path - Path to the template file.
         * @returns {Promise<Fl32_Tmpl_Back_Act_File_Load_Result>} File content.
         */
        this.run = async function ({path}) {
            try {
                const content = await readFile(path, 'utf-8');
                return {content};
            } catch (error) {
                logger.error(`Failed to load template: ${path}`, {err: error});
                throw error;
            }
        };
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        fsPromises: 'node:fs/promises',
        log: 'TeqFw_Log_Provider$',
    }),
});
