import {describe, it, beforeEach} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../common.js';

describe('Fl32_Tmpl_Back_Logger', () => {
    /** @type {Fl32_Tmpl_Back_Logger} */
    let logger;

    /** @type {object[]} */
    let output;

    // Patch global console before each test
    beforeEach(async () => {
        output = [];

        // Patch console methods
        global.console = {
            error: (...args) => output.push(['error', ...args]),
            warn: (...args) => output.push(['warn', ...args]),
            info: (...args) => output.push(['info', ...args]),
            debug: (...args) => output.push(['debug', ...args]),
            trace: (...args) => output.push(['trace', ...args]),
        };

        // Get logger instance from container
        const container = buildTestContainer();
        logger = await container.get('Fl32_Tmpl_Back_Logger$');
    });

    it('should log error messages with [ERROR] prefix', () => {
        logger.error('something failed');
        assert.deepStrictEqual(output[0], ['error', '[ERROR]', 'something failed']);
    });

    it('should log warning messages with [WARN] prefix', () => {
        logger.warn('deprecated usage');
        assert.deepStrictEqual(output[0], ['warn', '[WARN]', 'deprecated usage']);
    });

    it('should log info messages with [INFO] prefix', () => {
        logger.info('system started');
        assert.deepStrictEqual(output[0], ['info', '[INFO]', 'system started']);
    });

    it('should log debug messages with [DEBUG] prefix', () => {
        logger.debug('value of x:', 42);
        assert.deepStrictEqual(output[0], ['debug', '[DEBUG]', 'value of x:', 42]);
    });

    it('should log trace messages with [TRACE] prefix', () => {
        logger.trace('execution path');
        assert.deepStrictEqual(output[0], ['trace', '[TRACE]', 'execution path']);
    });

    it('should log exceptions with stack trace if available', () => {
        const err = new Error('boom');
        logger.exception(err, 'during processing');
        assert.strictEqual(output[0][0], 'error');
        assert.strictEqual(output[0][1], '[EXCEPTION]');
        assert.ok(output[0][2].includes('Error: boom'));
        assert.strictEqual(output[0][3], 'during processing');
    });

    it('should log exception as string if no stack trace is available', () => {
        const fake = {toString: () => 'raw error'};
        logger.exception(fake, 'meta');
        assert.deepStrictEqual(output[0], ['error', '[EXCEPTION]', 'raw error', 'meta']);
    });
});
