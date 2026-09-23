import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../../common.js';

test.describe('Fl32_Tmpl_Back_Service_Engine_Mustache', () => {

    test('should render the template and return SUCCESS code', async () => {
        const container = buildTestContainer();

        // Register mustache mock
        container.register('npm:mustache', {
            default: {
                /** @param {string} tpl @param {object} data @param {object} partials */
                render: (tpl, data, partials) => {
                    return `[${tpl}] => ${JSON.stringify(data)} + ${Object.keys(partials).join(',')}`;
                },
            },
        });

        // Register logger mock
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                error: () => {
                    throw new Error('Exception should not be triggered');
                },
            }),
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.render({
            template: 'Hello, {{user}}!',
            data: {user: 'Alice'},
            options: {footer: 'Footer partial'},
        });

        assert.strictEqual(resultCode, 'SUCCESS');
        assert.ok(content.includes('Alice'));
        assert.ok(content.includes('footer'));
    });

    test('should return TMPL_IS_EMPTY when template is missing', async () => {
        const container = buildTestContainer();

        container.register('npm:mustache', {
            default: {
                render: () => {
                    throw new Error('Render should not be called');
                },
            },
        });

        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({error: () => {}}),
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.render({template: null});

        assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
        assert.strictEqual(content, null);
    });

    test('should catch render error and return UNKNOWN_ERROR', async () => {
        const container = buildTestContainer();

        container.register('npm:mustache', {
            default: {
                render: () => {
                    throw new Error('Mustache render failed');
                },
            },
        });

        /** @type {{error: any[]}} */
        const log = {error: []};
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                /** @param {...*} args */
                error: (...args) => log.error.push(args),
            }),
        });

        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Mustache$');

        const {resultCode, content} = await engine.render({
            template: 'broken {{',
            data: {},
        });

        assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(content, null);
        assert.ok(log.error.length > 0);
        assert.ok(log.error[0][1].err instanceof Error);
    });
});
