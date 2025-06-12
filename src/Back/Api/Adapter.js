/**
 * Application adapter interface to provide template engine implementation.
 *
 * Implementations must return an instance of {@link Fl32_Tmpl_Back_Api_Engine}
 * via the {@link getEngine} method.
 *
 * @interface
 */
export default class Fl32_Tmpl_Back_Api_Adapter {
    /**
     * Return a template engine instance.
     *
     * @returns {Fl32_Tmpl_Back_Api_Engine}
     */
    getEngine() {
        throw new Error('Method not implemented');
    }
}
