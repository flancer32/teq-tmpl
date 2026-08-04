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
         */
        this.error = function (...args) {
            console.error('[ERROR]', ...args);
        };

        /**
         * Logs a warning message.
         */
        this.warn = function (...args) {
            console.warn('[WARN]', ...args);
        };

        /**
         * Logs an informational message.
         */
        this.info = function (...args) {
            console.info('[INFO]', ...args);
        };

        /**
         * Logs a debug message.
         */
        this.debug = function (...args) {
            console.debug('[DEBUG]', ...args);
        };

        /**
         * Logs a trace message.
         */
        this.trace = function (...args) {
            console.trace('[TRACE]', ...args);
        };

        /**
         * Logs an exception with optional additional context.
         * @param {Error} exception - The exception to log.
         */
        this.exception = function (exception, ...context) {
            console.error('[EXCEPTION]', exception.stack || exception.toString(), ...context);
        };
    }
}
