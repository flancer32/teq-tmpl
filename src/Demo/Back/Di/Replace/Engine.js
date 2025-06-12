/**
 * Example DI configuration chunk replacing the abstract template engine
 * with a concrete implementation. Applications can provide a similar
 * file to switch engines without modifying the core package.
 */
export default class Fl32_Tmpl_Demo_Back_Di_Replace_Engine {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {TeqFw_Di_Container} container
     * @param {typeof import('@teqfw/di/src/Pre/Replace.js')} Replace
     */
    constructor(
        {
            TeqFw_Di_Container$: container,
            '@teqfw/di/src/Pre/Replace.js': Replace,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        const chunk = new Replace();
        chunk.add('Fl32_Tmpl_Back_Api_Engine', 'Fl32_Tmpl_Back_Service_Engine_Mustache');
        container.getPreProcessor().addChunk(chunk);
    }
}

