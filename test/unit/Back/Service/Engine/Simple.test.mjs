import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

test.describe('Fl32_Tmpl_Back_Service_Engine_Simple', () => {
    test('basic render', async () => {
        const container = buildTestContainer();
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: () => {
                throw new Error('Should not be called');
            },
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
        container.register('Fl32_Tmpl_Back_Logger$', {exception: () => {}});
        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Simple$');
        const {resultCode, content} = await engine.render({template: ''});
        assert.strictEqual(resultCode, 'TMPL_IS_EMPTY');
        assert.strictEqual(content, null);
    });

    test('logs exception and returns UNKNOWN_ERROR on failure', async () => {
        const container = buildTestContainer();
        const log = {exception: []};
        container.register('Fl32_Tmpl_Back_Logger$', {
            exception: (...args) => log.exception.push(args),
        });
        const engine = await container.get('Fl32_Tmpl_Back_Service_Engine_Simple$');
        const {resultCode, content} = await engine.render({template: 5});
        assert.strictEqual(resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(content, null);
        assert.strictEqual(log.exception.length, 1);
        assert.ok(log.exception[0][0] instanceof Error);
    });
});
