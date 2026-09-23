import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../../common.js';

test.describe('Fl32_Tmpl_Back_Service_Engine_Simple', () => {
    test('basic render', async () => {
        const container = buildTestContainer();
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                error: () => {
                    throw new Error('Should not be called');
                },
            }),
        });
        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Simple$');
        const {resultCode, content} = await engine.render({
            template: 'Hi, {{name}}!',
            data: {name: 'Bob'},
        });
        assert.strictEqual(resultCode, 'SUCCESS');
        assert.strictEqual(content, 'Hi, Bob!');
    });

    test('returns TMPL_IS_EMPTY when template is empty', async () => {
        const container = buildTestContainer();
        container.register('TeqFw_Log_Provider$', {forSource: () => ({error: () => {}})});
        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Simple$');
        const {resultCode, content} = await engine.render({template: ''});
        assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
        assert.strictEqual(content, null);
    });

    test('logs exception and returns UNKNOWN_ERROR on failure', async () => {
        const container = buildTestContainer();
        /** @type {{error: any[]}} */
        const log = {error: []};
        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                /** @param {...*} args */
                error: (...args) => log.error.push(args),
            }),
        });
        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Simple$');
        const {resultCode, content} = await engine.render({template: 5});
        assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(content, null);
        assert.strictEqual(log.error.length, 1);
        assert.ok(log.error[0][1].err instanceof Error);
    });
});
