// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Act_File_Load
 * @description Loads template files from disk for SSR rendering. Uses injected logger to report read failures.
 */
export default class Fl32_Tmpl_Back_Act_File_Load {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Node_FsPromises} deps.fsPromises
     * @param {Fl32_Tmpl_Back_Logger} deps.logger
     */
    constructor(
        {
            fsPromises,
            logger,
        }
    ) {
        // VARS
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
                logger.error(`Failed to load template: ${path}`, error);
            }
            return {content};
        };
    }
}

export const __deps__ = Object.freeze({
    default: Object.freeze({
        fsPromises: 'node:fs/promises',
        logger: 'Fl32_Tmpl_Back_Logger$',
    }),
});