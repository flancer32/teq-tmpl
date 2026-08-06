import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

test.describe('Fl32_Tmpl_Back_Service_Render_Web', () => {

    test('should build Target DTO and delegate to Render service', async () => {
        const container = buildTestContainer();
        /** @type {{createArgs: *, performArgs: *}} */
        const logs = {createArgs: null, performArgs: null};

        // Mock dependencies
        container.register('Fl32_Tmpl_Back_Dto_Target$', {
            /** @param {*} args */
            create: (args) => {logs.createArgs = args; return args;},
        });
        container.register('Fl32_Tmpl_Back_Service_Render$', {
            /** @param {{target: *, data: object, options: object}} deps */
            perform: async ({target, data, options}) => {
                logs.performArgs = {target, data, options};
                return {resultCode: 'SUCCESS', content: 'ok'};
            },
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Render_Web$');

        const params = {
            name: 'index.html',
            pkg: '@vendor/cms',
            locales: {user: 'ru-RU', app: 'ru', pkg: 'en'},
            data: {title: 'Hello'},
            options: {partials: {}},
        };

        const {resultCode, content} = await service.perform(params);

        assert.strictEqual(resultCode, 'SUCCESS');
        assert.strictEqual(content, 'ok');
        assert.deepStrictEqual(logs.createArgs, {
            type: 'web',
            name: 'index.html',
            pkg: '@vendor/cms',
            locales: params.locales,
        });
        assert.deepStrictEqual(logs.performArgs, {
            target: logs.createArgs,
            data: params.data,
            options: params.options,
        });
    });
});
