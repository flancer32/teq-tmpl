/**
 * API interface for a template rendering engine (Mustache, Nunjucks, etc.).
 *
 * Implementations must provide a `perform()` method for processing template content
 * with context and optional engine-specific options. Engines should also expose
 * their result codes via `getResultCodes()`.
 *
 * @interface
 */
export default class Fl32_Tmpl_Back_Api_Engine {
    /* eslint-disable no-unused-vars */
    /**
     * Render a template string using a specific template engine.
     *
     * @param {Fl32_Tmpl_Back_Api_Engine.Args} args - Rendering input.
     * @returns {Promise<Fl32_Tmpl_Back_Api_Engine.Result>} - Rendering a result object.
     */
    async perform({template, data, options}) {
        throw new Error('Method not implemented');
    }

    /**
     * Get engine-specific result codes.
     *
     * @returns {object} Enumeration of result codes supported by the engine.
     */
    getResultCodes() {
        throw new Error('Method not implemented');
    }
}

/**
 * @typedef {object} Fl32_Tmpl_Back_Api_Engine.Args
 * @property {string} template - Raw template content loaded from a file.
 * @property {object} data - Context to be used for rendering.
 * @property {object} [options] - Optional engine-specific rendering options (e.g., partials, filters).
 *
 * @typedef {object} Fl32_Tmpl_Back_Api_Engine.Result
 * @property {string} resultCode - Status code describing the render result.
 * @property {string|null} content - Rendered output string or null if rendering failed.
 *
 * @typedef {object} Fl32_Tmpl_Back_Api_Engine.ResultCodes
 * @property {string} SUCCESS - Rendering completed successfully.
 * @property {string} TMPL_IS_EMPTY - Template is empty.
 * @property {string} UNKNOWN_ERROR - Unexpected error occurred.
 */
