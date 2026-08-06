// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Act_File_Load
 * @description Loads template files from disk for SSR rendering.
 */
export default class Fl32_Tmpl_Back_Act_File_Load {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Node_FsPromises} deps.fsPromises
     * @param {TeqFw_Log_Provider} deps.log
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
         * @returns {Promise<Fl32_Tmpl_Back_Act_File_Load_Result>} - File content or null if read failed.
         */
        this.run = async function ({path}) {
            let content = null;
            try {
                content = await readFile(path, 'utf-8');
            } catch (error) {
                logger.error(`Failed to load template: ${path}`, {err: error});
            }
            return {content};
        };
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        fsPromises: 'node:fs/promises',
        log: 'TeqFw_Log_Provider$',
    }),
});
