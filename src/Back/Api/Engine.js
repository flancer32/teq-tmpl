/**
 * API interface for a template rendering engine (Mustache, Nunjucks, etc.).
 *
 * Implementations must provide a `render()` method for processing template content
 * with context and optional engine-specific options.
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
    async render({template, data, options}) {
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
 */
