// @ts-check
/**
 * @namespace Fl32_Tmpl_Back_Logger
 * @description Simple logger implementation that delegates to the native console.
 */
export default class Fl32_Tmpl_Back_Logger {
    /**
     * Creates a new instance.
     */
    constructor() {
        /**
         * Logs an error message.
         * @type {(...args: any[]) => void}
         */
        this.error = function (...args) {
            console.error('[ERROR]', ...args);
        };

        /**
         * Logs a warning message.
         * @type {(...args: any[]) => void}
         */
        this.warn = function (...args) {
            console.warn('[WARN]', ...args);
        };

        /**
         * Logs an informational message.
         * @type {(...args: any[]) => void}
         */
        this.info = function (...args) {
            console.info('[INFO]', ...args);
        };

        /**
         * Logs a debug message.
         * @type {(...args: any[]) => void}
         */
        this.debug = function (...args) {
            console.debug('[DEBUG]', ...args);
        };

        /**
         * Logs a trace message.
         * @type {(...args: any[]) => void}
         */
        this.trace = function (...args) {
            console.trace('[TRACE]', ...args);
        };

        /**
         * Logs an exception with optional additional context.
         * @type {(exception: any, ...context: any[]) => void}
         * @param {*} exception - The exception to log.
         */
        this.exception = function (exception, ...context) {
            console.error('[EXCEPTION]', exception.stack || exception.toString(), ...context);
        };
    }
}
