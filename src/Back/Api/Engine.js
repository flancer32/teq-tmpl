// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Api_Engine
 * @description API interface for a template rendering engine (Mustache, Nunjucks, etc.). Implementations must provide a `render()` method for processing template content with context and optional engine-specific options.
 * @interface
 */
export default class Engine {
    /** Creates the unimplemented engine contract. */
    constructor() {
        /**
         * Render a template string using a specific template engine.
         *
         * @param {object} deps - Rendering input.
         * @param {string} deps.template - Raw template content.
         * @param {object} deps.data - Template context data.
         * @param {object} deps.options - Engine-specific options.
         * @returns {Promise<Fl32_Tmpl_Back_Api_Engine_Result>} - Rendering a result object.
         */
        this.render = async function ({template, data, options}) {
            void template;
            void data;
            void options;
            throw new Error('Method not implemented');
        };
    }
}

/**
 * @typedef {object} Fl32_Tmpl_Back_Api_Engine_Args
 * @property {string} template - Raw template content loaded from a file.
 * @property {object} data - Context to be used for rendering.
 * @property {object} [options] - Optional engine-specific rendering options (e.g., partials, filters).
 *
 * @typedef {object} Fl32_Tmpl_Back_Api_Engine_Result
 * @property {string} resultCode - Status code describing the render result.
 * @property {string|null} content - Rendered output string or null if rendering failed.
 */
