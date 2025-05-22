/**
 * Loads template files from disk for SSR rendering.
 * Uses injected logger to report read failures.
 */
export default class Fl32_Tmpl_Back_Act_File_Load {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:fs/promises')} fsPromises
     * @param {Fl32_Tmpl_Back_Logger} logger
     */
    constructor(
        {
            'node:fs/promises': fsPromises,
            Fl32_Tmpl_Back_Logger$: logger,
        }
    ) {
        // VARS
        const {readFile} = fsPromises;

        // MAIN

        /**
         * Load template file content.
         * @param {object} args - Parameters object.
         * @param {string} args.path - Path to the template file.
         * @returns {Promise<{content: string|null}>} - File content or null if read failed.
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