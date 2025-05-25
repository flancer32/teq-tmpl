import {describe, it} from 'mocha';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

describe('Fl32_Tmpl_Back_Service_Engine_Mustache', () => {

    it('should render the template and return SUCCESS code', async () => {
        const container = buildTestContainer();

        // Register mustache mock
        container.register('node:mustache', {
            default: {
                render: (tpl, data, partials) => {
                    return `[${tpl}] => ${JSON.stringify(data)} + ${Object.keys(partials).join(',')}`;
                },
            },
        });

        // Register logger mock
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Exception should not be triggered');
            },
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.perform({
            template: 'Hello, {{user}}!',
            data: {user: 'Alice'},
            options: {footer: 'Footer partial'},
        });

        assert.strictEqual(resultCode, 'SUCCESS');
        assert.ok(content.includes('Alice'));
        assert.ok(content.includes('footer'));
    });

    it('should return TMPL_IS_EMPTY when template is missing', async () => {
        const container = buildTestContainer();

        container.register('node:mustache', {
            default: {
                render: () => {
                    throw new Error('Render should not be called');
                },
            },
        });

        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {},
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.perform({template: null});

        assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
        assert.strictEqual(content, null);
    });

    it('should catch render error and return UNKNOWN_ERROR', async () => {
        const container = buildTestContainer();

        container.register('node:mustache', {
            default: {
                render: () => {
                    throw new Error('Mustache render failed');
                },
            },
        });

        const log = {exception: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: (...args) => log.exception.push(args),
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.perform({
            template: 'broken {{',
            data: {},
        });

        assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(content, null);
        assert.ok(log.exception.length > 0);
        assert.ok(log.exception[0][0] instanceof Error);
    });
});
