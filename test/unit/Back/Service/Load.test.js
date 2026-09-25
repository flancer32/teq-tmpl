import test from 'node:test';
import assert from 'assert';
import {buildTestContainer} from '../../../common.js';

test.describe('Fl32_Tmpl_Back_Service_Load', () => {

    test('should find and load template file successfully', async () => {
        const container = buildTestContainer();

        // Mocks
        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            /** @param {{target?: {name?: string}}} deps */
            run: async ({target}) => `/templates/${target?.name || 'default'}.html`,
        });

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            /** @param {{path: string}} deps */
            run: async ({path}) => ({content: `<html>${path}</html>`}),
        });

        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                error: () => {
                    throw new Error('Should not be called');
                },
            }),
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'welcome'},
        });

        assert.strictEqual(result.resultCode, 'SUCCESS');
        assert.strictEqual(result.path, '/templates/welcome.html');
        assert.strictEqual(result.template, '<html>/templates/welcome.html</html>');
    });

    test('should return PATH_NOT_FOUND when no file path is resolved', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            run: async () => null,
        });

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            run: async () => {
                throw new Error('Should not be called');
            },
        });

        container.register('TeqFw_Log_Provider$', {
            forSource: () => ({
                error: () => {
                    throw new Error('Should not be called');
                },
            }),
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'not-found'},
        });

        assert.strictEqual(result.resultCode, 'PATH_NOT_FOUND');
        assert.strictEqual(result.path, null);
        assert.strictEqual(result.template, undefined);
    });

    test('should catch and log exception, returning UNKNOWN_ERROR', async () => {
        const container = buildTestContainer();

        container.register('Fl32_Tmpl_Back_Act_File_Find$', {
            run: async () => {
                throw new Error('File system failure');
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

        container.register('Fl32_Tmpl_Back_Act_File_Load$', {
            run: async () => ({content: ''}), // not called
        });

        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        const result = await service.perform({
            target: {name: 'error'},
        });

        assert.strictEqual(result.resultCode, 'UNKNOWN_ERROR');
        assert.strictEqual(result.path, undefined);
        assert.strictEqual(result.template, undefined);
        assert.ok(log.error.length > 0);
        assert.ok(log.error[0][1].err instanceof Error);
        assert.match(log.error[0][1].err.message, /File system failure/);
    });

    test('should never report success when a resolved file returns null content', async () => {
        const container = buildTestContainer();
        container.register('Fl32_Tmpl_Back_Act_File_Find$', {run: async () => '/templates/broken.html'});
        container.register('Fl32_Tmpl_Back_Act_File_Load$', {run: async () => ({content: null})});
        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        assert.deepStrictEqual(await service.perform({target: {name: 'broken'}}), {
            resultCode: 'UNKNOWN_ERROR',
            template: undefined,
            path: '/templates/broken.html',
        });
    });

    test('should report an empty readable file as successful loading', async () => {
        const container = buildTestContainer();
        container.register('Fl32_Tmpl_Back_Act_File_Find$', {run: async () => '/templates/empty.html'});
        container.register('Fl32_Tmpl_Back_Act_File_Load$', {run: async () => ({content: ''})});
        const service = await container.get('Fl32_Tmpl_Back_Service_Load$');

        assert.deepStrictEqual(await service.perform({target: {name: 'empty'}}), {
            resultCode: 'SUCCESS',
            template: '',
            path: '/templates/empty.html',
        });
    });
});
